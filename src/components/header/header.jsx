import React,{Component} from 'react'
import PropTypes from 'prop-types'
import './header.less'
import {Icon} from 'antd'
import {is,fromJS} from 'immutable'
import {connect} from 'react-redux'

class Header extends Component {

    static propTypes={
        title:PropTypes.string.isRequired,
        rightBtn:PropTypes.string,
        goBack:PropTypes.func,
        edit:PropTypes.func,
        signUp:PropTypes.bool,
        goHome:PropTypes.func
    }

    back=()=>{
       this.props.goBack()
    }

    handleEdit=()=>{
        this.props.edit()
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !is(fromJS(this.props),fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
    }

    render(){
        return (
            <div onClick={this.back} title={this.props.title} className='header'>
                {
                    this.props.goBack&& <Icon type='left' className='left'/>
                }
                <span className='title'>{this.props.title}</span>
                <span className='rightBtn'>{this.props.rightBtn ? this.props.rightBtn:''}</span>
                {
                    this.props.signUp?
                        (
                            this.props.userInfo?<Icon type='user' className='userIcon' onClick={this.props.goHome}/>:<span>登录|注册</span>
                        ):''
                }
                {
                    this.props.edit&&<div onClick={this.handleEdit} className='edit'>
                        {this.props.userInfo.operate==='edit'?'编辑':'完成'}
                    </div>
                }
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

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Header)