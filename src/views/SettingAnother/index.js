import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

const View = React.lazy(() => import('./view'));
const Machine = React.lazy(() => import('./Machine'));
const User = React.lazy(() => import('./User'));
const Stock = React.lazy(() => import('./Stock'));
const Product = React.lazy(() => import('./Product'));

class SettingAnother extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/settinganother/product" render={props => <Product {...props} />} />
        <Route exact path="/settinganother/stock" render={props => <Stock {...props} />} />
        <Route exact path="/settinganother/user" render={props => <User {...props} />} />
        <Route exact path="/settinganother/machine" render={props => <Machine {...props} />} />
        <Route path="/settinganother" render={props => <View {...props} />} />
      </Switch>
    )
  }
}
export default (SettingAnother);
