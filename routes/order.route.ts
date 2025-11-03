import { Router, Request, Response, NextFunction } from "express";
import {
  createOrder,
  searchOrders,
  findOrderById,
  updateOrderStatus,
  Order,
} from "../src/store/order.store";

const router: Router = Router();

// POST /orders - Create a new order
router.post("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    const { customerId, placementDate } = req.body;

    // Validate required fields
    if (!customerId || typeof customerId !== "string") {
      return res
        .status(400)
        .json({ error: "Bad request: customerId is required" });
    }

    // Create new order
    const order = createOrder(customerId, placementDate);

    // 201 Created
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
});

// GET /orders - Search orders by customer and date range
router.get("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    const { customerId, from, to } = req.query;

    // Validate required customerId
    if (!customerId || typeof customerId !== "string") {
      return res
        .status(400)
        .json({ error: "Bad request: customerId is required" });
    }

    const filteredOrders = searchOrders(
      customerId,
      typeof from === "string" ? from : undefined,
      typeof to === "string" ? to : undefined
    );

    res.status(200).json(filteredOrders);
  } catch (error) {
    next(error);
  }
});

// PATCH /orders/:orderId/status - Update order status
router.patch(
  "/:orderId/status",
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;

      // Validate status - 400 Bad Request: invalid request data
      if (!status || !["PLACED", "SHIPPED", "CANCELLED"].includes(status)) {
        return res.status(400).json({
          error: "Bad request: status must be PLACED, SHIPPED or CANCELLED",
        });
      }

      // Update order status
      const updatedOrder = updateOrderStatus(
        orderId,
        status as Order["status"]
      );

      if (!updatedOrder) {
        return res.status(400).json({ error: "Order not found" });
      }

      res.status(200).json(updatedOrder);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
