import { keyframes } from '@chakra-ui/react';

const rain = keyframes`
from {
  opacity: 0;
}
20% {
  opacity: 1;
}
to {
  transform: translateY(100vh);
}
`;

export default rain;
