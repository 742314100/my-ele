import axios from 'axios'
import {baseUrl} from "../config/envconfig"

export default class Server {
    axios(method,url,data){
        return new Promise((resolve,reject)=>{
            let _option={
                method,
                url,
                baserUrl:baseUrl,
                timeout:30000,
                params:null,
                data:data,
                headers:null,
                withCredentials:true,
                validateStatus:(status)=>{
                    return status >=200 && status <300
                }
            }
            axios.request(_option).then(res=>{
                resolve(typeof res.data === 'object' ? res.data:JSON.parse(res.data))
            },error=>{
                if(error.response){
                    reject(error.response.data)
                }else{
                    reject(error)
                }
            })
        })
    }
}







