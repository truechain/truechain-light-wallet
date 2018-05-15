'use strict';
const svgCaptcha = require('svg-captcha');
const captcha = svgCaptcha.create();
const Controller = require('egg').Controller;
const md5 = require('md5');
const jwt = require('jwt-simple');
const secret = 'truechainbai';

const {
  getAothCode,
  getLocalTime
} = require('../utils');
class HomeController extends Controller {
  async index() {
    const { app, ctx } = this;
    const { mobile, captcha, code, address } = ctx.query;
    if (!mobile) {
      ctx.body = {
        body: {
          status: 0,
          message: '请输入手机号',
          data: null
        }
      }
      return
    }
    
    const check = await app.mysql.query('SELECT code, create_time FROM `sms_log` WHERE mobile="' + mobile + '"');
    
    if (check.length) {
      // console.log(check[0].code,'check[0].code');
      // console.log(code, 'code');
      if (String(check[0].code) === String(code)) {
        var token = Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2) + (+new Date);
        // const token = jwt.encode(randomStr, secret);
        // const decoded = jwt.decode(token, secret);
        // debugger;
        // console.log(decoded,' decoded');
        // console.log(token,' token');
        // var  = await app.mysql.query('SELECT code, create_time FROM `sms_log` WHERE mobile="' + mobile + '"')
        // debugger;
        const isBeing  = await app.mysql.query(`SELECT * FROM user WHERE mobile = ${mobile}`);
        let isBeingSql = '';
        let user_id    = '';
        if(isBeing.length) {
          user_id = isBeing[0].id
          isBeingSql = `UPDATE user set token='${token}', create_time=${+new Date()},  address='${address}' where mobile=${mobile}`;
          await app.mysql.query(isBeingSql);
        } else  {
          isBeingSql = `INSERT INTO user (token, create_time, mobile, address) VALUES('${token}' ,${+new Date()}, ${mobile}, '${address}')` ;
          user_id = await app.mysql.query(isBeingSql).insertId;
        }
        
        ctx.body = {
          body: {
            status: 200,
            message: '验证成功',
            data: {
              token: token,
              user_id: user_id
            }
          }
        }
      } else {
        ctx.body = {
          body: {
            status: 202,
            message: '手机验证码错误',
            data: 'data',
          }
        }
      }
    } else {
      ctx.body = {
        body: {
          status: 202,
          message: '请先获取验证码',
          data: 'data',
        }
      }
    }
  }
  async captcha() {
    const myCaptcha = svgCaptcha.create();
    this.ctx.session.captcha = myCaptcha.text;
    // console.log(this.ctx.session.captcha, 'ctx.session.captcha');
    this.ctx.body = {
      status: 200,
      body: myCaptcha.data,
      code: myCaptcha.text
    }
  }
  async sendSms(time, code, mobile) {
    await this.ctx.curl('http://api.zthysms.com/sendSms.do', {
      methods: 'GET',
      data: {
        username: 'TRUE888hy',
        tkey: time,
        password: md5(md5('ADljCe') + time),
        mobile: mobile,
        content: `${ '【TRUE】您好，您的验证码是' + code }`
      }
    })
  }

  async smsCaptcha() {
    const {
      ctx,
      app
    } = this;
    const _code = getAothCode();
    const _time = getLocalTime();
    
    // console.log(_code, '_code');
    const {
      mobile,
      code,
      captcha
    } = ctx.query;
    console.log(ctx.session.captcha, 'ctx.session.captcha');
    console.log(captcha, 'captcha============');
    // if(!captcha) {
    //   // console.log(captcha, 'captchacaptchacaptchacaptcha');
    //   ctx.body = {
    //     body: {
    //       status: 0,
    //       message: '请输入图形验证码'
    //      data: 'data',
    //     }
    //   }
    //   return
    // }
    if (!mobile) {
      ctx.body = {
        body: {
          status: 0,
          message: '请输入手机号',
          data: null
        }
      }
      return
    }
    // if (!eval("/^" + captcha + "$/i").test(ctx.session.captcha)) {
    //   console.log(ctx.session.captcha, 'ctx.session.captcha');
    //   console.log(captcha, 'captcha');
      
    //   ctx.body = {
    //     body: {
    //       status: 202,
    //       message: '图形验证码错误',
    //       data: 'data'
    //     }
    //   }
    //   return
    // }
    const check = await app.mysql.query('SELECT code, create_time FROM `sms_log` WHERE mobile="' + mobile + '"');
    const nowDate = +new Date();
    const expired = 60; // 一分钟内有效 , 并且不能重复发送请求
    // console.log(check);
    if (check.length) {
      if ((nowDate - check[0].create_time) / 1000 < expired) {
        ctx.body = {
          body: {
            status: 202,
            message: '不能频繁请求',
            data: 'data',
          }
        }
        return
      } else {
        console.log('走入了更新逻辑');
        this.sendSms(_time, _code, mobile);
        const _updateSql = `update sms_log set create_time=${+new Date()}, code='${_code}' WHERE mobile=${mobile}`
        await app.mysql.query(_updateSql);
      }
    } else {
      console.log('走入了插入逻辑');
      this.sendSms(_time, _code, mobile);
      const _insertSql = `INSERT INTO sms_log(mobile, create_time, code) VALUES (${mobile}, ${+new Date()}, '${_code}')`
      await app.mysql.query(_insertSql);
    }
    ctx.body = {
      body: {
        status: 0,
        message: '发送短信',
        data: 'data'
      }
    }
  }
}

module.exports = HomeController;