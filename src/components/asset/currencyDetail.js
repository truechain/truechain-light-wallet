import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    ActivityIndicator
} from 'react-native';

export default class currencyDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: null
        }
    }
   
    componentDidMount() {
        const { params } = this.props.navigation.state;
        this.setState({
            title: params.currencyName
        })
    }

    render() {
        return (
            <ActivityIndicator size="large" style={{ marginTop: 100 }}></ActivityIndicator>
        );
    }
}
