import React,{Component} from 'react'
import Header from '../../components/header/header'
import {Avatar,Icon} from 'antd'
import './profile.less'

export default class Profile extends Component {

    render(){

        return(
            <div className='profile'>
                <Header title='我的'/>
                <div className="head">
                    <Avatar icon='user' size={64}/>
                    <div className='info'>
                        <p>eee</p>
                        <p>
                            <Icon type='phone'/>
                            <span>8888</span>
                        </p>
                    </div>
                    <Icon type='right' className='right'/>
                </div>
                <div className="info-data">
                    <a href="" className="guide">
                        <span className='info-data-top'>
                            <b>0.00</b>元
                            <span>我的余额</span>
                        </span>
                    </a>
                    <a href="" className="guide">
                        <span className='info-data-top'>
                            <b>3</b>个
                            <span>我的优惠</span>
                        </span>
                    </a>
                    <a href="" className="guide">
                        <span className='info-data-top'>
                            <b>0</b>分
                            <span className='info-data-bottom'>我的积分</span>
                        </span>
                    </a>
                </div>
            </div>
        )
    }

}










