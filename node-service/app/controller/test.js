'use strict';

const Controller = require('egg').Controller;

class test extends Controller {
  async index() {
    this.ctx.body = {
      body: 'asdasd',
      head: '这是一个头部'
    }
  }
}

module.exports = test;
