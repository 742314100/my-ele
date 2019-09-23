import React,{Component} from 'react'
import {Switch,Route} from 'react-router-dom'
import Address from './address/address'
import Add from "./add/add"
import AddDetail from "./add_detail/add_detail"

class SetUser extends Component {

    componentDidMount() {
        console.log(this.props.match)
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route path={`${this.props.match.path}/address`} component={Address}/>
                    <Route path={`${this.props.match.path}/add/:type`} component={Add}/>
                    <Route path={`${this.props.match.path}/add_detail`} component={AddDetail}/>
                </Switch>
            </div>
        )
    }
}

export default SetUser