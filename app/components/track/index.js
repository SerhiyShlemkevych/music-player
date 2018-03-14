import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 10rem;
`;

const Image = styled.img`
    width: 100%;
    height: auto;
`;

const Artist = styled.div`
`;

const Title = styled.div`
    font-weight: bold;
`;

export default ({ imageUrl, title, artist, onClick }) => (
    <Container onClick={onClick}>
        <Image src={imageUrl} />
        <Title>{title}</Title>
        <Artist>{artist}</Artist>
    </Container>
);
