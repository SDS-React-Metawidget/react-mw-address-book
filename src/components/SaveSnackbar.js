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
        this.handleDoneTimeout = this.handleDoneTimeout.bind(this)

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
                ),
                done: (
                    <Done
                        key="done"
                        color={grey50}
                        style={{marginRight: 10}}
                    />
                )
            },
            icon: ''
        }
    }

    componentWillMount() {
        this.doneTimeout = ''
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.message !== this.state.message || nextProps.open !== this.state.open)
            this.setState({
                open: nextProps.open,
                message: nextProps.message,
                icon: this.state.icons.loop
            })

        if (this.state.open || nextProps.open) {
            clearTimeout(this.doneTimeout)
            this.createDoneTimeout()
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState !== this.state
    }

    componentWillUpdate(nextProps, nextState) {

    }

    createDoneTimeout() {
        this.doneTimeout = setTimeout(this.handleDoneTimeout, 1000)
    }

    handleDoneTimeout() {
        this.setState({
            open: true,
            message: 'Done',
            icon: this.state.icons.done
        }, () => setTimeout(this.handleSnackbarClose, 2000))
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
                autoHideDuration={10000}
                onRequestClose={this.handleSnackbarClose}
            />
        )
    }
}
