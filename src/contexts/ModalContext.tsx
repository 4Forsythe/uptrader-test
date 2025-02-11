import React from 'react';

import { Modal } from '../components';

interface ModalContextProps {
  isOpen: boolean;
  openModal: (context: React.ReactNode) => void;
  closeModal: () => void;
}

export const ModalContext = React.createContext<ModalContextProps>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

export const ModalContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [context, setContext] = React.useState<React.ReactNode>(null);

  const openModal = (component: React.ReactNode) => {
    setContext(component);
    setIsOpen(true);
  };

  const closeModal = () => {
    setContext(null);
    setIsOpen(false);
  };
  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {isOpen && <Modal>{context}</Modal>}
      {children}
    </ModalContext.Provider>
  );
};
