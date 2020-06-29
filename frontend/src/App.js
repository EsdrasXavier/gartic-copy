import { Layout } from 'antd';
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AddObjects from './components/AddObjects/AddObjects';
import AddTheme from './components/AddTheme/AddTheme';
import Home from './components/Home/Home';
import Navbar from './components/Navbar';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';


const { Header, Content } = Layout;

const RouterApp = () => {
  return (
    <Fragment>
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/admin/addtheme" component={AddTheme} />
        <Route exact path="/admin/addobjects" component={AddObjects} />
        <Route exact path="/" component={SignIn} />
      </Switch >
    </Fragment>
  );
}

const App = props => {
  return (
    <Router >
      <Layout>
        <Header>
          <Navbar />
        </Header>
        <Content>
          <RouterApp />
        </Content>
      </Layout>
    </Router>
  );
}

export default App;

