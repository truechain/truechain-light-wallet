# example



## 快速入门

<!-- 在此次添加使用文档 -->

如需进一步了解，参见 [egg 文档][egg]。

### 本地开发

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### 部署

```bash
$ npm start
$ npm stop
```

### 单元测试

- [egg-bin] 内置了 [mocha], [thunk-mocha], [power-assert], [istanbul] 等框架，让你可以专注于写单元测试，无需理会配套工具。
- 断言库非常推荐使用 [power-assert]。
- 具体参见 [egg 文档 - 单元测试](https://eggjs.org/zh-cn/core/unittest)。

### 内置指令

- 使用 `npm run lint` 来做代码风格检查。
- 使用 `npm test` 来执行单元测试。
- 使用 `npm run autod` 来自动检测依赖更新，详细参见 [autod](https://www.npmjs.com/package/autod) 。


[egg]: https://eggjs.org


nodeRank => '组队信息'
searchTeam => '搜索组队'
updateUserInfo => '更新用户信息'
teamInfo => '组队信息'
selectStatus => '查看状态'
createTeam => 创建组
userSelf => 个人报名
vote => '投票'
selectRequest => '管理请求'
joinTeamRequest => '加入组队请求'
isJoinTeam => '是否同意加入组队'

组队排行
SELECT * from `team` WHERE type=2 ORDER BY tickets DESC

节点排行
SELECT * from `team` WHERE  node_type=1 ORDER BY tickets DESC

搜索组队
SELECT * FROM team WHERE type=2 AND nickname LIKE '%龙%'

插入组队
INSERT INTO team (nickname, declaration, type) VALUES('组队4', '组队4---',2)

SELECT user_id, nickname, declaration ,mobile,status, role
FROM team_user,user,team WHERE team_user.user_id=user.id AND team.id=33

锁仓回调接口
UPDATE `user` SET lock_status=1 WHERE id=58

请求加入组队
INSERT INTO team_user (team_id, user_id, role, status) VALUES(33, 49, 2, 1);

查看所有申请加入组队的人
SELECT user_id, nickname, declaration ,mobile,status, role
FROM team_user,user,team
WHERE team_user.user_id=user.id
AND team.id=33
AND team_user.status=1

是否同意加入组队
UPDATE team_user set status=3 WHERE team_id=33 AND user_id=54

求出已锁仓true币总数

SELECT sum(lock_number) FROM `team`, user WHERE team.id=34 AND user.lock_status=1

投票给指定组队
UPDATE team set tickets=tickets+200 WHERE id=36

组队信息
SELECT * from `team` WHERE id=35

获取申请状态
SELECT status FROM team_user WHERE id=7

创建组队时关联为队长
INSERT INTO team_user (team_id, user_id, role,status) VALUES(1, 50 , 2, 2)

 组队排行     => nodeRank
 搜索组队     => searchTeam
 组队信息     => teamInfo
 获取申请状态   => selectStatus
 创建组队     => createTeam
 投票       => vote
 管理请求     => selectRequest
 加入组队请求   => joinTeamRequest
 是否同意加入组队 => isJoinTeam


| 说明| API| 参数说明|
| -- | -- | -- |
| 组队排行       | nodeRank          | 暂无      |
| 搜索组队         | searchTeam         | 0:标准节点/1:全节点                                        |
| 组队信息         | teamInfo       | 暂无                                                       |
| 获取申请状态             | selectStatus             | user_id/tickets                                            |
| 创建组队         | createTeam     | user_id                                                    |
| 投票         | vote       | nickname(组队名称),declaration(组队名称),type(0用户,1组队) |
| 管理请求         | selectRequest    | team_id                                                    |
| 加入组队请求     | joinTeamRequest  | user_id/team_id/role(0队长,1组员)                          |
| 是否同意加入组队 | isJoinTeam       | user_id/team_id/status(1加入/2拒绝 )                       |

<!-- 
 组队排行     => nodeRank
 搜索组队     => searchTeam
 组队信息     => teamInfo
 获取申请状态   => selectStatus
 创建组队     => createTeam
 投票       => vote
 管理请求     => selectRequest
 加入组队请求   => joinTeamRequest
 是否同意加入组队 => isJoinTeam -->