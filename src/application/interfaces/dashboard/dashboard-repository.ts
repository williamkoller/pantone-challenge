export interface DashboardRepository {
  getDashboard(): Promise<any>;
}

export const DashboardRepository = Symbol('DashboardRepository');
