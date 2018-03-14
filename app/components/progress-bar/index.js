import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #565656;
  height: 0.25rem;
  width: 100%;
`;

const Bar = styled.div`
  height: 100%;
  background-color: #ffffff;
  overflow: show;
`;

const InnerToggle = styled.div`
  margin-top: -0.6rem;
  height: 1rem;
  width: 1rem;
  border-radius: 50%;
  border-width: 0.3rem;
  border: 0.2rem solid #ffffff;
`;

const Margin = styled.div`
  margin-top: 0.6rem;
  width: 100%;
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