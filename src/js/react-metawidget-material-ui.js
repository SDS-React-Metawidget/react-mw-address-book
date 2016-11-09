import React from 'react';
import ReactDOM from 'react-dom';

import {Card, CardTitle, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton'
import Edit from 'material-ui/svg-icons/image/edit';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

metawidget = require('metawidget');

'use strict'

var metawidget = metawidget || {};

metawidget.react = metawidget.react || {}

metawidget.react.widgetbuilderMatUI = metawidget.react.widgetbuilderMatUI || {}

const ReactWidgetBuilder = function (config) {

    if (!( this instanceof ReactWidgetBuilder )) {
        throw new Error('Constructor called as a function');
    }

    this.config = config || {};
    this.buildWidget = function (elementName, attributes, mw) {
        console.log(attributes);
        if (metawidget.util.isTrueOrTrueString(attributes.hidden)) {
            return metawidget.util.createElement(mw, 'stub');
        }
        
        var value;
		var typeAndNames = metawidget.util.splitPath(mw.path);
		var toInspect = metawidget.util.traversePath(mw.toInspect, typeAndNames.names);

		if (typeAndNames.names === undefined) {
			typeAndNames.names = [];
		}
		if (elementName !== 'entity' && toInspect !== undefined) {
			value = toInspect[attributes.name];
			typeAndNames.names.push(attributes.name);
		}
		else {
			value = toInspect;
		}
        if (attributes.type) {
            var properties = {
                //disabled:!this.config.state.edit,
                //underlineShow:this.config.state.edit,
                //inputStyle:!this.config.state.edit ? {color: '#000', cursor: 'initial'} : {}
            };

            let elements = {
                
                output: {
                    parameters: {
                        readOnly: (e) => metawidget.util.isTrueOrTrueString(e)
                        
                    },
                    result: [TextField, {
                        floatingLabelText:attributes.name,
                        defaultValue:value,
                        name:attributes.name,
                        disabled:metawidget.util.isTrueOrTrueString(attributes.readOnly)
                    }]
                }
            }

            let Element = Object.keys(elements).reduce((prev, element) => {
                for ( let param in elements[element].parameters ) {
                    if (!elements[element].parameters[param](attributes[param]))
                        return prev
                }
                return elements[element].result
            }, elements.output.result)

            // var fromArr = arr[attributes.type];
            if (Element) {
                var ElementType = Element[0];
                var uniqueElementProps = Element[1];
                return (
                    <MuiThemeProvider>
                    <div>
                    <ElementType
                        {...properties}
                        {...uniqueElementProps}
                    />
                    </div>
                    </MuiThemeProvider>
                )
            }
        }
    };
};

export default ReactWidgetBuilder