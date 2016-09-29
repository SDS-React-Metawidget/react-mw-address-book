/**
 * Created by alex on 28/09/2016.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin';

import AddressBook from './components/AddressBook'
import AddressList from './components/AddressList'
import EditAddress from './components/EditAddress'

injectTapEventPlugin();

ReactDOM.render(
    (
        <Router history={browserHistory}>
            <Route path="/" component={AddressBook}>
                <Route path="addresses" component={AddressList}/>
                <Route path="edit-address" component={EditAddress}/>
            </Route>
        </Router>
    ),
    document.getElementById('root')
);
