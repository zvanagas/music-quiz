import { rmSync, mkdirSync, cp } from 'fs';

const dir = 'dist/';

rmSync(dir, { recursive: true, force: true });
mkdirSync(dir);
cp('.next/standalone', dir, { recursive: true }, (err) => console.log(err));
cp('.next/static', dir + '.next/static', { recursive: true }, (err) => console.log(err));
cp('public', dir + 'public', { recursive: true }, (err) => console.log(err));
cp('package.json', dir + 'package.json', undefined, (err) => console.log(err));