import React,{Component} from 'react'
import {Button} from 'antd'
import Header from "../../../components/header/header"
import './add.less'
import {Link} from 'react-router-dom'

export default class Add extends Component {
    render() {
        return(
            <div className="add">
                <Header title='新增地址'/>
                <ul>
                    <li>
                        <input type="text" placeholder='请输入你的姓名'/>
                    </li>
                    <Link to='/setuser/add_detail'>
                        <li>
                            <input type="text" placeholder='小区/写字楼学校等'/>
                        </li>
                    </Link>
                    <li>
                        <input type="text" placeholder='请填写详细送餐地址'/>
                    </li>
                    <li>
                        <input type="text" placeholder='请填写能够联系到您的手机号码'/>
                    </li>
                    <li>
                        <input type="text" placeholder='备用联系电话（选填）'/>
                    </li>
                </ul>
                <div className="btndiv">
                    <Button type='success' className='btn'>新增地址</Button>
                </div>

            </div>
        )
    }
}



