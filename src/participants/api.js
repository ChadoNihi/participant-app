import {
  genParticipants
} from './helpers';

const DELAY_MS = 1000;

export const fetchParticipants = () => {
  // simulate network response
  return new Promise((resolve) => setTimeout(resolve, DELAY_MS))
    .then(() => new Response(JSON.stringify(genParticipants())));
}