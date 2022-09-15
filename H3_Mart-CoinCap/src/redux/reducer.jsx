import { GETDATA_FAILURE, GETDATA_REQUEST, GETDATA_SUCCESS } from "./action";


const initialState = {
    data:[]
}

export const reducer = (state=initialState, action)=>{
    const { type, payload} = action;
    switch (type) {
        case GETDATA_REQUEST: return {...state, };
        case GETDATA_SUCCESS: return {...state, data:payload};
        case GETDATA_FAILURE: return { ...state, };
        default: return state;
    }
}