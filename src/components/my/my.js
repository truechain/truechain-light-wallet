import React, { Component } from 'react';
import styles from './mystyle';
import { 
    View, Text,StyleSheet, 
    Image
} from 'react-native';

export default class My extends Component {
    render() {
        return (
            <View style={styles.myPage}>
                <View style={styles.myTopBan}>
                    <Text style={styles.myTopBanTitle} >我的</Text>
                    <View style={styles.myTopBanCon}>
                        <View style={styles.myTopBanConItem}>
                            <Image style={styles.myTopBanWalleticon} source={require('../../assets/images/my/wallet-icon_2x.png')} />
                            <Text style={styles.myTopBanConItemText}>
                                钱包管理
                            </Text>
                        </View>
                        <View style={styles.myTopBanConItem}>
                            <Image style={styles.myTopBanrecicon} source={require('../../assets/images/my/deal-icon_2x.png')} />
                            <Text style={styles.myTopBanConItemText}>
                                交易记录
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.myColsCon}>
                    <View style={styles.myColsConPart}>
                        <View style={styles.myColsConPartRow}>
                            <View style={styles.myColsConPartRowLf}>
                                <Image style={styles.iconMsg} source={require('../../assets/images/my/message-icon_2x.png')} />
                            </View>
                            <View style={styles.myColsConPartRowRi}>
                                <Text>消息中心</Text>
                                <View style={styles.myColsConPartRowRi2R}>
                                    <Text style={styles.newMsgFlag}>5</Text>
                                    <Image style={styles.iconArr2R} resizeMode={Image.resizeMode.stretch} source={require('../../assets/images/common/arr2ri.png')} />
                                </View>
                            </View>
                        </View>
                        <View style={styles.myColsConPartRow}>
                            <View style={styles.myColsConPartRowLf}>
                                <Image style={styles.iconLinkman} source={require('../../assets/images/my/contacts-icon_2x.png')} />
                            </View>
                            <View style={styles.myColsConPartRowRi}>
                                <Text>联系人</Text>
                                <View style={styles.myColsConPartRowRi2R}>
                                    <Image style={styles.iconArr2R} resizeMode={Image.resizeMode.stretch} source={require('../../assets/images/common/arr2ri.png')} />
                                </View>
                            </View>
                        </View>
                        <View style={styles.myColsConPartRow}>
                            <View style={styles.myColsConPartRowLf}>
                                <Image style={styles.iconSettings} source={require('../../assets/images/my/setting-icon_2x.png')} />
                            </View>
                            <View style={[styles.myColsConPartRowRi,styles.noSplitLine]}>
                                <Text>系统设置</Text>
                                <View style={styles.myColsConPartRowRi2R}>
                                    <Image style={styles.iconArr2R} resizeMode={Image.resizeMode.stretch} source={require('../../assets/images/common/arr2ri.png')} />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.myColsConPart}>
                        <View style={styles.myColsConPartRow}>
                            <View style={styles.myColsConPartRowLf}>
                                <Image style={[styles.icon22,styles.iconHelper]} resizeMode={Image.resizeMode.stretch} source={require('../../assets/images/my/help-icon_2x.png')} />
                            </View>
                            <View style={styles.myColsConPartRowRi}>
                                <Text>帮助中心</Text>
                                <View style={styles.myColsConPartRowRi2R}>
                                    <Image style={styles.iconArr2R} resizeMode={Image.resizeMode.stretch} source={require('../../assets/images/common/arr2ri.png')} />
                                </View>
                            </View>
                        </View>
                        <View style={styles.myColsConPartRow}>
                            <View style={styles.myColsConPartRowLf}>
                                <Image style={[styles.icon22,styles.iconAbout]} resizeMode={Image.resizeMode.stretch} source={require('../../assets/images/my/aboutus-icon_2x.png')} />
                            </View>
                            <View style={[styles.myColsConPartRowRi,styles.noSplitLine]}>
                                <Text>关于我们</Text>
                                <View style={styles.myColsConPartRowRi2R}>
                                    <Image style={styles.iconArr2R} resizeMode={Image.resizeMode.stretch} source={require('../../assets/images/common/arr2ri.png')} />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

