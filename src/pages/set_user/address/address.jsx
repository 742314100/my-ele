import React,{Component} from 'react'
import {Icon} from 'antd'
import './address.less'
import {Link} from 'react-router-dom'


export default class Address extends Component {

    render() {
        return(
            <div className='address'>
                <ul className='listul'>
                    <Link to='/setuser/add/fromadd'>
                        <li className='list'>
                            新增地址
                            <Icon type='right' className='right'/>
                        </li>
                    </Link>
                </ul>
            </div>
        )
    }
}




