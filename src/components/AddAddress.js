/**
 * Created by alex on 28/09/2016.
 */

import React, {Component} from 'react';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';

export default class AddAddress extends Component {
  constructor() {
    super()

    this.state = {
      id: this.generateId()
    }
  }

  generateId() {
    let n = JSON.parse(localStorage['addresses']).reduce((pre, cur, i) =>
      pre > Number(cur.substr(1)) ? pre : Number(cur.substr(1))
    , 0)
    let pad = n.length >= 4 ? n : new Array(4 - n.length + 1).join('0') + n;
    return 'c' +  pad;
  }
    render() {
        return (
            <div
                style={{padding: 20, textAlign: 'center'}}
                data-contact={this.state.id}
                id="editContactContainer"
            >
                <Avatar
                    src={`https://api.adorable.io/avatars/128/${
                      this.refs.email === undefined ? 'new' : this.refs.email.input.value
                    }.png`}
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
                                floatingLabelText="Name"
                                defaultValue={this.props.address.name}
                                name="name"
                                onChange={this.props.handleAddAddress}
                            />
                        </div>

                        <div>
                            <TextField
                                floatingLabelText="Email address"
                                defaultValue={this.props.address.email}
                                ref="email"
                                name="email"
                                onChange={this.props.handleAddAddress}
                            />
                        </div>

                        <div>
                            <TextField
                                floatingLabelText="Phone number"
                                defaultValue={this.props.address.phone}
                                name="phone"
                                onChange={this.props.handleAddAddress}
                            />
                        </div>

                        <div>
                            <TextField
                                floatingLabelStyle={{left: 0}}
                                floatingLabelText="Notes"
                                defaultValue={this.props.address.notes}
                                name="notes"
                                onChange={this.props.handleAddAddress}
                                multiLine={true}
                            />
                        </div>
                    </CardText>
                </Card>
            </div>
            // <h1>New User Created</h1>
        )
    }
}
