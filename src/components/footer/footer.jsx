import React,{Component} from 'react'
import {Icon} from 'antd'
import './footer.less'

export default class Footer extends Component {

    render(){
        return (
            <div className='footer'>
                <div className="sel">
                    <Icon type='bell' className='icon'/>
                    <p className='text'>外卖</p>
                </div>
                <div className="sel">
                    <Icon type='search' className='icon'/>
                    <p className='text'>搜索</p>
                </div>
                <div className="sel">
                    <Icon type='hdd' className='icon'/>
                    <p className='text'>外卖</p>
                </div>
                <div className="sel">
                    <Icon type='user' className='icon'/>
                    <p className='text'>我的</p>
                </div>
            </div>
        )
    }
}










