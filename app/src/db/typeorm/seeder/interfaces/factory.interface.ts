export interface FactoryInterface<T> {
  create(amount: number): T[];
}
