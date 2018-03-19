import React from 'react';
import saga from './saga';
import reducer from './reducer';
import styled from 'styled-components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
    startLoadLibrary,
    showAddButtons,
    hideAddButtons
} from './actions';
import {
    setNowPlaying,
    addToNowPlaying,
    playNowPlaying
} from '../now-playing/actions';
import Track from '../../components/track';

const Container = styled.div`
    background-color: #ffffff;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
`;

class MyMusic extends React.Component {
    componentDidMount() {
        this.props.startLoadLibrary();
    }

    render() {
        const {
            library,
            showAddButtons,
            hideAddButtons,
            addToNowPlaying,
            setNowPlaying
        } = this.props;

        return (
            <Container>
                {
                    library.map(item => (
                        <Track
                            key={item.id}
                            track={{
                                title: item.title || item.filePath,
                                artist: (item.artist && item.artist.join()) || '',
                                imageUrl: `/api/media/${item.id}/image`,
                                isHover: item.isHover
                            }}
                            onMouseEnter={() => showAddButtons(item)}
                            onMouseLeave={() => hideAddButtons(item)}
                            onAddClick={() => addToNowPlaying([item])}
                            onPlayClick={() => setNowPlaying([item], undefined, true)}
                        />
                    ))}
            </Container>
        );
    }
}

const mapDispatchToProps = {
    startLoadLibrary,
    showAddButtons,
    hideAddButtons,
    setNowPlaying,
    addToNowPlaying
};

const mapStateToProps = (state) => ({
    library: state.library
});

const widthConnect = connect(mapStateToProps, mapDispatchToProps);
const widthSaga = injectSaga({ key: 'library', saga });
const withReducer = injectReducer({ key: 'library', reducer });

export default compose(
    widthSaga,
    withReducer,
    widthConnect
)(MyMusic);