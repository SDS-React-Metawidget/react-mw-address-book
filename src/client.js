/**
 * Created by alex on 28/09/2016.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import AddressBook from './components/AddressBook'

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
}

var schema = {
    properties: {
    id: {
        type:"string",
        hidden:true
    },
    name: {
        type:"string",
        required:true
    },
    email: {
        type:"string",
        required:true
    },
    phoneNumber: {
        type:"string"
    },
    notes: {
        type:"string",
        large:true
    },
    saveButton: {
        type:"function"
    }
        
    }
}
ReactDOM.render(
    <AddressBook
        addresses={getInitialAddresses()}
        schema={schema}
    />,
    document.getElementById('root')
);
