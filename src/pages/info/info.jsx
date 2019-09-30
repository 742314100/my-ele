import React,{Component} from 'react'
import Header from "../../components/header/header";
import {Icon,Button} from 'antd'
import './info.less'
import {connect} from 'react-redux'
import API from '../../api/api'
import {modifyUserInfo} from '../../store/action'
import {imgUrl} from "../../config/envconfig";
import {Link} from 'react-router-dom'

class Info extends Component {

    uploadImg=async(event)=>{
        try{
            let formdata=new FormData()
            formdata.append('file',event.target.files[0])
            let result = await API.uploadImg(formdata)
            this.props.modifyUserInfo(imgUrl+result.image_path)
        }catch(err){
            console.log(err)
        }
    }

    goBack=()=>{
        this.props.history.push('./profile')
    }

    render() {

        return (
            <div className='info'>
                <Header title='账户信息'  goBack={this.goBack}/>
                <ul>
                    <li>
                        <span>头像</span>
                        <input type="file" className='upload' onChange={this.uploadImg}/>
                        <span className='toRight'>
                            <img src={this.props.userInfo.image_path} className='upImg'/>
                            <Icon type='right'/>
                        </span>
                    </li>
                    <Link to='/setuser/name' className='linkto'>
                        <li>
                        <span>用户名</span>
                            <span className='toRight'>
                            {this.props.userInfo.username}
                                <Icon type='right'/>
                        </span>
                        </li>
                    </Link>
                    <Link to='/setuser/address' className='linkto'>
                        <li>
                            <span>收货地址</span>
                                <span className='toRight'>
                                <Icon type='right'/>
                            </span>
                        </li>
                    </Link>
                    <li className='bggay'>
                        账号绑定
                    </li>
                    <li>
                        <span>
                            <Icon type='phone'/>
                            手机
                        </span>
                        <span className='toRight'>
                            <Icon type='right'/>
                        </span>
                    </li>
                    <li className='bggay'>
                        安全设置
                    </li>
                    <li>
                        <span>登录密码</span>
                        <span className='toRight'>
                            修改
                            <Icon type='right'/>
                        </span>
                    </li>
                </ul>
                <div className='btn'>
                    <Button type='danger' block>退出登录</Button>
                </div>

            </div>
        )
    }

}

const mapStateToProps=(state)=>{
    return {
        userInfo:state.userInfo
    }
}

const mapDispatchToProps=(dispatch)=>{
    return {
        modifyUserInfo:(result)=>dispatch(modifyUserInfo('image_path',result))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Info)


