import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    ScrollView,
    TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import {
    Input,
    Slider,
    Button
} from 'react-native-elements';

import Modal from 'react-native-modalbox'

const screen = Dimensions.get('window');

class Detail extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.paymentDetails_item}>
                <Text style={styles.paymentDetails_item_key}>{this.props.key_k}</Text>
                <Text style={[styles.paymentDetails_item_key, this.props.style]}>{this.props.val}</Text>
            </View>
        )
    }
}

export default class Transfer extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            value: 0.00042840
        })
    }
    static navigationOptions = {
        headerTitle: '转账',
        headerRight: (
            <TouchableHighlight underlayColor={'transparent'} onPress={()=>{
                alert('扫描')
            }}>
            <Image style={{
                width:20,
                height:20,
                marginRight:10
            }} 
            source={require('../../assets/images/common/ercodeicon.png')} 
            />
            </TouchableHighlight>
        )
    };
    render() {
        return (
            <View style={styles.container}>
                <Input
                    placeholder='收款人钱包地址'
                    rightIcon={
                        <Icon
                            name='user'
                            size={25}
                            onPress={() => {
                                alert('联系人')
                            }}
                        />
                    }
                    inputContainerStyle={styles.inputContainerStyle}
                />
                <Input
                    placeholder='转账金额'
                    inputContainerStyle={styles.inputContainerStyle}
                />
                <Input
                    placeholder='备注'
                    inputContainerStyle={styles.inputContainerStyle}
                />
                <Text style={styles.minerCosts_text}>矿工费用</Text>
                <Slider
                    value={this.state.value}
                    onValueChange={(value) => this.setState({ value })}
                    minimumTrackTintColor='#528bf7'
                    thumbTintColor='#528bf7'
                    minimumValue={0.00022932}
                    step={0.00000001}
                    maximumValue={0.00251999}
                />

                <View style={styles.gasPrice}>
                    <Text>
                        慢
                    </Text>
                    <Text style={styles.textAlign}>
                        {this.state.value} ether
                    </Text>
                    <Text>
                        快
                     </Text>
                </View>
                <View style={styles.next}>
                    <Button
                        title='下一步'
                        buttonStyle={styles.buttonStyle}
                        onPress={() => {
                            this.refs.transferDetail.open()
                        }}
                    />
                </View>
                <Modal style={[styles.modal, styles.modal4, styles.paymentDetails]} position={"bottom"} ref={"transferDetail"} swipeArea={20}>
                    <ScrollView>
                        <View style={styles.paymentDetails_title}>
                            <Text>
                                支付详情
                                </Text>
                        </View>
                        <Detail
                            key_k='订单信息'
                            val='转账'
                            style={styles.marginLeft_20}
                        />
                        <Detail
                            key_k='转入地址'
                            val='0x1782730Ce1234......34b1970F9f4A89f'
                            style={styles.marginLeft_20}
                        />
                        <Detail
                            key_k='转出地址'
                            val='0x1782730Ce1234......34b1970F9f4A89f'
                            style={styles.marginLeft_20}
                        />
                        <Detail
                            key_k='矿工费用'
                            gasPrice='666'
                            val='22000'
                            style={styles.paymentDetails_item_gasPOramount}
                        />

                        <Detail
                            key_k='金额'
                            val='10.0000'
                            style={styles.paymentDetails_item_gasPOramount}
                        />

                        <View style={styles.next}>
                            <Button
                                title='下一步'
                                buttonStyle={styles.buttonStyle}
                                onPress={() => {
                                    this.refs.transferPwd.open()
                                }}
                            />
                        </View>
                        <Modal style={[styles.modal, styles.modal4, styles.paymentDetails]} position={"bottom"} ref={"transferPwd"} swipeArea={20}>
                            <ScrollView>
                                <View style={styles.paymentDetails_title}>
                                    <Text>
                                        钱包密码
                                    </Text>
                                </View>
                                <Input
                                    placeholder='请输入你的密码'
                                    secureTextEntry='true'
                                    inputContainerStyle={[styles.inputContainerStyle, styles.pwdStyle]}
                                />
                                <View style={styles.pwdNext}>
                                    <Button
                                        title='下一步'
                                        buttonStyle={styles.buttonStyle}
                                        onPress={() => {
                                            alert('转账结果')
                                        }}
                                    />
                                </View>
                            </ScrollView>
                        </Modal>

                    </ScrollView>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textAlign: {
        textAlign: 'center'
    },
    textRight: {
        flex: 1,
        textAlign: 'right'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 30
    },
    inputContainerStyle: {
        width: screen.width - 20,
        borderColor: '#e6e6e6'
    },
    minerCosts_text: {
        marginTop: 15,
        marginLeft: 10,
        color: '#999',
        fontSize: 16
    },
    gasPrice: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    next: {
        marginTop: 30,
        alignItems: 'center'
    },
    buttonStyle: {
        backgroundColor: '#528bf7',
        width: 300,
        height: 45,
        borderRadius: 30
    },
    paymentDetails: {
        width: screen.width,
        height: screen.height * 0.6,
        borderWidth: 1,
        borderColor: 'green'
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal4: {
        height: screen.height * 0.6
    },
    paymentDetails_title: {
        width: screen.width,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#c8c7cc'      //  支付详情分割线 
    },
    marginLeft_20: {
        marginLeft: 20
    },
    paymentDetails_item: {
        marginLeft: 10,
        marginRight: 10,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#8f8f94'
    },
    paymentDetails_item_key: {
        color: '#8f8f94'
    },
    paymentDetails_item_gasPOramount: {
        flex: 1,
        color: '#000',
        textAlign: 'right'
    },
    pwdStyle: {
        marginTop: 30,
        width: screen.width,
        borderBottomWidth: 1,
        borderBottomColor: '#8f8f94'
    },
    pwdNext: {
        alignItems: 'center',
        position: 'relative',
        top: 100
    }
})
