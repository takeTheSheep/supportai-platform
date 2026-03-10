import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const memoryBucket = new Map<string, { count: number; windowStart: number }>();

const redisEnabled =
  process.env.REDIS_URL && process.env.REDIS_TOKEN && process.env.REDIS_URL.length > 0;

const redis = redisEnabled
  ? new Redis({ url: process.env.REDIS_URL!, token: process.env.REDIS_TOKEN! })
  : null;

const limiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(20, "1 m"),
      analytics: true,
      prefix: "supportai"
    })
  : null;

export const rateLimit = async (key: string, limit = 20, windowMs = 60_000) => {
  if (limiter) {
    const result = await limiter.limit(key);
    return {
      allowed: result.success,
      remaining: result.remaining,
      resetAt: new Date(result.reset)
    };
  }

  const now = Date.now();
  const current = memoryBucket.get(key);
  if (!current || now - current.windowStart > windowMs) {
    memoryBucket.set(key, { count: 1, windowStart: now });
    return {
      allowed: true,
      remaining: limit - 1,
      resetAt: new Date(now + windowMs)
    };
  }

  if (current.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: new Date(current.windowStart + windowMs)
    };
  }

  current.count += 1;
  memoryBucket.set(key, current);

  return {
    allowed: true,
    remaining: Math.max(0, limit - current.count),
    resetAt: new Date(current.windowStart + windowMs)
  };
};

