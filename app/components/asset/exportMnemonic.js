import React, { Component } from 'react';
import { View, Alert, Text, StyleSheet, TouchableHighlight, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import lightwallet from 'eth-lightwallet';
import { StackActions, NavigationActions, withNavigation } from 'react-navigation';
import { Polygon } from 'react-native-svg';
import { I18n } from '../../../language/i18n';
const screen = Dimensions.get('window');

export class ExportMnemonic extends Component {
	constructor(props) {
		super(props);
		this.state = {
			Mnemonic: ' ',
			// backupBtnText: '请备份您的助记词',
			backupBtnText: I18n.t('assets.mnemonic.backUpMnemonic'),
			backupBtnOpacity: 0.6,
			onPress: null,
			step: 'backup',
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

		setTimeout(() => {
			this.setState({
				backupBtnText: I18n.t('public.next'),
				// backupBtnText: '下一步',
				backupBtnOpacity: 1,
				next: false
			});
		}, 10000);
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
		if (this.state.step == 'backup') {
			currentStep = (
				<View style={styles.container}>
					<View style={styles.warning}>
						<Text style={styles.warning_item}>
							{I18n.t('assets.mnemonic.copyYourMnemonic')}
							{/* 抄写下你的助记词 */}
						</Text>
						<Text style={styles.color_999}>
							{I18n.t('assets.mnemonic.mnemonicWring')}
							{/* 助记词用于恢复钱包或重置钱包密码，将它准确的抄写到纸上，并存放在只有你知道的安全地方。 */}
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
						<Text style={styles.warning_item}>
							{I18n.t('assets.mnemonic.confirmMnemonic')}
							{/* 确认你的钱包助记词 */}
						</Text>
						<Text style={styles.color_999}>
							{I18n.t('assets.mnemonic.confirmMnemonicWring')}
							{/* 请按顺序点击助记词，以确认你备份的助记词正确。 */}
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
		color: '#999'
	},
	container: {
		flex: 1,
		padding: 10,
		backgroundColor: '#fff',
		alignItems: 'center'
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
		width: screen.width - 50,
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
		backgroundColor: '#528bf7',
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
