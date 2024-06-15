import { Flex } from '@chakra-ui/react';
import { Avatar } from './avatar';
import { rotation } from '@/animations/rotation';

const colors = ['yellow.600', 'orange.600', 'green.600', 'blue.600'];

type PlayerBoxProps = {
  name: string;
};

export const PlayerBox = ({ name }: PlayerBoxProps) => {
  return (
    <Flex
      bgColor={colors[0]}
      boxSize="36"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      borderRadius="20"
      fontSize="l"
      m={4}
      gap={2}
      animation={`${rotation} infinite 3s`}
    >
      <Avatar name={name} />
      <p>{name}</p>
    </Flex>
  );
};
