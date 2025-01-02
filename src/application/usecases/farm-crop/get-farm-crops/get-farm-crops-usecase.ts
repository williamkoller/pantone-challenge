import { Inject, Injectable } from '@nestjs/common';
import { IGetFarmCropsUseCase, OutPut } from './iget-farm-crops-usecase';
import { FarmCropRepository } from '../../../interfaces/farm-crop/farm-crop-repository';
import { FarmCropMapper } from '../../../mappers/farm-crop/farm-crop-mapper';

@Injectable()
export class GetFarmCropsUseCase implements IGetFarmCropsUseCase {
  constructor(
    @Inject(FarmCropRepository)
    private readonly farmCropRepository: FarmCropRepository,
  ) {}

  async execute(): Promise<OutPut[]> {
    const farmCrops = await this.farmCropRepository.findAll();

    return farmCrops.map(FarmCropMapper.toDTO);
  }
}
