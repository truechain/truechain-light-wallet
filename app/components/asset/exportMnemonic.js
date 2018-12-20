import React, { Component } from 'react';
import { View, Alert, Text, StyleSheet,Image, TouchableHighlight } from 'react-native';
import { Button } from 'react-native-elements';
import lightwallet from 'eth-lightwallet';
import { StackActions, NavigationActions, withNavigation } from 'react-navigation';
import { I18n } from '../../../language/i18n';
import Icon from '../../pages/iconSets'
import {screenWidth,screenHeight} from '../../utils/Dimensions'

export class ExportMnemonic extends Component {
	constructor(props) {
		super(props);
		this.state = {
			Mnemonic: ' ',
			// backupBtnText: '请备份您的助记词',
			backupBtnText: I18n.t('assets.mnemonic.backUpMnemonic'),
			backupBtnOpacity: 0.6,
			onPress: null,
			step: 'page',
			words: null,
			selectWordsText: ' ',
			selectWords: [],
			randomWords: [],
			next: true
		};
		this.navigate = this.props.navigation.navigate;
		this.nextStep = this.nextStep.bind(this);
		this.confirmWords = this.confirmWords.bind(this);
		this.renderWord = this.renderWord.bind(this);
		this.clickWord = this.clickWord.bind(this);
	}

	componentDidMount() {
		const { params } = this.props.navigation.state;
		storage.load({ key: 'walletInfo' }).then((res) => {
			let mneKeystore = lightwallet.keystore.deserialize(JSON.stringify(res.ks));
			mneKeystore.keyFromPassword(params.walletPassword, (err, pwDerivedKey) => {
				let Mnemonic = mneKeystore.getSeed(pwDerivedKey);
				this.setState({
					Mnemonic: Mnemonic
				});
			});
		});
	}

	// 抄写完 点击下一步时 去确认
	nextStep() {
		let randomWords = this.state.Mnemonic.toString().split(' ').sort();
		words = randomWords.map((w, i) => this.renderWord(w, i));
		this.setState({
			step: 'confirm',
			randomWords,
			words
		});
	}

	// 选择助记词完 点击确认完成
	confirmWords() {
		if (this.state.selectWordsText == this.state.Mnemonic) {
			// 助记词正确, 请妥善保管您的助记词！
			Alert.alert(null, I18n.t('assets.mnemonic.mnemonicSuccess'), [
				{
					text: 'OK',
					onPress: () => {
						let resetAction = StackActions.reset({
							index: 0,
							actions: [
								NavigationActions.navigate({
									routeName: 'Home'
								})
							]
						});
						this.props.navigation.dispatch(resetAction);
					}
				}
			]);
		} else {
			Alert.alert(null, I18n.t('assets.mnemonic.mnemonicError'));
			// Alert.alert(null, '助记词有误，请重新输入')
			this.setState({
				selectWords: [],
				selectWordsText: ' '
			});
		}
	}

	clickWord(i) {
		let word = this.state.randomWords[i];
		let selectWords = this.state.selectWords;
		selectWords.push(word);
		selectWordsText = selectWords.join(' ');
		this.setState({
			selectWords,
			selectWordsText
		});
	}

	renderWord(word, i) {
		return (
			<Text
				key={i}
				style={styles.word}
				onPress={() => {
					this.clickWord(i);
				}}
			>
				{word}
			</Text>
		);
	}

