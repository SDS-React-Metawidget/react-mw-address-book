/**
 * Created by alex on 28/09/2016.
 */

import React, { Component, PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Header from './Header'
import AddressList from './AddressList'

export default class AddressBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeRoute: <AddressList/>
        };
    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <Header/>

                    {this.state.activeRoute}
                </div>
            </MuiThemeProvider>
        )
    }
}
