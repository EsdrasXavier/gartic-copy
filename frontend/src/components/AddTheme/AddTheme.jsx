import { SmileOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, List, Modal, notification, Typography } from 'antd';
import axios from 'axios';
import React, { useEffect, useRef, useState } from "react";

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

const successNotification = (message, description) => {
  notification.open({
    message,
    description,
    icon: <SmileOutlined style={{ color: '#108ee9' }} />,
  });
};

const URL = 'http://127.0.0.1:3000/theme';

const AddTheme = props => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(null);
  const newName = useRef();

  useEffect(() => {
    axios.get(URL)
      .then(themes => {
        setData(themes.data);
      }).catch(err => openNotification(err));
  }, [props])

  const deleteItem = itemId => {
    axios.delete(`${URL}/${itemId}`)
      .then(() => {
        setData(data.filter(({ id }) => id !== itemId));
        successNotification('Success', 'Theme was successfuly deleted.');
      }).catch(err => openNotification(err));
  }

  const onFinish = values => {
    axios.post(URL, { name: values.theme })
      .then(theme => {
        successNotification('Success', 'Theme was successfuly created.');
        setData([...data, theme.data]);
      }).catch(err => openNotification(err));
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const updateTheme = ({ id, name }) => {
    axios.put(`${URL}/${id}`, { name })
      .then(theme => {
        const value = theme.data;
        setData(data.map(item => item.id === id ? value : item));
        successNotification('Success', 'Theme was successfuly updated.');
      }).catch(err => openNotification(err));
  }

  const handleOk = e => {
    updateTheme({ id: showModal.id, name: newName.current.state.value });
    setShowModal(null);
  };

  const handleCancel = e => {
    setShowModal(null);
  };

  return (
    <Card style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto', marginTop: 100 }}>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <center>
          <h2>Add a new theme</h2>
        </center>
        <Form.Item
          label="Theme name"
          name="theme"
          rules={[{ required: true, message: 'Please input your theme!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>

      <List
        header={<div>Themes</div>}
        bordered
        dataSource={data}
        renderItem={item => (
          <List.Item actions={[
            <a onClick={() => setShowModal(item)} key="list-loadmore-edit">Edit</a>,
            <a onClick={() => deleteItem(item.id)} key="list-loadmore-edit">Delete</a>,
          ]}>
            <Typography.Text mark>[THEME]</Typography.Text> {item.name}
          </List.Item>
        )}
      />

      {showModal === null ? null :
        <Modal
          title="Edit item"
          visible={showModal !== null}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form.Item
            label="Theme name"
            name="theme"
            rules={[{ required: true, message: 'Please input your theme!' }]}
          >
            <Input ref={newName} defaultValue={showModal.name} />
          </Form.Item>
        </Modal>
      }
    </Card>
  );
};

export default AddTheme;
