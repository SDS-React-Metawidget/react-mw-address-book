/**
 * Created by alex on 28/09/2016.
 */

import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';

export default class Header extends Component {
    render() {
        return (
            <AppBar
                title="MetaWidget Address Book"
                showMenuIconButton={false}
            />
        )
    }
}
