import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, ScrollView, FlatList } from 'react-native';
import { withNavigation } from 'react-navigation';

const versionData = [
	{
		version: '3.0.0',
		con: [ '版本重构升级', '导入钱包功能优化', '增加语言切换设置', '转账增加地址校验功能' ]
	},
	{
		version: '2.0.6',
		con: [ '竞选投票搜索' ]
	},
	{
		version: '2.0.5',
		con: [ '检测新版本提示', '导出助记词输入错误自动清除', '优化矿工费调整机制' ]
	},
	{
		version: '2.0.4',
		con: [ '修复上一版本已知的问题', '改变标准节点排序方法' ]
	},
	{
		version: '2.0.3',
		con: [ '允许先锁仓后报名', '创建钱包后立即备份助记词' ]
	},
	{
		version: '2.0.2',
		con: [ '修正投票数量显示问题' ]
	},
	{
		version: '2.0.1',
		con: [ '修正上一版本中文字信息' ]
	},
	{
		version: '2.0.0',
		con: [ 'web3版本升级', '增加锁仓账户', '增加优先节点选举', '· 报名参选', '· 投票选举' ]
	},
	{
		version: '1.0.3',
		con: [ '增加TTR资产情况展示', '解决转账时黑屏问题', '优化导入助记词验证提示', '资产页面增加下拉刷新' ]
	},
	{
		version: '1.0.2',
		con: [ 'ios版本发布', '完善资产数额显示', '完善keystore导入导出验证' ]
	},
	{
		version: '1.0.1',
		con: [ '修正一些问题', '支持删除钱包' ]
	},
	{
		version: '1.0.0',
		con: [ '发布内测版本，该版本实现了', '基于助记词和BIP44规范创建 HDWallet', '支持钱包基本功能：转账、收款、交易记录', '支持ETH和TRUE' ]
	}
];

export class Versions extends Component {
	_keyExtractor = (item, index) => item;
	render() {
		return (
			<View style={styles.versionsPage}>
				<ScrollView>
					<FlatList
						data={versionData}
						renderItem={({ item }) => (
							<View style={styles.version}>
								<Text style={styles.versionTitle}>{item.version}</Text>
								<FlatList
									data={item.con}
									keyExtractor={this._keyExtractor}
									renderItem={({ item }) => (
										<View style={styles.versionDescrCon}>
											<Text style={styles.versionDescr}>* {item}</Text>
										</View>
									)}
								/>
							</View>
						)}
						keyExtractor={(item, index) => index.toString()}
					/>
				</ScrollView>
			</View>
		);
	}
}

export default withNavigation(Versions);

const styles = StyleSheet.create({
	versionsPage: {
		flex: 1,
		backgroundColor: 'white',
		paddingLeft: 15
	},
	version: {
		borderBottomWidth: 1,
		borderColor: '#eee',
		backgroundColor: 'white',
		paddingBottom: 15
	},
	versionTitle: {
		fontSize: 28,
		lineHeight: 40
	},
	versionDescrCon: {},
	versionDescr: {
		height: 30,
		lineHeight: 30,
		fontSize: 15
	}
});
