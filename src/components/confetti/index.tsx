import { Box, useMultiStyleConfig } from '@chakra-ui/react';

const Confetti = () => {
  const { confetti, confettiPiece } = useMultiStyleConfig('ConfettiStyles');
  return (
    <Box sx={confetti}>
      <Box sx={confettiPiece}></Box>
      <Box sx={confettiPiece}></Box>
      <Box sx={confettiPiece}></Box>
      <Box sx={confettiPiece}></Box>
      <Box sx={confettiPiece}></Box>
      <Box sx={confettiPiece}></Box>
      <Box sx={confettiPiece}></Box>
      <Box sx={confettiPiece}></Box>
      <Box sx={confettiPiece}></Box>
      <Box sx={confettiPiece}></Box>
      <Box sx={confettiPiece}></Box>
      <Box sx={confettiPiece}></Box>
      <Box sx={confettiPiece}></Box>
    </Box>
  );
};

export default Confetti;
