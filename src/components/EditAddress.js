/**
 * Created by alex on 28/09/2016.
 */

import React, {Component} from 'react';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton'
import Edit from 'material-ui/svg-icons/image/edit'
import {a as MetaWidget, reactmw}  from '../js/react-metawidget.js'
import metawidget from 'metawidget';
export default class EditAddress extends Component {
    constructor(props) {
        super(props)

        this.handleClick = this.handleClick.bind(this)

        this.state = {
            edit: false
        }
    }

    handleClick(e) {
        this.setState({
            edit: !this.state.edit
        }, () => {
            if (this.state.edit) this.refs.firstField.input.focus()
        })
    }

    render() {
        return (
            <div
                style={{padding: 20, textAlign: 'center'}}
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
                        title={`${this.state.edit ? 'Edit ' : '' }${this.props.address.name}`}
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
                                defaultValue={this.props.address.name}
                                name="name"
                                ref="firstField"
                                onChange={this.props.handleEditAddress}
                                disabled={!this.state.edit}
                                underlineShow={this.state.edit}
                                inputStyle={!this.state.edit ? {color: '#000', cursor: 'initial'} : {}}
                            />
                        </div>

                        <div>
                            <TextField
                                floatingLabelText="Email address"
                                defaultValue={this.props.address.email}
                                name="email"
                                onChange={this.props.handleEditAddress}
                                disabled={!this.state.edit}
                                underlineShow={this.state.edit}
                                inputStyle={!this.state.edit ? {color: '#000', cursor: 'initial'} : {}}
                            />
                        </div>

                        <div>
                            <TextField
                                floatingLabelText="Phone number"
                                defaultValue={this.props.address.phone}
                                name="phone"
                                onChange={this.props.handleEditAddress}
                                disabled={!this.state.edit}
                                underlineShow={this.state.edit}
                                inputStyle={!this.state.edit ? {color: '#000', cursor: 'initial'} : {}}
                            />
                        </div>

                        <div>
                            <TextField
                                floatingLabelStyle={{left: 0}}
                                floatingLabelText="Notes"
                                defaultValue={this.props.address.notes}
                                name="notes"
                                onChange={this.props.handleEditAddress}
                                multiLine={true} disabled={!this.state.edit}
                                underlineShow={this.state.edit}
                                inputStyle={!this.state.edit ? {color: '#000', cursor: 'initial'} : {}}
                                textareaStyle={!this.state.edit ? {color: '#000', cursor: 'initial'} : {}}
                            />
                        </div>
                        
    <MetaWidget
		toInspect={this.props.address}
        //inspector={new metawidget.inspector.JsonSchemaInspector(}
        widgetProcessors={[
            new reactmw.react.widgetprocessor.IdProcessor(),
            new reactmw.react.widgetprocessor.RequiredAttributeProcessor(),
            new reactmw.react.widgetprocessor.PlaceholderAttributeProcessor(),
            new reactmw.react.widgetprocessor.DisabledAttributeProcessor(),
            new reactmw.react.widgetprocessor.MaxLengthAttributeProcessor(),
            new reactmw.react.widgetprocessor.MaxAttributeProcessor(),
            new reactmw.react.widgetprocessor.MinAttributeProcessor(),
            new reactmw.react.widgetprocessor.ValueAttributeProcessor(),
            new reactmw.react.widgetprocessor.ReactBindingProcessor(), 
                                function(widget)
                                 {return React.cloneElement(widget, {style: 
                                                              {WebkitTapHighlightColor: 'rgba(0,0,0,0)', // Remove mobile color flashing (deprecated style)
      padding: 0,
      position: 'relative',
      width: '100%',
      border: 'none',
      outline: 'none',
      backgroundColor: 'rgba(0,0,0,0)',
      font: 'inherit'}
                                                             }
                                                    )
                                 }
                                
        ]}
    />
                    </CardText>
                </Card>
            </div>
        )
    }
}
