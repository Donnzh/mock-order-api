// In-memory storage for orders
export interface Order {
  orderId: string;
  customerId: string;
  placementDate: string;
  status: "PLACED" | "SHIPPED" | "CANCELLED";
}

const orders: Order[] = [];
let orderIdCounter = 1;

// Helper function to generate order ID
const generateOrderId = (): string => {
  return `order-${String(orderIdCounter++)}`;
};

// Initialize with sample data for testing
const initializeSampleData = () => {
  const now = new Date();
  const sampleOrders: Order[] = [
    {
      orderId: generateOrderId(),
      customerId: "CUST-001",
      placementDate: new Date(
        now.getTime() - 5 * 24 * 60 * 60 * 1000
      ).toISOString(), // 5 days ago
      status: "SHIPPED",
    },
    {
      orderId: generateOrderId(),
      customerId: "CUST-001",
      placementDate: new Date(
        now.getTime() - 2 * 24 * 60 * 60 * 1000
      ).toISOString(), // 2 days ago
      status: "PLACED",
    },
    {
      orderId: generateOrderId(),
      customerId: "CUST-002",
      placementDate: new Date(
        now.getTime() - 10 * 24 * 60 * 60 * 1000
      ).toISOString(), // 10 days ago
      status: "CANCELLED",
    },
    {
      orderId: generateOrderId(),
      customerId: "CUST-002",
      placementDate: new Date(
        now.getTime() - 1 * 24 * 60 * 60 * 1000
      ).toISOString(), // 1 day ago
      status: "PLACED",
    },
    {
      orderId: generateOrderId(),
      customerId: "CUST-003",
      placementDate: now.toISOString(), // today
      status: "PLACED",
    },
  ];

  orders.push(...sampleOrders);
};

// Initialize sample data on module load
initializeSampleData();

// Store operations
export const createOrder = (
  customerId: string,
  placementDate?: string
): Order => {
  const order: Order = {
    orderId: generateOrderId(),
    customerId,
    placementDate: placementDate || new Date().toISOString(),
    status: "PLACED",
  };

  orders.push(order);
  return order;
};

export const searchOrders = (
  customerId: string,
  from?: string,
  to?: string
): Order[] => {
  let filteredOrders = [...orders];

  // Filter by customerId (required)
  filteredOrders = filteredOrders.filter(
    (order) => order.customerId === customerId
  );

  // Filter by date range
  if (from) {
    const fromDate = new Date(from);
    filteredOrders = filteredOrders.filter(
      (order) => new Date(order.placementDate) >= fromDate
    );
  }

  if (to) {
    const toDate = new Date(to);
    // Add one day
    toDate.setDate(toDate.getDate() + 1);
    filteredOrders = filteredOrders.filter(
      (order) => new Date(order.placementDate) < toDate
    );
  }

  return filteredOrders;
};

export const findOrderById = (orderId: string): Order | undefined => {
  return orders.find((order) => order.orderId === orderId);
};

export const updateOrderStatus = (
  orderId: string,
  status: Order["status"]
): Order | null => {
  const orderIndex = orders.findIndex((order) => order.orderId === orderId);

  if (orderIndex === -1) {
    return null;
  }

  orders[orderIndex].status = status;
  return orders[orderIndex];
};
