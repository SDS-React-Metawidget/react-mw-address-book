/**
 * Created by alex on 28/09/2016.
 */

import React, {Component, PropTypes} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Header from './Header'
import AddressList from './AddressList'
import EditAddress from './EditAddress'

export default class AddressBook extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contacts: this.props.addresses,
            activeContact: {name: ''},
            routes: {
                addressList: {
                    route: () => (
                        <AddressList
                            addresses={this.state.contacts}
                            handleRoute={this.handleRoute}
                        />
                    ),
                    title: () => 'MetaWidget Address Book',
                    showMenuIconButton: false
                },
                editAddress: {
                    route: (address) => (
                        <EditAddress
                            address={this.state.activeContact}
                            handleEditAddress={this.handleEditAddress}
                        />
                    ),
                    title: () => `Edit ${this.state.activeContact.name}`,
                    showMenuIconButton: true
                }
            }
        };

        this.handleRoute = this.handleRoute.bind(this)
        this.handleEditAddress = this.handleEditAddress.bind(this)
    }

    componentWillMount() {
        this.setState({
            activeRoute: this.state.routes.addressList
        })
    }

    handleRoute(e) {
        e.preventDefault()
        let route = e.currentTarget.dataset.route
        let contact = e.currentTarget.dataset.contact
        this.setState({
            activeRoute: this.state.routes[route],
            activeContact: this.state.contacts.filter((el) => el.id === contact)[0]
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
                    <Header
                        title={this.state.activeRoute.title()}
                        showMenuIconButton={this.state.activeRoute.showMenuIconButton}
                        handleRoute={this.handleRoute}
                    />

                    {this.state.activeRoute.route(this.state.activeContact)}
                </div>
            </MuiThemeProvider>
        )
    }
}
