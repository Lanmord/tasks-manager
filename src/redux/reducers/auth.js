import produce from 'immer';

const initialState = {
  isAuthenticated: false,
  isLoading: true,
};

function auth(state = initialState, action) {
  return produce(state, (draft) => {
    if (action.type === 'SET_AUTH_STATUS') {
      draft.isAuthenticated = action.value;
      draft.isLoading = false;
    }
    if (action.type === 'SET_IS_LOADING') {
      draft.isAuthenticated = action.value;
    }
    return draft;
  });
}


export default auth;