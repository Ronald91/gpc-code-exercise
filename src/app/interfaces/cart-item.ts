export interface Item {
  quantity: number;
  description: string;
  price: number;
  exemptStatus: boolean;
  importStatus: boolean;
  taxes?: number;
}
