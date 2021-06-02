import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

const View = React.lazy(() => import('./view'));
const Insert = React.lazy(() => import('./insert'));
const Update = React.lazy(() => import('./update'));


class Machine extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/settinganother/machine/machine/update/:code" render={props => <Update {...props} />} />
                <Route exact path="/settinganother/machine/machine/insert" render={props => <Insert {...props} />} />
                <Route path="/settinganother/machine/machine" render={props => <View {...props} />} />
            </Switch>
        )
    }
}
export default (Machine);