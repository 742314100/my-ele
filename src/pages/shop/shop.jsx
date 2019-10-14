import React,{Component} from 'react'
import './shop.less'
import {Icon} from 'antd'
import API from '../../api/api'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {is,fromJS} from 'immutable'
import {imgUrl} from "../../config/envconfig"
import {getImgPath} from "../../utils/commons"
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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
        timer:null,
    }

    FirstChild=props=>{
        const childrenArray=React.Children.toArray(props.children)
        return childrenArray[0] || null;
    }

    CartFirstChild=props=>{
        const childrenArray=React.Children.toArray(props.children)
        return childrenArray[0] || null;
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
        console.log(menu)
        console.log(foodList)
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

    calculateMoney=()=>{
        let totalPrice=0
        this.state.foodList.forEach(item=>{
            totalPrice+=item.qty*item.specfoods[0].price
        })
        this.setState({
            totalPrice,
            miniMoney:this.state.shopDetailData.float_minimum_order_amount-totalPrice
        })
    }

    handleShowCart=()=>{
        this.setState({
            isShowCart:!this.state.isShowCart
        })
    }

    clearCart=()=>{
        this.setState({
            foodList:fromJS(this.state.initList).toJS(),
            totalPrice:0,
            count:0,
            isShowCart:false,
            miniMoney:20
        })
    }

    handleAddFoodCount=(index,type)=>{
        let foodList=this.state.foodList
        let nextFoodQty=foodList[index].qty+type
        if(nextFoodQty>=0){
            foodList[index].qty+=type
        }
        let nextCount=this.state.count+type
        this.setState({
            foodList,
            count:nextFoodQty<0?this.state.count:nextCount,
            animate:this.state.animate+' animate'
        })
        this.calculateMoney()
        var timer=setTimeout(()=>{
            this.setState({
                animate:'cart-icon-container active-icon',
            })
        },200)
        this.setState({timer})

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

                <ReactCSSTransitionGroup
                    component={this.FirstChild}
                    transitionName="shop"
                    transitionEnterTimeout={200}
                    transitionLeaveTimeout={300}>
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
                                                <div key={index}>
                                                    <div className='menu-detail-header-left'>
                                                        <span className='menu-item-title'>{item.name}</span>
                                                        <span>{item.description}</span>
                                                    </div>
                                                    <div>
                                                        <ul>
                                                            {
                                                                this.state.displayList.map((food,foodIndex)=>{
                                                                    return (
                                                                        <li key={foodIndex}>
                                                                            <div className="menu-detail-list" key={foodIndex}>
                                                                                <a className="menu-detail-link" href="#/shop/foodDetail">
                                                                                    <div className="menu-food-img">
                                                                                        <img src={imgUrl+food.image_path} />
                                                                                    </div>
                                                                                    <div className="menu-food-description">
                                                                                        <h3 className="food-description-head">
                                                                                            <strong className="description-foodname">{food.name}</strong>

                                                                                            {
                                                                                                food.attributes.length ?
                                                                                                    <ul className="attributes-ul">
                                                                                                        {
                                                                                                            food.attributes.map((attribute,fIndex)=>{
                                                                                                                return (
                                                                                                                    <li className="attribute-new" key={fIndex}>
                                                                                                                        <p>{attribute.icon_name}</p>
                                                                                                                    </li>
                                                                                                                )
                                                                                                            })
                                                                                                        }
                                                                                                    </ul>:''
                                                                                            }
                                                                                        </h3>
                                                                                        <p className="food-description-content">{food.description}</p>
                                                                                        <p className="food-description-sale-rating">
                                                                                            <span>月售{food.month_sales}份</span>
                                                                                            <span>好评率{food.satisfy_rate}%</span>
                                                                                        </p>

                                                                                        {
                                                                                            food.activity&&<p className="food-activity">
                                                                                                <span>{food.activity.image_text}</span>
                                                                                            </p>
                                                                                        }
                                                                                    </div>
                                                                                </a>
                                                                                <footer className="menu-detail-footer">
                                                                                    <div className="food-price">
                                                                                        <span>¥</span>
                                                                                        <span>{food.specfoods[0].price}</span>
                                                                                        {
                                                                                            food.specifications.length?<span>起</span>:''
                                                                                        }
                                                                                    </div>
                                                                                    <div className="add-del-icon">
                                                                                        <div className="icon-wuuiconsuoxiao" onClick={this.handleAddFoodCount.bind(this,food.num,-1)}>-</div>
                                                                                        <div>{this.state.foodList[food.num].qty}</div>
                                                                                        <div className="icon-wuuiconxiangjifangda" onClick={this.handleAddFoodCount.bind(this,food.num,1)}>+</div>
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
                                    <div className={this.state.count===0?'cart-icon-container':this.state.animate} onClick={this.handleShowCart}>
                                        <Icon type='shopping-cart' className='shopping'/>
                                        <span className="cart-list-length">{this.state.count}</span>
                                        <div className="icon-ziyuan"></div>
                                    </div>
                                    <div className="cart-num">
                                        <div>¥{this.state.totalPrice}</div>
                                        <div>配送费¥{this.state.shopDetailData.float_delivery_fee}</div>
                                    </div>
                                </div>
                                <div className={this.state.miniMoney>0?'gotopay':'gotopay gotopay gotopay-active'}>
                                    {
                                        this.state.miniMoney>0?<div className='gotopay-button-style'>
                                            还差￥{this.state.miniMoney}起送
                                        </div>:<div className="gotopay-button-style">去结算</div>
                                    }

                                </div>
                            </div>

                            <ReactCSSTransitionGroup
                                component={this.CartFirstChild}
                                transitionName="cart"
                                transitionEnterTimeout={600}
                                transitionLeaveTimeout={300}
                            >
                                {
                                    this.state.isShowCart&&<div className='cart-food-list'>
                                        <header>
                                            <h4>购物车</h4>
                                            <div className="cart-food-clear" onClick={this.clearCart}>
                                                <div className="icon-shanchu"></div>
                                                <div>清空1</div>
                                            </div>
                                        </header>
                                        <div className="cart-food-details">
                                            <ul>
                                                {
                                                    this.state.foodList.map((cart,index)=>{
                                                        return cart.qty===0?'':(
                                                            <li className="cart-food-li" key={index}>
                                                                <div className="cart-list-num">
                                                                    <p>{cart.name}</p>
                                                                    <p>{cart.specs}</p>
                                                                </div>
                                                                <div className="cart-list-price">
                                                                    <span>￥</span>
                                                                    <span>{cart.specfoods[0].price}</span>
                                                                </div>
                                                                <div className="cart-list-control">
                                                                    <div className="icon-wuuiconsuoxiao" onClick={this.handleAddFoodCount.bind(this,cart.num,-1)}>-</div>
                                                                    <div>{cart.qty}</div>
                                                                    <div className="icon-wuuiconxiangjifangda" onClick={this.handleAddFoodCount.bind(this,cart.num,1)}>+</div>
                                                                </div>
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                }

                            </ReactCSSTransitionGroup>
                        </div>
                    }


                </ReactCSSTransitionGroup>






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

