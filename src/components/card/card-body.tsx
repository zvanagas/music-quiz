import { PropsWithChildren } from 'react';

export const CardBody = ({ children }: PropsWithChildren) => {
  return <div className="flex-1 p-5">{children}</div>;
};
