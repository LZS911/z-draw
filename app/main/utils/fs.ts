import { stat, lstat } from 'fs/promises';

export const isExist = (path: string): Promise<boolean> => {
  return new Promise((resolve) => {
    stat(path)
      .then(() => {
        resolve(true);
      })
      .catch(() => {
        resolve(false);
      });
  });
};

export const isFile = async (path: string): Promise<boolean> => {
  return lstat(path)
    .then((stats) => {
      return stats.isFile();
    })
    .catch(() => {
      return false;
    });
};

export const isDirectory = async (path: string): Promise<boolean> => {
  return lstat(path)
    .then((stats) => {
      return stats.isDirectory();
    })
    .catch(() => {
      return false;
    });
};
