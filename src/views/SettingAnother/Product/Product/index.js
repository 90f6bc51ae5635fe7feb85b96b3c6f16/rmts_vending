import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

const View = React.lazy(() => import('./view'));
const Insert = React.lazy(() => import('./insert'));
const Update = React.lazy(() => import('./update'));
const Detail = React.lazy(() => import('./detail'));


class Product extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/settinganother/product/product/detail/:code" render={props => <Detail {...props} />} />
                <Route exact path="/settinganother/product/product/update/:code" render={props => <Update {...props} />} />
                <Route exact path="/settinganother/product/product/insert" render={props => <Insert {...props} />} />
                <Route path="/settinganother/product/product" render={props => <View {...props} />} />
            </Switch>
        )
    }
}
export default (Product);