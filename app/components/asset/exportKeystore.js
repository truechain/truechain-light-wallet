import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Clipboard,
    TouchableHighlight
} from 'react-native';
import { Button } from 'react-native-elements';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import Toast from 'react-native-easy-toast';
import QRCode from 'react-native-qrcode'

export default class ExportKeystore extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            keystoreV3: null
        })
    }

    componentDidMount() {
        const { params } = this.props.navigation.state;
        this.setState({
            keystoreV3: JSON.stringify(params.keystoreV3)
        })
    }

    _setClipboardContent = async () => {
        Clipboard.setString(this.state.keystoreV3);
        try {
            var content = await Clipboard.getString();
            this.refs.toast.show('复制成功!');
        } catch (e) {
            this.refs.toast.show('复制失败!');
        }
    };

    render() {
        return (
            <ScrollableTabView
                style={{ backgroundColor: '#fff' }}
                tabBarUnderlineStyle={{ backgroundColor: '#007aff', height: 2 }}
                tabBarActiveTextColor='#007aff'
                tabBarInactiveTextColor='#000'
                renderTabBar={() => <DefaultTabBar />}
            >
                <View tabLabel='keyStore文件' style={styles.container}>
                    <ScrollView>
                        <View style={styles.warningBox}>
                            <Text style={styles.color_cbf}>
                                离线保存
                    </Text>
                            <Text style={styles.color_999}>
                                请复制粘贴keystore文件到安全、离线的地方进行保存。切勿保存至邮箱、记事本、网盘、聊天工具等，非常危险
                    </Text>
                        </View>
                        <View style={styles.warningBox}>
                            <Text style={styles.color_cbf}>
                                请勿使用网络传输
                    </Text>
                            <Text style={styles.color_999}>
                                请勿通过网络工具传输 keystore 文件，一但被黑客获取将造成不可挽回的资产损失。建议离线设备通过二维码方式传输。
                    </Text>
                        </View>
                        <View style={styles.warningBox}>
                            <Text style={styles.color_cbf}>
                                密码保险箱保存
                    </Text>
                            <Text style={styles.color_999}>
                                如需在线保存，则建议使用安全等级更高的 1Password 等密码保管软件保存 keystore。
                    </Text>
                        </View>
                        <TouchableHighlight style={styles.keystore_area}>
                            <Text>
                                {this.state.keystoreV3}
                            </Text>
                        </TouchableHighlight>
                        <Button
                            title={'复制keystore'}
                            onPress={this._setClipboardContent.bind(this)}
                            buttonStyle={styles.buttonStyle}
                        ></Button>
                        <Toast ref="toast" position='center' />
                    </ScrollView>
                </View>
                <View tabLabel='二维码' style={styles.container}>
                    <View style={styles.warningBox}>
                        <Text style={styles.color_cbf}>
                            仅供直接扫描
                        </Text>
                        <Text style={styles.color_999}>
                            二维码禁止保存、截图以及拍照。仅供用户在安全环境下直接扫描来方便的导入钱包。
                        </Text>
                    </View>
                    <View style={styles.warningBox}>
                        <Text style={styles.color_cbf}>
                            在安全的环境下使用
                        </Text>
                        <Text style={styles.color_999}>
                            请在确保四周无人及无摄像头的情况下使用。二维码一旦被他人获取讲造成不可挽回的资产损失。
                        </Text>
                    </View>
                    <View style={styles.qrcode}>
                        <QRCode
                            value={this.state.keystoreV3}
                            size={200}
                        />
                    </View>

                </View>
            </ScrollableTabView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    warningBox: {
        height: 70,
        justifyContent: 'space-around'
    },
    color_999: {
        color: '#999'
    },
    color_cbf: {
        color: '#35ccbf'
    },
    keystore_area: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 10,
        marginTop: 10
    },
    buttonStyle: {
        backgroundColor: "#007AFF",
        height: 45,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 50,
        marginTop: 30
    },
    qrcode: {
        alignItems: 'center',
        marginTop: 50
    }
})
