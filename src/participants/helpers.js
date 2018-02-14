const INIT_NUM_PARTICIPANTS = 20;
const MAX_PHONE_LEN = 10;

// Store RE objects for performance
const RE_EMAIL = /^([^\s@]+@[^\s@]+\.[^\s@]+){,600}$/g; // https://stackoverflow.com/a/9204568/4579279
const RE_PARTICIPANT_NAME = /^*{,200}$/g;
const RE_PHONE_NUM = /^*{,40}$/g;
const RE_REMOVE_FROM_PHONE_NUM = /\s+|[)(]/g;
const RE_WSPACE = /\s+/g;

const FIRST_NAMES = ['Xor', 'Dom', 'Cli', 'Api', 'Haskell', 'Lisp', 'Nan', 'Ada', 'Soya', 'Monad', 'Molly', 'Node', 'Stack', 'Try'];
const LAST_NAMES = ['Curry', 'Tomasik', 'Carmack', 'Trie', 'Script', 'Nullov', 'Smart', 'Mindful', 'Utilitronium', 'Trace', 'Cancer', 'Dijkstra'];
const TLDs = ['org', 'fi', 'com', 'nz', 'ua'];

const getRandElem = (seq) =>
  seq[Math.floor(Math.random() * seq.length)];

const genUniq = (genCb) => {
  let cand = genCb();

  let attemptCnt = 0;
  // ignore potential duplicates
  while (genUniq[cand]) {
    cand = genCb();

    if (++attemptCnt > 100) throw ('Cannot find unique value.');
  }

  // memoize occurrence
  genUniq[cand] = true;

  return cand;
}

const genEmail = () =>
  `${Math.random().toString(36).substring(3)}@${Math.random().toString(36).substring(3)}.${getRandElem(TLDs)}`;

const genPhoneNum = () =>
  `0${Math.random().toString().substring(2, MAX_PHONE_LEN+1)}`;

const validateEmail = (raw, emptyAllowed = false) => {
  const sanitized = raw.trim();

  if (sanitized.length === 0) {
    if (emptyAllowed) return sanitized;
    else {
      alert('Please, provide the participant\'s email address.');
      return false;
    }
  } else return RE_EMAIL.test(sanitized);
}

const validateParticipantName = (raw, emptyAllowed = false) => {
  const sanitized = raw.replace(RE_WSPACE, ' ').trim();

  if (sanitized.length === 0) {
    if (emptyAllowed) return sanitized;
    else {
      alert('Please, provide the participant\'s name.');
      return false;
    }
  } else return RE_PARTICIPANT_NAME.test(sanitized);
}

const validatePhoneNum = (raw, emptyAllowed = false) => {
  const sanitized = raw.replace(RE_REMOVE_FROM_PHONE_NUM, '');

  if (sanitized.length === 0) {
    if (emptyAllowed) return sanitized;
    else {
      alert('Please, provide the participant\'s phone number.');
      return false;
    }
  } else return RE_PHONE_NUM.test(sanitized);
}

// ---------------------- EXPORTS ----------------------

export const genParticipants = (n = INIT_NUM_PARTICIPANTS) => {
  try {
    var participants = new Array(n);
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

export const validatePaticipant = rawParticipant => {
  const participant = Object.assign({}, {
    email: validateEmail(rawParticipant.email, true),
    name: validateParticipantName(rawParticipant.name),
    phone: validatePhoneNum(rawParticipant.phone, true)
  });

  return Object.keys(participant).every(field => field !== false) && participant;
}