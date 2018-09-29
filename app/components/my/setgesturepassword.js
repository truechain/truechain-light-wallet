import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import PasswordGesture from 'react-native-gesture-password';
class SetGesturePassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: '',
			status: 'normal',
			userpwd: ''
		};
		this.navigate = this.props.navigation;
	}

	static navigationOptions = {
		headerTitle: '设置手势密码'
	};

	onEnd(password) {
		//手势解锁动作停止，手指离开屏幕时
		if (this.state.userpwd === '') {
			// The first password
			this.state.userpwd = password;
			this.setState({
				status: 'normal',
				message: '请重复上次的手势'
			});
		} else {
			// The second password
			if (password === this.state.userpwd) {
				this.setState(
					{
						status: 'right',
						message: '手势密码设置成功'
					},
					() => {
						// storage.save({
						// 	key: 'gestureLock',
						// 	data: {
						// 		password: this.state.userpwd
						// 	},
						// 	expires: null
						// });
						setTimeout(() => {
							this.navigate.goBack(null);
						}, 1000);
					}
				);

				// your codes to close this view
			} else {
				this.setState({
					status: 'wrong',
					message: '和上次的手势不同，请重试'
				});
			}
		}
	}

	onStart() {
		//手指开始在屏幕上滑动，开始记录手势密码
		if (this.state.userpwd === '') {
			this.setState({
				message: '请设置手势密码，至少连接4个点'
			});
		} else {
			this.setState({
				message: '请重复上次的手势'
			});
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<PasswordGesture
					ref="pg"
					status={this.state.status}
					message={this.state.message}
					onStart={() => this.onStart()}
					onEnd={(password) => this.onEnd(password)}
				/>
			</View>
		);
	}
}

export default withNavigation(SetGesturePassword);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// borderWidth: 1,
		// borderColor: 'red'
	}
});
