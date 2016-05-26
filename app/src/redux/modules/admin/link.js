import createCRUD from '../../../helpers/createCRUD';

const { methods: { create, update, load, del }, createReducer } = createCRUD('admin/detail', 'CRUD', 'link');

export default function reducer(state = {}, action = {}) {
  return createReducer(state, action) || state;
}

export { create, update, load, del }
