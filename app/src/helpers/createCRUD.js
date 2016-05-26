function createMethod(method, types, prefix) {
  return function({ params, data } = {}) {
    return {
      types: types,
      promise: (client) => client[method](prefix, { params, data })
    };
  }
}

function createMethodsAndConstants(prefix, actions, action, constants, methods, name, pageName) {
  pageName = pageName ? '-' + pageName : '';

  if (~actions.indexOf(action)) {
    let types = [
      `${prefix}${pageName}/${name}`,
      `${prefix}${pageName}/${name}_SUCCESS`,
      `${prefix}${pageName}/${name}_FAIL`
    ];
    // 常量
    Object.assign(constants, {
      [name]: types[0],
      [name + '_SUCCESS']: types[1],
      [name + '_FAIL']: types[2]
    });
    // 方法
    if (action === 'C') {
      methods.create = createMethod('post', types, prefix);
    } else if (action === 'U') {
      methods.update = createMethod('put', types, prefix);
    } else if (action === 'R') {
      methods.load = createMethod('get', types, prefix);
    } else if (action === 'D') {
      methods.del = createMethod('del', types, prefix);
    }
  }
}

export default function createCRUD(prefix, actions, pageName) {
  const constants = {};
  const methods = {};
  const actionsMap = {
    'C': 'CREATE',
    'R': 'LOAD',
    'U': 'UPDATE',
    'D': 'DELETE'
  };

  actions.toUpperCase().split('').forEach((action) => {
    createMethodsAndConstants(prefix, actions, action, constants, methods, actionsMap[action], pageName);
  });

  const createReducer = function(state, action) {
    switch (action.type) {
      case constants.LOAD:
        return {
          ...state,
          loading: true
        };
      case constants.LOAD_SUCCESS:
        return {
          ...state,
          loading: false,
          loaded: true,
          data: action.result
        };
      case constants.LOAD_FAIL:
        return {
          ...state,
          loading: false,
          loaded: false,
          error: action.error
        };
      case constants.CREATE:
      case constants.UPDATE:
        return {
          ...state,
          editing: true
        };
      case constants.CREATE_SUCCESS:
      case constants.UPDATE_SUCCESS:
        return {
          ...state,
          editing: false,
          editData: action.result
        };
      case constants.CREATE_FAIL:
      case constants.UPDATE_FAIL:
        return {
          ...state,
          editing: false,
          editError: action.error
        };
      case constants.DELETE:
        return {
          ...state,
          deleteing: true
        };
      case constants.DELETE_SUCCESS:
        return {
          ...state,
          deleteing: false,
          deleteData: action.result
        };
      case constants.DELETE_FAIL:
        return {
          ...state,
          deleteing: false,
          deleteError: action.error
        };
    }
  }

  return { methods, createReducer };
}
