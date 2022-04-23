# config_data_json

路径: win 一般在 c:\Users\${user name}\AppData\Roaming\electron-react-boilerplate 下

## 字段描述

1. `gifts`: 每个格子实体

    - `id`: 唯一值, 禁止重复
    - `probability`, 每个格子的概率, 和必须为1
    - `score`: 分数, 同时也是显示图片的判断因素, 例如 6000 对应 6000 的图片
    - `title`: 暂时没用到.

2. `prizes`: 礼物实体
    - `id`: 唯一值, 禁止重复, 同时也是显示图片的判断因素, 所以说不能改
    - `name`: 礼物名称, 用来兑换时的显示名称
    - score: 兑换礼物需要的分数
    - count: 礼物剩余数量
    - pic: 没啥用, 忘记删了

3. speed: 抽奖时轮盘转动的圈数以及速度  
    - 个数为对应的圈数
    - 每个值对应的是单个格子跳动的时间(单位: 毫秒), 数据顺序与转动顺序呈相反情况
  
4. rule: 规则内容, 修改里面的文字就好

5. ruleBackground: 规则的背景颜色, 格式为16进制数据

6. footerBackground: 底部的背景颜色, 格式同上

7. activeColor: 因为没给选中的格子的背景图片, 所以暂时是给了一个 border 颜色
