import React,{Component} from 'react'
import Header from '../../components/header/header'
import ShopList from "../../components/shop_list/shop_list"
import './food.less'

class Food extends Component {

   goBack=()=>{
       this.props.history.push('/msite')
   }

    render() {
        return (
            <div className='food'>
                <Header title={this.props.match.params.title} goBack={this.goBack}/>
                <ShopList geohash={this.props.match.params.geohash.split(',')}/>
            </div>
        )
    }
}

export default Food
