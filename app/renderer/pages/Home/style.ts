import styled from 'styled-components';

const grayColor = '#999999';
const yellowColor = '#ffff00';
const redColor = '#db5a6b';
const greenColor = '#3cb371';
const orangeColor = '#ff6347';
const whiteColor = '#fff';
const btnBg = '#cc6140';

export const HomeWrapper = styled.div<{
  ruleBackground: string;
  footerBackground: string;
}>`
  height: 100%;
  background-size: 100% 100%;
  margin: auto;
  .main-wrapper {
    display: flex;
    height: calc(100% - 130px);
    .left-wrapper {
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
        background-color: ${(props) => props.ruleBackground};
        border-radius: 10px;
        color: ${whiteColor};
        padding: 10px;
        width: 250px;
        p {
          padding: 0;
          margin: 0;
        }
      }
    }

    .right-wrapper {
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
    background-color: ${(props) => props.footerBackground};
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
          img {
            height: 100%;
          }
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
  activeColor: string;
}>`
  width: ${(props) => props.width};
  height: ${(props) => props.width};
  position: absolute;
  left: ${(props) => props.left};
  top: ${(props) => props.top};
  z-index: 10;
  display: inline-block;
  box-sizing: border-box;
  border-radius: 6px;
  border-style: solid;
  border-width: ${(props) => (props.active ? '8px' : 0)};
  border-color: ${(props) => (props.active ? props.activeColor : grayColor)};
  background-color: ${(props) => (props.active ? orangeColor : whiteColor)};
  .gift-pic {
    text-align: center;
    height: 100%;
    background-repeat: no-repeat;
    background-size: auto 100%;
    background-position: center;
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
  border-radius: 5px;
  cursor: pointer;
  padding: 0;
  font-size: 45px;
  background-size: 100% 100%;
`;
