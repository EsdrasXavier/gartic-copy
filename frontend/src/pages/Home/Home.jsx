import { Layout, Typography } from 'antd';
import React from 'react';
import Canvas from '../canvas/Canvas';

const { Title } = Typography;
const { Header, Footer, Sider, Content } = Layout;

const Home = props => {


  return (
    <Layout>
      <Header>
        <Title>
          Gortic
        </Title>
      </Header>

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