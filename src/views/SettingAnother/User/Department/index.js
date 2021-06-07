import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

const View = React.lazy(() => import('./view'));
const Insert = React.lazy(() => import('./insert'));
const Update = React.lazy(() => import('./update'));



class Department extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/settinganother/user/department/update/:code" render={props => <Update {...props} />} />
                <Route exact path="/settinganother/user/department/insert" render={props => <Insert {...props} />} />
                <Route path="/settinganother/user/department" render={props => <View {...props} />} />
            </Switch>
        )
    }
}
export default (Department);