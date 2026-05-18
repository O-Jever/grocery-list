import { type RefObject, useEffect } from 'react';

type UseOutsidePointerCloseParams = {
  enabled: boolean;
  ref: RefObject<HTMLElement | null>;
  onClose: () => void;
};

export function useOutsidePointerClose({
  enabled,
  ref,
  onClose,
}: UseOutsidePointerCloseParams): void {
  useEffect(() => {
    if (!enabled) {
      return;
    }
    function handlePointerDown(event: PointerEvent) {
      const el = ref.current;
      if (!el) return;
      if (!el.contains(event.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('pointerdown', handlePointerDown, true);
    return () => document.removeEventListener('pointerdown', handlePointerDown, true);
  }, [enabled, ref, onClose]);
}
