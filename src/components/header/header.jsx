import React,{Component} from 'react'
import PropTypes from 'prop-types'
import './header.less'
import {Icon} from 'antd'

export default class Header extends Component {

    static propTypes={
        title:PropTypes.string.isRequired
    }

    back=()=>{
        console.log('back')
    }

    render(){
        return (
            <div onClick={this.back} title={this.props.title} className='header'>
                <Icon type='left' className='left'/>
                <span className='title'>{this.props.title}</span>
            </div>
        )
    }
}

