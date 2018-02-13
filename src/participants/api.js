import {genParticipants} from './helpers';

export const fetchParticipants = () => {
  // TODO: simulate delay
  return new Response(JSON.stringify(genParticipants()));
}
