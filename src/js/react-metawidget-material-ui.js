import React from 'react';
import ReactDOM from 'react-dom';

import {Card, CardTitle, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton'
import Edit from 'material-ui/svg-icons/image/edit';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

var metawidget = require('metawidget');

'use strict'

var Stub = React.createClass({
    render: function () {
        return (
            <stub/>
        );
    }
});

var mwMatUI = mwMatUI || {};

mwMatUI.ReactWidgetBuilder = function (config) {

    if (!( this instanceof mwMatUI.ReactWidgetBuilder )) {
        throw new Error('Constructor called as a function');
    }

    this.config = config || {};
    this.buildWidget = function (elementName, attributes, mw) {
        //console.log(attributes);
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
                disabled:metawidget.util.isTrueOrTrueString(attributes.readOnly),
                name:attributes.name 
            };

            let elements = {   
                output: {
                    parameters: {},
               
                    result: [TextField, {
                        floatingLabelText:metawidget.util.getLabelString(attributes, mw),
                        defaultValue:value,
                    }]
                },
                button: {
                    parameters: {
                        type: (e) => e === 'function'
                    },
                    result: [
                        FloatingActionButton,
                        {
                            onClick: ()=>{
                                mw.save();
                                config.saveFunc();
                            }
                            
                        }
                    ]
                },
                largeTextArea: {
                    parameters: {
                        large: (e) => metawidget.util.isTrueOrTrueString(e)
                    },
               
                    result: [TextField, {
                        floatingLabelText:metawidget.util.getLabelString(attributes, mw),
                        defaultValue:value,
                        multiLine:true,
                        floatingLabelStyle: { left: 0 }
                    }]
                },
                 hidden: {
                    parameters: {
                        hidden: (e) => metawidget.util.isTrueOrTrueString(e),
                    },
                    result: [Stub, {}]
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

mwMatUI.ReactBindingProcessor = function () {

    if (!( this instanceof mwMatUI.ReactBindingProcessor )) {
        throw new Error('Constructor called as a function');
    }
    this.holder = {};
};
mwMatUI.ReactBindingProcessor.prototype.processWidget = function (widget, elementName, attributes, mw) {
    var t = this;
    if (React.isValidElement(widget)) {
        widget = React.cloneElement(widget, {},(
            React.cloneElement(widget.props.children, {}, (
                React.cloneElement(widget.props.children.props.children, {
                    onChange: function (e) {
                        t.holder[metawidget.util.appendPath(attributes, mw)] = e;
                        console.log(t.holder);
                    }
                })
            ))
        ));
    }
    console.log(widget.props.children.props.children);
    return widget;
};
export default mwMatUI