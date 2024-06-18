import { Input } from '@chakra-ui/react';
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
        <div>Stages</div>
        <Input
          value={stagesValue}
          onChange={({ target }) => setStagesValue(Number(target.value))}
        />
        <button
          className="py-2 px-4 bg-slate-600 rounded disabled:opacity-60 disabled:cursor-not-allowed hover:bg-slate-500 transition-colors"
          disabled={stages === stagesValue}
          onClick={() => onStagesUpdate(stagesValue)}
        >
          Save
        </button>
      </CardBody>
    </Card>
  );
};
