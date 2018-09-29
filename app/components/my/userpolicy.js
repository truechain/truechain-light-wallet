import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { withNavigation } from 'react-navigation';
import Pdf from 'react-native-pdf';
export class UserPolicy extends Component {
	constructor(props) {
		super(props);
		this.state = {
			service_source: null
		};
	}

	componentWillMount() {
		const { params } = this.props.navigation.state;
		
		this.setState({
			service_source: params.service_source
		});
	}

	render() {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: 'flex-start',
					alignItems: 'center',
					backgroundColor: '#fff'
				}}
			>
				<Pdf
					source={this.state.service_source}
					onLoadComplete={(numberOfPages, filePath) => {
						console.log(`number of pages: ${numberOfPages}`);
					}}
					onPageChanged={(page, numberOfPages) => {
						console.log(`current page: ${page}`);
					}}
					onError={(error) => {
						console.log(error);
					}}
					style={styles.pdf}
				/>
			</View>
		);
	}
}

export default withNavigation(UserPolicy);

const styles = StyleSheet.create({
	pdf: {
		flex: 1,
		width: Dimensions.get('window').width
	}
});
