/**
 * Created by alex on 28/09/2016.
 */

import React, {Component} from 'react';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';

export default class AddAddress extends Component {
    render() {
        return (
          <h1>it loaded</h1>
          // <script>
          // function makeNewAddress() {
          //   n = (Object.keys(address).length+1)+''
          //   pad = n.length >= 4 ? n : new Array(4 - n.length + 1).join('0') + n
          //   var d= 'c' +  pad
          //   var key=d
          //   var object={
          //     "name":"",
          //     "email":"",
          //     "phone":"",
          //     "notes":"",
          //   }
          //   address.setItem(key, JSON.stringify(object));
          //   return key;
          // }
          // </script>
          //
          // console.log(makeNewAddress);
            // <div
            //     style={{padding: 20, textAlign: 'center'}}
            //     data-contact={this.props.address.id}
            //     id="editContactContainer"
            // >
            //     <Avatar
            //         src={`https://api.adorable.io/avatars/128/new.png`}
            //         size={128}
            //     />
            //
            //     <Card
            //         style={{marginTop: 20}}
            //     >
            //         <CardTitle
            //             title="New contact"
            //         />
            //
            //         <CardText>
            //             <div>
            //                 <TextField
            //                     floatingLabelText="Name"
            //                     name="name"
            //                     onChange={this.props.handleEditAddress}
            //                 />
            //             </div>
            //
            //             <div>
            //                 <TextField
            //                     floatingLabelText="Email address"
            //                     name="email"
            //                     onChange={this.props.handleEditAddress}
            //                 />
            //             </div>
            //
            //             <div>
            //                 <TextField
            //                     floatingLabelText="Phone number"
            //                     name="phone"
            //                     onChange={this.props.handleEditAddress}
            //                 />
            //             </div>
            //
            //             <div>
            //                 <TextField
            //                     floatingLabelStyle={{left: 0}}
            //                     floatingLabelText="Notes"
            //                     name="notes"
            //                     onChange={this.props.handleEditAddress}
            //                     multiLine={true}
            //                 />
            //             </div>
            //         </CardText>
            //     </Card>
            // </div>
        )
    }
}
