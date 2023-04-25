import { Flex, Text } from '@chakra-ui/react';
import Avatar from './avatar';
import rotation from '@/animations/rotation';

const colors = ['yellow.600', 'orange.600', 'green.600', 'blue.600'];

interface PlayerBoxProps {
  name: string;
}

const PlayerBox: React.FC<PlayerBoxProps> = ({ name }) => {
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
      animation={`${rotation} infinite 3s`}
    >
      <Avatar name={name} />
      <Text mt={2}>{name}</Text>
    </Flex>
  );
};

export default PlayerBox;
