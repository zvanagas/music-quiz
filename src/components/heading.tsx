import { PropsWithChildren } from 'react';

export const Heading = ({ children }: PropsWithChildren) => {
  return <h2 className="font-bold text-xl">{children}</h2>;
};
