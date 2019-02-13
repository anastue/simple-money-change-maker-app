import utils from '../utils';

/*
 * TODO: Im not sure we need this or not?
 */

export default function(state, action) {
  console.log('reducer ', state, action);
  if (state == null) {
    return {};
  }
  let new_state = utils._extends({}, state);
  switch (action.type) {
  }
  console.log('new_state', new_state);
  return new_state;
}
