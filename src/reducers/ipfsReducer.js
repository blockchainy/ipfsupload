const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_INFO_HASH':
      {
        console.log('payload', action);
        return [...state, action.payload]
      }
    default:
      return state;
  }
}

