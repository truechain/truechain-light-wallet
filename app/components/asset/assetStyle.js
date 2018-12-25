import { StyleSheet } from 'react-native';
import { screenWidth, screenHeight } from '../../utils/Dimensions';

const styles = StyleSheet.create({
  marginLeft: {
    marginLeft: 20,
  },
  alignRight: {
    textAlign: 'right',
  },
  container: {
    width: screenWidth,
    height: screenHeight - 50,
    backgroundColor: '#fff',
  },
  walletInfo: {
    height: 230,
    backgroundColor: '#528bf7',
  },
  walletInfo_item: {
    flex: 1,
    marginTop: 20,
    height: 210,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 70,
    height: 70,
    marginBottom: 10,
  },
  walletName: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  walletAddress: {
    flexDirection: 'row',
  },
  addressErcode: {
    width: 15,
    height: 15,
    marginLeft: 5,
  },
  walletAddress_item: {
    color: '#fff',
    fontSize: 12,
  },
  // 新增币种
  addCurrency: {
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  addCurrency_item: {
    position: 'relative',
    top: -20,
    borderRadius: 15,
    padding: 30,
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    width: screenWidth * 0.9,
    shadowColor: '#0c2848',
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  currency_text: {
    color: '#ccc',
    fontSize: 12,
  },
  currency_item: {
    width: 80,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0071BC',
  },
  currency_item_text: {
    color: '#fff',
  },
  _scrollview: {
    backgroundColor: '#F1F4FA',
  },
  // version
  modalCon: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: 'white',
    width: 260,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 16,
    color: '#222',
    lineHeight: 50,
    height: 50,
    textAlign: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  versionText: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 20,
  },
  modalBottomBtn: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
    height: 50,
  },
  modalBottomBtnNoText: {
    color: 'rgb(0,118,255)',
    fontSize: 16,
    textAlign: 'center',
  },
  modalBottomBtnYesText: {
    color: 'rgb(254,56,36)',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default styles;
