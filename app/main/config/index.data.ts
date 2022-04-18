import { IGiftItem, IPrizeItem } from './index.type';

export const speed: number[] = [236, 168, 84, 42, 42];
export const prizes: IPrizeItem[] = [
  {
    id: 1,
    name: '空气净化器',
    score: 5000,
    count: 10,
    pic: '../../assets/image/prize1.png',
  },
  {
    id: 2,
    name: '华为手机',
    score: 10000,
    count: 10,
    pic: '../../assets/image/prize2.png',
  },
  {
    id: 3,
    name: '电扇',
    score: 20000,
    count: 10,
    pic: '../../assets/image/prize3.jpg',
  },
  {
    id: 4,
    name: '电饭煲',
    score: 40000,
    count: 10,
    pic: '../../assets/image/prize4.png',
  },
  {
    id: 5,
    name: '洗衣机',
    score: 50000,
    count: 10,
    pic: '../../assets/image/prize5.png',
  },
  {
    id: 6,
    name: '冰箱',
    score: 80000,
    count: 10,
    pic: '../../assets/image/prize6.png',
  },
];

export const gifts: IGiftItem[] = [
  {
    id: 1,
    probability: 0.04,
    score: 30000,
    title: '30000',
  },
  {
    id: 2,
    probability: 0.04,
    score: 5000,
    title: '5000',
  },
  {
    id: 3,
    probability: 0.04,
    score: 30000,
    title: '5000',
  },
  {
    id: 4,
    probability: 0.04,
    score: 30000,
    title: '5000',
  },
  {
    id: 5,
    probability: 0.04,
    score: 30000,
    title: '5000',
  },
  {
    id: 6,
    probability: 0.04,
    score: 30000,
    title: '5000',
  },
  {
    id: 7,
    probability: 0.04,
    score: 30000,
    title: '5000',
  },
  {
    id: 8,
    probability: 0.04,
    score: 30000,
    title: '5000',
  },
  {
    id: 9,
    probability: 0.04,
    score: 30000,
    title: '5000',
  },
  {
    id: 10,
    probability: 0.04,
    score: 30000,
    title: '5000',
  },
  {
    id: 11,
    probability: 0.04,
    score: 30000,
    title: '5000',
  },
  {
    id: 12,
    probability: 0.04,
    score: 30000,
    title: '5000',
  },
  {
    id: 13,
    probability: 0.04,
    score: 30000,
    title: '5000',
  },
  {
    id: 14,
    probability: 0.04,
    score: 30000,
    title: '5000',
  },
  {
    id: 15,
    probability: 0.04,
    score: 30000,
    title: '5000',
  },
  {
    id: 16,
    probability: 0.04,
    score: 30000,
    title: '5000',
  },
  {
    id: 17,
    probability: 0.04,
    score: 30000,
    title: '5000',
  },
  {
    id: 18,
    probability: 0.04,
    score: 30000,
    title: '5000',
  },
  {
    id: 19,
    probability: 0.04,
    score: 30000,
    title: '5000',
  },
  {
    id: 20,
    probability: 0.04,
    score: 30000,
    title: '5000',
  },
  {
    id: 21,
    probability: 0.04,
    score: 30000,
    title: '5000',
  },
  {
    id: 22,
    probability: 0.04,
    score: 30000,
    title: '5000',
  },
  {
    id: 23,
    probability: 0.04,
    score: 30000,
    title: '5000',
  },
  {
    id: 24,
    probability: 0.08,
    score: 3000,
    title: '5000',
  },
];

export const rule =
  '<div> <p> 游戏规则 </p> <p> 1. 凭定销货单实付满5000元可参与游戏一次,满10000元两次,以此类推,上不封顶,积分累计可兑换相应礼品(同一姓名、 地址、 多单金额可累计) </p> <p> 2. 积分不足部分抹零 </p> <p> 3. 礼品每人限领1份,若累计积分所对应礼品已兑完, 则判定兑换下一档礼品 </p> <p> 4. 附加小礼品每人限领一份 </p> <p> 5. 礼品数量有限,先到先得、 兑完即止 </p> </div>';
