import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 10rem;
    margin: 0.35rem;
`;

const Image = styled.img`
    width: 100%;
    height: auto;
`;

const Artist = styled.div`
  white-space: nowrap;
  overflow: hidden;
`;

const Title = styled.div`
    white-space: nowrap;
    overflow: hidden;
    font-weight: bold;
`;

export default ({ imageUrl, title, artist, onClick }) => (
    <Container onClick={onClick}>
        <Image src={imageUrl} />
        <Title>{title}</Title>
        <Artist>{artist}</Artist>
    </Container>
);
