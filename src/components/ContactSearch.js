/**
 * Created by alex on 6/10/2016.
 */

import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Search from 'material-ui/svg-icons/action/search';
import IconButton from 'material-ui/IconButton'
import Close from 'material-ui/svg-icons/navigation/close'

export default class ContactSearch extends Component {
    constructor(props) {
        super(props)
        
        this.handleChange = this.handleChange.bind(this)
        this.handleClear = this.handleClear.bind(this)

        this.state = {
            hasSearch: () => false
        }
    }

    handleChange() {
        let input = this.refs.searchField.input

        this.props.handleSearch(input)

        this.setState({
            hasSearch: () => input.value !== ''
        })
    }

    handleClear() {
        this.refs.searchField.input.value = ''
        this.handleChange()
    }

    render() {
        return (
            <Paper
                style={{
                    paddingLeft: 20,
                    paddingRight: 20,
                    paddingTop: 5,
                    paddingBottom: 5,
                    display: "flex",
                    alignItems: "center"
                }}
            >
                <Search
                    style={{
                        width: 30,
                        height: 30,
                        marginRight: 10
                    }}
                />

                <TextField
                    style={{
                        flexGrow: 2
                    }}
                    ref="searchField"
                    hintText="Search"
                    underlineShow={false}
                    onChange={this.handleChange}
                />

                { this.state.hasSearch() ?
                    <IconButton
                        onClick={this.handleClear}
                    >
                        <Close/>
                    </IconButton> : null
                }
            </Paper>
        )
    }
}
