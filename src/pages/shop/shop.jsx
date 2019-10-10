import React,{Component} from 'react'
import './shop.less'
import {Icon} from 'antd'

class Shop extends Component {
    render() {
        return (
            <div className='shop'>
                <header className='header'>
                    <img src="//elm.cangdu.org/img/16da39cac7f55642.jpg" className='bg-img'/>
                    <Icon type='left' className='left'/>
                    <div className='des-header'>
                        <img src="//elm.cangdu.org/img/16da39cac7f55642.jpg" />
                        <div className='info-header'>
                            <p className='title'>北京烤鸭</p>
                            <p>商家配送/分钟配送/配送费￥5</p>
                            <p>公告：欢迎光临，用餐高峰请提前下单，谢谢</p>
                        </div>
                    </div>
                    <Icon type='right' className='right'/>
                </header>
                <div className='tab-div'>
                    <div>
                        <span className='tab active'>商品</span>
                    </div>
                    <div>
                        <span  className='tab'>评价</span>
                    </div>
                </div>
                <div className="food-container">
                    <div className="menu-container">
                        <div className='menu-left'>
                            <ul>
                                <li className='activity-menu menu-left-li'>
                                    <img src="https://fuss10.elemecdn.com/5/da/3872d782f707b4c82ce4607c73d1ajpeg.jpeg" alt=""/>
                                    <span>热销榜</span>
                                </li>
                                <li className='menu-left-li'>
                                    <img src="https://fuss10.elemecdn.com/4/73/5c4342691749b8e1a531149a46117jpeg.jpeg" alt=""/>
                                    <span>优惠</span>
                                </li>
                                <li className='menu-left-li'>
                                    <img src="" alt=""/>
                                    <span>123</span>
                                </li>
                                <li className='menu-left-li'>
                                    <img src="" alt=""/>
                                    <span>123</span>
                                </li>
                                <li className='menu-left-li'>
                                    <img src="" alt=""/>
                                    <span>123</span>
                                </li>
                                <li className='menu-left-li'>
                                    <img src="" alt=""/>
                                    <span>123</span>
                                </li>
                            </ul>
                        </div>
                        <div className='menu-right'>
                            <div className='menu-detail-header-left'>
                                <span className='menu-item-title'>热销榜</span>
                                <span>大家喜欢吃，才叫真实好吃</span>
                            </div>
                            <div>
                                <ul>
                                    <li>
                                        <div className="pic-div">
                                            <img src="" alt=""/>
                                        </div>
                                        <div className="menu-detail-list">
                                            <a className="menu-detail-link" href="#/shop/foodDetail">
                                                <div className="menu-food-img">
                                                    <img src="//elm.cangdu.org/img/16772d91c1823153.jpg" />
                                                </div>
                                                <div className="menu-food-description">
                                                    <h3 className="food-description-head"><strong
                                                        className="description-foodname">1231</strong>
                                                        <ul className="attributes-ul">
                                                            <li className=""><p>招牌</p></li>
                                                            <li className="attribute-new"><p>新</p></li>
                                                        </ul>
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
                                        <div className="menu-detail-list">
                                            <a className="menu-detail-link" href="#/shop/foodDetail">
                                                <div className="menu-food-img">
                                                    <img src="//elm.cangdu.org/img/16772d91c1823153.jpg" />
                                                </div>
                                                <div className="menu-food-description">
                                                    <h3 className="food-description-head"><strong
                                                        className="description-foodname">1231</strong>
                                                        <ul className="attributes-ul">
                                                            <li className="attribute-new"><p>新</p></li>
                                                        </ul>
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
                                </ul>
                            </div>
                        </div>
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
        )
    }
}


export default Shop

