import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Input, IUpdateFarmUseCase, Output } from './iupdate-farm-usecase';
import { FarmRepository } from '@app/application/interfaces/farm/farm-repository';
import { FarmNotFoundException } from '@app/application/exceptions/farm/farm-not-found-exception';
import { FarmMapper } from '@app/application/mappers/farm/farm-mapper';
import { Farm } from '@app/domain/farm/farm';
import { ProducerRepository } from '@app/application/interfaces/producer/producer-repository';
import { ProducerNotFoundException } from '@app/application/exceptions/producer/producer-not-found-exception';
import { Producer } from '@app/domain/producer/producer';

@Injectable()
export class UpdateFarmUseCase implements IUpdateFarmUseCase {
  constructor(
    @Inject(FarmRepository)
    private readonly farmRepository: FarmRepository,
    @Inject(ProducerRepository)
    private readonly producerRepository: ProducerRepository,
  ) {}

  async execute(input: Input): Promise<Output> {
    const farm = await this.farmRepository.findById(input.farmId);

    if (!farm) throw new FarmNotFoundException();

    let producer: Producer | null = null;

    if (input.producerId !== undefined) {
      producer = await this.producerRepository.findById(input.producerId);

      if (!producer) throw new ProducerNotFoundException();
    }

    const currentArableArea = farm.arableArea;
    const currentVegetationArea = farm.vegetationArea;

    const arableAreaInHectares = Farm.toHectares(input.arableArea);
    const vegetationAreaInHectares = Farm.toHectares(input.vegetationArea);
    const totalAreaInHectares = Farm.toHectares(farm.totalArea);

    const updatedFarm = farm.updateFarm({
      producerId:
        input.producerId !== undefined
          ? input.producerId
          : (producer?.id?.toString() ?? farm.producerId.toString()),
      name: input.name !== undefined ? input.name : farm.name,
      producer: producer,
      state: input.state !== undefined ? input.state : farm.state,
      arableArea:
        input.arableArea !== undefined
          ? Number(arableAreaInHectares)
          : currentArableArea,
      vegetationArea:
        input.vegetationArea !== undefined
          ? Number(vegetationAreaInHectares)
          : currentVegetationArea,
      totalArea:
        input.totalArea !== undefined
          ? Number(totalAreaInHectares)
          : farm.totalArea,
    });

    await this.farmRepository.update(updatedFarm);

    return FarmMapper.toDTO(updatedFarm);
  }
}
