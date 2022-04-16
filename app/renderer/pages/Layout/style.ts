import styled from 'styled-components';

export const LayoutWrapper = styled.div`
  width: 100%;
  height: 100%;
  .header {
    width: 100%;
  }
  .wrapper {
    height: 100%;
    display: flex;
    .sider {
      flex-basis: 220px;
    }
    .content {
      flex: 1;
    }
  }
`;
