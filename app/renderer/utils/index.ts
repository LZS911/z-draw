type MyTypeOfReturnT =
  | 'object'
  | 'function'
  | 'number'
  | 'string'
  | 'symbol'
  | 'bigint'
  | 'array'
  | 'undefined'
  | 'null'
  | 'boolean';

export const myTypeof = (target: unknown): MyTypeOfReturnT => {
  const tmpStr = Object.prototype.toString.call(target);
  const tmpArr = tmpStr.split(' ');
  return tmpArr[1]
    .substring(0, tmpArr[1].length - 1)
    .toLocaleLowerCase() as MyTypeOfReturnT;
};

export const isString = (val: unknown): val is string =>
  myTypeof(val) === 'string';
export const isBoolean = (val: unknown): val is boolean =>
  myTypeof(val) === 'boolean';
export const isArray = <T>(val: unknown): val is T[] =>
  myTypeof(val) === 'array';

export const classnames = <T>(
  name?: string | Array<string | undefined>,
  condition?: boolean | boolean[] | null
): string => {
  const nameCopy = isArray<T>(name) ? name.filter((item) => !!item) : name;

  if (isBoolean(condition)) {
    if (isString(nameCopy)) {
      return condition ? nameCopy : '';
    }

    if (isArray<string>(nameCopy)) {
      return condition ? nameCopy.join(' ') : '';
    }
  }

  if (isArray<boolean>(condition)) {
    if (isString(nameCopy)) {
      return condition.every((item) => item) ? nameCopy : '';
    }

    if (isArray<string>(nameCopy)) {
      let str = '';
      nameCopy.forEach((s, index) => {
        if (condition[index]) {
          str += `${s} `;
        }
      });

      return str.trim();
    }
  }

  if (isString(nameCopy) && !condition) {
    return nameCopy;
  }

  if (isArray<string>(nameCopy) && !condition) {
    return nameCopy.join(' ');
  }

  return '';
};

export const range = (start: number, stop: number, step = 1) => {
  return Array.from({ length: (stop - start) / step + 1 }, (_, index) => {
    return start + index * step;
  });
};
