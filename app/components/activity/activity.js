import React, { Component } from 'react';
import { StyleSheet, WebView } from 'react-native';
import { screenWidth, screenHeight } from '../../utils/Dimensions';

class Activity extends Component {
	constructor(props) {
		super(props);
		this.navigate = this.props.navigation.navigate;
	}

	render() {
		return (
			<WebView
				style={styles.webView_style}
				scrollEnabled={true}
				javaScriptEnabled={true}
				// injectedJavaScript={'插入到h5页面中的js代码'}
				onMessage={(event) => {
					switch (event.nativeEvent.data) {
						case 'signIn':
							this.navigate('SignIn');
							break;
						case 'invite':
							this.navigate('Inviting');
						default:
							break;
					}
				}}
				source={{ uri: 'https://www.isee91.cn/activity.html' }}
			/>
		);
	}
}

export default Activity;

const styles = StyleSheet.create({
	webView_style: {
		width: screenWidth,
		height: screenHeight
	}
});
