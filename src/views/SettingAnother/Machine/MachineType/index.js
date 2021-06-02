import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

const View = React.lazy(() => import('./view'));
const Insert = React.lazy(() => import('./insert'));
const Update = React.lazy(() => import('./update'));
// const Stock = React.lazy(() => import('./Stock'));
// const Product = React.lazy(() => import('./Product'));

class MachineType extends Component {
    render() {
        return (
            <Switch>
                {/* <Route exact path="/settinganother/product" render={props => <Product {...props} />} />
                <Route exact path="/settinganother/stock" render={props => <Stock {...props} />} /> */}
                <Route exact path="/settinganother/machine/machinetype/update/:code" render={props => <Update {...props} />} />
                <Route exact path="/settinganother/machine/machinetype/insert" render={props => <Insert {...props} />} />
                <Route path="/settinganother/machine/machinetype" render={props => <View {...props} />} />
            </Switch>
        )
    }
}
export default (MachineType);