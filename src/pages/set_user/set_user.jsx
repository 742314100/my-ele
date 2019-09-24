import React,{Component} from 'react'
import {Switch,Route} from 'react-router-dom'
import Address from './address/address'
import Add from "./add/add"
import AddDetail from "./add_detail/add_detail"
import Header from '../../components/header/header'
import {is,fromJS} from 'immutable'

class SetUser extends Component {

    state={
        title:'',
        type:''
    }

    initData=(props)=>{
        let type=props.history.location.pathname.split('/')[2]
        let title=''
        switch(type){
            case 'name':
                title='修改用户名'
                break
            case 'address':
                title='编辑地址'
                break
            case 'add':
                title='新增地址'
                break
            case 'add_detail':
                title='搜索地址'
                break
            default:
                title=''
        }
        this.setState({
            title,
            type
        })
    }

    goBack=()=>{
        let path=this.props.location.pathname.split('/')[2]
        if(path === 'add'){
            this.props.history.push('/setuser/address')
        }else if(path === 'address'){
            this.props.history.push('/info')
        }else{
            this.props.history.goBack()
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(!is(fromJS(this.props.location.pathname),fromJS(nextProps.location.pathname))){
            this.initData(this.props)
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !is(fromJS(this.props),fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
    }

    componentDidMount() {
       this.initData(this.props)
    }

    render() {
        return (
            <div>
                <Header title={this.state.title} goBack={this.goBack}/>
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