import createCRUD from '../../helpers/createCRUD';

const { methods: { load }, createReducer } = createCRUD('singlePage', 'R');

export default function reducer(state = {}, action = {}) {
  return createReducer(state, action) || state;
}

export { load }
