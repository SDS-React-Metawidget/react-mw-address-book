import React from 'react';
import ReactDOM from 'react-dom';

import {Card, CardTitle, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton'
import Edit from 'material-ui/svg-icons/image/edit';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ContentSave from 'material-ui/svg-icons/content/save'

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
                                config.saveFunc(mw.toInspect);
                            },
                            children:<ContentSave />
                            
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
                        t.holder[metawidget.util.appendPath(attributes, mw)] = e.target.value;
                        console.log(t.holder);
                    }
                })
            ))
        ));
    }
    return widget;
};

function copyAcross(toThis, fromThis) {
    for ( var bigKey in fromThis ) {
        var splitKey = metawidget.util.splitPath(bigKey);

        //Nested widgets will have more than one name
        if (splitKey.names.length > 1) {
            //Check if nestedWidget object exists
            //If not, create 'just in time'
            if (toThis[splitKey.names.slice(0, 1)] === undefined)
                toThis[splitKey.names.slice(0, 1)] = {};

            //Set toInspect to the nestedWidget object
            var toInspect = toThis[splitKey.names.slice(0, 1)];

            //Recreate path string, just one deeper
            var string = splitKey.type + "";
            splitKey.names.splice(0, 1);
            splitKey.names.forEach(function (val) {
                string += "." + val;
            });

            //Create object using path string and value
            var obj = {};
            obj[string] = fromThis[bigKey];

            //Recurse this function with nestedWidget object
            //and deeper path
            copyAcross(toInspect, obj);
        }
        else {
            //Works when toInspect is already populated
            //but not guaranteed, so have to use nested logic to manually
            //set and check each level
            //var toInspect = metawidget.util.traversePath(toThis, splitKey.names.slice(0, splitKey.names.length-1));

            var toInspect = toThis;
            if (toInspect === undefined)
                toInspect = {};

            var name = splitKey.names[splitKey.names.length - 1];
            //Have to use [], else it sets by value, not reference
            toInspect[name] = fromThis[bigKey];
        }
    }
}
mwMatUI.ReactBindingProcessor.prototype.save = function (mw) {
    copyAcross(mw.toInspect, this.holder);
    return true;
};
export default mwMatUI