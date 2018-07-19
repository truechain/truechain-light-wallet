import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
} from 'react-native';
import { Button } from 'react-native-elements';
import lightwallet from 'eth-lightwallet'

import { withNavigation } from 'react-navigation'
import { Polygon } from 'react-native-svg';

export class ExportMnemonic extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            Mnemonic: ' ',
            backupBtnText:'请备份您的助记词',
            backupBtnOpacity:0.6,
            onPress:null,
            step:'backup',
            words:null,
            selectWordsText: ' ',
            selectWords: [],
            randomWords:[]
        })
        this.navigate = this.props.navigation.navigate;
        this.nextStep = this.nextStep.bind(this);
        this.confirmWords = this.confirmWords.bind(this);
        this.renderWord = this.renderWord.bind(this);
        this.clickWord = this.clickWord.bind(this);
    }

    componentDidMount() {
        const { params } = this.props.navigation.state;
        storage.load({ key: 'walletInfo' }).then(res => {
            let mneKeystore = lightwallet.keystore.deserialize(JSON.stringify(res.ks));
            mneKeystore.keyFromPassword(params.walletPassword, (err, pwDerivedKey) => {
                let Mnemonic = mneKeystore.getSeed(pwDerivedKey);
                this.setState({
                    Mnemonic: Mnemonic,
                });
            })
        });

        setTimeout(()=>{
            this.setState({
                backupBtnText:'下一步',
                backupBtnOpacity:1
            });
        } ,10000)
    }

    // 抄写完 点击下一步时 去确认
    nextStep(){
        let randomWords = this.state.Mnemonic.toString().split(' ').sort();
        words = randomWords.map( (w,i)=> this.renderWord(w,i)  );
        this.setState(
            {
                step:'confirm',
                randomWords,
                words
            }
        );
    }

    // 选择助记词完 点击确认完成
    confirmWords(){
        if( this.state.selectWordsText == this.state.Mnemonic ){
            alert('助记词正确,请妥善保管您的助记词！')
            // this.navigate('Home');
        }
        else{
            alert("助记词有误，请重新输入")
            this.setState({
                selectWords:[],
                selectWordsText:' '
            })
        }
        
    }

    clickWord(i){
        let word = this.state.randomWords[i];
        let selectWords = this.state.selectWords
        selectWords.push(word)
        selectWordsText = selectWords.join(' ')
        this.setState({
            selectWords,
            selectWordsText
        });
    }

    renderWord(word,i){
        return (
            <Text 
                key={i}
                style={styles.word}
                onPress={ ()=>{ this.clickWord(i); } } 
            >
                {word}
            </Text>
        );
    }


    render() {
        let currentStep = null;
        if (this.state.step == 'backup'){
            currentStep = (
                <View style={styles.container}>
                    <View style={styles.warning}>
                        <Text style={styles.warning_item}>
                            抄写下你的助记词
                        </Text>
                        <Text style={styles.color_999}>
                            助记词用于恢复钱包或重置钱包密码，将它准确的抄写到纸上，并存放在只有你知道的安全地方。
                        </Text>
                    </View>

                    <TouchableHighlight style={styles.mnemonic_area}>
                        <View>
                            <Text style={styles.mnemonic}>
                                {this.state.Mnemonic}
                            </Text>
                        </View>
                    </TouchableHighlight>                    
                    <Button 
                        title={this.state.backupBtnText} 
                        buttonStyle={styles.backupBtn} 
                        onPress={this.nextStep}
                    />
                </View>
            );
        }
        if (this.state.step == 'confirm'){
            currentStep = (
                <View style={styles.container}>
                    <View style={styles.warning}>
                        <Text style={styles.warning_item}>
                            确认你的钱包助记词
                        </Text>
                        <Text style={styles.color_999}>
                            请按顺序点击助记词，以确认你备份的助记词正确。
                        </Text>
                    </View>
                    <TouchableHighlight style={styles.mnemonic_area}>
                        <View>
                            <Text style={styles.mnemonic}>
                                {this.state.selectWordsText}
                            </Text>
                        </View>
                    </TouchableHighlight>
                    <View style={styles.wordsCon}>
                        {this.state.words}
                    </View>
                    <Button 
                        title="完成" 
                        buttonStyle={styles.backupBtn} 
                        onPress={this.confirmWords}
                    />
                </View>
            );
        }

        return (<View style={styles.container}>{currentStep}</View>);
    }
}

export default withNavigation(ExportMnemonic)

const styles = StyleSheet.create({
    color_999: {
        color: '#999'
    },
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff'
    },
    warning: {
        marginTop: 30,
        height: 60,
        justifyContent: 'space-around'
    },
    warning_item: {
        color: '#35ccbf'
    },
    mnemonic_area: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 10,
        marginTop: 20
    },
    mnemonic: {
        lineHeight: 20
    },
    backupBtn:{
        backgroundColor: '#528bf7',
		width: 300,
		height: 45,
        borderRadius: 30,
        marginLeft:'auto',
        marginRight:'auto',
        marginTop:30
    },
    word:{
        backgroundColor:'#eee',
        color:'#555',
        paddingVertical:10,
        paddingHorizontal:6,
        margin:8,
        borderRadius:6
    },
    wordsCon:{
        flexDirection:'row',
        flexWrap:'wrap',
        marginTop:30
    }
})
