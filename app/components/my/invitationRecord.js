import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import Icon from '../../pages/iconSets';
import { screenWidth, screenHeight } from '../../utils/Dimensions';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';

export class InvitationRecord extends Component {
	constructor(props) {
		super(props);
		this.navigate = this.props.navigation.navigate;
	}

	render() {
		return (
            <View style={{ height: screenHeight }}>
                <ImageBackground style={styles.container} source={require('../../assets/images/my/inviting.png')}>
                <Text style={styles.title}>
                    我的邀请
                </Text>
                
                </ImageBackground>
			</View>
		);
	}
}

export default withNavigation(InvitationRecord);

const styles = StyleSheet.create({
	container: {
        flex: 1,
        paddingTop: 10,
        alignItems: 'center'
    },
    title:{
        marginTop: 30,
        fontSize:18,
        color:'#F3FFFF',
        fontWeight:'bold'
    }
});
