/* eslint-disable no-param-reassign */
import { useState, useMemo, useEffect } from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import {
  AppConfig,
  IGiftItem,
  IPrizeItem,
} from '../../../main/config/index.type';
import useDebounce from '../../hooks/useDebounce';
import GlobalMessage from '../../utils/message';
import {
  generateUtilsArray,
  getEndStopIndex,
  probabilityRefinement,
  setGiftPosition,
} from '../../utils/tool';
import { totalList } from './index.data';
import { DrawBtn, GiftItem, HomeWrapper } from './style';
// import music from '../../assets/audio/aefnn-xruii.mp3';
import './index.css';

const initialGiftWidth = 70;
const maxGiftWidth = 120;
const initialActiveId = 1;
const initialSpeed = [336, 168, 84, 42];

const { ipcRenderer } = window.electronAPI;

let utilsArr: number[] = [];
let speed: number[] = [];

const Home: React.FC = () => {
  let timer: NodeJS.Timeout | null = null;

  const [totalScore, setTotalScore] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [giftWidth, setGiftWidth] = useState(initialGiftWidth);
  const [isClicking, setIsClicking] = useState(false);
  const [activeId, setActiveId] = useState(initialActiveId);
  const [gifts, setGifts] = useState<IGiftItem[]>([]);
  const [prizes, setPrizes] = useState<IPrizeItem[]>([]);
  const [ruleString, setRuleString] = useState('');
  const [refreshFlag, setRefreshFlag] = useState(false);

  const [ruleBackground, setRuleBackground] = useState('#ff6347');
  const [footerBackground, setFooterBackground] = useState('#db5a6b');
  const [activeColor, setActiveColor] = useState('#40E0D0');

  const resetState = () => {
    setActiveId(1);
    setTotalScore(0);
    setTotalCount(0);
    setIsClicking(false);
  };

  const drawBtnWidth = useMemo(() => {
    const drawWidth = (gifts.length + 4) / 4 - 1;
    return drawWidth * giftWidth - (giftWidth + 20);
  }, [giftWidth, gifts]);

  const realGifts = useMemo(() => {
    return setGiftPosition(gifts, giftWidth);
  }, [giftWidth, gifts]);

  const handleResize = useDebounce((e: any) => {
    unstable_batchedUpdates(() => {
      const calcWidth =
        (initialGiftWidth / 760) * (e?.currentTarget?.innerHeight ?? 760);
      setGiftWidth(calcWidth > maxGiftWidth ? maxGiftWidth : calcWidth);
    });
  }, 200);

  const addOneStep = ({
    isContinue,
    leftRound,
    activeIndex,
    endStopIndex,
  }: {
    isContinue: boolean;
    leftRound: number;
    activeIndex: number;
    endStopIndex: number;
  }) => {
    if (isContinue) {
      const isNext = activeIndex > gifts.length;
      if (isNext) {
        leftRound -= 1;
        activeIndex = 1;
      }
      const isStop = leftRound === 0 && activeIndex === endStopIndex;

      setActiveId((v) => (isNext ? 1 : v + 1));

      timer = setTimeout(() => {
        addOneStep({
          isContinue: !isStop,
          leftRound,
          activeIndex: activeIndex + 1,
          endStopIndex,
        });
      }, speed[leftRound]);

      return;
    }

    if (timer) {
      clearTimeout(timer);
    }
    timer = null;
    setIsClicking(false);

    const giftItem = gifts.find((g) => g.id === endStopIndex);
    if (!giftItem) {
      GlobalMessage.error('未能通过结束值找到对应礼品!');
      return;
    }
    setTotalScore((v) => v + giftItem.score);

    const audio = document.querySelector('#audio');
    (audio as any).pause();
  };

  const startRun = () => {
    const audio = document.querySelector('#audio');
    (audio as any).play();
    setIsClicking(true);
    const endStopIndex = getEndStopIndex(gifts, utilsArr);
    setTotalCount((v) => v + 1);
    addOneStep({
      isContinue: true,
      leftRound: speed.length - 1,
      activeIndex: activeId,
      endStopIndex,
    });
  };

  const exchangePrize = useDebounce((prize: IPrizeItem) => {
    if (totalScore < prize.score) {
      GlobalMessage.error('当前积分低于奖品所需积分!');
      return;
    }
    if (prize.count === 0) {
      GlobalMessage.error('当前奖品剩余数量为0!');
      return;
    }
    ipcRenderer.exchangePrize(prize.id);
    setRefreshFlag(!refreshFlag);
    GlobalMessage.success(`兑换${prize.name}成功!`);
  }, 300);

  useEffect(() => {
    const enterToStartRun = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !isClicking) {
        startRun();
      }
    };
    window.addEventListener('resize', handleResize);
    document.addEventListener('keydown', enterToStartRun);
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('keydown', enterToStartRun);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gifts]);

  useEffect(() => {
    const initConfig = (config: AppConfig) => {
      const probabilityArr = config.gifts.map(
        (v) => v.probability * probabilityRefinement
      );
      const sumProbability = probabilityArr.reduce((pre, cur) => {
        return pre + cur;
      }, 0);
      ipcRenderer.writeLog(`当前所有奖品概率总和为: ${sumProbability}%`);
      if (sumProbability !== probabilityRefinement) {
        GlobalMessage.error('当前概率总和不为100%!');
        return;
      }
      setGifts(config.gifts);
      setPrizes(config.prizes);
      setRuleString(config.rule);
      setRuleBackground(config.ruleBackground);
      setFooterBackground(config.footerBackground);
      setActiveColor(config.activeColor);
      utilsArr = generateUtilsArray(config.gifts);
      speed = config.speed ?? initialSpeed;
    };

    const getConfig = () => {
      ipcRenderer.readConfigFile(initConfig);
    };
    getConfig();
  }, [refreshFlag]);

  return (
    <HomeWrapper
      ruleBackground={ruleBackground}
      footerBackground={footerBackground}
    >
      <div className="main-wrapper">
        <div className="left-wrapper">
          {totalList.map((v, index) => {
            return (
              <div className="total-item" key={v}>
                <div className="total-title">{v}</div>
                <div className="total-value">
                  {index === 0 ? totalScore : totalCount}
                </div>
              </div>
            );
          })}

          <div
            className="rule-container"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: ruleString }}
          />
        </div>
        <div className="right-wrapper">
          {realGifts.map((v) => {
            return (
              <GiftItem
                key={v.id}
                left={v.left ?? '0'}
                top={v.top ?? '0'}
                active={activeId === v.id}
                width={`${giftWidth}px`}
                activeColor={activeColor}
              >
                <div className={`gift-pic gift-${v.score}`} />
              </GiftItem>
            );
          })}
          <DrawBtn
            top={`${giftWidth + 20}px`}
            width={`${drawBtnWidth}px`}
            isClicking={isClicking}
            onClick={startRun}
            disabled={isClicking}
            className="draw-btn"
          />
        </div>
      </div>

      <div className="footer-wrapper">
        <div>
          <div className="title">奖</div>
          <div className="title">品</div>
        </div>
        <div className="prize-info">
          {prizes.map((v) => {
            return (
              <div key={v.name} className="prize-item">
                <div
                  className={`prize${v.id} prize-image`}
                  onClick={() => exchangePrize(v)}
                />
                <div className="prize-score">{v.score}</div>
              </div>
            );
          })}
        </div>
        <button
          className="reset-button"
          onClick={resetState}
          disabled={isClicking}
        >
          重 置
        </button>
      </div>

      <audio
        loop
        id="audio"
        // eslint-disable-next-line global-require
        src={require('../../assets/audio/aefnn-xruii.mp3')}
      >
        <track kind="captions" />
      </audio>
    </HomeWrapper>
  );
};
export default Home;
