let initialState = {};

const reducer = (state = initialState, action) => {
    if (action.type === 'SET_FRIENDS') {
        state = action.payload.friends;
        return state
    }
    return state
}

export default reducer;