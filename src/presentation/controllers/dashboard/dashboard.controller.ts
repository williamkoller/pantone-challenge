import { Controller, Get, Inject, Render } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IDashboardUseCase } from '@app/application/usecases/dashboard/idashboard-usecase';

@ApiTags('dashboard')
@Controller('dashboard')
export class DashBoardController {
  constructor(
    @Inject(IDashboardUseCase)
    private readonly dashboardUseCase: IDashboardUseCase,
  ) {}

  @Get()
  @Render('index')
  async getDashboard() {
    const data = await this.dashboardUseCase.execute();

    return { data };
  }
}
