/**
 * Created by alex on 28/09/2016.
 */

import React, { Component } from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';

export default class AddAddress extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

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

  handleChange(e) {
    let newContact = this.state.contact;
    newContact[e.currentTarget.name] = e.currentTarget.value;
    this.setState({
      contact: newContact
    });
  }

  componentWillUnmount() {
    if (this.state.contact.name !== '' && this.state.contact.email !== '') {
      this.props.handleAddAddress(this.state.contact);
    }
    else {
      this.props.handleAddAddress();
    }
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
              this.refs.email === undefined ? 'newContact' : this.refs.email.input.value
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
                name="name"
                onChange={this.handleChange}
              />
            </div>

            <div>
              <TextField
                floatingLabelText="Email address"
                defaultValue={this.state.contact.email}
                ref="email"
                name="email"
                onChange={this.handleChange}
              />
            </div>

            <div>
              <TextField
                floatingLabelText="Phone number"
                defaultValue={this.state.contact.phone}
                name="phone"
                onChange={this.handleChange}
              />
            </div>

            <div>
              <TextField
                floatingLabelStyle={{ left: 0 }}
                floatingLabelText="Notes"
                defaultValue={this.state.contact.notes}
                name="notes"
                onChange={this.handleChange}
                multiLine
              />
            </div>

            <Subheader
              style={{ color: '#00BCD4' }}
            >
              New contacts need a name and email
            </Subheader>
          </CardText>
        </Card>
      </div>
      // <h1>New User Created</h1>
    )
  }
}
