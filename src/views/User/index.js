import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

const View = React.lazy(() => import('./view'));
const Insert = React.lazy(() => import('./insert'));
const Update = React.lazy(() => import('./update'));

class User extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/user/insert" render={props => <Insert {...props} />} />
        <Route exact path="/user/update/:user_id" render={props => <Update {...props} />} />
        <Route path="/user" render={props => <View {...props} />} />
      </Switch>
    )
  }
}
export default (User);
