import React from 'react';
import styled from 'styled-components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from './reducer';
import * as selectors from './selectors';

const Container = styled.div`
    position: relative;
    background-color: rgba(255,255,255, 0.8);
    height: 100vh;
    width: 100%;
`;

export class Menu extends React.Component {
    render() {
        return (
            <Container>
                {'some text'}
            </Container>
        );
    }
}

const withReducer = injectReducer({ key: 'menu', reducer });

const mapStateToProps = (state) => ({
    imageUrl: selectors.getImageUrl(state)
});

const withConnect = connect(mapStateToProps);

export default compose(
    withReducer,
    withConnect
)(Menu);