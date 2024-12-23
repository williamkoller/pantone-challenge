import { Injectable } from '@nestjs/common';
import { FarmRepository } from '../../../application/interfaces/farm/FarmRepository';
import { Farm } from '../../../domain/farm/Farm';
import { FarmMapper } from '../../../application/mappers/FarmMapper';
import { InjectModel } from '@nestjs/sequelize';
import { FarmModel } from '../../database/models/FarmModel';
import { ProducerModel } from '../../database/models/ProducerModel';

@Injectable()
export class FarmRepositoryImplementation implements FarmRepository {
  constructor(
    @InjectModel(FarmModel)
    private readonly farmModel: typeof FarmModel,
  ) {}
  async save(farm: Farm): Promise<Farm> {
    const farmPersistence = await this.farmModel.create(
      FarmMapper.toPersistence(farm),
    );
    return FarmMapper.toDomain(farmPersistence);
  }

  async findById(farmId: string): Promise<Farm | null> {
    const farm = await this.farmModel.findByPk(farmId, {
      include: [
        {
          association: FarmModel.associations.producer,
        },
      ],
    });

    if (!farm) return null;

    return FarmMapper.toDomain(farm);
  }

  async update(farm: Farm): Promise<Farm> {
    const farmPersistence = FarmMapper.toPersistence(farm);
    await this.farmModel.update(farmPersistence, {
      where: { id: farmPersistence.id },
    });

    const farmFindOne = await this.farmModel.findOne({
      where: {
        id: farmPersistence.id,
      },
    });

    return FarmMapper.toDomain(farmFindOne);
  }

  async remove(farmId: string): Promise<void> {
    await this.farmModel.destroy({
      where: {
        id: farmId,
      },
    });
  }

  async findAll(): Promise<Farm[]> {
    const farms = await this.farmModel.findAll({
      order: [['name', 'ASC']],
      include: [
        {
          association: this.farmModel.associations.producer,
          include: [
            {
              association: ProducerModel.associations.farms,
            },
          ],
        },
      ],
    });

    return farms.map(FarmMapper.toDomain);
  }

  async findByProducerId(producerId: string): Promise<Farm[]> {
    const farms = await this.farmModel.findAll({
      where: {
        producerId,
      },
    });

    return farms.map(FarmMapper.toDomain);
  }
}
