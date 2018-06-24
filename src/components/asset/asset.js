import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions
} from 'react-native'


export default class asset extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.walletInfo}>
                    <View style={styles.walletInfo_item}>
                    <Image style={styles.avatar} source={require('../../assets/images/asset/head_2x.png')}></Image>
                        <Text>
                            My Wallet
                         </Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 50,
        borderWidth: 2,
        borderColor: 'red'
    },
    walletInfo: {
        height: 200,
        backgroundColor: '#528bf7'
    },
    walletInfo_item: {
        marginTop: 20,
        borderWidth: 3,
        borderColor: 'green',
        height: 180,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    avatar:{
        width:70,
        height:70,
        marginBottom:10
    }
})