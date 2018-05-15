  const getAothCode = (n = 6) => {
    let randomStr = [];
    for (let i = 0; i < n; i++) {
      randomStr += Math.floor(Math.random() * 10);
    }
    return randomStr;
  }

  const getRandomStrArr = (n = 1000) => {
    return new Array(1000).fill(0).map(x => Math.random().toString(36).substr(2))
  }

  const getLocalTime = () => {
    //参数i为时区值数字，比如北京为东八区则输进8,西5输入-5
    var d = new Date();
    //得到1970年一月一日到现在的秒数
    var len = d.getTime();
    //本地时间与GMT时间的时间偏移差
    var offset = d.getTimezoneOffset() * 60000;
    //得到现在的格林尼治时间
    var utcTime = len + offset;
    var date = new Date(+new Date(utcTime + 3600000 * 8));
    var Y = date.getFullYear();
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours());
    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
    var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    return `${Y + M + D + h + m + s}`
  }


  // sendOneSms(req, { mobile, tkey, aothCode }) {
  //   if (req.session[mobile]) {
  //     res.send({
  //       code: 200,
  //       body: {
  //         text: '不可多次发送验证码'
  //       }
  //     })
  //   } else {
  //     superagent
  //       .get('http://api.zthysms.com/sendSms.do')
  //       .set('charset', 'utf-8')
  //       .query({
  //         username: 'TRUE888hy',
  //         tkey,
  //         password: md5(md5('ADljCe') + tkey),
  //         mobile: mobile,
  //         content: `${ '【TRUE】您好，您的验证码是' + aothCode }`
  //       })
  //       .end((err, res) => {
  //         if (err) throw err
  //         req.session[mobile] = aothCode
  //         res.send({
  //           code: 200,
  //           body: {
  //             text: '发送成功'
  //           }
  //         })
  //       })
  //   }
  // }


// module.exports = new Utils();
module.exports = {
  getAothCode,
  getLocalTime,
  getRandomStrArr
};