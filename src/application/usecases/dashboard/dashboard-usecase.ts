import { Inject, Injectable } from '@nestjs/common';
import { IDashboardUseCase } from './idashboard-usecase';
import { DashboardRepository } from '../../interfaces/dashboard/dashboard-repository';
import { DashboardMapper } from '../../mappers/dashboard/dashboard-mapper';

@Injectable()
export class DashboardUseCase implements IDashboardUseCase {
  constructor(
    @Inject(DashboardRepository)
    private readonly dashboardRepository: DashboardRepository,
  ) {}

  async execute(): Promise<any> {
    const data = await this.dashboardRepository.getDashboard();

    return DashboardMapper.toDTO(data);
  }
}
