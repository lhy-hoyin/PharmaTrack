export default interface PurchaseOrder {
  id: number;
  timestamp: string;
  items: string;

  bill_to: string;
  deliver_to: string;

  requester: number;
  approver: number;
  status: string;
}

export const PurchaseOrderStatus = [
  "Created",
  "Approved",
  "Ordered",
  "Delivered",
  "Completed"
]
