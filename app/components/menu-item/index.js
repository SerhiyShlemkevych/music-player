import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
    color: blue;
`;

export default function () {
    return (
        <StyledDiv onClick={this.props.onClick}>
            {this.props.caption}
        </StyledDiv>
    );
}
