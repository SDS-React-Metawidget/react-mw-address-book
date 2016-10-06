/**
 * Created by alex on 28/09/2016.
 */

import React, { Component, PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Header from './Header'
import AddressList from './AddressList'
import EditAddress from './EditAddress'

export default class AddressBook extends Component {
    constructor(props) {
        super(props);

        this.state = {
            routes: {
                addressList: () => (
                    <AddressList
                        addresses={this.props.addresses}
                        handleRoute={this.handleRoute}
                    />
                ),
                editAddress: (address) => (
                    <EditAddress
                        address={this.props.addresses.filter((el) => el.id === address)[0]}
                        addresses={this.props.addresses}
                    />
                )
            }
        };

        this.handleRoute = this.handleRoute.bind(this)
    }

    componentWillMount() {
        this.setState({
            activeRoute: this.state.routes.addressList()
        })
    }

    handleRoute(e) {
        e.preventDefault()
        let route = e.currentTarget.dataset.route
        let contact = e.currentTarget.dataset.contact
        this.setState({
            activeRoute: this.state.routes[route](contact === undefined ? null : contact)
        })
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
