let initialState = {
    username: "nghiem"
}

const reducer = (state = initialState, action) => {
    if (action.type === 'SET_USER_INFO') {
        state = action.payload
        return state
    }
    return state
}

export default reducer;