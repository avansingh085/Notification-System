import Redis from "ioredis";
import dotenv from 'dotenv';
dotenv.config();
const REDIS_URL =process.env.REDIS_URL;
const options = {
  maxRetriesPerRequest: null, 
  enableReadyCheck: false,
  reconnectOnError(err) {
    
    const targetErrors = ["ECONNRESET", "ETIMEDOUT", "EPIPE"];
    if (targetErrors.includes(err.code)) return true;
    return false;
  },
};

export const redis = new Redis(REDIS_URL, options);
redis.on("error", (err) => console.error("Redis error:", err));

export const pub = new Redis(REDIS_URL, options);
pub.on("error", (err) => console.error("Redis pub error:", err));

export const sub = new Redis(REDIS_URL, options);
sub.on("error", (err) => console.error("Redis sub error:", err));

