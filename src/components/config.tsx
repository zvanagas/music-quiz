import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Input,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

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
        <Heading size="md">Config</Heading>
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
