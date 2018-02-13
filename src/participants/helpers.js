const INIT_NUM_PARTICIPANTS = 20;
const MAX_PHONE_LEN = 10;

const FIRST_NAMES = ['Xor', 'Dom', 'Cli', 'Api', 'Haskell', 'Lisp', 'Nan', 'Ada', 'Soya', 'Monad', 'Molly', 'Node', 'Stack'. 'Try'];
const LAST_NAMES = ['Curry', 'Tomasik', 'Carmack', 'Trie', 'Script', 'Nullov', 'Smart', 'Mindful', 'Utilitronium', 'Trace', 'Cancer', 'Dijkstra'];
const TLDs = ['org', 'fi', 'com', 'nz', 'ua'];

const getRandElem = (seq) =>
  seq[Math.floor(Math.random()*seq.length)];

const genUniq = (genCb) => {
  let cand = genCb();

  let attemptCnt = 0;
  // ignore potential duplicates
  while (genUniq[cand]) {
    cand = genCb();

    if (++attemptCnt > 100) throw('Cannot find unique value.');
  }

  // memoize occurrence
  genUniq[cand] = true;

  return cand;
}

const genEmail = () =>
  `${Math.random().toString(36).substring(3)}@${Math.random().toString(36).substring(3)}.${getRandElem(TLDs)}`;

const genPhoneNum = () =>
  `0${Math.random().toString().substring(2, MAX_PHONE_LEN+1)}`;

// ---------------------- EXPORTS ----------------------

export const genParticipants = (n = INIT_NUM_PARTICIPANTS) => {
  try {
    const participants = new Array(n);
  } catch (e) {
    return [];
  }

  for (let i = 0; i < n; ++i) {
    participants[i] = {
      id: i.toString(),
      name: `${getRandElem(FIRST_NAMES)} ${getRandElem(LAST_NAMES)}`,
      email: genUniq(genEmail),
      phone: genUniq(genPhoneNum)
    }
  }

  return participants;
}
