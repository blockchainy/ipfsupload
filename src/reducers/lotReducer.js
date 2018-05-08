const initialState = []

export default (state = initialState, action) => {

  switch (action.type) {
    case 'CREATE_NEW_LOT': {
      return [...state, {lotId: action.payload}]
    }
    default: return state;
  }
}