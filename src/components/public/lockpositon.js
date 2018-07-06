import React, { Component } from 'react';
import {    
    View,
    TextInput,Text,Slider,
    StyleSheet,
    Modal,
    TouchableHighlight,
    DeviceEventEmitter
} from 'react-native';
import RadiusBtn from './radiusbtn'

/**
 * 这是抽象出来的锁仓界面组件
 * 使用时传入相应属性的数据
 * 示例:
 * 
 */

class LockPosition extends Component {   
    constructor(props) {
        super(props);
        this.state = {modalVisible: false};
        this.setModalVisible = this.setModalVisible.bind(this);
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    componentDidMount() {
        this.listener = DeviceEventEmitter.addListener('showModal',(e)=>{
            this.setModalVisible(true)
        });
    }

    
    

    render() {
        return (
            <View style={styles.inputPage}>                
                <View style={styles.infoBox}>
                    <Text style={styles.infoBoxTitle}>锁仓地址</Text>
                    <View style={styles.splitLine}>
                        <TextInput placeholder={this.props.line1TextHoloder} 
                        underlineColorAndroid="transparent"
                        ></TextInput>
                    </View>
                    
                    <Text style={styles.infoBoxTitle}>矿工费用</Text>
                    <Slider 
                    maximumValue={100} 
                    thumbTintColor="#528BF7"
                    minimumTrackTintColor="#528BF7"
                    step={1}
                    />
                    <View style={styles.feeCon}>
                        <Text>慢</Text>
                        <Text>{"0.0012ether"}</Text>
                        <Text>块</Text>
                    </View>
                </View>
                <RadiusBtn
                    btnText={ this.props.bottomBtnText }
                    onPress={ this.nextStep } 
                />

                <Modal 
                animationType={"fade"}
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={ () => { this.setState({modalVisible: false}); } }
                >
                    <View style={styles.modalCon}>
                        <View style={styles.modal}>
                            <Text style={styles.modalTitle}>输入密码</Text>
                            <View>
                                <TextInput />
                            </View>
                            <View style={styles.modalBottomBtn}>
                                <TouchableHighlight 
                                underlayColor={"#ddd"} activeOpacity={0.5} 
                                onPress={() => {
                                this.setModalVisible(!this.state.modalVisible)
                                }}>
                                    <View style={styles.modalBottomBtnNo}>
                                        <Text style={styles.modalBottomBtnNoText}>取消</Text>
                                    </View>
                                </TouchableHighlight>
                                <TouchableHighlight 
                                underlayColor={"#ddd"} activeOpacity={0.5} 
                                onPress={() => {
                                this.setModalVisible(!this.state.modalVisible)
                                }}>
                                    <View style={styles.modalBottomBtnYes}>
                                        <Text style={styles.modalBottomBtnYesText}>确认</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}
export default LockPosition;

const styles = StyleSheet.create({
    inputPage:{
        flex:1,
        paddingLeft: 15,
        paddingRight:15,
        paddingTop:20,
        paddingBottom:30
    },
    infoBox:{
        backgroundColor:"white",
        marginBottom:30,
        paddingLeft:15,
        paddingRight:15,
        paddingTop:20,
        paddingBottom:20,
        borderRadius:10
    },
    infoBoxTitle:{
        fontSize:15,
        color:"#666",
    },
    splitLine:{
        borderTopWidth:1,
        borderBottomWidth:1,
        borderColor:"#eee",
        marginBottom:10,
        marginTop:10
    },
    feeCon:{
        flexDirection:"row",
        justifyContent:"space-between"
    }
})