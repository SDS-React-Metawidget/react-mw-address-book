/**
 * Created by alex on 28/09/2016.
 */

import React, { Component } from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';

import {MetaWidget, metawidget}  from '../js/react-metawidget.js';
import ReactWidgetBuilder from '../js/react-metawidget-material-ui.js';

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
              <MetaWidget
                inspector={
                    new metawidget.inspector.CompositeInspector([
                        new metawidget.inspector.PropertyTypeInspector(),
                        new metawidget.inspector.JsonSchemaInspector(this.props.schema)
                    ])
            }
                widgetBuilder={new ReactWidgetBuilder({saveFunc:this.handleChange})}
                layout={new metawidget.react.layout.ReactRenderDecorator (new metawidget.layout.SimpleLayout()) }
                appendWidgetProcessors={new metawidget.react.widgetprocessor.ReactBindingProcessor()}
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
