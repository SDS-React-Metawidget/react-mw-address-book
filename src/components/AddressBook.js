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
            contacts: this.props.addresses,
            routes: {
                addressList: () => (
                    <AddressList
                        addresses={this.state.contacts}
                        handleRoute={this.handleRoute}
                    />
                ),
                editAddress: (address) => (
                    <EditAddress
                        address={this.state.contacts.filter((el) => el.id === address)[0]}
                        handleEditAddress={this.handleEditAddress}
                    />
                )
            }
        };

        this.handleRoute = this.handleRoute.bind(this)
        this.handleEditAddress = this.handleEditAddress.bind(this)
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

    handleEditAddress(e) {
        e.preventDefault()
        let field = {},
            contactId = document.querySelector('#editContactContainer').dataset.contact

        this.setState({
            contacts: this.state.contacts.map((address) => {
                if (address.id === contactId)
                    address[e.currentTarget.name] = e.currentTarget.value
                return address
            })
        })

        localStorage.setItem(
            'addresses',
            JSON.stringify(this.state.contacts)
        )
    }

    componentWillUnmount() {
        console.log(this.state.contacts)
        localStorage.setItem(
            'addresses',
            JSON.stringify(this.state.contacts)
        )
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
