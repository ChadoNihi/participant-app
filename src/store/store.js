import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducer';

const middleware = [thunk];

if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);

  middleware.push(logger);
}

export default compose(applyMiddleware(...middleware))(createStore)(reducer);
