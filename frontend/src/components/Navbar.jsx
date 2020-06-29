import {
  MenuFoldOutlined, MenuUnfoldOutlined,
  PieChartOutlined,
  ToolOutlined
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useRef } from 'react';

const { SubMenu } = Menu;

const Navbar = props => {
  const [collapsed, setCollapsed] = useState(true);
  const [user, setUser] = useState(null);
  const _userTime = useRef(null);

  const checkUser = () => {
    const data = JSON.parse(localStorage.getItem('user'));
    if (data.hasOwnProperty('email')) {
      setUser(data);
      clearInterval(_userTime.current);
    }
  }

  useEffect(() => {
    if (!_userTime.current)
      _userTime.current = setInterval(checkUser, 800);
  }, [props]);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  };

  if (user == null) {
    return null;
  }

  console.log(user)

  return (
    <div style={{ width: 256, right: 0 }}>
      <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16, float: 'left' }}>
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
      </Button>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
      >
        <Menu.Item key="1" icon={<PieChartOutlined />}>
          <Link to="/home">
            New theme
            </Link>
        </Menu.Item>

        {user.role === 'admin' ? (
          <SubMenu key="sub1" icon={<ToolOutlined />} title="Admin">
            <Menu.Item key="5">
              <Link to="/admin/addtheme">
                New theme
              </Link>
            </Menu.Item>
            <Menu.Item key="6">
              <Link to="/admin/addobjects">
                New Object
                </Link>
            </Menu.Item>
          </SubMenu>
        ) : null
        }

      </Menu>
    </div>
  );
}


export default Navbar;