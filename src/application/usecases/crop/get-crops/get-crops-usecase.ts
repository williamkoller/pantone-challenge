import { Inject, Injectable } from '@nestjs/common';
import { IGetCropsUseCase, Output } from './iget-crops-usecase';
import { CropRepository } from '@app/application/interfaces/crop/crop-repository';
import { CropMapper } from '@app/application/mappers/crop/crop-mapper';

@Injectable()
export class GetCropsUseCase implements IGetCropsUseCase {
  constructor(
    @Inject(CropRepository)
    private readonly cropRepository: CropRepository,
  ) {}

  async execute(): Promise<Output[]> {
    const res = await this.cropRepository.findAll();

    return res.map(CropMapper.toDTO);
  }
}
