import produce from 'immer';

const initialState = {
  items: [],
  isLoading: true,
};

function tasks(state = initialState, action) {
  return produce(state, (draft) => {
    if (action.type === 'SET_TASKS') {
      draft.items = action.value;
      draft.isLoading = false;
    }
    return draft;
  });
}


export default tasks;