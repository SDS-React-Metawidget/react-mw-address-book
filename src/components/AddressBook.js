/**
 * Created by alex on 28/09/2016.
 */

import React, {Component, PropTypes} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class AddressBook extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <h1>Hello, awesome world!</h1>
            </MuiThemeProvider>
        )
    }
}
