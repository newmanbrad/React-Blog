import createCRUD from '../../helpers/createCRUD';

const { methods: { create }, createReducer } = createCRUD('comment', 'C');

export default function reducer(state = {}, action = {}) {
  return createReducer(state, action) || state;
}

export { create }
