/**
 * Created by alex on 28/09/2016.
 */

import React, { Component } from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import Edit from 'material-ui/svg-icons/image/edit';

export default class EditAddress extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);

        this.state = {
            edit: false,
            contact: {
                id: this.props.address.id,
                name: this.props.address.name,
                email: this.props.address.email,
                phone: this.props.address.phone,
                notes: this.props.address.notes
            }
        }
    }

    handleClick() {
        this.setState({
            edit: !this.state.edit
        }, () => {
            if (this.state.edit) this.firstField.input.focus()
        })
    }

    handleChange(e) {
        let newContact = this.state.contact;
        newContact[e.currentTarget.name] = e.currentTarget.value;
        this.setState({
            contact: newContact
        });
    }

    handleSave(e) {
        if (this.state.contact.name !== '' && this.state.contact.email !== '') {
            this.props.handleRoute(e, () => this.props.handleEditAddress(this.state.contact));
        }
        else {
            this.props.handleEditAddress();
        }
    }

    render() {
        return (
            <div
                style={{ padding: 20, textAlign: 'center' }}
                data-contact={this.state.contact.id}
                id="editContactContainer"
            >
                <Avatar
                    src={`https://api.adorable.io/avatars/128/${this.state.contact.email}.png`}
                    size={128}
                />

                <Card
                    style={{ marginTop: 20 }}
                >
                    <CardTitle
                        title={`${this.state.edit ? 'Edit ' : '' }${this.state.contact.name}`}
                        subtitle="Contact details"
                        children={(
                            <IconButton
                                style={{
                                    position: 'absolute',
                                    top: 10,
                                    right: 10
                                }}
                                tooltip="Edit address"
                                onClick={this.handleClick}
                            >
                                <Edit/>
                            </IconButton>
                        )}
                    />

                    <CardText>
                        <div>
                            <TextField
                                floatingLabelText="Name"
                                defaultValue={this.state.contact.name}
                                name="name"
                                ref={input => this.firstField = input}
                                onChange={this.handleChange}
                                disabled={!this.state.edit}
                                underlineShow={this.state.edit}
                                inputStyle={!this.state.edit ? {
                                    color: '#000',
                                    cursor: 'initial'
                                } : {}}
                            />
                        </div>

                        <div>
                            <TextField
                                floatingLabelText="Email address"
                                defaultValue={this.state.contact.email}
                                name="email"
                                onChange={this.handleChange}
                                disabled={!this.state.edit}
                                underlineShow={this.state.edit}
                                inputStyle={!this.state.edit ? {
                                    color: '#000',
                                    cursor: 'initial'
                                } : {}}
                            />
                        </div>

                        <div>
                            <TextField
                                floatingLabelText="Phone number"
                                defaultValue={this.state.contact.phone}
                                name="phone"
                                onChange={this.handleChange}
                                disabled={!this.state.edit}
                                underlineShow={this.state.edit}
                                inputStyle={!this.state.edit ? {
                                    color: '#000',
                                    cursor: 'initial'
                                } : {}}
                            />
                        </div>

                        <div>
                            <TextField
                                floatingLabelStyle={{ left: 0 }}
                                floatingLabelText="Notes"
                                defaultValue={this.state.contact.notes}
                                name="notes"
                                onChange={this.handleChange}
                                multiLine={true} disabled={!this.state.edit}
                                underlineShow={this.state.edit}
                                inputStyle={!this.state.edit ? {
                                    color: '#000',
                                    cursor: 'initial'
                                } : {}}
                                textareaStyle={!this.state.edit ? {
                                    color: '#000',
                                    cursor: 'initial'
                                } : {}}
                            />
                        </div>

                        <RaisedButton
                            label="Save"
                            onClick={this.handleSave}
                            name="saveButton"
                            data-route="addressList"
                            style={{
                                marginTop: 10,
                                display: this.state.edit ? 'inline-block' : 'none'
                            }}
                            primary
                        />
                    </CardText>
                </Card>
            </div>
        )
    }
}
