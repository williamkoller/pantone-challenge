import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Input, IUpdateFarmUseCase, Output } from './IUpdateFarmUseCase';
import { FarmRepository } from '../../../interfaces/farm/FarmRepository';
import { FarmNotFoundException } from '../../../exceptions/farm/FarmNotFoundException';
import { FarmMapper } from '../../../mappers/FarmMapper';
import { Farm } from '../../../../domain/farm/Farm';

@Injectable()
export class UpdateFarmUseCase implements IUpdateFarmUseCase {
  constructor(
    @Inject(FarmRepository)
    private readonly farmRepository: FarmRepository,
  ) {}

  async execute(input: Input): Promise<Output> {
    const farm = await this.farmRepository.findById(input.farmId);

    if (!farm) throw new FarmNotFoundException();

    console.log(farm);

    const updatedFarm = farm.updateFarm({
      producerId:
        input.producerId !== undefined ? input.producerId : farm.producerId,
      name: input.name !== undefined ? input.name : farm.name,
      state: input.state !== undefined ? input.state : farm.state,
      arableArea:
        input.arableArea !== undefined ? input.arableArea : farm.arableArea,
      vegetationArea:
        input.vegetationArea !== undefined
          ? input.vegetationArea
          : farm.vegetationArea,
      totalArea: Farm.calculateTotalArea(
        input.arableArea !== undefined ? input.arableArea : farm.arableArea,
        input.vegetationArea !== undefined
          ? input.vegetationArea
          : farm.vegetationArea,
      ),
    });

    await this.farmRepository.update(updatedFarm);

    return FarmMapper.toDTO(updatedFarm);
  }
}
