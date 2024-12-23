import { InjectModel } from '@nestjs/sequelize';
import { ProducerModel } from '../../database/models/ProducerModel';
import { ProducerMapper } from '../../../application/mappers/ProducerMapper';
import { Injectable } from '@nestjs/common';
import { ProducerRepository } from '../../../application/interfaces/producer/ProducerRepository';
import { Producer } from '../../../domain/producer/Producer';
import { FarmModel } from '../../database/models/FarmModel';

@Injectable()
export class ProducerRepositoryImplementation implements ProducerRepository {
  constructor(
    @InjectModel(ProducerModel)
    private producerModel: typeof ProducerModel,
  ) {}

  async save(producer: Producer): Promise<Producer> {
    const producerPersistence = await this.producerModel.create(
      ProducerMapper.toPersistence(producer),
    );

    return ProducerMapper.toDomain(producerPersistence);
  }

  async findById(producerId: string): Promise<Producer | null> {
    const producer = await this.producerModel.findByPk(producerId);

    if (!producer) return null;

    return ProducerMapper.toDomain(producer);
  }

  async update(producer: Producer): Promise<Producer> {
    const producerPersistence = ProducerMapper.toPersistence(producer);
    await this.producerModel.update(producerPersistence, {
      where: { id: producerPersistence.id },
    });

    const producerFindOne = await this.producerModel.findOne({
      where: {
        id: producerPersistence.id,
      },
    });

    return ProducerMapper.toDomain(producerFindOne);
  }

  async remove(producerId: string): Promise<void> {
    await this.producerModel.destroy({
      where: {
        id: producerId,
      },
    });
  }

  async findAll(): Promise<Producer[]> {
    const producers = await this.producerModel.findAll({
      order: [['name', 'ASC']],
      include: [
        {
          association: this.producerModel.associations.farms,
          include: [
            {
              association: FarmModel.associations.producer,
              include: [
                {
                  association: this.producerModel.associations.farms,
                },
              ],
            },
          ],
        },
      ],
    });
    return producers.map(ProducerMapper.toDomain);
  }

  async findByDocument(document: string): Promise<Producer | null> {
    const producer = await this.producerModel.findOne({
      where: {
        document,
      },
    });

    if (!producer) return null;

    return ProducerMapper.toDomain(producer);
  }
}
