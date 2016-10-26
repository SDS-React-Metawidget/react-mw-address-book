import React from 'react';
import ReactDOM from 'react-dom';

import {Card, CardTitle, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton'
import Edit from 'material-ui/svg-icons/image/edit';

'use strict'

var metawidget = metawidget || {};
metawidget.react = metawidget.react || {}

metawidget.react.widgetbuilder_mat_ui = metawidget.react.widgetbuilder_mat_ui || {}

metawidget.react.widgetbuilder_mat_ui.ReactWidgetBuilder = function (config) {

    if (!( this instanceof metawidget.react.widgetbuilder.ReactWidgetBuilder )) {
        throw new Error('Constructor called as a function');
    }

    this.buildWidget = function (elementName, attributes, mw) {

        if (metawidget.util.isTrueOrTrueString(attributes.hidden)) {
            return metawidget.util.createElement(mw, 'stub');
        }

        if (attributes.type) {
            var properties = {
                name: attributes.name,
                metawidgetAttributes: attributes,
            };

            let elements = {
                
                output: {
                    parameters: {
                        type: (e) => e === 'string',
                        
                        readOnly: (e) => e === true
                    },
                    result: [TextField, {
                        floatingLabelText:attributes.name,
                        defaultValue:attributes.name,
                        name:attributes.name,
                        
                    }]
                }
            }

            let Element = Object.keys(elements).reduce((prev, element) => {
                for ( let param in elements[element].parameters ) {
                    if (!elements[element].parameters[param](attributes[param]))
                        return prev
                }
                return elements[element].result
            }, elements.textInput.result)

            // var fromArr = arr[attributes.type];
            if (Element) {
                var ElementType = Element[0];
                var uniqueElementProps = Element[1];
                return (
                    <ElementType
                        {...properties}
                        {...uniqueElementProps}
                    />
                )
            }
        }
    };
};