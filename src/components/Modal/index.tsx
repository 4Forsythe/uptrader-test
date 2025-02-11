import React from 'react';
import { X } from 'lucide-react';

import { useModal } from '../../hooks/use-modal';

import classes from './Modal.module.scss';

interface Props {
  children: React.ReactNode;
}

export const Modal = ({ children }: Props) => {
  const { isOpen, closeModal } = useModal();

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = 'auto';
      };
    }
  }, [isOpen]);

  return (
    <>
      <div className={classes.container}>
        <div className={classes.inner}>
          {children}
          <button className={classes.close} onClick={closeModal}>
            <X size={20} />
          </button>
        </div>
      </div>
      <div className={classes.overlay} onClick={closeModal} />
    </>
  );
};
