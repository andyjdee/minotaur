import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Container } from 'reactstrap';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import Aside from '../../components/Aside/Aside';
import Footer from '../../components/Footer/Footer';

import Dashboard from '../../views/Dashboard/Dashboard';

const Full = () => (
  <div className="app">
    <Header />
    <div className="app-body">
      <Sidebar {...this.props} />
      <main className="main">
        <Breadcrumb />
        <Container fluid>
          <Switch>
            <Route path="/dashboard" name="Dashboard" component={Dashboard} />
            <Redirect from="/" to="/dashboard" />
          </Switch>
        </Container>
      </main>
      <Aside />
    </div>
    <Footer />
  </div>
);

export default Full;
