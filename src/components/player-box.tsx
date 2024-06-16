import { Avatar } from './avatar';

const colors = [
  'bg-yellow-600',
  'bg-orange-600',
  'bg-green-600',
  'bg-blue-600',
];

type PlayerBoxProps = {
  name: string;
};

export const PlayerBox = ({ name }: PlayerBoxProps) => {
  return (
    <div
      className={`w-36 h-36 flex flex-col items-center justify-center rounded-3xl m-4 gap-2 ${colors[0]}`}
    >
      <Avatar name={name} />
      <p>{name}</p>
    </div>
  );
};
