import { useEffect, useState } from "react";

export function useTimedProgress(createdAt: Date, duration: number = 15000) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const refreshRate = 10; // in milliseconds

  useEffect(() => {
    const start = new Date(createdAt).getTime();
    const end = start + duration;

    const interval = setInterval(() => {
      const now = Date.now();
      const fraction = Math.min((now - start) / (end - start), 1);
      setProgress(fraction);

      if (fraction >= 1) {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, refreshRate);

    return () => clearInterval(interval);
  }, [createdAt, duration]);

  return { progress, isComplete };
}