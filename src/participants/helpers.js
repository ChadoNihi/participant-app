const INIT_NUM_PARTICIPANTS = 20;
const MAX_PHONE_LEN = 10;

// Store RE objects for performance
const RE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/g; // https://stackoverflow.com/a/9204568/4579279
const RE_PARTICIPANT_NAME = /^.{1,200}$/g;
const RE_PHONE_NUM = /^.{3,40}$/g;
const RE_REMOVE_FROM_PHONE_NUM = /\s+|[)(]/g;
const RE_WSPACE = /\s+/g;

const FIRST_NAMES = ['Xor', 'Dom', 'Cli', 'Api', 'Haskell', 'Lisp', 'Nan', 'Ada', 'Soya', 'Monad', 'Molly', 'Node', 'Stack', 'Try', 'C'];
const LAST_NAMES = ['Curry', 'Tomasik', 'Carmack', 'Trie', 'Script', 'Nullov', 'Smart', 'Mindful', 'Utilitronium', 'Trace', 'Cancer', 'Dijkstra', 'Plusplus'];
const TLDs = ['org', 'fi', 'com', 'nz', 'ua'];

const getRandElem = (seq) =>
  seq[Math.floor(Math.random() * seq.length)];

const genUniq = (genCb) => {
  let cand = genCb();

  let attemptCnt = 0;
  // ignore potential duplicates
  while (genUniq[cand]) {
    cand = genCb();

    if (++attemptCnt > 100) throw new Error('Cannot find unique value.');
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
  } else if (RE_EMAIL.test(sanitized)) return sanitized;
  else {
    alert('Invalid email.');
    return false;
  }
}

const validateParticipantName = (raw, emptyAllowed = false) => {
  const sanitized = raw.replace(RE_WSPACE, ' ').trim();

  if (sanitized.length === 0) {
    if (emptyAllowed) return sanitized;
    else {
      alert('Please, provide the participant\'s name.');
      return false;
    }
  } else if (RE_PARTICIPANT_NAME.test(sanitized)) return sanitized;
  else {
    alert('Invalid name.');
    return false;
  }
}

const validatePhoneNum = (raw, emptyAllowed = false) => {
  const sanitized = raw.replace(RE_REMOVE_FROM_PHONE_NUM, '');

  if (sanitized.length === 0) {
    if (emptyAllowed) return sanitized;
    else {
      alert('Please, provide the participant\'s phone number.');
      return false;
    }
  } else if (RE_PHONE_NUM.test(sanitized)) return sanitized;
  else {
    alert('Invalid phone number.');
    return false;
  }
}

// ---------------------- EXPORTS ----------------------

export const compareParticipants = (key, a, b, isDesc = false) => {
  if (isDesc)[a, b] = [b, a]; // swap

  const valA = a[key].toUpperCase();
  const valB = b[key].toUpperCase();

  if (valA < valB) return -1;
  else if (valA > valB) return 1;
  else return 0;
}

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

export const validatePaticipant = raw => {
  const participant = Object.assign({}, {
    email: validateEmail(raw.email, true),
    name: validateParticipantName(raw.name),
    phone: validatePhoneNum(raw.phone, true)
  });

  return Object.values(participant).every(val => val !== false) && participant;
}