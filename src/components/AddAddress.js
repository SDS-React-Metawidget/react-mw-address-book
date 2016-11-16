/**
 * Created by alex on 28/09/2016.
 */

import React, { Component } from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class AddAddress extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);

        this.state = {
            contact: {
                id: this.generateId(),
                name: '',
                email: '',
                phone: '',
                notes: '',
            }
        }
    }

    generateId() {
        let n = '' + JSON.parse(localStorage['addresses']).reduce((pre, cur, i) =>
                    pre > Number(cur.id.substr(1)) ? pre : Number(cur.id.substr(1)) + 1
                , 0);

        let pad = n.length >= 4 ? n : new Array(4 - n.length + 1).join('0') + n;
        return 'c' + pad;
    }

    handleSave(e) {
        if (this.state.contact.name !== '' && this.state.contact.email !== '') {
            this.props.handleRoute(e, () => this.props.handleAddAddress(this.state.contact));
        }
        else {
            this.props.handleAddAddress();
        }
    }

    handleChange(e) {
        let newContact = this.state.contact;
        newContact[e.currentTarget.name] = e.currentTarget.value;
        this.setState({
            contact: newContact
        });
    }

    render() {
        return (
            <div
                style={{ padding: 20, textAlign: 'center' }}
                data-contact={this.state.id}
                id="editContactContainer"
            >
                <Avatar
                    src={
                        `https://api.adorable.io/avatars/128/${
                            this.email === undefined ?
                                'newContact' : this.email.input.value
                        }.png`
                    }
                    size={128}
                />

                <Card
                    style={{ marginTop: 20 }}
                >
                    <CardTitle
                        title={this.state.contact.name}
                        subtitle="Contact details"
                    />

                    <CardText>
                        <div>
                            <TextField
                                floatingLabelText="Name"
                                defaultValue={this.state.contact.name}
                                ref={name => this.name = name}
                                name="name"
                                onChange={this.handleChange}
                            />
                        </div>

                        <div>
                            <TextField
                                floatingLabelText="Email address"
                                defaultValue={this.state.contact.email}
                                ref={email => this.email = email}
                                name="email"
                                onChange={this.handleChange}
                            />
                        </div>

                        <div>
                            <TextField
                                floatingLabelText="Phone number"
                                defaultValue={this.state.contact.phone}
                                ref={phone => this.phone = phone}
                                name="phone"
                                onChange={this.handleChange}
                            />
                        </div>

                        <div>
                            <TextField
                                floatingLabelStyle={{ left: 0 }}
                                floatingLabelText="Notes"
                                defaultValue={this.state.contact.notes}
                                ref={notes => this.notes = notes}
                                name="notes"
                                onChange={this.handleChange}
                                multiLine
                            />
                        </div>

                        <RaisedButton
                            name="saveButton"
                            data-route="addressList"
                            style={{ marginTop: 10 }}
                            label="Save"
                            primary
                            onClick={this.handleSave}
                        />
                    </CardText>
                </Card>
            </div>
            // <h1>New User Created</h1>
        )
    }
}
