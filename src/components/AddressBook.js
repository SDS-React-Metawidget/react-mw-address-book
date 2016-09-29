/**
 * Created by alex on 28/09/2016.
 */

import React, {Component, PropTypes} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Header from './Header'

export default class AddressBook extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <Header/>

                    {this.props.children}
                </div>
            </MuiThemeProvider>
        )
    }
}
