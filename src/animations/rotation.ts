import { keyframes } from '@chakra-ui/react';

export const rotation = keyframes`
0% {
  transform: rotate(0);
}
20% {
  transform: rotate(4deg)
}
80% {
  transform: rotate(-4deg)
}
100% {
  transform: rotate(0);
}
`;
