import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {
    playNowPlaying,
    pauseNowPlaying,
    updateProgressBar,
    updateTrackDuration,
    prevNowPlaying,
    nextNowPlaying
} from '../now-playing/actions';
import ProgressBar from '../../components/progress-bar';
import TrackInfo from '../../components/track-info';

import * as selectors from '../now-playing/selectors';

const BigIcon = styled.div`
    font-size: 2.3rem;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
`;

const SmallIcon = styled.div`
    font-size: 1rem;
`;

const Container = styled.div`
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


    render() {
        const {
            progressText,
            progress,
            duration,
            isNowPlaying,
            track,
            playNowPlaying,
            pauseNowPlaying,
            prevNowPlaying,
            nextNowPlaying
        } = this.props;

        return (
            <Container style={{
                backgroundColor: track.color || 'rgba(0,0,0,0.1)'
            }}>
                <TrackInfoContainer>
                    <TrackInfo
                        track={track}
                    />
                </TrackInfoContainer>
                <ControlsContainer>
                    <ButtonsContainer>
                        <SmallIcon onClick={prevNowPlaying}>
                            <span className="flaticon-previous"></span>
                        </SmallIcon>
                        <BigIcon>
                            {
                                isNowPlaying
                                    ? (<div className="flaticon-pause-2" onClick={pauseNowPlaying}></div>)
                                    : (<div className="flaticon-play-2" onClick={playNowPlaying}></div>)
                            }
                        </BigIcon>
                        <SmallIcon onClick={nextNowPlaying}>
                            <span className="flaticon-skip"></span>
                        </SmallIcon>
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
        isNowPlaying: selectors.getIsNowPlaying(state),
        track: selectors.getCurrentTrack(state),
        progress: selectors.getProgress(state),
        progressText: selectors.getProgressText(state),
        duration: selectors.getDuration(state),
    };
};

const mapDispatchToProps = {
    playNowPlaying,
    pauseNowPlaying,
    prevNowPlaying,
    nextNowPlaying
};

export default connect(
    mapStateToProps,
    mapDispatchToProps)
    (MiniPlayer);
