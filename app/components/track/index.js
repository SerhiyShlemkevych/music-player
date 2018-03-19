import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 10rem;
    margin: 0.35rem;
`;

const Image = styled.div`
    width: 10rem;
    height: 10rem;
    background-size: cover;
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

const ButtonsContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Button = styled.div`
    margin: 0.2rem;
    cursor: pointer;
    width: 3rem;
    height: 3rem;
    background-color: #303030;
    color: #fff;
    border-radius: 50%;
    text-align: center;
    font-size: 1.3rem;
    line-height: 3rem;
`;

export default ({ track,
    onMouseLeave,
    onMouseEnter,
    onPlayClick,
    onAddClick
}) => {
    const boxShadow = track.isHover
        ? '0px 10px 63px -15px rgba(0,0,0,0.75)'
        : undefined;
    const buttonsContainer = track.isHover
    ? (
        <ButtonsContainer>
                    <Button onClick={onPlayClick} className="flaticon-play" />
                    <Button onClick={onAddClick} className="flaticon-eject" />
                </ButtonsContainer>
    )
    : '';

    return (
        <Container 
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        >
            <Image style={{
                backgroundImage: `url(${track.imageUrl})`,
                boxShadow
            }}>
                {buttonsContainer}
            </Image>
            <Title>{track.title}</Title>
            <Artist>{track.artist}</Artist>
        </Container>
    )
};
