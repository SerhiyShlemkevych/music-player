import React from 'react';
import styled from 'styled-components';

const Image = styled.img`
    width: auto;
    height: 100%;
`;

const Container = styled.div`
    color: #ffffff;
    display: flex;
    justify-content: start;
`;

const BottomLine = styled.div`
    font-weight: bold;
`;

const TopLine = styled.div`
`;

const ImageContainer = styled.div`
`;

const TextContainer = styled.div`
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
