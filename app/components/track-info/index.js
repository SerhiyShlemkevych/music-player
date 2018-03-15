import React from 'react';
import styled from 'styled-components';

const Image = styled.img`
    width: 10vh;
    height: 10vh;
`;

const Container = styled.div`
    color: #ffffff;
    display: flex;
    justify-content: start;
    height: 100%;
`;

const BottomLine = styled.div`
    font-weight: bold;
`;

const TopLine = styled.div`
`;

const ImageContainer = styled.div`
    flex-grow: 0;
    flex-basis: content;
    margin-right: 0.5rem;
`;

const TextContainer = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: center;
    flex-grow: 1;
    flex-basis: auto;
`;

export default ({ bottomLine, topLine, imageUrl }) => (
    <Container>
        <ImageContainer>
            <Image src={imageUrl} />
        </ImageContainer>
        <TextContainer>
            <TopLine> {topLine} </TopLine>
            <BottomLine> {bottomLine} </BottomLine>
        </TextContainer>
    </Container>
);
