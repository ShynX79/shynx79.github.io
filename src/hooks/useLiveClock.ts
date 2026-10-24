import { useEffect, useState } from 'react';

const fmt = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Jakarta',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

/** Live HH:MM:SS clock for Asia/Jakarta, ticking every second. */
export function useLiveClock(): string {
  const [time, setTime] = useState(() => fmt.format(new Date()));
  useEffect(() => {
    const id = window.setInterval(() => setTime(fmt.format(new Date())), 1000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}