import { useEffect, useState } from 'react';
import { Card } from './card/card';
import { CardHeader } from './card/card-header';
import { Heading } from './heading';

type ConfigProps = {
  stages: number;
  onStagesUpdate: (stages: number) => void;
};

export const Config = ({ stages, onStagesUpdate }: ConfigProps) => {
  const [stagesValue, setStagesValue] = useState<number>(stages);

  useEffect(() => {
    setStagesValue(stages);
  }, [stages]);

  return (
    <Card>
      <CardHeader>
        <Heading>
          <p className="text-white">Config</p>
        </Heading>
      </CardHeader>
      <div className="flex flex-col items-start flex-1 p-5 gap-2">
        <div className="text-white">Stages</div>
        <input
          className="w-full h-10 rounded bg-transparent border text-white px-4"
          value={stagesValue}
          onChange={({ target }) => setStagesValue(Number(target.value))}
        />
        <button
          className="py-2 px-4 bg-slate-600 rounded disabled:opacity-60 disabled:cursor-not-allowed hover:bg-slate-500 transition-colors text-white"
          disabled={stages === stagesValue}
          onClick={() => onStagesUpdate(stagesValue)}
        >
          Save
        </button>
      </div>
    </Card>
  );
};
