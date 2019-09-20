import * as user from './action-type'

let defaultState={
    addressList:[],
    addressName:'',
    temMessage:'',
    hasAddressList:[],
    operate:'edit',
    userInfo:{},
    geohash:[]
}

export default (state=defaultState,action={})=>{
    switch (action.type){
        case user.SAVE_USERINFO:
            return {
                ...state,
                userInfo:action.userInfo
            }
        default:
            return state
    }
}



