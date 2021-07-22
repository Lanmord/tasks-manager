import produce from 'immer';

const initialState = {
  isAuthenticated: false,
};

function auth(state = initialState, action) {
  return produce(state, (draft) => {
    if (action.type === 'SET_AUTH_STATUS') {
      draft.isAuthenticated = action.value;
    }
    return draft;
  });
}

export default auth;
