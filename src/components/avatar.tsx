import { Flex } from '@chakra-ui/react';
import { getColorName } from '@/utils';

interface AvatarProps {
  name: string;
}

const Avatar: React.FC<AvatarProps> = ({ name }) => {
  const upperCasedName = name.toUpperCase();
  const code = upperCasedName.charCodeAt(0) + upperCasedName.charCodeAt(1);

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      boxSize={12}
      borderRadius={50}
      bgColor={getColorName(code)}
      mx={2}
    >
      {upperCasedName[0]}
    </Flex>
  );
};

export default Avatar;
