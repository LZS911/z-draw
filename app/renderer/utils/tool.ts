import { cloneDeep } from 'lodash';
import { IGiftItem } from '../pages/Home/index.type';
import GlobalMessage from './message';
import { isArray, isObject, isString, JSTypeTag } from './typeTools';

const { ipcRenderer } = window.electronAPI;

export const trimDeep = (data: unknown): unknown => {
  const tempData = cloneDeep(data);

  if (isString(tempData)) {
    return tempData.trim();
  }

  if (isObject(tempData)) {
    Object.keys(tempData).forEach((key) => {
      if (key.includes('password')) {
        return;
      }

      const currentValueType = Object.prototype.toString.call(tempData[key]);

      if (currentValueType === JSTypeTag.String) {
        tempData[key] = tempData[key].trim();
      } else if (currentValueType === JSTypeTag.Object) {
        tempData[key] = trimDeep(tempData[key]);
      } else if (currentValueType === JSTypeTag.Array) {
        tempData[key] = trimDeep(tempData[key]);
      }
    });
  } else if (isArray(tempData)) {
    return tempData.map((item: unknown) => trimDeep(item));
  }

  return tempData;
};

export const setGiftPosition = (
  gifts: IGiftItem[],
  giftWidth: number
): IGiftItem[] => {
  const drawWidth = (gifts.length + 4) / 4;
  if (drawWidth % 1 !== 0) {
    GlobalMessage.error('当前配置文件中 gifts 数据错误!');
    return [];
  }

  const realGifts = [...gifts];
  realGifts.forEach((v, index) => {
    if (index < drawWidth) {
      v.top = '0';
      v.left = `${giftWidth * index + index * 4}px`;
    } else if (index >= drawWidth && index < drawWidth * 2 - 1) {
      const realIndex = index - drawWidth + 1;
      v.top = `${giftWidth * realIndex + realIndex * 4}px`;
      v.left = `${giftWidth * (drawWidth - 1) + (drawWidth - 1) * 4}px`;
    } else if (index >= drawWidth * 2 - 1 && index < drawWidth * 3 - 2) {
      const realIndex = index - drawWidth * 2;
      v.top = `${giftWidth * (drawWidth - 1) + (drawWidth - 1) * 4}px`;
      v.left = `${
        giftWidth * (drawWidth - realIndex - 3) - (realIndex - 4) * 4
      }px`;
    } else if (index >= drawWidth * 3 - 2) {
      const realIndex = index - drawWidth * 3;
      v.top = `${
        giftWidth * (drawWidth - realIndex - 4) - (realIndex - 3) * 4
      }px`;
      v.left = `0px`;
    }
  });
  return realGifts;
};

export const probabilityRefinement = 100000;

export const generateUtilsArray = (gifts: IGiftItem[]) => {
  const resArr: number[] = new Array(probabilityRefinement);
  let start = 0;
  let end = 0;

  const probabilityArr = gifts.map(
    (v) => v.probability * probabilityRefinement
  );
  probabilityArr.forEach((v, index) => {
    start = index === 0 ? 0 : end;
    end = v + start;
    resArr.fill(index + 1, start, end);
  });
  return resArr;
};

export const randomNum = (minNum: number, maxNum: number) => {
  return parseInt(
    (Math.random() * (maxNum - minNum + 1) + minNum).toString(),
    10
  );
};

export const getEndStopIndex = (gifts: IGiftItem[], utilsArr: number[]) => {
  const randomIndex = randomNum(0, probabilityRefinement - 1);
  ipcRenderer.writeLog(`random index: ${randomIndex}`);
  if (randomIndex < 0 || randomIndex > probabilityRefinement - 1) {
    GlobalMessage.error('随机值范围出现错误!');
  }
  const res = utilsArr[randomIndex];
  ipcRenderer.writeLog(`最后结果: ${res}`);
  if (!res || res < 0 || res > gifts.length) {
    GlobalMessage.error('随机值未能成功索引数组!');
  }
  return res;
};
