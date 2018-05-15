'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.login.captcha);
  router.get('/login', controller.login.index);
  router.get('/captcha', controller.login.captcha);
  router.get('/smsCaptcha', controller.login.smsCaptcha);
  router.get('/nodeRank', controller.main.nodeRank);
  router.get('/searchTeam', controller.main.searchTeam);
  router.get('/teamInfo', controller.main.teamInfo);
  router.get('/selectStatus', controller.main.selectStatus);
  router.get('/selectRequest', controller.main.selectRequest);
  router.get('/joinTeamRequest', controller.main.joinTeamRequest);
  router.get('/isJoinTeam', controller.main.isJoinTeam);
  router.get('/createTeam', controller.main.createTeam);
};
