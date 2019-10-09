import React,{Component} from 'react'
import './shop_list.less'
import {Icon} from 'antd'
import PropTypes from 'prop-types'
import API from '../../api/api'
import {is,fromJS} from 'immutable'
import {Link} from 'react-router-dom'
import {imgUrl} from "../../config/envconfig"

class ShopList extends Component {

    static propTypes={
        geohash:PropTypes.array.isRequired
    }

   state={
       shopListArr:[]
   }


    getShopList=async(props)=>{
        let obj={
            latitude:props.geohash[0],
            longitude:props.geohash[1]
        }
        const shopListArr=await API.getShopList(obj)
        console.log(shopListArr)
        this.setState({
            shopListArr:shopListArr
        })
    }

    startCount=(rating)=>{
        var items=[];
        for(var i=0;i<Math.ceil(rating);i++){
            items.push(<Icon type='star' className='start' key={i}/>)
        }
        return items
    }



    componentWillMount() {
        if(this.props.geohash.length){
            this.getShopList(this.props)
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        let refresh=!is(fromJS(this.props),fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
        if(refresh){
            this.getShopList(nextProps)
        }
        return refresh
    }

    render() {
        return (
                <div>
                    <div className="nearBy">

                        {
                            this.state.shopListArr.map((item,index)=>{
                               return (
                                   <Link className="info" key={index} to={'/shop/'+item.id}>
                                        <div className='infoImg'>
                                            <img src={imgUrl+item.image_path} />
                                        </div>
                                        <div className="des">
                                            <p>
                                                <span className='left'>
                                                    <span className='brand'>品牌</span>
                                                    <span className='result'>{item.name}</span>
                                                </span>
                                                <span className='right'>
                                                    <span className='ticket'>保准票</span>
                                                </span>
                                            </p>
                                            <p>
                                                <span className="left">
                                                   {
                                                        this.startCount(item.rating)
                                                   }

                                                    <span>月售{item.recent_order_num}单</span>
                                                </span>
                                                    <span className="right">
                                                    <span className='bee'>蜂鸟专送</span>
                                                    <span className='arrive'>准时达</span>
                                                </span>
                                            </p>
                                            <p>
                                                <span className="left">
                                                    <span>￥{item.float_minimum_order_amount}起送/配送费约￥5</span>
                                                </span>
                                                <span className='right'>
                                                    <span>12公里</span>
                                                    <span className='time'>/{item.piecewise_agent_fee.tips}</span>
                                                </span>
                                            </p>
                                        </div>
                                    </Link>
                               )
                            })
                        }
                    </div>
                </div>

        )
    }


}

export default ShopList;
