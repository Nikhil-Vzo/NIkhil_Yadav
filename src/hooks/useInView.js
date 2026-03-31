import { useEffect, useRef, useState } from 'react';

/**
 * Returns [ref, isVisible].
 * Triggers once when the element enters the viewport.
 */
const useInView = (options = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      // Toggle visibility continuously both ways
      setIsVisible(entry.isIntersecting);
    }, { threshold: 0.15, ...options });

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [ref, isVisible];
};

export default useInView;
