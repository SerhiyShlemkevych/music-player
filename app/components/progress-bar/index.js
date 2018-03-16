import React from 'react';
import styled from 'styled-components';

const lineWith = 0.18;

function remToPx(rem, round) {
  const res = rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
  return round ? Math.round(res) : res;
};

const Container = styled.div`
  background-color: #565656;
  height: ${lineWith}rem;
  width: 100%;
`;

const Bar = styled.div`
  height: 100%;
  background-color: #ffffff;
  overflow: show;
`;

const InnerToggle = styled.div`
  margin-top: ${remToPx(-3.25 * lineWith)}px;
  height: ${remToPx(lineWith * 5.5)}px;
  width: ${remToPx(lineWith * 5.5, true)}px;
  border-radius: 50%;
  border: ${remToPx(lineWith * 1.5)}px solid #ffffff;
  background-color: ${props => props.backgroundColor};
`;

const Margin = styled.div`
  margin-top: ${lineWith * 3.25}rem;
  margin-left: 1rem;
  margin-right: 1rem;
  width: calc(100% - 2rem);
`;

export default ({ progress, backgroundColor }) => (
  <Margin>
    <Container>
      <Bar style={{ width: `calc(${progress}% - 0.5rem)` }}>
      </Bar>
    </Container>
    <InnerToggle style={{ marginLeft: `calc(${progress}% - 0.5rem)` }} />
  </Margin>
);