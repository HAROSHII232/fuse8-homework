import { useRef } from 'react';

export const useSmoothScroll = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);

  const scrollToElement = () => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return { ref, scrollToElement };
};
