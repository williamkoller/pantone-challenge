import { FarmConflictException } from '@app/application/exceptions/farm/FarmConflictException';
import { ProducerNotFoundException } from '@app/application/exceptions/producer/ProducerNotFoundException';
import { FarmRepository } from '@app/application/interfaces/farm/FarmRepository';
import { ProducerRepository } from '@app/application/interfaces/producer/ProducerRepository';
import { FarmMapper } from '@app/application/mappers/farm/FarmMapper';
import { Farm } from '@app/domain/farm/Farm';
import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Transactional } from 'sequelize-transactional-decorator';
import { ICreateFarmUseCase, Input, Output } from './ICreateFarmUseCase';

@Injectable()
export class CreateFarmUseCase implements ICreateFarmUseCase {
  private readonly logger = new Logger(CreateFarmUseCase.name);
  constructor(
    @Inject(ProducerRepository)
    private readonly producerRepository: ProducerRepository,
    @Inject(FarmRepository)
    private readonly farmRepository: FarmRepository,
  ) {}

  @Transactional()
  async execute(input: Input): Promise<Output> {
    try {
      const producer = await this.producerRepository.findById(input.producerId);

      if (!producer) throw new ProducerNotFoundException();

      const farmExists = await this.farmRepository.findByName(input.name);

      if (farmExists) throw new FarmConflictException();

      const arableAreaInHectares = Farm.toHectares(input.arableArea);
      const vegetationAreaInHectares = Farm.toHectares(input.vegetationArea);
      const totalAreaInHectares = Farm.toHectares(input.totalArea);

      console.log({
        arableAreaInHectares,
        vegetationAreaInHectares,
        totalAreaInHectares,
      });

      const farm = Farm.create({
        producerId: producer.id.toString(),
        name: input.name,
        state: input.state,
        arableArea: arableAreaInHectares,
        vegetationArea: vegetationAreaInHectares,
        totalArea: totalAreaInHectares,
      });

      const farmSaved = await this.farmRepository.save(farm);

      return FarmMapper.toDTO(farmSaved);
    } catch (error) {
      this.logger.error(error.message);

      if (error instanceof ProducerNotFoundException) throw error;

      if (error instanceof FarmConflictException) throw error;

      throw new BadRequestException(error.message);
    }
  }
}
