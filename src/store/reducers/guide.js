import * as types from '../actionTypes'
const initState={
    language:'zh'
}


export default function(state=initState,action){
    switch(action.type){
        case types.SET_LANGUAGE:
        return {
            ...state,
            language:action.language
        }
        default:
        return state
    }
}