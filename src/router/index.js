import React,{Component} from 'react'
import {HashRouter,Switch,Route,Redirect} from 'react-router-dom'
import asyncComponent from "../utils/asyncComponent"
const profile =asyncComponent(()=>import('../pages/profile/profile'))
const login=asyncComponent(()=>import('../pages/login/login'))
const info=asyncComponent(()=>import('../pages/info/info'))
const setUser=asyncComponent(()=>import('../pages/set_user/set_user'))
const msite=asyncComponent(()=>import('../pages/msite/msite'))
const food=asyncComponent(()=>import('../pages/food/food'))
const shop=asyncComponent(()=>import('../pages/shop/shop'))

export default class RouteConfig extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/profile" exact component={profile}/>
                    <Route path='/login' component={login}/>
                    <Route path='/info' component={info}/>
                    <Route path='/setuser' component={setUser}/>
                    <Route path='/msite' component={msite}/>
                    <Route path='/food/:geohash/:id/:title' component={food}/>
                    <Route path='/shop/:id' component={shop}/>
                    <Redirect exact from='/' to='/profile'/>
                    <Route component={profile}/>
                </Switch>
            </HashRouter>
        )
    }
}








