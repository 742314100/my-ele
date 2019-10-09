import Server from "./server"
import {getUrlConcat} from "../utils/commons"


class API extends Server {


    async getUser(data){
        try{
            let result =await this.axios('get','/v1/user'+getUrlConcat(data))
            if(result.status !== 0 && (result instanceof Object)){
                return result || []
            }else{
                let err={
                    tip:'获取用户信息失败',
                    response:result
                }
                throw err
            }
        }catch(err){
            throw err
        }
    }

    async accountLogin(data){
        try{
            let result =await this.axios('post','/v2/login',data)
            if(result.status !== 0 && (result instanceof Object)){
                return result || []
            }else{
                let err={
                    tip:'登录失败',
                    response:result
                }
                return err
            }
        }catch(err){
            throw err
        }
    }

    async getCaptchaCode(){
        try{
            let result=await this.axios('post','/v1/captchas',{})
            if(result.status !== 0 && (result instanceof Object)){
                return result || []
            }else{
                let err={
                    tip:'获取验证码失败',
                    response:result
                }
                return err
            }
        }catch(err){
            throw err
        }
    }

    async uploadImg(data){
        try{
            let result=await this.axios('post','//elm.cangdu.org/v1/addimg/shop',data)
            if(result.status !== 0 && (result instanceof Object)){
                return result || []
            }else{
                let err={
                    tip: '上传图片失败',
                    response: result,
                    url: '//elm.cangdu.org/v1/addimg/shop',
                }
                return err
            }
        }catch(err){
            throw err
        }
    }

    async searchPois(data){
        console.log(data)
        console.log(getUrlConcat(data))
        try{
            let result = await this.axios('get', '/v1/pois/' + getUrlConcat(data));
            if(result){
                return result;
            }else{
                let err = {
                    tip: '搜索地点失败',
                    response: result,
                    url: '//elm.cangdu.org/v1/carts/addresses',
                }
                throw err;
            }
        }catch(err){
            throw err;
        }
    }

    async getAddress(id){
        try{
            let result=await this.axios('get','/v1/users/'+id+'/addresses')
            if(result){
                return result
            }else{
                let err={
                    tip:'获取地址失败',
                    response:result,
                    url:'//elm.cangdu.org/v1/carts/addresses'
                }
                throw err;
            }
        }catch(err){
            throw err
        }
    }

    async cityGuess( keyword){
        try{
            let result = await this.axios('get', '/v1/cities?type=guess');
            if(result){
                return result;
            }else{
                let err = {
                    tip: '城市失败',
                    response: result,
                    url: '//elm.cangdu.org/v1/carts/addresses',
                }
                throw err;
            }
        }catch(err){
            throw err;
        }
    }

    async getPoisSite(data){
        try{
            let result=await this.axios('get','/v2/pois/'+data)
            if(result){
                return result
            }else{
                let err={
                    tip:'获取地点失败',
                    response:result,
                    url:'//elm.cangdu.org/v1/carts/addresses'
                }
                throw err
            }
        }catch(err){
            throw err
        }
    }

    async getFoodTypes(data){
        try{
            let result=await this.axios('get','/v2/index_entry'+getUrlConcat(data))
            if(result){
                return result
            }else{
                let err={
                    tip:'获取食物种类失败',
                    response:result,
                    url:'//elm.cangdu.org/v1/carts/addresses'
                }
                throw err
            }
        }catch(err){
            throw err
        }
    }

    /**
     *用途: 获取商店列表
     * @param {*} data
     * @memberof API
     */
    async getShopList( data){
        try{
            let result = await this.axios('get', '/shopping/restaurants/' + getUrlConcat(data));
            if(result){
                return result;
            }else{
                let err = {
                    tip: '获取商店列表失败',
                    response: result,
                    url: '//elm.cangdu.org/v1/carts/addresses',
                }
                throw err;
            }
        }catch(err){
            throw err;
        }
    }



}

export default new API()










