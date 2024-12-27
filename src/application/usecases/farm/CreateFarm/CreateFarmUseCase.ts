import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ICreateFarmUseCase, Input, Output } from './ICreateFarmUseCase';
import { ProducerRepository } from '../../../interfaces/producer/ProducerRepository';
import { ProducerNotFoundException } from '../../../exceptions/producer/ProducerNotFoundException';
import { Farm } from '../../../../domain/farm/Farm';
import { FarmRepository } from '../../../interfaces/farm/FarmRepository';
import { FarmMapper } from '../../../mappers/FarmMapper';
import { Transactional } from 'sequelize-transactional-decorator';
import { FarmConflictException } from '../../../exceptions/farm/FarmConflictException';

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
