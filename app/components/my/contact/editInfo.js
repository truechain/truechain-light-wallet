import React, { Component } from 'react';
import {
  Alert, Text, View, StyleSheet, TouchableHighlight,
} from 'react-native';
import {
  Button, Container, Content, Item, Input, Label,
} from 'native-base';
import { withNavigation } from 'react-navigation';
import Icon from '../../../pages/iconSets';
import { screenWidth, screenHeight } from '../../../utils/Dimensions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 12,
    padding: 5,
    backgroundColor: '#fff',
  },
  buttonStyle: {
    height: 45,
    borderRadius: 20,
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth * 0.8,
    backgroundColor: '#D9E4F5',
  },
  delete_t: {
    color: '#F84646',
  },
});

class EditInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 0,
      name: null,
      address: null,
      isdisabled: true,
    };
  }

  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <Button
        large
        transparent
        style={{
          width: 40,
          height: 40,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => {
          if (!navigation.state.params.isEditFun) {
            // 进行本地存储并返回上一页
            return;
          }
          navigation.state.params.isEdit();
        }}
      >
        <Text>
          {
         navigation.state.params.isEditFun ? '编辑' : '保存'
        }
        </Text>
      </Button>
    ),
  });

  componentDidMount() {
    const { type, name, address } = this.props.navigation.state.params;

    this.setState({
      type, name, address, isdisabled: type !== 0,
    }, () => {
      this.editOrSave();
    });
  }

  editOrSave() {
    this.props.navigation.setParams({
      isEdit: () => {
        this.setState({
          isdisabled: !this.state.isdisabled,
        }, () => {
          this.editOrSave();
        });
      },
      isEditFun: this.state.isdisabled,
    });
  }

  componentWillUnmount() {
    this.reset();
  }

  reset() {
    this.setState({
      name: null,
      address: null,
    });
  }

  delete() {
    // 进行本地清除动作并返回上一页
  }

  render() {
    const {
      type, name, address, isdisabled,
    } = this.state;
    return (
      <Container style={styles.container}>
        <Content>
          <Item>
            <Input placeholder="姓名" disabled={isdisabled} />
          </Item>
          <Text style={{ marginLeft: 5, marginTop: 5 }}>地址</Text>
          <Input placeholder="输入有效地址" value={address || ''} disabled={isdisabled} />
        </Content>

        {type === 0 ? null
          : (
            <View style={{ alignItems: 'center' }}>
              <TouchableHighlight
                underlayColor="transparent"
                style={styles.buttonStyle}
                onPress={() => {
                  Alert.alert(
                    '确定删除吗？', null,
                    [
                      { text: '确定', onPress: this.delete },
                      { text: '取消', onPress: () => console.log('OK Pressed'), style: 'cancel' },
                    ],
                    { cancelable: false },
                  );
                }}
              >
                <Text style={styles.delete_t}>删除联系人</Text>
              </TouchableHighlight>
            </View>
          )
        }
      </Container>
    );
  }
}

export default EditInfo;
