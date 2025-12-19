import express from "express";
import { Notification } from "../db/notification.model.js";
import { redis, pub } from "../db/redis.js";

const router = express.Router();

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  const cacheKey = `notifications:${userId}`;

  const cached = await redis.get(cacheKey);
  console.log(cached);
  if (cached) {
    
    return res.json(JSON.parse(cached));
  }

  const notifications = await Notification.find({ userId })
    .sort({ time: -1 })
    .lean();

  await redis.setex(cacheKey, 120, JSON.stringify(notifications));

  res.json(notifications);
});

router.post("/", async (req, res) => {
  const { userId, message } = req.body;
   
  const notification = await Notification.create({ userId, message });

  console.log(notification);
  await redis.del(`notifications:${userId}`);

  await redis.lpush("recent_notifications", message);
  await redis.ltrim("recent_notifications", 0, 49);

  await pub.publish(
    "new_notification",
    JSON.stringify({ userId, message })
  );

  res.status(201).json(notification);
});



export default router;
