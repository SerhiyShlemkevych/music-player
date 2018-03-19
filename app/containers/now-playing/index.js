import React from 'react';
import styled, { injectGlobal } from 'styled-components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import { Link } from 'react-router-dom';
import * as selectors from './selectors';
import {
    hideNowPlaying,
    updateProgressBar,
    updateTrackDuration,
    loadNowPlaying,
    saveNowPaying,
    pauseNowPlaying,
    playNowPlaying
} from './actions';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import TrackInfo from '../../components/track-info';
import ProgressBar from '../../components/progress-bar';

injectGlobal`
.example-enter {
  opacity: 0.01;
}

.example-enter.example-enter-active {
  opacity: 1;
  transition: opacity 500ms ease-in;
}

.example-leave {
  opacity: 1;
}

.example-leave.example-leave-active {
  opacity: 0.01;
  transition: opacity 300ms ease-in;
}
`;

const Container = styled.div`
    color: #fff;
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 11;
    background-color: rgba(0,0,0,0.8);
`;

const Background = styled.div`
    filter: blur(30px);
    position: fixed;
    z-index: 10;
    top: -15vh;
    left: -15vw;
    width: 130vw;
    height: 130vh;
    background-color: #000000;
    background-size: cover;
`;

const BackButton = styled.div`
    width: 2.5rem;
    height: 2rem;
    background-color: #005a9e;
    color: #fff;
    font-size: 1.2rem;
    text-align: center;
    text-decoration: none;
`;

const BackButtonContainer = styled.div`
    width: 100%;
    margin-bottom: 0.5rem;
`;

const PlayerContainer = styled.div`
    padding-left: 1rem;
    padding-right: 1rem;
    width: 100%;
    height: 20vh;
`;

const TrackInfoContainer = styled.div`
    height: 10vh;
    margin-bottom: 2rem;
`;

const DurationContainer = styled.div`
    font-size: 0.75rem;
    margin-bottom: 1rem;
    display: flex;
`;

const ButtonsContainer = styled.div`
    display: flex;
    flex-basis: 100%;
    justify-content: flex-start;
`;

const Icon = styled.div`
    font-size: 2.2rem;
    margin-right: 2.5rem;
`;

const ListContainer = styled.div`
    margin-top: 2rem;
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
    display: flex;
    flex-flow: column;
`;

const Track = styled.div`
    color: #fff;
`;

export class NowPlaying extends React.Component {
    manageAudio(shouldPlay, src) {
        if (!this.audio) {
            return;
        }

        if (src && !this.audio.src.includes(src)) {
            this.audio.src = src;
            this.audio.load();
        }
        if (shouldPlay && this.audio.src && this.audio.paused) {
            this.audio.play();
        } else if (!shouldPlay && !this.audio.paused) {
            this.audio.pause();
        }
    }

    componentDidMount() {
        const {
            updateProgressBar,
            updateTrackDuration,
            saveNowPaying,
            loadNowPlaying } = this.props;

        loadNowPlaying();

        // window.onbeforeunload =
        //     (e) => {
        //         e.returnValue = 'text';
        //         saveNowPaying(this.props.trackList, this.props.track);
        //         return 'text';
        //     };

        this.audio = document.createElement('audio');

        this.timeUpdateListner = this.audio.addEventListener(
            'timeupdate', () =>
                updateProgressBar(
                    this.audio.currentTime,
                    this.audio.duration));

        this.durationChangeListner = this.audio.addEventListener(
            'durationchange',
            () => updateTrackDuration(this.audio.duration));
    }

    componentWillUnmount() {
        this.audio.stop();
        this.audio.removeEventListener(this.timeUpdateListner);
        this.audio.removeEventListener(this.durationChangeListner);
        window.removeEventListener(this.exitListner);
        this.audio = null;
    }

    render() {
        const {
            isVisible,
            hideNowPlaying,
            track,
            trackList,
            isNowPlaying,
            progressText,
            progress,
            duration,
            playNowPlaying,
            pauseNowPlaying } = this.props;

        this.manageAudio(isNowPlaying, track.url);

        let children = [
            (
                <Container key="0">
                    <BackButtonContainer>
                        <BackButton onClick={hideNowPlaying}>{'←'}</BackButton>
                    </BackButtonContainer>
                    <PlayerContainer>
                        <TrackInfoContainer>
                            <TrackInfo track={track} />
                        </TrackInfoContainer>
                        <DurationContainer>
                            <div>{progressText}</div>
                            <ProgressBar progress={progress} />
                            <div>{duration}</div>
                        </DurationContainer>
                        <ButtonsContainer>
                            <Icon><span className="flaticon-previous-1"></span></Icon>
                            <Icon>
                                {
                                    isNowPlaying
                                        ? (<div className="flaticon-pause" onClick={pauseNowPlaying}></div>)
                                        : (<div className="flaticon-play" onClick={playNowPlaying}></div>)
                                }
                            </Icon>
                            <Icon><span className="flaticon-skip-1"></span></Icon>
                        </ButtonsContainer>
                    </PlayerContainer>
                    <ListContainer>
                        {trackList.map(track => (
                            <Track key={track.id}>
                                {track.title}
                            </Track>
                        ))}
                    </ListContainer>
                </Container>
            ),
            (
                <Background key="1" style={{
                    backgroundImage: track.imageUrl
                        ? `url(${track.imageUrl})`
                        : null
                }} />
            )
        ];


        if (!isVisible) children = [];
        return (
            <ReactCSSTransitionGroup
                transitionName="example"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}
            >
                {children}
            </ReactCSSTransitionGroup>
        )
    }
};

const mapStateToProps = state => ({
    isVisible: selectors.getIsVisible(state),
    track: selectors.getCurrentTrack(state),
    isNowPlaying: selectors.getIsNowPlaying(state),
    trackList: selectors.getTrackList(state),
    duration: selectors.getDuration(state),
    progress: selectors.getProgress(state),
    progressText: selectors.getProgressText(state)
});

const mapDispatchToProps = {
    hideNowPlaying,
    updateProgressBar,
    updateTrackDuration,
    saveNowPaying,
    loadNowPlaying,
    playNowPlaying,
    pauseNowPlaying
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const widthReducer = injectReducer({ key: 'nowPlaying', reducer });
const widthSaga = injectSaga({ key: 'nowPlaying', saga });

export default compose(
    widthSaga,
    widthReducer,
    withConnect,
)(NowPlaying);
