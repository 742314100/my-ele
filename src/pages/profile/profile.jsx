import React,{Component} from 'react'
import Header from '../../components/header/header'
import {Avatar,Icon} from 'antd'
import './profile.less'
import Footer from "../../components/footer/footer"
import API from '../../api/api'
import {getStore} from "../../utils/commons"
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {is,fromJS} from 'immutable'
import PropTypes from 'prop-types'

class Profile extends Component {

   /* static propTypes={
        userInfo: PropTypes.object.isRequired,
        saveUserInfo:PropTypes.func.isRequired
    }*/

    state={
        username:'登录/注册',
        mobile:'暂无绑定手机',
        imgpath:'',
        balance:0,
        count:0,
        pointNumber:0,
        hasAlert:'',
        alertText:'请在手机APP中打开'
    }

    initData=()=>{
        if(this.props.userInfo && this.props.userInfo.user_id){
            this.setState({
                username:this.props.userInfo.username,
                mobile:this.props.userInfo.mobile || '没有注册手机号',
                balance:this.props.userInfo.balance,
                count:this.props.userInfo.count,
                pointNumber:this.props.userInfo.pointNumber
            })
        }else{
            this.setState({
                username:'登录/注册',
                mobile:'暂无绑定手机'
            })
        }
    }

    getUser=async()=>{
        const userInfo=await API.getUser({user_id:getStore('user_id')})
        this.props.saveUserInfo(userInfo)
        this.initData()
    }

   /* componentWillReceiveProps(nextProps){
        if(!is(fromJS(this.props.proData),fromJS(nextProps.proData)) ){
            this.initData(nextProps)
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !is(fromJS(this.props),fromJS(nextProps)) || !is(fromJS(this.state),fromJS(this.nextState))
    }*/

    componentDidMount() {
        if(this.props.userInfo.user_id){
            this.initData()
        }else{
            this.getUser()
        }
    }

    render(){

        return(
            <div className='profile'>
                <Header title='我的'/>
                <div className="head">
                    <Link to='/login' className='profile-link'>
                        <Avatar icon='user' size={64}/>
                        <div className='info'>
                            <p>{this.state.username}</p>
                            <p>
                                <Icon type='phone'/>
                                <span>{this.state.mobile}</span>
                            </p>
                        </div>
                        <Icon type='right' className='right'/>
                    </Link>
                </div>
                <div className="info-data">
                    <a href="" className="guide">
                        <p className='info-data-top'>
                            <b>0.00</b>元
                        </p>
                        <p className='info-data-bottom'>我的余额</p>
                    </a>
                    <a href="" className="guide">
                        <p className='info-data-top'>
                            <b>3</b>个
                        </p>
                        <p className='info-data-bottom'>我的优惠</p>
                    </a>
                    <a href="" className="guide">
                        <p className='info-data-top'>
                            <b>0</b>分
                        </p>
                        <p className='info-data-bottom'>我的积分</p>
                    </a>
                </div>
                <div className="list-div">
                    <div className="list">
                        <Icon type='diff' className='diff'/>
                        <span className="content">
                            我的订单
                            <Icon type='right' className='right'/>
                        </span>
                    </div>
                    <div className="list">
                        <Icon type='diff' className='diff'/>
                        <span className="content">
                            积分商城
                            <Icon type='right' className='right'/>
                        </span>
                    </div>
                    <div className="list">
                        <Icon type='diff' className='diff'/>
                        <span className="content">
                            饿了么会员卡
                            <Icon type='right' className='right'/>
                        </span>
                    </div>
                    <div className="list">
                        <Icon type='diff' className='diff'/>
                        <span className="content">
                            服务中心
                            <Icon type='right' className='right'/>
                        </span>
                    </div>
                    <div className="list">
                        <Icon type='diff' className='diff'/>
                        <span className="content">
                            下载饿了么APP
                            <Icon type='right' className='right'/>
                        </span>
                    </div>
                </div>
                <Footer />
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
        saveUserInfo:(userInfo)=>dispatch(saveUserInfo(userInfo))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Profile)