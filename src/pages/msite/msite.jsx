import React,{Component} from 'react'
import Header from '../../components/header/header'
import API from '../../api/api'
import {connect} from 'react-redux'
import {saveAttrInfo} from "../../store/action"
import PropTypes from 'prop-types'
import Swiper from 'swiper'
import "swiper/css/swiper.css";
import {Link} from 'react-router-dom'
import Footer from '../../components/footer/footer'
import './msite.less'
import ShopList from '../../components/shop_list/shop_list'
import {Icon} from 'antd'

class Msite extends Component {

    static propTypes={
        saveAttrInfo:PropTypes.func.isRequired
    }

    state={
        title:'',
        geohash: [],
        footTypes:[],
        imgBaseUrl: "https://fuss10.elemecdn.com"
    }

    getPoisSite=async(geohash)=>{
        let res=await API.getPoisSite(geohash)
        console.log(res)
        this.setState({
            title:res.name
        })
    }

    getFoodTypes=async()=>{
        let data={
            geohash:this.state.geohash,
            'flag[]':'F',
            group_type:1
        }
        let res=await API.getFoodTypes(data);
        let resLength=res.length
        let resArr=[...res]
        let foodArr=[]
        for(let i=0,j=0;i<resLength;i+=8,j++){
            foodArr[j]=resArr.splice(0,8)
        }



        this.setState({
            footTypes:foodArr
        })

        new Swiper('.swiper-container',{
            pagination:{
                el:'.swiper-pagination'
            },
            loop:true
        })
    }

    cityGuess=async()=>{
        let res={
            abbr: "BJ",
            area_code: "010",
            id: 3,
            is_map: true,
            latitude: 39.90469,
            longitude: 116.407173,
            name: "北京",
            pinyin: "beijing",
            sort: 2000
        }
        this.setState({
            geohash:[res.latitude,res.longitude]
        })
        this.props.saveAttrInfo('geohash',[res.latitude,res.longitude])
        this.getPoisSite([res.latitude,res.longitude])
        this.getFoodTypes()
    }

    getCategoryId(url){
        let urlData = decodeURIComponent(url.split('=')[1].replace('&target_name',''));
        if (/restaurant_category_id/gi.test(urlData)) {
            return JSON.parse(urlData).restaurant_category_id.id
        }else{
            return 270
        }
    }


    componentDidMount() {
        this.cityGuess()
    }

    render() {
        return (
            <div className='msite'>
                <Header title={this.state.title} signUp={true} />
                <div>
                    <div className="swiper-container">
                        <div className="swiper-wrapper">
                            {
                                this.state.footTypes.map((foodItem,index)=>{
                                    return (
                                        <div className="swiper-slide" key={index}>
                                            {
                                                foodItem.map((item,index)=>{
                                                    return (
                                                        <Link key={index} to={`/food/${this.state.geohash}/${this.getCategoryId(item.link)}/${item.title}`} className='link'>
                                                            <figure>
                                                                <img src={this.state.imgBaseUrl + item.image_url} className="img"/>
                                                                <figcaption>
                                                                    {item.title}
                                                                </figcaption>
                                                            </figure>
                                                        </Link>
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="swiper-pagination"></div>
                    </div>
                    <div className="title">
                        <Icon type='shop' className='shop'/>
                        <span>附近商家</span>
                    </div>
                    <ShopList geohash={this.state.geohash}/>
                <Footer />
            </div>
            </div>
        )

    }
}

const mapDispatchToProps=(dispatch)=>{
    return {
        saveAttrInfo:(attr,val)=>dispatch(saveAttrInfo(attr,val))
    }
}

const mapStateToProps=(state)=>{
    return {

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Msite)
