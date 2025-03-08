'use client';

import { useState, useEffect } from 'react';
import { ClockIcon } from '@heroicons/react/24/outline';

interface TimerProps {
  timeLeft: number;
  onComplete: () => void;
  className?: string;
}

export function Timer({ timeLeft: initialTime, onComplete, className = '' }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    setTimeLeft(initialTime);
  }, [initialTime]);

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onComplete]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <ClockIcon className="w-5 h-5 text-gray-500" />
      <span>{formatTime(timeLeft)}</span>
    </div>
  );
} 