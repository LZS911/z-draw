import styled from 'styled-components';

const activeColor = '#FFA488';
const grayColor = '#999999';
const yellowColor = '#ffff00';
const redColor = '#db5a6b';
const greenColor = '#3cb371';
const orangeColor = '#ff6347';
const whiteColor = '#fff';
const btnBg = '#33CCFF';
const btnClickBg = '#FFA488';

export const HomeWrapper = styled.div`
  height: 100%;
  -webkit-app-region: drag;
  .main-wrapper {
    display: flex;
    height: calc(100% - 130px);
    .left-wrapper {
      width: 20%;
      min-width: 300px;
      height: calc(100% - 45px);
      padding: 30px 30px 15px 30px;

      .total-item {
        background-color: ${greenColor};
        width: 250px;
        height: 80px;
        margin-bottom: 30px;
        border-radius: 10px;
        padding: 6px 10px;
        color: ${whiteColor};
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        font-size: 20px;
        .total-value {
          text-align: end;
          font-size: 30px;
          font-weight: bold;
        }
      }

      .rule-container {
        background-color: ${orangeColor};
        border-radius: 10px;
        color: ${whiteColor};
        padding: 10px;
        width: 250px;
      }
    }

    .right-wrapper {
      width: 80%;
      height: calc(100% - 45px);
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 30px;
      margin-left: 6%;

      position: relative;
    }
  }

  .footer-wrapper {
    height: 130px;
    width: calc(100% - 40px);
    display: flex;
    align-items: center;
    background-color: ${redColor};
    padding: 0 20px;
    justify-content: space-between;

    .title {
      font-size: 40px;
      color: ${yellowColor};
    }

    .prize-info {
      display: flex;
      justify-content: space-between;
      width: 80%;
      .prize-item {
        .prize-image {
          width: 80px;
          height: 80px;
          margin-bottom: 4px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: ${redColor};
          background-color: ${whiteColor};
          cursor: pointer;
          border-radius: 4px;
        }

        .prize-score {
          background-color: ${yellowColor};
          color: ${redColor};
          padding: 3px;
          text-align: center;
          border-radius: 4px;
        }
      }
    }

    .reset-button {
      border-radius: 10px;
      border: 1px solid transparent;
      background-color: ${yellowColor};
      color: ${redColor};
      padding: 6px 16px;
      cursor: pointer;
      &:active {
        transform: scale(0.8, 0.8);
        transition: ease 0.5s;
      }
    }
  }
`;

export const GiftItem = styled.div<{
  left: string;
  top: string;
  active: boolean;
  width: string;
}>`
  width: ${(props) => props.width};
  height: ${(props) => props.width};
  position: absolute;
  left: ${(props) => props.left};
  top: ${(props) => props.top};
  z-index: 10;
  display: inline-block;
  box-sizing: border-box;
  padding-top: 10px;
  border-radius: 5px;
  border: 2px solid;
  border-color: ${(props) => (props.active ? activeColor : grayColor)};
  background-color: ${(props) => (props.active ? '#146c8a' : whiteColor)};
  .gift-name {
    text-align: center;
    font-size: 14px;
    color: ${(props) => (props.active ? activeColor : grayColor)};
  }
`;

export const DrawBtn = styled.button<{
  isClicking: boolean;
  width: string;
  top: string;
}>`
  outline: none;
  border: 0;
  width: ${(props) => props.width};
  height: ${(props) => props.width};
  position: absolute;
  left: ${(props) => props.top};
  top: ${(props) => props.top};
  z-index: 10;
  background-color: ${(props) => (props.isClicking ? btnClickBg : btnBg)};
  box-shadow: 1px 1px 20px 16px
    ${(props) => (props.isClicking ? '#cc6140' : '#29b6e4')} inset;
  border-radius: 5px;
  cursor: pointer;
  padding: 0;
  font-size: 45px;
  /* color:${(props) => (props.isClicking ? grayColor : activeColor)}; */
`;
