import React from 'react';
import { IEmptyProps } from './index.type';

const Empty: React.FC<IEmptyProps> = ({ if: show, children, defaultNode }) => {
  return <>{show ? children : defaultNode || null}</>;
};

export default Empty;
