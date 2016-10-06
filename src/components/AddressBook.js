/**
 * Created by alex on 28/09/2016.
 */

import React, {Component, PropTypes} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton'

import Header from './Header'
import AddressList from './AddressList'
import EditAddress from './EditAddress'

export default class AddressBook extends Component {
    constructor(props) {
        super(props);

        this.handleRoute = this.handleRoute.bind(this)
        this.handleEditAddress = this.handleEditAddress.bind(this)
        this.handleDeleteContact = this.handleDeleteContact.bind(this)

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
                    route: () => (
                        <EditAddress
                            address={this.state.activeContact}
                            handleEditAddress={this.handleEditAddress}
                        />
                    ),
                    title: () => `Edit ${this.state.activeContact.name}`,
                    showMenuIconButton: true,
                    iconElementRight: (
                        <FlatButton
                            label="Delete"
                            onClick={this.handleDeleteContact}
                        />
                    )
                }
            }
        };
    }

    componentWillMount() {
        this.setState({
            activeRoute: this.state.routes.addressList,
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

    handleDeleteContact(e) {
        e.preventDefault()
        let contactId = document.querySelector('#editContactContainer').dataset.contact
        this.setState({
            contacts: this.state.contacts
                .map((address) => {
                    if (address.id !== contactId)
                        return address
                })
                .filter((address) => address !== undefined),
            activeRoute: this.state.routes['addressList'],
            activeContact: {name: ''}
        }, () => this.saveToFile())
    }

    handleEditAddress(e) {
        e.preventDefault()
        let contactId = document.querySelector('#editContactContainer').dataset.contact

        this.setState({
            contacts: this.state.contacts.map((address) => {
                if (address.id === contactId)
                    address[e.currentTarget.name] = e.currentTarget.value
                return address
            })
        }, () => this.saveToFile())
    }

    saveToFile() {
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
                        iconElementRight={this.state.activeRoute.iconElementRight}
                        handleRoute={this.handleRoute}
                        handleDeleteContact={this.handleDeleteContact}
                    />

                    {this.state.activeRoute.route()}
                </div>
            </MuiThemeProvider>
        )
    }
}
