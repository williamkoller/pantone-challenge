export interface DashboardData {
  totalFarms: number;
  totalHectares: number;
  farmsByState: { state: string; count: number }[];
  farmsByCrop: { [key: string]: number };
  farmsByLandUse: {
    landUse: string;
    totalArableArea: number;
    totalVegetationArea: number;
  }[];
}

export class DashboardMapper {
  static toDTO(data: DashboardData) {
    return {
      totalFarms: data.totalFarms,
      totalHectares: data.totalHectares,
      farmsByState: data.farmsByState,
      farmsByCrop: data.farmsByCrop,
      farmsByLandUse: data.farmsByLandUse,
    };
  }
}

export type DashboardDTO = ReturnType<typeof DashboardMapper.toDTO>;
