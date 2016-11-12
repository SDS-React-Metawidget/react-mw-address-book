/**
 * Created by alex on 28/09/2016.
 */

import React, {Component} from 'react';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton'
import Edit from 'material-ui/svg-icons/image/edit'
import {MetaWidget, metawidget}  from '../js/react-metawidget.js'
import mwMatUI from '../js/react-metawidget-material-ui.js';
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
        }
        )
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
                            <MetaWidget
                                toInspect={this.props.address}
                                inspector={
                                    new metawidget.inspector.CompositeInspector([
                                        new metawidget.inspector.PropertyTypeInspector(),
                                        new metawidget.inspector.JsonSchemaInspector(this.props.schema)
                                    ])
                                }
                                widgetBuilder={new mwMatUI.ReactWidgetBuilder({saveFunc:this.props.handleEditAddress})}
                                layout={new metawidget.react.layout.ReactRenderDecorator (new metawidget.layout.SimpleLayout()) }
                                appendWidgetProcessors={new mwMatUI.ReactBindingProcessor()}
                                readOnly={!this.state.edit}
                                />
                            </div>
                    </CardText>
                </Card>
            </div>
        )
    }
}
