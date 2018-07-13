import React, { Component } from 'react';
import {
    View,
    TextInput,
    Text,
    Modal,
    Dimensions,
    StyleSheet,
    TouchableHighlight
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Button } from 'react-native-elements';
import { joinTeamRequest } from '../../api/loged';
import RadiusBtn from '../public/radiusbtn';
const screen = Dimensions.get('window');

class FillInfo extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            nickName: null,
            nickNameFlag: true,
            reason: null,
            reasonFlag: true,
            isNext: false,
            nodeType: null,
            teamAddress: null,
            isSuccess: false
        })
        this.navigate = this.props.navigation.navigate;
    }

    static navigationOptions = () => ({
        headerTitle: '填写信息'
    });

    componentDidMount() {
        const { params } = this.props.navigation.state;
        this.setState({
            nodeType: params.nodeType,
            teamAddress: params.teamAddress
        })
    }

    _joinTeam() {
        joinTeamRequest({
            teamAddress: this.state.teamAddress,
            nodeType: this.state.nodeType
        }).then(res => {
            console.log(res);
            if (res.data.status === 200) {
                this.setState({
                    isSuccess: true
                })
            } else {
                alert(res.data.message)
            }
        })
    }

    render() {
        return (
            <View style={styles.inputPage}>
                <View style={styles.infoBox}>
                    <Text style={styles.infoBoxTitle}>个人信息</Text>
                    <TextInput
                        style={[styles.textInput, styles.textInputNickname]}
                        placeholder='昵称'
                        maxLength={15}
                        selectionColor="#528BF7"
                        underlineColorAndroid="#528BF7"
                        onChangeText={(nickName) => {
                            this.setState({
                                nickName
                            })
                            if (nickName) {
                                this.setState({
                                    nickNameFlag: false
                                })
                            } else {
                                this.setState({
                                    nickNameFlag: true
                                })
                            }
                        }}
                    ></TextInput>
                    <TextInput style={[styles.textInput, styles.textInputBig]}
                        placeholder='申请理由'
                        multiline={true}
                        maxLength={50}
                        selectionColor="#528BF7"
                        underlineColorAndroid="#528BF7"
                        onChangeText={(reason) => {
                            this.setState({
                                reason
                            })
                            if (reason) {
                                this.setState({
                                    reasonFlag: false
                                })
                            } else {
                                this.setState({
                                    reasonFlag: true
                                })
                            }
                        }}
                    />
                </View>

                <TouchableHighlight style={styles.center}>
                    <Button
                        title='下一步'
                        buttonStyle={styles.buttonStyle}
                        disabled={this.state.nickNameFlag || this.state.reasonFlag}
                        onPress={() => {
                            this._joinTeam();
                        }}
                    />
                </TouchableHighlight>

                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.isSuccess}
                >
                    <View style={styles.success}>
                        <View style={styles.success_item}>>
                                <Text style={styles.success_text}>
                                申请提交成功
                                </Text>
                            <Text style={styles.marginBottom}>
                                申请已提交成功，请等待队长处理！
                                </Text>
                            <RadiusBtn
                                btnText='返回'
                                onPress={() => {
                                    this.setState({
                                        isSuccess: false
                                    })
                                    this.props.navigation.navigate('Home');
                                }}
                            />
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

export default withNavigation(FillInfo)

const styles = StyleSheet.create({
    inputPage: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 20,
        paddingBottom: 30
    },
    infoBox: {
        backgroundColor: "white",
        marginBottom: 30,
        borderRadius: 10,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 15,
        paddingRight: 15
    },
    infoBoxTitle: {
        fontSize: 15,
        color: "#222"
    },
    textInput: {
        marginTop: 20,
        borderColor: "#eee",
        borderWidth: 1 / 2,
        borderColor: '#ccc',
        borderRadius: 6
    },
    textInputNickname: {
        height: 35
    },
    textInputBig: {
        height: 50
    },
    bottomBtn: {
        height: 45,
        fontSize: 15,
        borderRadius: 23
    },
    center: {
        alignItems: 'center'
    },
    buttonStyle: {
        backgroundColor: '#528bf7',
        width: 260,
        height: 45,
        borderRadius: 30
    },
    success: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        height: 100,
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    success_item: {
        width: screen.width * 0.9,
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        justifyContent: 'center',
    },
    success_text: {
        textAlign: 'center',
        marginBottom: 20
    },
    marginBottom: {
        marginBottom: 20
    }
})