	render() {
		let currentStep = null;
		if (this.state.step == 'page') {
			currentStep = (
				<View style={[styles.container,styles.backupPage]}>
					<View style={styles.backupPageTop}>
						<Image source={require('../../assets/images/icon/Safety.png')} style={styles.cen_50}></Image>
						<Text style={styles.backupPageTop_t}>
						请在安全的环境下备份助记词！没有妥善备份就无法保障资产安全。删除程序或钱包后，你需要备份助记词来恢复钱包。
						</Text>
					</View>
					<Button
						title='备份助记词'
						buttonStyle={styles.btnBackupTip}
						onPress={()=>{
							this.setState({
								step:'backup'
							},()=>{
								setTimeout(() => {
									this.setState({
										backupBtnText: I18n.t('public.next'),
										backupBtnOpacity: 1,
										next: false
									});
								}, 10000);
							})
						}}
					/>

				</View>
			);
		}

		if (this.state.step == 'backup') {
			currentStep = (
				<View style={styles.container}>
					<Image source={require('../../assets/images/icon/Edit.png')} style={styles.cen_50}></Image>
					<View style={styles.backup_warning}>
						<Icon name='icon-tixing' size={ 20 } color='#6E5500'/>
						<Text style={styles.color_waring}>
							助记词用于恢复钱包或重置钱包密码，仔细抄写下助记词并放在安全的地方！请勿截图，如果有他人获取你的助记词将直接获取你的资产！
						</Text>
					</View>

					<TouchableHighlight style={styles.mnemonic_area}>
						<View>
							<Text style={styles.mnemonic}>{this.state.Mnemonic}</Text>
						</View>
					</TouchableHighlight>
					<Button
						title={this.state.backupBtnText}
						disabled={this.state.next}
						disabledStyle={styles.disabledButtonStyle}
						buttonStyle={styles.backupBtn}
						onPress={this.nextStep}
					/>
				</View>
			);
		}

		if (this.state.step == 'confirm') {
			currentStep = (
				<View style={styles.container}>
					<View style={styles.warning}>
						<Image source={require('../../assets/images/icon/Edit.png')} style={styles.cen_50}></Image>
						<Text style={[styles.color_999,{marginTop:30}]}>
							{I18n.t('assets.mnemonic.confirmMnemonicWring')}
						</Text>
					</View>
					<TouchableHighlight style={styles.mnemonic_area}>
						<View>
							<Text style={styles.mnemonic}>{this.state.selectWordsText}</Text>
						</View>
					</TouchableHighlight>
					<View style={styles.wordsCon}>{this.state.words}</View>
					<Button
						title={I18n.t('public.define')}
						buttonStyle={styles.backupBtn}
						onPress={this.confirmWords}
					/>
				</View>
			);
		}

		return <View style={styles.container}>{currentStep}</View>;
	}
}

export default withNavigation(ExportMnemonic);

const styles = StyleSheet.create({
	color_999: {
		fontSize:12,
		color: '#203260'
	},
	container: {
		flex: 1,
		padding: 10,
		backgroundColor: '#fff',
		alignItems: 'center'
	},
	backupPage:{
		justifyContent:'space-between',
		paddingTop:50,
		paddingBottom:50
	},
	backupPageTop:{
		alignItems:'center'
	},
	backupPageTop_t:{
		marginTop:20,
		fontSize:11,
		lineHeight:24,
		color:'#203260'
	},
	btnBackupTip:{
		width:screenWidth*0.8,
		backgroundColor:'#0071BC',
		borderRadius:50
	},
	warning: {
		marginTop: 30,
		height: 60,
		alignItems:'center',
		justifyContent: 'space-around'
	},
	backup_warning:{
		width:screenWidth - 50,
		minHeight:80,
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'space-around',
		marginTop:20,
		padding:10,
		borderRadius:10,
		backgroundColor:'#FFD74E'
	},
	color_waring:{
		fontSize:12,
		color:'#6E5500',
		lineHeight:24,
		marginLeft:20
	},
	cen_50:{
		width:50,
		height:50
	},
	warning_item: {
		color: '#35ccbf'
	},
	mnemonic_area: {
		width: screenWidth - 50,
		borderWidth: 1,
		borderColor: '#ccc',
		padding: 10,
		borderRadius: 10,
		marginTop: 20
	},
	mnemonic: {
		lineHeight: 20
	},
	backupBtn: {
		backgroundColor: '#0071BC',
		width: 300,
		height: 45,
		borderRadius: 30,
		marginTop: 30
	},
	disabledButtonStyle: {
		borderRadius: 30
	},
	word: {
		backgroundColor: '#eee',
		color: '#555',
		paddingVertical: 10,
		paddingHorizontal: 6,
		margin: 8,
		borderRadius: 6
	},
	wordsCon: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginTop: 30
	}
});
