'use strict';

const Controller = require('egg').Controller;
const Mock = require('mockjs')
class MainController extends Controller {
  async index() {
    this.ctx.body = {
      status: 0,
      message: 'xxxxx',
      data: 'this is main'
    }
  }
  async nodeRank() {
    const { ctx, app } = this;
    const data = await app.mysql.query('SELECT * from `team` WHERE  node_type=1 ORDER BY tickets DESC')
    ctx.body = {
      status: 0,
      message: '组队排行',
      data: data
    }
  }
  async teamRank() {
    const { ctx, app } = this;
    const data = await app.mysql.query('SELECT * from `team` WHERE type=2 ORDER BY tickets DESC')
    ctx.body = {
      status: 0,
      message: '组队排行',
      data: data
    }
  }
  async searchTeam() {
    const { ctx, app } = this;
    const data = await app.mysql.query(`SELECT * FROM team WHERE type=2 AND nickname LIKE '%龙%'`)
    ctx.body = {
      status: 0,
      message: '搜索组队',
      data: data
    }
  }

  async teamInfo() {
    const { ctx, app } = this;
    const data = await app.mysql.query(`SELECT * from team WHERE id=35`)
    ctx.body = {
      status: 0,
      message: '组队信息',
      data: data
    }
  }
  async selectStatus() {
    const { ctx, app } = this;
    const data = await app.mysql.query(`SELECT status FROM team_user WHERE id=7`)
    ctx.body = {
      status: 0,
      message: '获取申请状态',
      data: data
    }
  }
  async createTeam() {
    const { ctx, app } = this;
    const data = await app.mysql.query(`INSERT INTO team (nickname, declaration, type) VALUES('组队4', '组队4---',2)`)
    // 手动关联
    // 创建组队时设置 user_id 的role为队长
    // var type = 2;
    // if(type == 2) {
      /* 非2不关联 */
      // await app.mysql.query(`INSERT INTO team_user (team_id, user_id, role,status) VALUES(1, 50 , 2, 2)`)
    // }
    ctx.body = {
      status: 0,
      message: '创建组队',
      data: data
    }
  }
  async vote() {
    const { ctx, app } = this;
    const data = await app.mysql.query(`UPDATE team set tickets=tickets+200 WHERE id=36`)
    ctx.body = {
      status: 0,
      message: '投票',
      data: data
    }
  }
  async selectRequest() {
    const { ctx, app } = this;
    const data = await app.mysql.query(`
      SELECT user_id, nickname, declaration ,mobile,status, role
      FROM team_user,user,team
      WHERE team_user.user_id=user.id
      AND team.id=33
      AND team_user.status=1
    `)
    ctx.body = {
      status: 0,
      message: '管理请求',
      data: data
    }
  }
  async joinTeamRequest() {
    const { ctx, app } = this;
    const data = await app.mysql.query("INSERT into team_user(user_id,team_id,role,status) values(1,2,1,0)")
    ctx.body = {
      status: 0,
      message: '加入组队请求',
      data: data
    }
  }
  async isJoinTeam() {
    const { ctx, app } = this;
    const data = await app.mysql.query("UPDATE team_user set status=3 WHERE team_id=33 AND user_id=54")
    this.ctx.body = {
      status: 0,
      message: '是否同意加入组队',
      data: data
    }
  }
}
module.exports = MainController;
