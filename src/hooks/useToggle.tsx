import { useCallback, useState } from 'react';

export const useToggle = (isOpen = false) => {
  const [isOpenModal, toggle] = useState(isOpen);

  const open = useCallback(() => {
    toggle(true);
  }, []);

  const close = useCallback(() => {
    toggle(false);
  }, []);

  return { isOpen: isOpenModal, open, close };
};
