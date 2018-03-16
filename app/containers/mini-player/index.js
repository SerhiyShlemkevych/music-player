import React from 'react';
import styled from 'styled-components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import {
    resume,
    pause,
    updateProgressBar,
    updateTrackDuration
} from './actions';
import ProgressBar from '../../components/progress-bar';
import TrackInfo from '../../components/track-info';
import * as selectors from './selectors';

const BigIcon = styled.div`
    font-size: 2.3rem;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
`;

const SmallIcon = styled.div`
    font-size: 1rem;
`;

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
    align-items: center;
    margin-bottom: -0.2rem;
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
        this.timeUpdateListner = this.audio.addEventListener(
            'timeupdate', () =>
                this.props.onPlaying(this.audio.currentTime,
                    this.audio.duration));
        this.durationChangeListner = this.audio.addEventListener(
            'durationchange',
            () =>  this.props.updateTrackDuration(this.audio.duration));
    }

    componentWillUnmount() {
        this.audio.stop();
        this.audio.removeEventListener(this.timeUpdateListner);
        this.audio.removeEventListener(this.durationChangeListner);
        this.audio = null;
    }

    render() {
        const {
            progressText,
            progress,
            duration,
            shouldPlay,
            onResumeClick,
            onPauseClick,
            onPlaying,
            track
        } = this.props;
        this.manageAudio(shouldPlay, track.url);

        return (
            <Container style={{
                backgroundColor:track.color
            }}>
                <TrackInfoContainer>
                    <TrackInfo
                        topLine={track.title}
                        bottomLine={track.artist}
                        imageUrl={track.imageUrl}
                    />
                </TrackInfoContainer>
                <ControlsContainer>
                    <ButtonsContainer>
                        <SmallIcon><span className="flaticon-previous"></span></SmallIcon>
                        <BigIcon>
                        {
                            shouldPlay
                                ? (<div className="flaticon-pause-2" onClick={onPauseClick}></div>)
                                : (<div className="flaticon-play-2" onClick={onResumeClick}></div>)
                        }
                        </BigIcon>
                        <SmallIcon><span className="flaticon-skip"></span></SmallIcon>
                    </ButtonsContainer>
                    <DurationContainer>
                        <div>{progressText}</div>
                        <ProgressBar progress={progress} />
                        <div>{duration}</div>
                    </DurationContainer>
                </ControlsContainer>
                <VolumeContainer>
                    <ProgressBar progress={0.5} />
                </VolumeContainer>
            </Container >
        );
    }
};

const mapStateToProps = (state) => {
    return {
        shouldPlay: selectors.getShouldPlay(state),
        track: selectors.getTrack(state),
        progress: selectors.getProgress(state),
        progressText: selectors.getProgressText(state),
        duration: selectors.getDuration(state)
    };
};

const widthReducer = injectReducer({ key: 'miniPlayer', reducer });
const widthSaga = injectSaga({ key: 'miniPlayer', saga });

const withConnect = connect(
    mapStateToProps, {
        onResumeClick: resume,
        onPauseClick: pause,
        onPlaying: updateProgressBar,
        updateTrackDuration
    });

export default compose(
    widthSaga,
    widthReducer,
    withConnect,
)(MiniPlayer);
