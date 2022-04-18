import { Paper } from '@material-ui/core';
import * as React from 'react';
import { LayoutWrapper } from './style';

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <LayoutWrapper>
        <div className="wrapper">
          <Paper className="content" square>
            {children}
          </Paper>
        </div>
      </LayoutWrapper>
    </>
  );
};

export default Layout;
