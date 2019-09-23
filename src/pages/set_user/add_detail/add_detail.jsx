import React,{Component} from 'react'
import Header from '../../../components/header/header'
import {Button} from 'antd'
import './add_detail.less'
import API from '../../../api/api'

export default class AddDetail extends Component {

    state={
        inputAddress:''
    }

    searchPois=async()=>{
        let obj = {
            type: 'nearby',
            keyword: this.state.inputAddress
        }
        let res = await API.searchPois(obj)
        console.log(res)

    }

    inputHandle=(e)=>{
        let value=e.target.value
        this.setState({
            inputAddress:value
        })
    }

    render() {
        return(
            <div className='add_detail'>
                <Header title='搜索地址'/>
                <div>
                    <input type="text" className='inp' placeholder='请输入小区/写字楼/学校等' value={this.state.inputAddress} onChange={this.inputHandle}/>
                    <Button type='primary' onClick={this.searchPois}>确认</Button>
                </div>
                <p className='tip'>
                    为了满足商家的送餐要求，建议您从列表中选择地址
                </p>
                <div className="point">
                    <p>找不到地址？</p>
                    <p>请尝试输入小区、写字楼或学校名</p>
                    <p>详细地址（如门牌号）可稍后输入哦。</p>
                </div>

            </div>
        )
    }
}