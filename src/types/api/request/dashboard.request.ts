export type ChartPeriod = 'week' | 'month' | 'year';

export interface GetChartDataParams {
    type?: ChartPeriod;
    date?: string;
}
