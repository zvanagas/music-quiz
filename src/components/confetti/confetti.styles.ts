import { rain } from '@/animations/rain';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const helpers = createMultiStyleConfigHelpers(['confetti', 'confettiPiece']);

export const ConfettiStyles = helpers.defineMultiStyleConfig({
  baseStyle: {
    confetti: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      width: 'full',
      height: 'full',
      zIndex: 1000,
      pointerEvents: 'none',
    },
    confettiPiece: {
      position: 'absolute',
      width: '10px',
      height: '30px',
      background: 'green.600',
      top: 0,
      opacity: 0,
      '&:nth-of-type(1)': {
        left: '7%',
        transform: 'rotate(-40deg)',
        animation: `${rain} 1000ms infinite ease-out`,
        animationDelay: '182ms',
        animationDuration: '2116ms',
      },
      '&:nth-of-type(2)': {
        left: '14%',
        transform: 'rotate(4deg)',
        animation: `${rain} 1000ms infinite ease-out`,
        animationDelay: '161ms',
        animationDuration: '2076ms',
      },
      '&:nth-of-type(3)': {
        left: '21%',
        transform: 'rotate(-51deg)',
        animation: `${rain} 1000ms infinite ease-out`,
        animationDelay: '481ms',
        animationDuration: '2103ms',
      },
      '&:nth-of-type(4)': {
        left: '28%',
        transform: 'rotate(61deg)',
        animation: `${rain} 1000ms infinite ease-out`,
        animationDelay: '334ms',
        animationDuration: '1708ms',
      },
      '&:nth-of-type(5)': {
        left: '35%',
        transform: 'rotate(-52deg)',
        animation: `${rain} 1000ms infinite ease-out`,
        animationDelay: '302ms',
        animationDuration: '1776ms',
      },
      '&:nth-of-type(6)': {
        left: '42%',
        transform: 'rotate(38deg)',
        animation: `${rain} 1000ms infinite ease-out`,
        animationDelay: '180ms',
        animationDuration: '2168ms',
      },
      '&:nth-of-type(7)': {
        left: '49%',
        transform: 'rotate(11deg)',
        animation: `${rain} 1000ms infinite ease-out`,
        animationDelay: '395ms',
        animationDuration: '2200ms',
      },
      '&:nth-of-type(8)': {
        left: '56%',
        transform: 'rotate(49deg)',
        animation: `${rain} 1000ms infinite ease-out`,
        animationDelay: '14ms',
        animationDuration: '1887ms',
      },
      '&:nth-of-type(9)': {
        left: '63%',
        transform: 'rotate(-72deg)',
        animation: `${rain} 1000ms infinite ease-out`,
        animationDelay: '149ms',
        animationDuration: '1805ms',
      },
      '&:nth-of-type(10)': {
        left: '70%',
        transform: 'rotate(10deg)',
        animation: `${rain} 1000ms infinite ease-out`,
        animationDelay: '351ms',
        animationDuration: '2059ms',
      },
      '&:nth-of-type(11)': {
        left: '77%',
        transform: 'rotate(4deg)',
        animation: `${rain} 1000ms infinite ease-out`,
        animationDelay: '307ms',
        animationDuration: '2132ms',
      },
      '&:nth-of-type(12)': {
        left: '84%',
        transform: 'rotate(42deg)',
        animation: `${rain} 1000ms infinite ease-out`,
        animationDelay: '464ms',
        animationDuration: '1776ms',
      },
      '&:nth-of-type(13)': {
        left: '91%',
        transform: 'rotate(-72deg)',
        animation: `${rain} 1000ms infinite ease-out`,
        animationDelay: '429ms',
        animationDuration: '1818ms',
      },
      '&:nth-of-type(odd)': {
        background: 'blue.600',
      },
      '&:nth-of-type(even)': {
        zIndex: 1,
      },
      '&:nth-of-type(4n)': {
        width: '5px',
        height: '12px',
        animationDuration: '2000ms',
      },
      '&:nth-of-type(3n)': {
        width: '3px',
        height: '10px',
        animationDuration: '2500ms',
        animationDelay: '1000ms',
      },
      '&:nth-of-type(4n-7)': {
        background: 'red.600',
      },
    },
  },
});
