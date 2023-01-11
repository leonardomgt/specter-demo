import { useCallback, useEffect, useRef } from "react";

export function useIntersectionObserver<T extends Element>(handleIntersection: () => void) {
  const observerRef = useRef<T>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting) {
        handleIntersection();
      }
    },
    [handleIntersection]
  );

  useEffect(() => {
    const element = observerRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(handleObserver, { threshold: 0 });
    observer.observe(element);

    return () => observer.unobserve(element);
  }, [handleObserver]);

  return observerRef;
}
