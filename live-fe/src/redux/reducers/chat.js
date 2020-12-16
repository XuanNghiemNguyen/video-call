let initialState = { "BotChat": { message: "Let's type!", time: 0 } }

const reducer = (state = initialState, action) => {
    if (action.type === 'PUSH_MESSAGE') {
        const _message = {
            message: action.payload.message,
            time: new Date().getTime()
        }
        state[action.payload.user_name].push(_message)
        return state
    }
    return state
}

export default reducer;