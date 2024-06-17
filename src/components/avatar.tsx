import { getColorName } from '@/utils';

type AvatarProps = {
  name: string;
};

export const Avatar = ({ name }: AvatarProps) => {
  const upperCasedName = name.toUpperCase();
  const code = upperCasedName.charCodeAt(0) + upperCasedName.charCodeAt(1);

  return (
    <div
      className={`flex items-center justify-center w-12 h-12 mx-2 rounded-full ${getColorName(
        code
      )}`}
    >
      {upperCasedName[0]}
    </div>
  );
};
