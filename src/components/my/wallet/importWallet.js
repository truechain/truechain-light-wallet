import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button    
} from 'react-native';
import I18n from '../../../../language/i18n';
import * as types from '../../../store/actionTypes'
import { NavigationAction } from 'react-navigation';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';

export default class ImportWallet extends Component {
    static navigationOptions = {
        title: `${I18n.t('guide.importWallet')}`,
        headerTintColor: '#000'
    };

    ImportWallet(){        
              
    }
    
    render() {             
        return <ScrollableTabView
            style={{ backgroundColor: '#fff' }}
            tabBarUnderlineStyle={{ backgroundColor: '#007aff', height: 2 }}
            tabBarActiveTextColor='#007aff'
            tabBarInactiveTextColor='#000'
            renderTabBar={() => <DefaultTabBar />}
        >        
        {/* 助记词导入 */}
            <View tabLabel={I18n.t('wallet.mnemonic')} style={styles.padding_10} >
                <TextInput
                    id='mnemonicArea'
                    autoFocus={true}                                      
                    style={styles.mnemonicArea}                
                    multiline={true}                             
                    placeholder={I18n.t('wallet.mnemonicPlaceholder')}
                />                
                <Button
                title={I18n.t('guide.importWallet')}                
                onPress={this.ImportWallet}                            
                ></Button>                
            </View>
            
            {/* <View tabLabel={I18n.t('wallet.officialWallet')}>
                <Text>官方钱包</Text>
            </View>            
            <View tabLabel={I18n.t('wallet.privateKey')}>
                <Text>私钥</Text>
            </View>  */}
                       
        </ScrollableTabView>;
    }
}

const styles = StyleSheet.create({
    mnemonicArea:{
        minHeight:100,
        padding:8,                
        borderWidth: 1,
        borderRadius:7,
        borderColor: '#E6E6E6',
    },
    padding_10:{
        padding:10
    }
});
