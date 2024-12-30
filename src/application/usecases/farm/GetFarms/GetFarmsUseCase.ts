import { Inject, Injectable } from '@nestjs/common';
import { IGetFarmsUseCase, Output } from './IGetFarmsUseCase';
import { FarmRepository } from '@app/application/interfaces/farm/FarmRepository';
import { FarmMapper } from '@app/application/mappers/farm/FarmMapper';

@Injectable()
export class GetFarmsUseCase implements IGetFarmsUseCase {
  constructor(
    @Inject(FarmRepository)
    private readonly farmRepository: FarmRepository,
  ) {}

  async execute(): Promise<Output[]> {
    const farms = await this.farmRepository.findAll();
    return farms.map((farm) => FarmMapper.toDTO(farm));
  }
}
