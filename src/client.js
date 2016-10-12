/**
 * Created by alex on 28/09/2016.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import metawidget from 'metawidget';
import injectTapEventPlugin from 'react-tap-event-plugin';

import {MetaWidget, reactmw} from './lib/react-metawidget';

import AddressBook from './components/AddressBook';

injectTapEventPlugin();

const getInitialAddresses = () => {
    if (localStorage.getItem('addresses') === null)
        localStorage.setItem(
            'addresses',
            JSON.stringify([
                {
                    id: 'c0001',
                    name: 'Alex Dacre',
                    email: 'alexander.l.dacre@student.uts.edu.au'
                }, {
                    id: 'c0002',
                    name: 'Ben Franzi',
                    email: 'benjamin.t.franzi@student.uts.edu.au'
                }, {
                    id: 'c0003',
                    name: 'Jacob Vorreiter',
                    email: 'jacob.l.vorreiter@student.uts.edu.au'
                }, {
                    id: 'c0004',
                    name: 'Tim Porritt',
                    email: 'timothy.m.porritt@student.uts.edu.au'
                }, {
                    id: 'c0005',
                    name: 'Wilson Chen',
                    email: 'wilson.chen@student.uts.edu.au'
                }
            ])
        )
    return JSON.parse(localStorage.getItem('addresses'))
};
const schema = {
    properties: {
        name: {
            type: "string",
            required: true,
            placeholder: "Name",
            checkValid: true,
            maxLength: 10,
            //readOnly:true,
            value: "Jerry"
        },
        age: {
            type: "number",
            placeholder: "Age",
            min: 0,
            max: 150,
        },
        retired: {
            type: "boolean",
            //checked: true,
        },
        birthday: {
            type: "date",
        },
    },
};
ReactDOM.render(
    <MetaWidget
        inspector={new metawidget.inspector.JsonSchemaInspector(schema)}
    />,
    document.getElementById("root")
);

//ReactDOM.render(
//    <AddressBook
//        addresses={getInitialAddresses()}
//    />,
//    document.getElementById('root')
//);
