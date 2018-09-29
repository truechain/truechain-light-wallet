import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native';
import { I18n } from '../../../language/i18n';

/**
 * 可复用的按钮组件
 */
class RadiusBtn extends Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        btnText:I18n.t('public.next'),
        //"下一步"
        backgroundColor:"#528BF7",
        height:45,
        borderRadius:23,
        color:"white",
        fontSize:15,
    }

    render() {
        
        return (
            <TouchableOpacity 
                onPress={this.props.onPress} 
                activeOpacity={0.5}
            >
                <View style={{
                    backgroundColor:this.props.backgroundColor,
                    height:this.props.height,
                    borderRadius:this.props.borderRadius,
                    alignItems:"center",
                    justifyContent:"center"
                }}>
                    <Text style={{
                        color:this.props.color,
                        fontSize:this.props.fontSize
                    }}
                    >{this.props.btnText}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}


export default RadiusBtn
