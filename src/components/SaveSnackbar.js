/**
 * Created by alex on 28/09/2016.
 */

import React, {Component, PropTypes} from 'react';
import Snackbar from 'material-ui/Snackbar'
import Done from 'material-ui/svg-icons/action/done'
import Loop from 'material-ui/svg-icons/av/loop'
import {grey50} from 'material-ui/styles/colors';


export default class SaveSnackbar extends Component {
    constructor(props) {
        super(props)

        this.handleSnackbarClose = this.handleSnackbarClose.bind(this)

        this.state = {
            open: this.props.open,
            message: this.props.message,
            icons: {
                loop: (
                    <Loop
                        key="loop"
                        className="icon--spin"
                        color={grey50}
                        style={{marginRight: 10}}
                    />
                )
            },
            icon: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.message !== this.state.message || nextProps.open !== this.state.open)
            this.setState({
                open: nextProps.open,
                message: nextProps.message,
                icon: this.state.icons.loop
            })
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState !== this.state
    }

    handleSnackbarClose(e) {
        this.setState({
            open: false,
            message: ''
        })
    }

    render() {
        return (
            <Snackbar
                open={this.state.open}
                message={(
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        {this.state.icon}

                        {this.state.message}
                    </div>
                )}
                autoHideDuration={1000}
                onRequestClose={this.handleSnackbarClose}
            />
        )
    }
}
