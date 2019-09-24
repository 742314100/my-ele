import React,{Component} from 'react'
import {Button} from 'antd'
import './add.less'
import {Link} from 'react-router-dom'
import {saveAttrInfo} from '../../../store/action'
import {connect} from 'react-redux'

class Add extends Component {
    state={
        name:'',
        address:'',
        detailAddress:'',
        tel:'',
        phone:''
    }

    handleName=(e)=>{
        this.setState({
            name:e.target.value
        })
    }


    handleDetailAddress=(e)=>{
        this.setState({
            detailAddress:e.target.value
        })
    }

    handleTel=(e)=>{
        this.setState({
            tel:e.target.value
        })
    }

    handlePhone=(e)=>{
        this.setState({
            phone:e.target.value
        })
    }

    submit=()=>{
        console.log(this.state)
        let hasAddressList=this.props.hasAddressList
        hasAddressList.push({
            mesthree:this.state.detailAddress,
            telenum:this.state.tel,
            address:this.props.userInfo.addressName,
            standbytelenum:this.state.phone,
            message:this.state.name
        })
        this.props.saveAttrInfo('hasAddressList',hasAddressList)
        this.props.history.push('/setuser/address')
    }

    render() {
        return(
            <div className="add">
                <ul>
                    <li>
                        <input type="text" placeholder='请输入你的姓名' value={this.state.name} onChange={this.handleName}/>
                    </li>
                    <Link to='/setuser/add_detail'>
                        <li>
                            <input type="text" placeholder='小区/写字楼学校等' value={this.props.addressName} readOnly='readonly'/>
                        </li>
                    </Link>
                    <li>
                        <input type="text" placeholder='请填写详细送餐地址' value={this.state.detailAddress} onChange={this.handleDetailAddress} />
                    </li>
                    <li>
                        <input type="text" placeholder='请填写能够联系到您的手机号码' value={this.tel} onChange={this.handleTel}/>
                    </li>
                    <li>
                        <input type="text" placeholder='备用联系电话（选填）' value={this.phone} onChange={this.handlePhone}/>
                    </li>
                </ul>
                <div className="btndiv">
                    <Button type='success' className='btn' onClick={this.submit}>新增地址</Button>
                </div>

            </div>
        )
    }
}


const mapStateToProps=(state)=>{
    return {
        userInfo:state.userInfo,
        addressName:state.addressName
    }
}

const mapDispatchToProps=(dispatch)=>{
    return {
        saveAttrInfo:(attr,hasAddressList)=>dispatch(saveAttrInfo(attr,hasAddressList))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Add)