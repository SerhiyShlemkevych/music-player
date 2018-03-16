import React from 'react';
import saga from './saga';
import reducer from './reducer';
import styled from 'styled-components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { startLoadLibrary } from './actions';
import { prepareSetTrack } from '../mini-player/actions';
import Track from '../../components/track';

const Container = styled.div`
    background-color: #ffffff;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
`;

class MyMusic extends React.Component {
    componentDidMount() {
        this.props.onMount();
    }

    render() {
        const { library, onItemClick } = this.props;

        return (
            <Container>
                {library.map(item => (
                    <Track
                        onClick={() => onItemClick(item)}
                        key={item.id}
                        title={item.title || item.filePath}
                        artist={(item.artist && item.artist.join()) || ''}
                        imageUrl={`/api/media/${item.id}/image`}
                    />
                ))}
            </Container>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    onMount: () => dispatch(startLoadLibrary()),
    onItemClick: (item) => dispatch(prepareSetTrack(item))
});

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