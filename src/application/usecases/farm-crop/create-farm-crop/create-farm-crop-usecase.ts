import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import {
  ICreateFarmCropUseCase,
  Input,
  Output,
} from './icreate-farm-crop-usecase';
import { FarmRepository } from '@app/application/interfaces/farm/FarmRepository';
import { CropRepository } from '@app/application/interfaces/crop/crop-repository';
import { FarmCropRepository } from '@app/application/interfaces/farm-crop/farm-crop-repository';
import { FarmNotFoundException } from '@app/application/exceptions/farm/FarmNotFoundException';
import { CropNotFoundException } from '@app/application/exceptions/crop/crop-not-found-exception';
import { FarmCropConflictException } from '@app/application/exceptions/farm-crop/farm-crop-conflict-exception';
import { FarmCrop } from '@app/application/../domain/farm-crop/FarmCrop';
import { FarmCropMapper } from '@app/application/mappers/farm-crop/farm-crop-mapper';

@Injectable()
export class CreateFarmCropUseCase implements ICreateFarmCropUseCase {
  private readonly logger = new Logger(CreateFarmCropUseCase.name);
  constructor(
    @Inject(FarmRepository)
    private readonly farmRepository: FarmRepository,
    @Inject(CropRepository)
    private readonly cropRepository: CropRepository,
    @Inject(FarmCropRepository)
    private readonly farmCropRepository: FarmCropRepository,
  ) {}

  async execute(input: Input): Promise<Output> {
    try {
      const { farmId, cropId, seasonYear, plantedArea } = input;

      const farm = await this.farmRepository.findById(farmId);

      if (!farm) throw new FarmNotFoundException();

      const crop = await this.cropRepository.findById(cropId);

      if (!crop) throw new CropNotFoundException();

      const farmCropExists =
        await this.farmCropRepository.findByFarmIdAndSeasonYear(
          farmId,
          seasonYear,
        );

      if (farmCropExists) throw new FarmCropConflictException();

      const farmCrop = FarmCrop.create({
        farmId,
        cropId,
        seasonYear,
        plantedArea,
      });

      const farmCropSaved = await this.farmCropRepository.save(farmCrop);

      return FarmCropMapper.toDTO(farmCropSaved);
    } catch (error) {
      this.logger.error(error.message);

      if (error instanceof FarmNotFoundException) throw error;

      if (error instanceof CropNotFoundException) throw error;

      if (error instanceof FarmCropConflictException) throw error;

      throw new BadRequestException(error.message);
    }
  }
}
