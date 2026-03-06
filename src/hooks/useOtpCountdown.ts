"use client";

import { addMinutes, intervalToDuration, isBefore } from "date-fns";
import { useCallback, useEffect, useRef, useState } from "react";

type CountdownResult = {
  minutes: string;
  seconds: string;
  isExpired: boolean;
  restart: () => void;
};

export const useOtpCountdown = (durationMinutes = 5): CountdownResult => {
  const [endDate, setEndDate] = useState<Date>(() =>
    addMinutes(new Date(), durationMinutes),
  );
  const [minutes, setMinutes] = useState("05");
  const [seconds, setSeconds] = useState("00");
  const [isExpired, setIsExpired] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      const now = new Date();

      if (isBefore(endDate, now)) {
        setIsExpired(true);
        setMinutes("00");
        setSeconds("00");

        if (timerRef.current) clearInterval(timerRef.current);
        return;
      }

      const { minutes: m = 0, seconds: s = 0 } = intervalToDuration({
        start: now,
        end: endDate,
      });

      setMinutes(String(m).padStart(2, "0"));
      setSeconds(String(s).padStart(2, "0"));
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [endDate]);

  const restart = useCallback(() => {
    setIsExpired(false);
    setEndDate(addMinutes(new Date(), durationMinutes));
  }, [durationMinutes]);

  return { minutes, seconds, isExpired, restart };
};
