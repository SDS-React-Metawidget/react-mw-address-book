/**
 * Created by alex on 28/09/2016.
 */

import React, {Component} from 'react';
import {Card, CardHeader} from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Paper from 'material-ui/Paper';

export default class AddressList extends Component {
    renderAddresses() {
        if (this.props.addresses.length > 0) {
            return this.props.addresses.map((address, index) => (
                <Card
                    key={address.id}
                    style={{marginTop: 20}}
                    data-contact={address.id}
                    data-route="editAddress"
                    onClick={this.props.handleRoute}
                >
                    <CardHeader
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
                    style={{textAlign: "center", padding: 15, marginTop: 20}}
                >
                    No contacts
                </Paper>
            )
        }
    }

    render() {
        return (
            <div style={{paddingLeft: 20, paddingRight: 20}}>
                {this.renderAddresses()}

                <FloatingActionButton
                    style={{right: 20, bottom: 20, position: "fixed"}}
                    onClick={this.props.handleRoute}
                    data-route="editAddress"
                >
                    <ContentAdd />
                </FloatingActionButton>
            </div>
        )
    }
}
