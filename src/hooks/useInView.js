import { useEffect, useRef, useState } from "react";

export function useInView(options = { threshold: 0.2, rootMargin: "0px" }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), options);
    obs.observe(el);
    return () => obs.disconnect();
  }, [options.threshold, options.rootMargin]);
  return { ref, inView };
}


