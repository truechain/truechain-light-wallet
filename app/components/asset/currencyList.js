import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight, StyleSheet } from 'react-native';
import {withNavigation} from 'react-navigation'

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
				onPress={() => this.currencyDetail(this.props.item.currency_name, this.props.item.balance)}
			>
				<View style={styles.currency_list}>
					<View style={styles.currency_left}>
						<View>
							<TouchableHighlight style={styles.currency_logo}>
								<Image style={styles.currency_logo_item} source={this.props.item.logo_url} />
							</TouchableHighlight>
						</View>
						<View style={styles.marginLeft}>
							<Text>{this.props.item.currency_name}</Text>
						</View>
					</View>
					<View>
						<Text style={styles.alignRight}>{this.props.item.balance}</Text>
						<Text style={[ styles.alignRight, styles.currency ]} />
					</View>
				</View>
			</TouchableHighlight>
		);
	}
}

export default withNavigation(CurrencyList)

const styles=StyleSheet.create({
	//币种列表
	currency_list: {
		height: 80,
		marginTop: 5,
		paddingLeft: 20,
		paddingRight: 20,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	currency_left: {
		flexDirection: 'row',
		alignItems: 'flex-start'
	},
	currency_logo: {
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 50,
		padding: 8
	},
	currency_logo_item: {
		width: 40,
		height: 40
	},
	currency: {
		color: '#ccc'
	}
})