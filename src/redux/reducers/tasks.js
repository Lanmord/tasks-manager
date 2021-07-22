import produce from 'immer';

const initialState = {
  items: [],
  isLoading: true,
  currentPage: 1,
  itemsPerPage: 3,
  totalTaskCount: 0,
  sortField: 'id',
  sortDirection: 'asc',
};

function tasks(state = initialState, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case 'SET_TASKS':
        draft = {
          ...draft,
          ...action.value,
        };
        break;
      case 'SET_LOADING':
        draft.isLoading = action.value;
        break;
      default:
        return draft;
    }
    return draft;
  });
}

export default tasks;
