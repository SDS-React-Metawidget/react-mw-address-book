/**
 * Created by alex on 28/09/2016.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import AddressBook from './components/AddressBook'

injectTapEventPlugin();

ReactDOM.render(
    <AddressBook/>,
    document.getElementById('root')
);
