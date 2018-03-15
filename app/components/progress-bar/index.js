import React from 'react';
import styled from 'styled-components';

const lineWith = 0.18;

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
  margin-top: ${lineWith * -2.5}rem;
  height: ${lineWith * 4}rem;
  width: ${lineWith * 4}rem;
  border-radius: 50%;
  border: ${lineWith}rem solid #ffffff;
`;

const Margin = styled.div`
  margin-top: ${lineWith * 2.5}rem;
  margin-left: 1rem;
  margin-right: 1rem;
  width: calc(100% - 2rem);
`;

export default ({ progress }) => (
  <Margin>
    <Container>
      <Bar style={{ width: progress + '%' }}>
      </Bar>
    </Container>
    <InnerToggle style={{ marginLeft: `calc(${progress}% - 0.5rem)` }} />
  </Margin>
);