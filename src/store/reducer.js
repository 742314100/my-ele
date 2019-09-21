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
        case user.MODIFY_USERINFO:
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    [action.key]:action.value
                }
            }
        default:
            return state
    }
}



