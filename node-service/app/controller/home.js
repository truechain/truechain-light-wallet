'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = {
      body: 'wwwwwwww',
      head: '这是一个头部'
    }
  }
}

module.exports = HomeController;
