import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight, StyleSheet } from 'react-native';
import {withNavigation} from 'react-navigation'
import { screenWidth } from '../../utils/Dimensions';

class CurrencyList extends Component {
  constructor(props){
    super(props)
    this.navigate = this.props.navigation.navigate;
  }
	currencyDetail(title, banlance) {
		this.navigate('CurrencyDetail', {
			title: title,
			banlance: banlance
		});
	}

	render() {
		return (
			<TouchableHighlight
				underlayColor={'transparent'}
				style={styles.container}
				onPress={() => this.currencyDetail(this.props.item.currency_name, this.props.item.balance)}
			>
				<View style={styles.currency_list}>
					<View style={styles.currency_left}>
						<View>
							<TouchableHighlight style={styles.currency_logo}>
								<Image style={styles.currency_logo_item} source={this.props.item.logo_url} />
							</TouchableHighlight>
						</View>
						<View>
							<Text>{this.props.item.currency_name}</Text>
						</View>
					</View>
					<View>
						<Text style={styles.alignRight}>{this.props.item.balance}</Text>
						<Text style={[ styles.alignRight, styles.currency ]} >≈ ***</Text>
					</View>
				</View>
			</TouchableHighlight>
		);
	}
}

export default withNavigation(CurrencyList)

const styles=StyleSheet.create({
	container:{
		alignItems:'center'
	},
	//币种列表
	currency_list: {
		height: 80,
		marginTop: 5,
		paddingLeft: 20,
		paddingRight: 20,
		flexDirection: 'row',
		alignItems: 'center',
		width:screenWidth * 0.9,
		justifyContent: 'space-between',
		backgroundColor:'rgba(255,255,255,1)',
		borderRadius:10,
		shadowColor:'#0c2848',
		shadowOffset:{
			width:2,
			height:2
		},
		shadowOpacity:0.8
	},
	currency_left: {
		flexDirection: 'row',
		alignItems:'center'
	},
	currency_logo: {
		borderRadius: 50,
		padding: 8
	},
	currency_logo_item: {
		width: 30,
		height: 30
	},
	currency: {
		color: '#ccc'
	}
})