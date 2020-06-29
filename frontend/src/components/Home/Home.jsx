import { Layout } from 'antd';
import React from 'react';
import Canvas from '../canvas/Canvas';

const { Footer, Sider, Content } = Layout;

const Home = props => {


  return (
    <Layout>
      <Layout>
        <Content id="main-canvas">
          <Canvas />
        </Content>
        <Sider>Sider</Sider>
      </Layout>

      <Footer>
        Footer
      </Footer>
    </Layout>
  );
}

export default Home;