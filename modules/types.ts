export type FuelType = 'petrol' | 'diesel' | 'gas';
export type CarKind = 'passanger' | 'truck';
export type CarParams = [string, string, number, FuelType?];
export type ColumnParams = {
  type: FuelType
  count?: number
  speed?: number
}
export type CarElementParams = {
  kind: CarKind
  name: string
}
export type ColumnElementParams = {
  type: FuelType
  index: number
}
export interface ColumnType<T> {
  petrol?: T
  diesel?: T
  gas?: T
}

export const checkFuelType = (type: string) => ['petrol', 'diesel', 'gas'].includes(type);
