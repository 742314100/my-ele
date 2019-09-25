import React,{Component} from 'react'
import {Icon} from 'antd'
import './address.less'
import {Link} from 'react-router-dom'
import API from '../../../api/api'
import {getStore} from "../../../utils/commons"
import {saveAttrInfo} from "../../../store/action"
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {is,fromJS} from 'immutable'

class Address extends Component {

    static propTypes={
        saveAttrInfo:PropTypes.func.isRequired,
        hasAddressList: PropTypes.array,
        operate:PropTypes.string
    }

    getAddress=async()=>{
        let result=await API.getAddress(getStore('user_id'))
        this.props.saveAttrInfo('addressList',result)
    }

    componentDidMount() {
        this.getAddress()
        console.log(this.props.hasAddressList)
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !is(fromJS(this.props),fromJS(nextState)) || !is(fromJS(this.state),fromJS(nextState))
    }

    render() {
        return(
            <div className='address'>
                <ul>
                    {
                        this.props.hasAddressList.map((item,index)=>{
                            return (
                                <li key={index} className='newAddress'>
                                    <p>{item.address}</p>
                                    <p>
                                        <span>{item.telenum}</span>
                                        <span>
                                            {
                                                item.standbytelenum &&
                                                    <span>,{item.standbytelenum}</span>
                                            }
                                        </span>
                                    </p>
                                </li>
                            )
                        })
                    }
                </ul>
                <ul className='listul'>
                    <Link to='/setuser/add/fromadd'>
                        <li className='list'>
                            新增地址
                            <Icon type='right' className='right'/>
                        </li>
                    </Link>
                </ul>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        hasAddressList: state.hasAddressList,
        operate:state.operate
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveAttrInfo: (attr, addressList) => dispatch(saveAttrInfo(attr, addressList))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Address)