import axios from 'axios';

export const fetchPizzas = (sortBy, category) => (dispatch) => {
  dispatch(setLoaded((false)));
  axios.get(`/pizzas?${category > 0 ? `category=${category}&` : ''}_sort=${sortBy}&_order=${sortBy === 'name' ? 1 : -1}`).then(({
    data
  }) => dispatch(setPizzas(data.data)));
};


export const setPizzas = (items) => ({
  type: 'SET_PIZZAS',
  value: items,
});

export const setLoaded = (value) => ({
  type: 'SET_LOADED',
  value,
});