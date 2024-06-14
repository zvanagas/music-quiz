import { PropsWithChildren } from 'react';

export const CardHeader = ({ children }: PropsWithChildren) => {
  return <div className="p-5">{children}</div>;
};
