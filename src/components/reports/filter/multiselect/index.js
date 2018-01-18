import React, { Component } from 'react';
import { Multiselect } from  'react-widgets';

class CreateMultiselect extends Component {

    constructor(...args) {
        super(...args)

        this.state = {
            values: []
        }
    }

    render() {
        const self = this;
        const key = this.props.keyName;

        return (
            <Multiselect filter
                data = { this.props.dataDropdown }
                placeholder = { key }
                value = { this.state.values }
                allowCreate = "onFilter"
                onChange = { function(i, k) {
                    self.setState({ values: i })
                    console.log('onChange -- ' + i);
                    //console.log(i);
                    self.props.filter(i, key);
                } }
                textField = "name"
            />
        )
    }
}

export default CreateMultiselect;
