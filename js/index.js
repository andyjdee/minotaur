import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';

// Styles
import 'flag-icon-css/css/flag-icon.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'simple-line-icons/css/simple-line-icons.css';
import '../scss/style.scss';

// Containers
import Full from './containers/Full/Full';

ReactDOM.render(
  (
    <HashRouter>
      <Switch>
        <Route path="/" name="Home" component={Full} />
      </Switch>
    </HashRouter>
  ), document.getElementById('root'),
);
