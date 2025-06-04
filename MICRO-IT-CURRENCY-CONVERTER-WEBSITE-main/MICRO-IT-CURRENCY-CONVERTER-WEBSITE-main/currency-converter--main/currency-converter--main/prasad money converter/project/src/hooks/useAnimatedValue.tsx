import { useState, useEffect, useRef } from 'react';

export const useAnimatedValue = (initialValue = 0, duration = 500) => {
  const [animatedValue, setAnimatedValue] = useState(initialValue);
  const targetValueRef = useRef(initialValue);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  
  const animate = (timestamp: number) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }
    
    const elapsed = timestamp - startTimeRef.current;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function - easeOutExpo
    const easing = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    
    setAnimatedValue(
      initialValue + (targetValueRef.current - initialValue) * easing
    );
    
    if (progress < 1) {
      animationFrameRef.current = requestAnimationFrame(animate);
    } else {
      startTimeRef.current = null;
    }
  };
  
  const startAnimation = (targetValue: number) => {
    // Cancel any ongoing animation
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    targetValueRef.current = targetValue;
    animationFrameRef.current = requestAnimationFrame(animate);
  };
  
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);
  
  return { animatedValue, startAnimation };
};