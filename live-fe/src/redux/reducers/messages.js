let initialState = [];

const reducer = (state = initialState, action) => {
    if (action.type === 'PUSH_MESSAGE') {
        state = [...state, action.payload]
        return state
    }
    return state
}

export default reducer;