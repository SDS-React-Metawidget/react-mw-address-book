/**
 * Created by alex on 28/09/2016.
 */

import React, {Component} from 'react';
import {Card, CardHeader} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

export default class AddressList extends Component {
    render() {
        return (
            <div style={{paddingLeft: 20, paddingRight: 20}}>
                {
                    this.props.addresses.map((address, index) => (
                        <Card
                            key={index}
                            style={{marginTop: 20}}
                            onClick={() => }
                        >
                            <CardHeader
                                title={address.name}
                                subtitle={address.email}
                                avatar={`https://api.adorable.io/avatars/128/${address.email}.png`}
                            />
                        </Card>
                    ))
                }

                <FloatingActionButton
                    style={{right: 20, bottom: 20, position: "fixed"}}
                >
                    <ContentAdd />
                </FloatingActionButton>
            </div>
        )
    }
}
