import { Box, Button, Input } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Card } from './card/card';
import { CardHeader } from './card/card-header';
import { CardBody } from './card/card-body';
import { Heading } from './heading';

type ConfigProps = {
  stages: number;
  onStagesUpdate: (stages: number) => void;
};

export const Config = ({ stages, onStagesUpdate }: ConfigProps) => {
  const [stagesValue, setStagesValue] = useState(stages);

  useEffect(() => {
    setStagesValue(stages);
  }, [stages]);

  return (
    <Card>
      <CardHeader>
        <Heading>Config</Heading>
      </CardHeader>
      <CardBody>
        <Box>Stages</Box>
        <Input
          value={stagesValue}
          onChange={({ target }) => setStagesValue(Number(target.value))}
        />
        <Button
          isDisabled={stages === stagesValue}
          onClick={() => onStagesUpdate(stagesValue)}
        >
          Save
        </Button>
      </CardBody>
    </Card>
  );
};
