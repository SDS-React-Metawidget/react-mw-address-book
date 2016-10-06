/**
 * Created by alex on 28/09/2016.
 */

import React, {Component} from 'react';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';

export default class EditAddress extends Component {
    render() {
        console.log(this.props.address)
        return (
            <div
                style={{padding: 20, textAlign: "center"}}
                data-contact={this.props.address.id}
                id="editContactContainer"
            >
                <Avatar
                    src={`https://api.adorable.io/avatars/128/${this.props.address.email}.png`}
                    size={128}
                />

                <Card
                    style={{marginTop: 20}}
                >
                    <CardTitle
                        title={this.props.address.name}
                        subtitle="Contact details"
                    />

                    <CardText>
                        <div>
                            <TextField
                                floatingLabelText="Email address"
                                defaultValue={this.props.address.email}
                                name="email"
                                onChange={this.props.handleEditAddress}
                            />
                        </div>

                        <div>
                            <TextField
                                floatingLabelText="Phone number"
                                defaultValue={this.props.address.phone}
                                name="phone"
                                onChange={this.props.handleEditAddress}
                            />
                        </div>
                    </CardText>
                </Card>
            </div>
        )
    }
}
