import { keyframes } from '@chakra-ui/react';

const rotation = keyframes`
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

export default rotation;
