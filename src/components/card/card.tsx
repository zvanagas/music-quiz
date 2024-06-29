import { PropsWithChildren } from 'react';

export const Card = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col flex-1 break-words rounded bg-neutral-900 shadow">
      {children}
    </div>
  );
};
