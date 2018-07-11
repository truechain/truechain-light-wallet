import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    PixelRatio,
    Dimensions,
    TextInput,
    TouchableOpacity
} from 'react-native'
import CountryPicker from 'react-native-country-picker-modal';
import { Button } from 'react-native-elements';

const screen = Dimensions.get('window');
import Svg,{
    Path
} from 'react-native-svg';
export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cca2: 'CN',
            callingCode: '86',
            countryName: 'China',
            countdown: -1,
            disabled: false,
            tel: null,
            captcha: null,
            cap_code: null,
            v_code: null,
            disabledLogin: false,
            cap_code_flag: false,
            pathArr: []
        };
        this.backgroundTime = 0;
        this.regPhone = /^(13[0-9]|14[0-9]|15[0-9]|166|17[0-9]|18[0-9]|19[8|9])\d{8}$/;
    }

    componentWillMount() {
        this._fetchCode()
    }
    _fetchCode () {
        fetch('http://39.105.125.189:7001/').then(x => {
            return x.json();
            }).then(x => {
            const arr = x.data.match(/<path.*?\/>/g);
            let pathArr = [];
            arr.forEach(ele => {
                pathArr.push(ele.match(/(?<=\s*.*\w+=")[^"]*(?=")/g));
            });
            this.setState({
                pathArr: pathArr
            })
        })
    }
    setCountdown(countdown) {
        this.setState({
            countdown: countdown
        });
    }

    getCountdown() {
        return this.state.countdown;
    }

    startCountDown() {
        this.interval = setInterval(() => {
            if (this.backgroundTime < this.getCountdown()) {
                this.setState({
                    countdown: this.getCountdown() - this.backgroundTime - 1
                }, () => {
                    this.backgroundTime = 0;
                    if (this.getCountdown() < 0) {
                        this.interval && clearInterval(this.interval);
                    }
                    if (this.getCountdown() >= 0) {
                        this.setButtonClickDisable(true);
                    } else {
                        this.setButtonClickDisable(false);
                    }
                });
            } else {
                this.setCountdown(-1);
                this.setButtonClickDisable(false);
                this.interval && clearInterval(this.interval);
            }
        }, 1000);
        this.setButtonClickDisable(true);
    }

    setButtonClickDisable(enable) {
        this.setState({
            disabled: enable
        });
    }
    setTime = () => {
        if (!this.state.tel) {
            alert('请输入手机号')
        } else if (!this.regPhone.test(this.state.tel)) {
            alert('请输入合法手机号')
        } else if (!this.state.cap_code_flag) {
            alert('请正确输入图形验证码')
        } else {
            this.setCountdown(60);
            this.startCountDown();
            alert('进行发送短信验证码')
            this.setState({
                disabledLogin: false
            })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.country_select, styles.line_bottom]}>
                    <Text>
                        国家/地区
                    </Text>
                    <Text>
                        {this.state.countryName}
                        <CountryPicker
                            onChange={value => {
                                this.setState({ cca2: value.cca2, callingCode: value.callingCode, countryName: value.name })
                            }}
                            cca2={this.state.cca2}
                            filterable
                        />
                    </Text>
                </View>

                <View style={[styles.input, styles.line_bottom]}>
                    <Text>
                        +{this.state.callingCode}
                    </Text>
                    <TextInput
                        maxLength={11}
                        onChangeText={(tel) => this.setState({ tel })}
                        style={[styles.input_item, styles.tel_input]}
                        placeholder='请输入手机号'
                    />
                </View>

                <View style={[styles.input, styles.cap, styles.line_bottom]}>

                    <TextInput
                        maxLength={4}
                        onChangeText={(cap_code) => this.setState({ cap_code })}
                        style={[styles.input_item, styles.cap_input]}
                        placeholder='输入图片验证码'
                    />
                    <View>
                        <Text onPress={() => this._fetchCode()} style={styles.authCode}></Text>
                        <Svg
                            height="50"
                            width="150"
                        >
                            {
                            this.state.pathArr.map((item, index) => {
                                    if(item.length === 3) {
                                        return <Path fill="#222" d={item[0]} key={index} stroke={item[1]} fill={item[2]} />;
                                    } else {
                                        return <Path fill="#222" d={item[1]} key={index} />;
                                    }
                                })
                            }
                        </Svg>
                    </View>
                </View>

                <View style={[styles.input, styles.cap, styles.line_bottom]}>
                    <TextInput
                        maxLength={6}
                        style={[styles.input_item, styles.cap_input]}
                        placeholder='输入手机验证码'
                    />
                    <TouchableOpacity disabled={this.state.disabled} onPress={this.setTime}>
                        {this.state.countdown >= 0 ?
                            <Text style={styles.color_bu}>
                                {`${this.state.countdown}`}秒
                    </Text> :
                            <Text style={styles.color_bu} >
                                获取验证码
                    </Text>
                        }
                    </TouchableOpacity>
                </View>

                <Button
                    title='登录'
                    onPress={() => { alert('huhu') }}
                    buttonStyle={styles.buttonStyle}
                    disabled={this.state.disabledLogin}
                    disabledStyle={styles.disabledStyle}
                ></Button>
                <View style={styles.prompt}>
                    <Text>未注册过的手机号将自动创建账号</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    authCode: {
        width: 150,
        height: 50,
        zIndex: 999,
        position: 'absolute'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingLeft: 20,
        paddingRight: 20,
    },
    line_bottom: {
        borderBottomWidth: 1,
        borderBottomColor: '#E6E6E6'
    },
    country_select: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    input: {
        height: 50,
        alignItems: 'center',
        flexDirection: 'row'
    },
    input_item: {
        height: 50
    },
    tel_input: {
        marginLeft: 10,
        width: screen.width * 0.8
    },
    cap: {
        justifyContent: 'space-between'
    },
    cap_input: {
        width: screen.width * 0.5
    },
    buttonStyle: {
        backgroundColor: "#007AFF",
        height: 45,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 50,
        marginTop: 30
    },
    prompt: {
        marginTop: 30,
        alignItems: 'center'
    },
    color_bu: {
        color: '#007AFF'
    },
    disabledStyle: {
        backgroundColor: '#ccc'
    }
})