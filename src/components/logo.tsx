import { rotation } from '@/animations/rotation';
import { Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const colors = ['yellow.600', 'orange.600', 'green.600', 'blue.600'];

export const Logo = () => {
  const [color, setColor] = useState<string>(colors[0]);

  useEffect(() => {
    const interval = setInterval(
      () => setColor(colors[Math.floor(Math.random() * 4)]),
      2000
    );

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Flex
      bgColor={color}
      boxSize="40"
      alignItems="center"
      justifyContent="center"
      borderRadius="20"
      fontSize="xl"
      animation={`${rotation} infinite 3s`}
      transition="background-color .8s ease"
    >
      MuziQ
    </Flex>
  );
};
