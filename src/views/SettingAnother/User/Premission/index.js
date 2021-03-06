import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

const View = React.lazy(() => import('./view'));
const Insert = React.lazy(() => import('./insert'));
const Update = React.lazy(() => import('./update'));



class Premission extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/settinganother/user/premission/update/:code" render={props => <Update {...props} />} />
                <Route exact path="/settinganother/user/premission/insert" render={props => <Insert {...props} />} />
                <Route path="/settinganother/user/premission" render={props => <View {...props} />} />
            </Switch>
        )
    }
}
export default (Premission);