import React,{Component} from 'react'
import Header from "../../../components/header/header"
import {Icon} from 'antd'
import './address.less'
import {Link} from 'react-router-dom'


export default class Address extends Component {

    render() {
        return(
            <div className='address'>
                <Header title='编辑完成' rightBtn='完成'/>
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




