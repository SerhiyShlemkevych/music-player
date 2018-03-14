import React from "react";
import styled from 'styled-components';
import { injectGlobal } from 'styled-components';
import Menu from '../../components/menu';
import MiniPlayer from '../mini-player';
import MyMusic from '../my-music';

const playerHeight = '10vh';

const TopRow = styled.div`
  height: calc(100vh - ${playerHeight});
  display: flex;
`;

const ContextPageContainer = styled.div`
background-color: violet;
flex-basis: 100%;
`;

const BottomRow = styled.div`
  display: flex;
  flex-basis: 100%;
  height: ${playerHeight};
`;

const LeftColumn = styled.div`
  flex-basis: ${props => props.width};
  height: 100%;
  display: flex;
`;

const RightColumn = styled.div`
  flex-basis: 80%;
  height: 100%;
  display: flex;
`;

injectGlobal`
  html{
    font-size: 14pt;
  }
`;

export default function () {
  return (
    <div>
      <TopRow>
        <LeftColumn width={'20%'} >
          <Menu />
        </LeftColumn>
        <RightColumn>
          <ContextPageContainer>
            <MyMusic />
          </ContextPageContainer>

        </RightColumn>
      </TopRow>
      <BottomRow>
        <MiniPlayer />
      </BottomRow>
    </div>
  );
};
