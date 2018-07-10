import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    StyleSheet,
    ScrollView,
    TouchableHighlight
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { getTeamRank } from '../../api/index'

const screen = Dimensions.get('window');

class TeamList extends Component {
    render() {
        return (
            <TouchableHighlight underlayColor={'transparent'} onPress={() => { alert(this.props.item.address) }}>
                <View style={styles.teamList_item}>
                    <View style={styles.teamList_item_sort}>
                        <Text>
                            {this.props.index + 1}
                        </Text>
                        <Text style={styles.marginLeft_20}>
                            {this.props.item.nickname}
                        </Text>
                    </View>
                    <Image style={{ height: 15 }} source={require('../../assets/images/common/arr2ri.png')} />
                </View>
            </TouchableHighlight>
        )
    }
}

class SignUpNode extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTitle: navigation.state.params.title
    });

    constructor(props) {
        super(props);
        this.state = ({
            nodeType: null,
            teamList: []
        });
        this.navigate = this.props.navigation.navigate;
    }

    componentWillMount() {
        const { params } = this.props.navigation.state;
        this.setState({
            nodeType: params.nodeType
        }, () => {
            getTeamRank({ nodeType: params.nodeType }).then(res => {
                this.setState({
                    teamList: res.data.data
                })
            })
        })
    }

    _personalReg() {
        const lock_num = Number(store.getState().walletInfo.lock_num),
            true_banlance = Number(store.getState().walletInfo.true_banlance);

        switch (this.state.nodeType) {
            case '1':
                if (true_banlance + lock_num < 2000) {
                    alert('个人报名标准节点需要不少于2千TRUE')
                } else {
                    this.navigate('SignUpInput', {
                        title: '个人报名',
                        nodeType: this.state.nodeType,
                        type: '1'
                    });
                }
                break;
            case '2':
                if (true_banlance + lock_num < 50000) {
                    alert('个人报名全节点需要不少于5万TRUE')
                } else {
                    this.navigate('SignUpInput', {
                        title: '个人报名',
                        nodeType: this.state.nodeType,
                        type: '1'
                    });
                }
                break;
        }
    }

    _createTeam() {
        this.navigate('CreateTeam', {
            nodeType: this.state.nodeType
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight style={[styles.spacing, styles.personalReg]} underlayColor={'transparent'} onPress={() => this._personalReg()}>
                    <View style={styles.personalReg_item}>
                        <Text>
                            个人报名
                        </Text>
                        <Image style={{ height: 15 }} source={require('../../assets/images/common/arr2ri.png')} />
                    </View>
                </TouchableHighlight>

                <View style={[styles.spacing, styles.teamList]}>
                    <View style={styles.teamList_header}>
                        <Text>
                            组队列表
                        </Text>
                        <TouchableHighlight style={styles.createTeam} onPress={() => this._createTeam()}>
                            <Text style={styles.createTeam_text}>
                                建立组队
                            </Text>
                        </TouchableHighlight>
                    </View>
                    <ScrollView>
                        {
                            this.state.teamList.map((item, index) => {
                                return <TeamList item={item} index={index} key={index} />
                            })
                        }
                    </ScrollView>
                </View>
            </View>
        );
    }
}

export default withNavigation(SignUpNode)

const styles = StyleSheet.create({
    spacing: {
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 6,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        padding: 30
    },
    personalReg: {
        height: 50
    },
    personalReg_item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    teamList: {
        marginTop: 20,
        backgroundColor: '#fff'
    },
    teamList_header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60
    },
    createTeam: {
        width: 80,
        height: 30,
        backgroundColor: "#007AFF",
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    createTeam_text: {
        color: '#fff'
    },
    teamList_item: {
        marginTop: 4,
        marginBottom: 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    teamList_item_sort: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 35,
        width: screen.width * 0.6
    },
    marginLeft_20: {
        marginLeft: 20
    }
})
