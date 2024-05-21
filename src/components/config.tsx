import { Card, CardBody, CardHeader, Heading } from '@chakra-ui/react';

type ConfigProps = {
  stages: number;
};

export const Config = ({ stages }: ConfigProps) => {
  return (
    <Card>
      <CardHeader>
        <Heading size="md">Config</Heading>
      </CardHeader>
      <CardBody>Stages: {stages}</CardBody>
    </Card>
  );
};
