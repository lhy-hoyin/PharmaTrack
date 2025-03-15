export default interface Product {
  id: number;
  product_id: number;

  name: string;
  manufacturer: string;
  supplier: string;

  batch_id: number;
  quantity: number;
  expiry: number;

  // cost: number;
}
