import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight
} from 'react-native';

export default class ExportMnemonic extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            Mnemonic: ' '
        })
    }
    
    componentDidMount() {
        const { params } = this.props.navigation.state;
        let mneKeystore = store.getState().createWallet.mneKeystore;
        mneKeystore.keyFromPassword(params.walletPassword, (err, pwDerivedKey) => {
            var Mnemonic = mneKeystore.getSeed(pwDerivedKey);
            this.setState({
                Mnemonic: Mnemonic
            })
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.warning}>
                    <Text style={styles.warning_item}>
                        抄写下你的助记词
                    </Text>
                    <Text style={styles.color_999}>
                        助记词用于恢复钱包或重置钱包密码，将它准确的抄写到纸上，并存放在只有你知道的安全地方。
                    </Text>
                </View>

                <TouchableHighlight style={styles.mnemonic_area}>
                    <View>
                        <Text style={styles.mnemonic}>
                            {this.state.Mnemonic}
                        </Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    color_999: {
        color: '#999'
    },
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff'
    },
    warning: {
        marginTop: 30,
        height: 60,
        justifyContent: 'space-around'
    },
    warning_item: {
        color: '#35ccbf'
    },
    mnemonic_area: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 10,
        marginTop: 20
    },
    mnemonic: {
        lineHeight: 20
    }
})
