/**
 * Created by alex on 28/09/2016.
 */

import React, {Component} from 'react';
import {Card, CardHeader} from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Paper from 'material-ui/Paper';
import ContentAdd from 'material-ui/svg-icons/content/add';

import ContactSearch from './ContactSearch'

export default class AddressList extends Component {
    constructor(props) {
        super(props)

        this.handleSearch = this.handleSearch.bind(this)

        this.state = {
            filteredContacts: this.props.addresses
        }
    }

    handleSearch(searchField) {
        let searchTerm = new RegExp(`.*${searchField.value.toLowerCase()}.*`)

        this.setState({
            filteredContacts: this.props.addresses.filter((address) => {
                return [address.name, address.email].filter((field) =>
                    searchTerm.test(field.toLowerCase())
                ).length > 0
            })
        })
    }

    renderAddresses() {
        if (this.state.filteredContacts.length > 0) {
            return this.state.filteredContacts.map((address, index) => (
                <Card
                    key={address.id}
                    className="address-list-item"
                    style={{
                        marginTop: 20,
                        cursor:'pointer'
                    }}
                    data-contact={address.id}
                    data-route="editAddress"
                    onClick={this.props.handleRoute}
                >
                    <CardHeader
                        textStyle={{paddingRight: 0}}
                        title={address.name}
                        subtitle={address.email}
                        avatar={`https://api.adorable.io/avatars/128/${address.email}.png`}
                    />
                </Card>
            ))
        }
        else {
            return (
                <Paper
                    style={{
                        textAlign: 'center',
                        padding: 15,
                        marginTop: 20
                    }}
                >
                    No contacts
                </Paper>
            )
        }
    }

    render() {
        return (
            <div>
                <ContactSearch
                    handleSearch={this.handleSearch}
                />

                <div style={{paddingLeft: 20, paddingRight: 20}}>
                    {this.renderAddresses()}

                    <FloatingActionButton
                        style={{
                            right: 20,
                            bottom: 20,
                            position: 'fixed'
                        }}
                        onClick={this.props.handleRoute}
                        data-route="addAddress"
                    >
                        <ContentAdd />
                    </FloatingActionButton>
                </div>
            </div>
        )
    }
}
