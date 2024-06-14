import { PropsWithChildren } from 'react';

export const Card = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col break-words rounded bg-slate-800 shadow">
      {children}
    </div>
  );
};
