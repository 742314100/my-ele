import React,{Component} from 'react'
import {Button} from 'antd'
import './add_detail.less'
import API from '../../../api/api'
import {connect} from 'react-redux'
import {saveAttrInfo} from "../../../store/action"

class AddDetail extends Component {

    state={
        inputAddress:'',
        isShow:true
    }

    searchPois=async()=>{
        let obj = {
            type: 'nearby',
            keyword: this.state.inputAddress
        }
       // let res = await API.searchPois(obj)
        let addressList=[{"name":"中关村","address":"北京市海淀区 ","latitude":39.985075,"longitude":116.31612,"geohash":"39.985075,116.31612"},{"name":"中关村[地铁站]","address":"地铁4号线大兴线","latitude":39.984244,"longitude":116.316472,"geohash":"39.984244,116.316472"},{"name":"中关村南[公交站]","address":"特4路,681路,365路,运通105路,584路,355路,614路,307路,320路,302路,夜8路,运通106路,332路,快速直达专线26路,466路,快速直达专线170路,特15路,快速直达专线127路,快速直达专线139路,快速直达专线7路,快速直达专线37路,快速直达专线126路,快速直达专线82路,快速直达专线147路","latitude":39.983804,"longitude":116.316633,"geohash":"39.983804,116.316633"},{"name":"中关村软件园","address":"北京市海淀区东北旺西路8号","latitude":40.046278,"longitude":116.28585,"geohash":"40.046278,116.28585"},{"name":"中关村大厦","address":"北京市海淀区中关村大街27号","latitude":39.977462,"longitude":116.316513,"geohash":"39.977462,116.316513"},{"name":"中关村西[公交站]","address":"982路,26路,运通106路,584路,夜8路,运通113路,740路外环,740路外公益西桥,983路,特9路外环,384路,快速直达专线37路,快速直达专线127路,快速直达专线7路,392路,快速直达专线177路,运通110路,快速直达专线200路,302路,332路,快速直达专线139路,快速直达专线147路,快速直达专线126路,740路内环,特9路内环","latitude":39.985629,"longitude":116.314176,"geohash":"39.985629,116.314176"},{"name":"中关村图书大厦","address":"北京市海淀区北四环西路68号","latitude":39.98418,"longitude":116.30448,"geohash":"39.98418,116.30448"},{"name":"中关村广场","address":"北京市海淀区中关村大街15号","latitude":39.980209,"longitude":116.314946,"geohash":"39.980209,116.314946"},{"name":"中关村森林公园","address":"北京市海淀区唐家岭","latitude":40.062338,"longitude":116.285345,"geohash":"40.062338,116.285345"},{"name":"北京市中关村中学","address":"北京市海淀区科学院南路甲14号","latitude":39.9786,"longitude":116.3265,"geohash":"39.9786,116.3265"}]
        this.props.saveAttrInfo('addressList',addressList)

    }

    inputHandle=(e)=>{
        let value=e.target.value
        this.setState({
            inputAddress:value,
            isShow:false
        })
    }

    handleChoose=(name)=>{
        this.props.saveAttrInfo('addressName',name)
        this.props.history.push('/setuser/add/adddetail')
    }

    render() {
        return(
            <div className='add_detail'>
                <div>
                    <input type="text" className='inp' placeholder='请输入小区/写字楼/学校等' value={this.state.inputAddress} onChange={this.inputHandle}/>
                    <Button type='primary' onClick={this.searchPois}>确认</Button>
                </div>
                <p className='tip'>
                    为了满足商家的送餐要求，建议您从列表中选择地址
                </p>
                {
                    this.state.isShow
                    &&
                    <div className="point" >
                        <p>找不到地址？</p>
                        <p>请尝试输入小区、写字楼或学校名</p>
                        <p>详细地址（如门牌号）可稍后输入哦。</p>
                    </div>
                }

                <div className="addressList">
                    <ul>
                        {
                            this.props.addressList.map((item,index)=>{
                                return (
                                    <li onClick={this.handleChoose.bind(this,item.name)} key={index}>
                                        <p>{item.name}</p>
                                        <p>{item.address}</p>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        addressList:state.addressList
    }
}

const mapDispatchToProps=(dispatch)=>{
    return {
        saveAttrInfo:(attr,addressList)=>dispatch(saveAttrInfo(attr,addressList))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(AddDetail)