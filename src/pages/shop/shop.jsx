import React,{Component} from 'react'
import './shop.less'
import {Icon} from 'antd'
import API from '../../api/api'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {is,fromJS} from 'immutable'
import {imgUrl} from "../../config/envconfig"
import {getImgPath} from "../../utils/commons"

class Shop extends Component {

    static propTypes={
        geohash:PropTypes.array.isRequired,
        userInfo:PropTypes.object.isRequired
    }

    state={
        tabActive:'food',
        shopId:'',
        shopDetailData:'',
        show:false,
        miniMoney:0,
        alertText:'请在手机APP中打开',
        activeIndex:0,
        initList:[],
        isShowCart:false,
        totalPrice:0,
        foodList:[],
        animate:'cart-icon-container active-icon',
        displayList:[],
        timer:null
    }

    tabChange=(str)=>{
        this.setState({
            tabActive:str
        })
    }

    setNumOfMenu=(menu)=>{
        var count=0
        menu.forEach((outer,o)=>{
            if(menu.length){
                outer.foods.forEach((inner,i)=>{
                    inner.num=count
                    inner.qty=0
                    count++
                })
            }
        })
        return menu
    }

    setFoodList=(menu)=>{
        let list=[]
        menu.forEach(item=>{
            list.push(...item.foods)
        })
        return list
    }

    initData=async(id)=>{
        let obj={
            latitude:this.props.geohash[0],
            longitude:this.props.geohash[1]
        }
        let res=await API.shopDetail(id,obj)
        let menu=await API.getfoodMenu({restaurant_id:id})
        menu=this.setNumOfMenu(menu)
        let foodList=this.setFoodList(menu)
        this.setState({
            shopDetailData:res,
            miniMoney:res.float_minimum_order_amount,
            shopId:id,
            show:!this.state.show,
            menuList:menu,
            initList:fromJS(foodList).toJS(),
            foodList,
            displayList:menu.length?menu[0].foods:[],
            count:0
        })


    }

    goBack=()=>{
        this.props.history.push('/msite')
    }

    activeMenu=(index)=>{
        this.setState({
            activeIndex:index,
            displayList:this.state.menuList[index].foods
        })
    }

    componentDidMount() {
        let id=this.props.match.params.id
        this.initData(id)
    }

    render() {
        return (
            <div className='shop'>
                <header className='header'>
                    <img src={imgUrl+this.state.shopDetailData.image_path} className='bg-img'/>
                    <Icon type='left' className='left' onClick={this.goBack}/>
                    <div className='des-header'>
                        <img src={imgUrl+this.state.shopDetailData.image_path} />
                        <div className='info-header'>
                            <p className='title'>{this.state.shopDetailData.name}</p>
                            <p>商家配送/{this.state.shopDetailData.order_lead_time}分钟配送/配送费￥{this.state.shopDetailData.float_delivery_fee}</p>
                            <p>公告：{this.state.shopDetailData.promotion_info}</p>
                        </div>
                    </div>
                    <Icon type='right' className='right'/>
                </header>
                <div className='tab-div'>
                    <div onClick={this.tabChange.bind(this,'food')}>
                        <span className={`tab ${this.state.tabActive==='food'?'active':''}`}>商品</span>
                    </div>
                    <div onClick={this.tabChange.bind(this,'rating')}>
                        <span className={`tab ${this.state.tabActive==='rating'?'active':''}`}>评价</span>
                    </div>
                </div>

                {
                    this.state.show&&<div className="food-container">
                        <div className="menu-container">
                            <div className='menu-left'>
                                <ul>
                                    {

                                        this.state.menuList.map((item,index)=>{
                                            return (
                                                <li className={`menu-left-li ${this.state.activeIndex===index?'activity-menu':''}`}
                                                    key={index}
                                                    onClick={this.activeMenu.bind(this,index)}
                                                >
                                                    <img src={item.icon_url?getImgPath(item.icon_url):''} alt=""/>
                                                    <span>{item.name}</span>
                                                </li>
                                            )
                                        })
                                    }


                                </ul>
                            </div>
                            <div className='menu-right'>


                                {
                                    this.state.menuList.slice(this.state.activeIndex,this.state.activeIndex+1).map((item,index)=>{
                                        return (
                                            <div>
                                                <div className='menu-detail-header-left'>
                                                    <span className='menu-item-title'>{item.name}</span>
                                                    <span>{item.description}</span>
                                                </div>
                                                <div>
                                                    <ul>
                                                        {
                                                            this.state.displayList.map((food,foodIndex)=>{
                                                                return (
                                                                    <li>
                                                                        <div className="menu-detail-list" key={foodIndex}>
                                                                            <a className="menu-detail-link" href="#/shop/foodDetail">
                                                                                <div className="menu-food-img">
                                                                                    <img src={imgUrl+food.image_path} />
                                                                                </div>
                                                                                <div className="menu-food-description">
                                                                                    <h3 className="food-description-head">
                                                                                        <strong className="description-foodname">{food.name}</strong>
                                                                                        <ul className="attributes-ul">
                                                                                            <li className=""><p>招牌</p></li>
                                                                                            <li className="attribute-new"><p>新</p></li>
                                                                                        </ul>
                                                                                        {
                                                                                            food.attributes.length ?
                                                                                                <ul className="attributes-ul">

                                                                                                    {
                                                                                                        food.attributes.map((attribute,fIndex)=>{
                                                                                                            return (

                                                                                                                <li className="attribute-new"><p>新</p></li>
                                                                                                            )
                                                                                                        })
                                                                                                    }
                                                                                                </ul>:''
                                                                                        }
                                                                                    </h3>
                                                                                    <p className="food-description-content">123</p>
                                                                                    <p className="food-description-sale-rating">
                                                                                        <span>月售863份</span>
                                                                                        <span>好评率14%</span>
                                                                                    </p>
                                                                                    <p className="food-activity">
                                                                                        <span>1313</span>
                                                                                    </p>
                                                                                </div>
                                                                            </a>
                                                                            <footer className="menu-detail-footer">
                                                                                <div className="food-price"><span>¥</span><span>20</span></div>
                                                                                <div className="add-del-icon">
                                                                                    <div className="icon-wuuiconsuoxiao">-</div>
                                                                                    <div>1</div>
                                                                                    <div className="icon-wuuiconxiangjifangda">+</div>
                                                                                </div>
                                                                            </footer>
                                                                        </div>


                                                                    </li>
                                                                )
                                                            })
                                                        }

                                                    </ul>
                                                </div>
                                            </div>
                                        )
                                    })
                                }


                            </div>
                        </div>
                        <div className="buy-cart-container">
                            <div className="cart-icon-num">
                                <div className="cart-icon-container active-icon">
                                    <Icon type='shopping-cart' className='shopping'/>
                                    <span className="cart-list-length">4</span>
                                    <div className="icon-ziyuan"></div>
                                </div>
                                <div className="cart-num">
                                    <div>¥90</div>
                                    <div>配送费¥5</div>
                                </div>
                            </div>
                            <div className="gotopay gotopay-active">
                                <div className="gotopay-button-style">去结算</div>
                            </div>
                        </div>

                    </div>
                }




            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        geohash:state.geohash,
        userInfo:state.userInfo
    }
}

export default connect(mapStateToProps)(Shop)

