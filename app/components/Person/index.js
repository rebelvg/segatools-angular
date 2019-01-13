import React from 'react';
import styled from 'styled-components';

const Person = ({ person }) => (
  <Wrap key={person.id}>
    <img src={person.avatar} />
    <div>
      {' '}
      {person.first_name} {person.last_name}{' '}
    </div>
  </Wrap>
);

export default Person;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0px;
  img {
    width: 64px;
    border-radius: 50px;
    margin-right: 20px;
  }
`;
