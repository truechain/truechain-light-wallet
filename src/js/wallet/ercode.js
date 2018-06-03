import EthereumQRPlugin from 'ethereum-qr-code';


//生成二维码地址

let to = plus.storage.getItem('walletAddress'),
    gas = 5000;
//let codeContainer = document.getElementById('ethQR');
const qr = new EthereumQRPlugin();

const qrCode = qr.toCanvas({
    to,
    gas
}, {
    selector: '#ethQR',
});

qrCode.then(function (code) {
    console.log('二维码生成成功!');
    console.log(code.value);
});
