import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Transactional } from 'sequelize-transactional-decorator';
import { Crop } from '@app/domain/crop/Crop';
import { CropConflictException } from '@app/application/exceptions/crop/crop-conflict-exception';
import { ICreateCropUseCase, Input, Output } from './icreate-crop-usecase';
import { CropMapper } from '@app/application/mappers/crop/crop-mapper';
import { CropRepository } from '@app/application/interfaces/crop/crop-repository';
import { FarmRepository } from '@app/application/interfaces/farm/FarmRepository';
import { FarmNotFoundException } from '@app/application/exceptions/farm/FarmNotFoundException';

@Injectable()
export class CreateCropUseCase implements ICreateCropUseCase {
  private readonly logger = new Logger(CreateCropUseCase.name);
  constructor(
    @Inject(CropRepository)
    private readonly cropRepository: CropRepository,
    @Inject(FarmRepository)
    private readonly farmRepository: FarmRepository,
  ) {}

  @Transactional()
  async execute(input: Input): Promise<Output> {
    try {
      const farm = await this.farmRepository.findById(input.farmId);

      if (!farm) throw new FarmNotFoundException();

      const cropExists =
        await this.cropRepository.findByFarmIdAndYearAndCropType(
          farm.id.toString(),
          input.year,
          input.cropType,
        );

      if (cropExists) throw new CropConflictException();

      const crop = Crop.create({
        farmId: farm.id.toString(),
        year: input.year,
        cropType: input.cropType,
      });

      const cropSaved = await this.cropRepository.save(crop);

      return CropMapper.toDTO(cropSaved);
    } catch (error) {
      this.logger.error(error.message);

      if (error instanceof CropConflictException) throw error;

      throw new BadRequestException(error.message);
    }
  }
}
