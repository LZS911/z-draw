import { cloneDeep } from 'lodash';
import { IGiftItem } from '../pages/Home/index.type';
import GlobalMessage from './message';
import { isArray, isObject, isString, JSTypeTag } from './typeTools';

const { ipcRenderer } = window.electronAPI;

export const throwError = () => {
  GlobalMessage.error('发生未知错误!');
};

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

export const generateUtilsArray = (gifts: IGiftItem[]) => {
  const resArr: number[] = new Array(1000);
  let start = 0;
  let end = 0;

  const probabilityArr = gifts.map((v) => v.probability * 1000);
  probabilityArr.forEach((v, index) => {
    start = index === 0 ? 0 : end;
    end = index === probabilityArr.length - 1 ? 1000 : v * (index + 1);
    resArr.fill(index + 1, start, end);
  });
  ipcRenderer.writeLog(`通过概率得出的数组: ${resArr.toString()}`);
  return resArr;
};

export const randomNum = (minNum: number, maxNum: number) => {
  return parseInt(
    (Math.random() * (maxNum - minNum + 1) + minNum).toString(),
    10
  );
};

export const getEndStopIndex = (gifts: IGiftItem[], utilsArr: number[]) => {
  const randomIndex = randomNum(0, 999);
  ipcRenderer.writeLog(`random index: ${randomIndex}`);
  if (randomIndex < 0 || randomIndex > 999) {
    throwError();
  }
  const res = utilsArr[randomIndex];
  ipcRenderer.writeLog(`最后结果: ${res}`);
  if (!res || res < 0 || res > gifts.length) {
    throwError();
  }
  return res;
};
