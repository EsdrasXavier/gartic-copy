import { SmileOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, List, Modal, notification, Select, Typography } from 'antd';
import axios from 'axios';
import React, { useEffect, useRef, useState } from "react";

const { Option } = Select;
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

const THEME_URL = 'http://127.0.0.1:3000/theme';

const AddObjects = props => {
  const [themes, setThemes] = useState([]);
  const [objects, setObjects] = useState([]);
  const [showModal, setShowModal] = useState(null);
  const newName = useRef();

  useEffect(() => {
    axios.get(THEME_URL)
      .then(res => {
        setThemes(res.data);
      }).catch(err => openNotification(err));
  }, [props])

  const deleteItem = itemId => {
    axios.delete(`http://127.0.0.1:3000/drawnoption/${itemId}`)
      .then(() => {
        setObjects(objects.filter(({ id }) => id !== itemId));
        successNotification('Success', 'Theme was successfuly deleted.');
      }).catch(err => openNotification(err));
  }

  const onFinish = values => {
    axios.post(`${THEME_URL}/${values.theme}/drawnoption`, { name: values.object })
      .then(res => {
        successNotification('Success', 'Theme was successfuly created.');
        setObjects([...objects, res.data]);
      }).catch(err => openNotification(err));
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const updateObject = ({ id, name }) => {
    axios.put(`http://127.0.0.1:3000/drawnoption/${id}`, { name })
      .then(res => {
        const value = res.data;
        setObjects(objects.map(item => item.id === id ? value : item));
        successNotification('Success', 'Theme was successfuly updated.');
      }).catch(err => openNotification(err));
  }

  const handleOk = e => {
    updateObject({ id: showModal.id, name: newName.current.state.value });
    setShowModal(null);
  };

  const handleCancel = e => {
    setShowModal(null);
  };

  const onSelectChange = value => {
    axios.get(`${THEME_URL}/${value}/drawnoption`)
      .then(res => {
        setObjects(res.data);
      }).catch(err => openNotification(err));
  };

  return (
    <Card style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto', marginTop: 50 }}>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <center>
          <h2>Add a new Object</h2>
        </center>

        <Form.Item
          label="Select the theme"
          name="theme"
          rules={[{ required: true, message: 'Please input your theme!' }]}
        >
          {themes.length > 0 ? (
            <Select
              onChange={onSelectChange}
            >
              {themes.map(({ id, name }) => (
                <Option key={id} value={id}>{name}</Option>
              ))}
            </Select>
          ) : null}

        </Form.Item>

        <Form.Item
          label="Object name"
          name="object"
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
        dataSource={objects}
        renderItem={item => (
          <List.Item actions={[
            <a onClick={() => setShowModal(item)} key="list-loadmore-edit">Edit</a>,
            <a onClick={() => deleteItem(item.id)} key="list-loadmore-edit">Delete</a>,
          ]}>
            <Typography.Text mark>[THEME]</Typography.Text> {item.object}
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
            <Input ref={newName} defaultValue={showModal.object} />
          </Form.Item>
        </Modal>
      }
    </Card>
  );
};

export default AddObjects;
