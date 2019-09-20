import React from 'react'
import { Form, Icon, Input, Button, Col } from 'antd';
import Header from "../../components/header/header"
import './login.less'
import API from '../../api/api'
import {saveUserInfo} from "../../store/action"
import {connect} from 'react-redux'
import {setStore} from "../../utils/commons"

class NormalLoginForm extends React.Component {

    state={
        code:''
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async(err, values) => {
            if (!err) {
                console.log(values)

                const result=await API.accountLogin(values);
                console.log(result)
                this.props.saveUserInfo(result)
                setStore('user_id',result.user_id)
                this.props.history.push('/profile')
            }
        });
    };

    getCaptchaCode=async()=>{
        const result = await API.getCaptchaCode()
        console.log(result)
        this.setState({
            code:result.code
        })
    }

    componentDidMount() {
        this.getCaptchaCode()
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Header title='密码登录'/>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: '请输入账号' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="账号"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="密码"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Col span={12}>
                            {getFieldDecorator('captcha_code', {
                                rules: [{ required: true, message: '请输入验证码' }],
                            })(<Input
                                placeholder='验证码'
                            />)}
                        </Col>
                        <Col span={12}>
                            <img src={this.state.code} onClick={this.getCaptchaCode}/>
                        </Col>
                    </Form.Item>
                    <Form.Item>
                        <p className="login-tips">温馨提示: 未注册过的账号, 登录时自动注册</p>
                        <p className="login-tips">注册过的用户可凭证账号密码登录</p>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>

        );
    }
}

const Login = Form.create({ name: 'normal_login' })(NormalLoginForm);

const mapStateToProps=(state)=>{
    return {
        userInfo:state.userInfo.username
    }
}

const mapDispatchToProps=(dispatch)=>{
    return {
        saveUserInfo:(userInfo)=>dispatch(saveUserInfo(userInfo))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Login)