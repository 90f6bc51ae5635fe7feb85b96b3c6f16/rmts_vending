import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

const View = React.lazy(() => import('./view'));
const Insert = React.lazy(() => import('./insert'));
const Update = React.lazy(() => import('./update'));

class User extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/settinganother/user/user/update/:code" render={props => <Update {...props} />} />
                <Route exact path="/settinganother/user/user/insert" render={props => <Insert {...props} />} />
                <Route path="/settinganother/user/user" render={props => <View {...props} />} />
            </Switch>
        )
    }
}
export default (User);