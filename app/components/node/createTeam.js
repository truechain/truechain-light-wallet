import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    StyleSheet,
    TouchableHighlight
} from 'react-native';
import {
    Input,
    Button
} from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { createTeam, writeUserInfo } from '../../api/index'
const screen = Dimensions.get('window');
class CreateTeam extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            nodeType: null,
            personalNickName: null,
            teamNickName: null,
            declaration: null
        })
        this.navigate = this.props.navigation.navigate;
    }

    componentDidMount() {
        const { params } = this.props.navigation.state;
        this.setState({
            nodeType: params.nodeType
        })
    }

    _signUp() {
        createTeam({
            nickname: this.state.teamNickName,
            declaration: this.state.declaration,
            nodeType: this.state.nodeType,
            type: '2'
        }).then(res => {
            console.log(res);
        })

        writeUserInfo({
            nickName: this.state.personalNickName
        }).then(res => {
            console.log(res);
        })

        this.navigate('Lockpositon', {
            type: 2,
            nodeType: this.state.nodeType
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.InfoArea, styles.marginTop_10]}>
                    <Text>
                        个人信息
                    </Text>
                    <Input
                        placeholder='个人昵称'
                        onChangeText={(personalNickName) => {
                            this.setState({
                                personalNickName
                            })
                        }}
                        inputContainerStyle={[styles.inputContainerStyle, styles.marginTop_10]}
                    />
                </View>

                <View style={[styles.InfoArea, styles.marginTop_10]}>
                    <Text>
                        组队信息
                    </Text>
                    <Input
                        placeholder='组队昵称'
                        onChangeText={(teamNickName) => {
                            this.setState({
                                teamNickName
                            })
                        }}
                        inputContainerStyle={[styles.inputContainerStyle, styles.marginTop_10]}
                    />
                    <Input
                        placeholder='竞选宣言'
                        onChangeText={(declaration) => {
                            this.setState({
                                declaration
                            })
                        }}
                        inputContainerStyle={[styles.inputContainerStyle, styles.marginTop_10]}
                    />
                </View>

                <View style={styles.next}>
                    <Button
                        title='下一步'
                        buttonStyle={styles.buttonStyle}
                        onPress={() => {
                            this._signUp();
                        }}
                    />
                </View>
            </View>
        );
    }
}

export default withNavigation(CreateTeam)

const styles = StyleSheet.create({
    marginTop_10: {
        marginTop: 10
    },
    container: {
        flex: 1,
        alignItems: 'center'
    },
    InfoArea: {
        width: screen.width * 0.9,
        backgroundColor: '#fff',
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        borderRadius: 8
    },
    inputContainerStyle: {
        width: screen.width * 0.81,
        borderColor: '#e6e6e6'
    },
    next: {
        marginTop: 30,
        alignItems: 'center'
    },
    buttonStyle: {
        backgroundColor: '#528bf7',
        width: 260,
        height: 45,
        borderRadius: 30
    },
})

