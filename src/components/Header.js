/**
 * Created by alex on 28/09/2016.
 */

import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

export default class Header extends Component {
    render() {
        return (
            <AppBar
                title={this.props.title}
                titleStyle={{textAlign: 'center'}}
                showMenuIconButton={this.props.showMenuIconButton}
                iconElementLeft={(
                    <IconButton
                        onClick={this.props.handleRoute}
                        data-route="addressList"
                    >
                        <NavigationArrowBack />
                    </IconButton>
                )}
                iconElementRight={this.props.iconElementRight}
            />
        )
    }
}
