import React,{Component} from 'react'
import Header from '../../components/header/header'
import ShopList from "../../components/shop_list/shop_list"
import './food.less'

class Food extends Component {


    render() {
        return (
            <div className='food'>
                <Header title='' />
                <ShopList geohash={this.props.match.params.geohash.split(',')}/>
            </div>
        )
    }
}

export default Food
