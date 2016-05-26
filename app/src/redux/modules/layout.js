import createCRUD from '../../helpers/createCRUD';

const { methods: { load }, createReducer } = createCRUD('layout', 'R');

export default function reducer(state = { loaded: false }, action = {}) {
  return createReducer(state, action) || state;
}

export { load }

export function isLoaded(globalState) {
  return globalState.layout && globalState.layout.loaded;
}
