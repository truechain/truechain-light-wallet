import React, { Component } from 'react';
import {    
    View,
    TextInput,Text,Slider,
    StyleSheet,
    Modal,
    TouchableHighlight,
    TouchableOpacity,
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
        // this.setModalVisible = this.setModalVisible.bind(this);
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
                    onPress={ ()=>{ this.setModalVisible(true) } } 
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
                            <View style={styles.modalInput}>
                                <TextInput 
                                    placeholder="输入密码" 
                                    underlineColorAndroid="transparent"
                                />
                            </View>
                            <View style={styles.modalBottomBtn}>
                                <TouchableOpacity 
                                style={{flex:1}}
                                activeOpacity={0.5} 
                                underlayColor={"#ddd"} activeOpacity={0.5} 
                                onPress={() => {
                                    this.setModalVisible(false)
                                }}>
                                    <View style={styles.modalBottomBtnNo}>
                                        <Text style={styles.modalBottomBtnNoText}>取消</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                style={{flex:1}} 
                                activeOpacity={0.5}
                                underlayColor={"#ddd"} activeOpacity={0.5} 
                                onPress={() => {
                                    this.setModalVisible(false)
                                }}>
                                    <View style={styles.modalBottomBtnYes}>
                                        <Text style={styles.modalBottomBtnYesText}>确认</Text>
                                    </View>
                                </TouchableOpacity>
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
    },
    modalCon:{
        backgroundColor:"rgba(0,0,0,0.5)",
        flex:1,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"flex-end"
    },
    modal:{
        flex:1,
        backgroundColor:"white",
        paddingLeft:15,
        paddingRight:15
    },
    modalTitle:{
        fontSize:16,
        color:"#222",
        lineHeight:56,
        height:56,
        textAlign:"center",
        paddingLeft:15,
        paddingRight:15
    },
    modalInput:{
        borderWidth:1,
        borderColor:"#eee",
        borderRadius:4,
        paddingLeft:15,
        paddingRight:15,
        marginBottom:50,
    },
    modalBottomBtn:{
        flexDirection:"row",
        justifyContent:"space-between",
        paddingBottom:40
    },
    modalBottomBtnNo:{
        
        backgroundColor:"#35CCBF",
        height:45,
        borderTopLeftRadius:23,
        borderBottomLeftRadius:23
    },
    modalBottomBtnYes:{
        backgroundColor:"#528BF7",
        borderTopRightRadius:23,
        borderBottomRightRadius:23
    },
    modalBottomBtnNoText:{
        color:"white",
        height:45,
        lineHeight:45,
        textAlign:"center",
        
    },
    modalBottomBtnYesText:{
        color:"white",
        height:45,
        lineHeight:45,
        textAlign:"center",
        
    }

})