import { diffShifts } from './shift-sync.mjs';

let input = '';
process.stdin.setEncoding('utf8');
for await (const chunk of process.stdin) input += chunk;

const payload = JSON.parse(input);
const result = diffShifts(payload);
process.stdout.write(JSON.stringify(result, null, 2));
