import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { withNavigation } from 'react-navigation';
import Assets from '../components/asset/asset'
import Guide from '../guide/guide'

class Turn extends React.Component {
	static navigationOptions = {
		header: null
	};

	constructor(props) {
		super(props);
		this.state = {
			isWallet: false
		};
	}

	componentDidMount() {
		this.updataLocal()
	}

	updataLocal(){
		storage
		.load({
			key: 'walletInfo'
		})
		.then((res) => {
			this.setState({
				isWallet:true
			})
		}).catch(console.log)
	}

	render() {
		return (
			<View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
				{
					this.state.isWallet?<Assets/>:<Guide/>
				}
			</View>
		);
	}
}

export default withNavigation(Turn);
