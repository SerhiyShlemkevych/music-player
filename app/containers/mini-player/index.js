import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import ReactAnimationFrame from 'react-animation-frame';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import { throttle } from 'lodash';
import {
    resume,
    pause,
    updateProgressBar,
    updateBlur
} from './actions';
import ProgressBar from '../../components/progress-bar';
import TrackInfo from '../../components/track-info';

const Container = styled.div`
    z-index: 1000;
    position: fixed;
    top: 90vh;
    bottom: 0;
    left: 0;
    right: 0;
    color: white;
    background-position: center;
    background-size: 100%;
    z-index: 2;
    display: flex;
    justify-content: center;
    width: 100%;
    backdrop-filter: blur(30px);
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

const ButtonsContainer = styled.div`
    font-size: 2rem;
    display: flex;
    flex-basis: 100%;
    justify-content: center;
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

    componentWillUnmount() {
        this.audio.scrollTop();
        this.audio = null;
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
            onPlaying,
            backgroundColor = [0, 0, 0]
        } = this.props;
        this.manageAudio(shouldPlay, trackUrl);

        return (
            <Container style={{
                backgroundColor
            }}>
                <TrackInfoContainer>
                    <TrackInfo
                        topLine={title}
                        bottomLine={artist}
                        imageUrl={imageUrl}
                    />
                </TrackInfoContainer>
                <ControlsContainer>
                    <ButtonsContainer>
                        {
                            shouldPlay
                                ? (<div className="flaticon-pause" onClick={onPauseClick}></div>)
                                : (<div className="flaticon-play" onClick={onResumeClick}></div>)
                        }
                    </ButtonsContainer>
                    <DurationContainer>
                        <div>{currentProgressText}</div>
                        <ProgressBar backgroundColor progress={currentProgress} />
                        <div>{durationText}</div>
                    </DurationContainer>
                </ControlsContainer>
                <VolumeContainer>
                    <ProgressBar progress={0} />
                </VolumeContainer>
            </Container >
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
        durationText: state.miniPlayer.durationText,
        backgroundColor: state.miniPlayer.backgroundColor
    };
};

const widthReducer = injectReducer({ key: 'miniPlayer', reducer });
const widthSaga = injectSaga({ key: 'miniPlayer', saga });

const withConnect = connect(
    mapStateToProps, {
        onResumeClick: resume,
        onPauseClick: pause,
        onPlaying: updateProgressBar
    });

export default compose(
    withConnect,
    widthReducer,
    widthSaga
)(MiniPlayer);
