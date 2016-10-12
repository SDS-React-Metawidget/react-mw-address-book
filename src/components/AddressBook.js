/**
 * Created by alex on 28/09/2016.
 */

import React, {Component, PropTypes} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton'

import Header from './Header'
import AddressList from './AddressList'
import EditAddress from './EditAddress'
import AddAddress from './AddAddress'
import SaveSnackbar from './SaveSnackbar'

export default class AddressBook extends Component {
    constructor(props) {
        super(props);

        this.handleRoute = this.handleRoute.bind(this)
        this.handleEditAddress = this.handleEditAddress.bind(this)
        this.handleAddAddress = this.handleAddAddress.bind(this)
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
                    title: () => `${this.state.activeContact.name}`,
                    showMenuIconButton: true,
                    iconElementRight: (
                        <FlatButton
                            label="Delete"
                            onClick={this.handleDeleteContact}
                            style={{marginLeft: -40}}
                        />
                    )
                },
                addAddress: {
                    route: () => (
                        <AddAddress
                            address={{}}
                            handleAddAddress={this.handleAddAddress}
                        />
                    ),
                    title: () => 'New Contact',
                    showMenuIconButton: true,
                }
            },
            snackbarOpen: false,
            snackbarMessage: 'edit',
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
            snackbarOpen: false,
            activeRoute: this.state.routes[route],
            activeContact: this.state.contacts.filter((el) => el.id === contact)[0]
        })
    }

    handleDeleteContact(e) {
        e.preventDefault()
        let contactId = document.querySelector('#editContactContainer').dataset.contact
        this.setState({
            snackbarOpen: true,
            snackbarMessage: 'Deleting contact',
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
            snackbarOpen: true,
            snackbarMessage: 'Saving contact',
            contacts: this.editAddress(contactId, e.currentTarget.name, e.currentTarget.value)
        }, () => this.saveToFile())
    }

    handleAddAddress(e) {
        e.preventDefault()
        // var newId = "c1000"//this.generateId()

        let contactId = document.querySelector('#editContactContainer').dataset.contact

        this.setState({
            snackbarOpen: true,
            snackbarMessage: 'Saving new contact',
            contacts: this.addAddress(contactId, e.currentTarget.name, e.currentTarget.value)
        }, () => this.saveToFile())
    }

    editAddress(contactId, fieldName, fieldValue) {
        let contacts = this.state.contacts.map((address) => {
            if (address.id === contactId)
                address[fieldName] = fieldValue
            return address
        })
        if (fieldName === 'name')
            return contacts.sort(this.compareAddresses)
        return contacts
    }

    addAddress(contactId, fieldName, fieldValue) {
        if (this.state.contacts.filter(address => address.id === contactId).length > 0)
            return this.state.contacts.map((address) => {
                if (address.id === contactId)
                    address[fieldName] = fieldValue
                return address
            })
        let newAddress = {id: contactId}
        newAddress[fieldName] = fieldValue
        this.state.contacts.push(newAddress)
        this.state.contacts.sort(this.compareAddresses)
        return this.state.contacts
    }

    saveToFile() {
        localStorage.setItem(
            'addresses',
            JSON.stringify(this.state.contacts)
        )
    }

    compareAddresses(a, b) {
        let aName = a.name.toLowerCase()
        let bName = b.name.toLowerCase()
        if (aName < bName)
            return -1
        if (aName > bName)
            return 1
        return 0
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

                    <SaveSnackbar
                        open={this.state.snackbarOpen}
                        message={this.state.snackbarMessage}
                    />
                </div>
            </MuiThemeProvider>
        )
    }
}
