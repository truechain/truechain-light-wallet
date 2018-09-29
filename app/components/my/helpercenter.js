import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, FlatList, TouchableHighlight } from 'react-native';
import { I18n } from '../../../language/i18n';
import { withNavigation } from 'react-navigation';
export class HelperCenter extends Component {
	constructor(props) {
		super(props);
		this.navigate = this.props.navigation.navigate;
	}

	// componentDidMount() {
	// 	this.props.navigation.setParams({
	// 		headerRightPress: this.goToContactUs
	// 	});
	// }

	// goToContactUs = () => {
	// 	this.navigate('ContactUs');
	// };

	// static navigationOptions = ({ navigation }) => ({
	// 	headerTitle: I18n.t('my.home.helpCenter._title'),
	// 	headerRight:(
	// 	    <TouchableHighlight underlayColor={"#ddd"} activeOpacity={0.5}
	// 	    onPress={navigation.state.params?navigation.state.params.headerRightPress:null}
	// 	    >
	// 	    <Text style={ {
	// 	        color:"rgb(0,118,255)",
	// 	        fontSize:15,
	// 	        textAlignVertical:"center",
	// 	        paddingRight:15
	// 	    } }>
	// 	    联系我们
	// 	    </Text>
	// 	    </TouchableHighlight>
	// 	)
	// });

	_keyExtractor = (item, index) => item;

	render() {
		return (
			<View style={styles.helperPage}>
				<TouchableHighlight
					underlayColor={'#ddd'}
					activeOpacity={0.5}
					onPress={() =>
						this.navigate('KnowledgePoint', {
							title: I18n.t('my.home.helpCenter.mnemonic'),
							content: I18n.t('public.mnemonic'),
							ps: I18n.t('public.mnemonic_ps')
						})}
				>
					<View style={styles.row}>
						<View style={styles.rowLf}>
							<Text style={styles.rowLfText}>
								{I18n.t('my.home.helpCenter.mnemonic')}
								{/* 什么是助记词 */}
							</Text>
						</View>
						<View style={styles.rowRi}>
							<Image
								resizeMode={Image.resizeMode.stretch}
								source={require('../../assets/images/common/arr2ri.png')}
								style={styles.iconArr2R}
							/>
						</View>
					</View>
				</TouchableHighlight>
				<TouchableHighlight
					underlayColor={'#ddd'}
					activeOpacity={0.5}
					onPress={() =>
						this.navigate('KnowledgePoint', {
							title: I18n.t('my.home.helpCenter.keystore'),
							content: I18n.t('public.keystore'),
							ps: I18n.t('public.keystore_ps')
						})}
				>
					<View style={styles.row}>
						<View style={styles.rowLf}>
							<Text style={styles.rowLfText}>{I18n.t('my.home.helpCenter.keystore')}</Text>
							{/* 什么是keystore */}
						</View>
						<View style={styles.rowRi}>
							<Image
								resizeMode={Image.resizeMode.stretch}
								source={require('../../assets/images/common/arr2ri.png')}
								style={styles.iconArr2R}
							/>
						</View>
					</View>
				</TouchableHighlight>
				<TouchableHighlight
					underlayColor={'#ddd'}
					activeOpacity={0.5}
					onPress={() =>
						this.navigate('KnowledgePoint', {
							title: I18n.t('my.home.helpCenter.privateKey'),
							content: I18n.t('public.privateKey'),
							ps: I18n.t('public.privateKey_ps')
						})}
				>
					<View style={styles.row}>
						<View style={styles.rowLf}>
							<Text style={styles.rowLfText}>{I18n.t('my.home.helpCenter.privateKey')}</Text>
							{/* 什么是私钥 */}
						</View>
						<View style={styles.rowRi}>
							<Image
								resizeMode={Image.resizeMode.stretch}
								source={require('../../assets/images/common/arr2ri.png')}
								style={styles.iconArr2R}
							/>
						</View>
					</View>
				</TouchableHighlight>
			</View>
		);
	}
}

export default withNavigation(HelperCenter);

const styles = StyleSheet.create({
	helperPage: {
		flex: 1,
		backgroundColor: 'white',
		paddingLeft: 15
	},
	row: {
		height: 60,
		borderBottomWidth: 1,
		borderColor: '#eee',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingRight: 15
	},
	rowText: {
		fontSize: 15,
		lineHeight: 50,
		color: '#555'
	},
	iconArr2R: {
		width: 8,
		height: 14
	}
});
