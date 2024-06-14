import { Toast } from '@/components/toast';
import { PropsWithChildren, createContext, useContext, useState } from 'react';

const ToastContext = createContext<{
  show: (
    message: string,
    type?: 'success' | 'error',
    shownFor?: number
  ) => void;
}>({ show: () => ({}) });

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const [text, setText] = useState('');
  const [type, setType] = useState<'success' | 'error' | undefined>(undefined);
  const show = (
    message: string,
    type?: 'success' | 'error',
    shownFor = 4000
  ) => {
    setText(message);
    setType(type);

    setTimeout(() => setText(''), shownFor);
  };

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <Toast text={text} type={type} />
    </ToastContext.Provider>
  );
};
