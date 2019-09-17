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
                        <p>李伟</p>
                        <p>
                            <Icon type='phone'/>
                            <span>8888</span>
                        </p>
                    </div>
                    <Icon type='right' className='right'/>
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
                            <Icon type='right'/>
                        </span>
                    </div>
                </div>
            </div>
        )
    }

}










