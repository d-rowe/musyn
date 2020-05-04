const PATH = 'assets/audio/samples/';
const EXTENSION = 'ogg';
const PITCHES = [
  'A3', 'A4', 'A5', 'A6', 'A7',
  'C1', 'C2', 'C3', 'C4', 'C5', 'C6',
];

// Map pitch names to sample location
const samples = {};
PITCHES.forEach((pitch) => {
  samples[pitch] = `${PATH}${pitch}.${EXTENSION}`;
});

export default samples;
