import { SmileOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Form, Input, notification } from 'antd';
import axios from 'axios';
import React from "react";
import { Link } from 'react-router-dom';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const openNotification = error => {
  notification.open({
    message: 'Erro ao realizar login',
    description: error,
    icon: <SmileOutlined style={{ color: '#108ee9' }} />,
  });
};

const SignUp = props => {
  const onFinish = values => {
    axios.post('http://127.0.0.1:3000/user', { ...values })
      .then(user => {
        localStorage.setItem("user", JSON.stringify(user.data));
        props.history.push('/home');
      }).catch(err => openNotification(err));
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Card style={{ width: 800, marginLeft: 'auto', marginRight: 'auto', marginTop: 100 }}>

      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <center>
          <h2>Sign Up</h2>
        </center>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Cadastrar
          </Button>
        </Form.Item>

        <Link to="/">
          Sign in
        </Link>
      </Form>
    </Card>
  );
};

export default SignUp;
