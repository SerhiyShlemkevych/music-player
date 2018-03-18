import React from "react";
import styled from 'styled-components';
import { injectGlobal } from 'styled-components';
import Menu from '../menu';
import MiniPlayer from '../mini-player';
import MyMusic from '../my-music';
import { compose } from 'redux';
import { connect } from 'react-redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from './reducer';
import * as selectors from './selectors';
import NowPlaying from 'containers/now-playing';

const playerHeight = '10vh';

const Background = styled.div`
    z-index: 0;
    position: fixed;
    width: 420vh;
    height: 300vh;
    left: -100vh;
    top: -100vh;
    background-size: cover;
    filter: blur(10px);
`;

const ContextPageContainer = styled.div`
  flex-basis: 100%;
  height: 100vh;
  overflow-y: scroll;
`;

const Container = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
`;

const LeftColumn = styled.div`
  flex-basis: 15rem;
  height: 100%;
  display: flex;
  flex-grow: 0;
`;

const RightColumn = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 100%;
  height: 100%;
  display: flex;
`;

injectGlobal`
  html{
    font-size: 14pt;
  }
`;

export class IndexpPage extends React.Component {
  render() {
    const { imageUrl } = this.props;

    return (
      <div>
        <NowPlaying />
        <Background style={{ backgroundImage: `url(${imageUrl})` }} />
        <Container>
          <LeftColumn width={'20%'} >
            <Menu />
          </LeftColumn>
          <RightColumn>
            <ContextPageContainer>
              <MyMusic />
            </ContextPageContainer>
          </RightColumn>
          <MiniPlayer />
        </Container>
      </div>
    );
  }
};

const withReducer = injectReducer({ key: 'menu', reducer });

const mapStateToProps = (state) => ({
  imageUrl: selectors.getImageUrl(state)
});

const withConnect = connect(mapStateToProps);

export default compose(
  withReducer,
  withConnect
)(IndexpPage);
