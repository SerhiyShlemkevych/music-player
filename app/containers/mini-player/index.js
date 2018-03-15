import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import ReactAnimationFrame from 'react-animation-frame';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from './reducer';
import { resume, pause, updateProgressBar } from './actions';
import ProgressBar from '../../components/progress-bar';
import TrackInfo from '../../components/track-info';

const Container = styled.div`
    color: white;
    background-position: center;
    background-size: 100%;
    z-index: 2;
    display: flex;
    justify-content: center;
    width: 100%;
`;

const Background = styled.div`
  width: 200%;
  height: 400%;
  margin-left: -25%;
  margin-top: -10%;
  background-size: cover;
  filter: blur(40px) brightness(80%);
`;

const BackgroundContainer = styled.div`
    /* background-color: rgba(0,0,0,0.9); */
    overflow: hidden;
    z-index: -1;
    position: absolute;
    top: 90vh;
    bottom: 0;
    left: 0;
    right: 0;
`;

const ControlsContainer = styled.div`
    height: 100%;
    flex-basis: 40%;
    flex-grow: 1;
    align-self: center;
    margin-left: auto;
    margin-right: auto;
`;

const TrackInfoContainer = styled.div`
    height: 100%;
    flex-basis: 30%;
    flex-grow: 0;
`;

const DurationContainer = styled.div`
    font-size: 0.75rem;
    display: flex;
`;

const VolumeContainer = styled.div`
    flex-basis: 30%;
    height: 100%;
    flex-grow: 0;
`;

class MiniPlayer extends React.Component {
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
        this.audio = document.createElement('audio');
        this.audio.ontimeupdate = () =>
            this.props.onPlaying(this.audio.currentTime,
                this.audio.duration);
    }

    render() {
        const {
            currentProgressText,
            durationText,
            shouldPlay,
            imageUrl,
            trackUrl,
            title,
            artist,
            onResumeClick,
            onPauseClick,
            currentProgress,
            onPlaying
        } = this.props;
        this.manageAudio(shouldPlay, trackUrl);

        return (
            <Container imageUrl={imageUrl}>
                <BackgroundContainer >
                    <Background style={{ backgroundImage: `url(${imageUrl})` }} />
                </BackgroundContainer>
                <TrackInfoContainer>
                    <TrackInfo
                        topLine={title}
                        bottomLine={artist}
                        imageUrl={imageUrl}
                    />
                </TrackInfoContainer>
                <ControlsContainer>
                    <div onClick={onResumeClick}>resume</div>
                    <div onClick={onPauseClick}>pause</div>
                    <DurationContainer>
                        <div>{currentProgressText}</div>
                        <ProgressBar progress={currentProgress} />
                        <div>{durationText}</div>
                    </DurationContainer>
                </ControlsContainer>
                <VolumeContainer>
                    <ProgressBar progress={0} />
                </VolumeContainer>
            </Container>
        );
    }
};

MiniPlayer.propTypes = {
    shouldPlay: PropTypes.bool,
    src: PropTypes.string,
    onResumeClick: PropTypes.func,
    onPauseClick: PropTypes.func
};

const mapStateToProps = (state) => {
    if (!state.miniPlayer) return {};
    return {
        shouldPlay: state.miniPlayer.shouldPlay,
        trackUrl: state.miniPlayer.trackUrl,
        imageUrl: state.miniPlayer.imageUrl,
        title: state.miniPlayer.title,
        artist: state.miniPlayer.artist,
        currentProgress: state.miniPlayer.currentProgress,
        currentProgressText: state.miniPlayer.currentProgressText,
        durationText: state.miniPlayer.durationText
    };
};

const widthReducer = injectReducer({ key: 'miniPlayer', reducer });

const withConnect = connect(
    mapStateToProps, {
        onResumeClick: resume,
        onPauseClick: pause,
        onPlaying: updateProgressBar
    });

export default compose(
    withConnect,
    widthReducer
)(MiniPlayer);
