import axios from "axios";
export const GETDATA_REQUEST = "GETDATA_REQUEST";

export const GETDATA_SUCCESS = "GETDATA_SUCCESS";
export const GETDATA_FAILURE = "GETDATA_FAILURE";

const getDataRequest = ()=>{
    return {
        type:GETDATA_REQUEST
    }
}
const getDataSuccess = (payload)=>{
    return {
        type:GETDATA_SUCCESS,
        payload:payload
    }
}
const getDataFailure = ()=>{
    return {
        type:GETDATA_FAILURE
    }
}
export const getData = () => (dispatch)=>{
    dispatch(getDataRequest());
    axios.get("https://api.coincap.io/v2/assets")
    .then((res)=>dispatch(getDataSuccess(res.data.data)))
    .catch((err)=>dispatch(getDataFailure(err.response)));
}