import axios from 'axios';

export const fetchTasks = (sortField, sortDirection) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .get(`/?developer=konstantin&sortField=${sortField}&sortDirection=${sortDirection}`)
    .then(({ data }) =>
      dispatch(
        setTasks({
          items: data.message.tasks,
          totalTaskCount: data.message.total_task_count,
        }),
      ),
    );
  dispatch(setLoading(false));
};

export const setTasks = (value) => ({
  type: 'SET_TASKS',
  value,
});

export const setLoading = (value) => ({
  type: 'SET_LOADING',
  value,
});
