import React, { Component } from 'react';
import { Router, Link } from '@reach/router';
import { Segment, Icon, Divider } from 'semantic-ui-react';
import styled from 'styled-components';
import Home from '../pages/Home';
import MessageList from '../pages/Message/list';
import MessageSingle from '../pages/Message/single';

class App_raw extends Component {
  render() {
    return (
      <Wrapper>
        <Segment inverted className="st-sidebar">
          <Navigation>
            <NavLink to={'/'}>
              <Icon name="home" /> Home{' '}
            </NavLink>
            <NavLink to={'/login'}>
              <Icon name="lock" /> Login{' '}
            </NavLink>
            <NavLink to={'/search'}>
              <Icon name="search" /> Search{' '}
            </NavLink>
            <Divider />
            <NavLink to={'/messages'}>
              <Icon name="comment" /> Messages{' '}
            </NavLink>
            <NavLink to={'/message_encounter'}>
              <Icon name="exclamation" /> Messages Encounter{' '}
            </NavLink>
            <NavLink to={'/names'}>
              <Icon name="group" /> Names{' '}
            </NavLink>
            <Divider />
            <NavLink to={'/unique'}>
              <Icon name="pencil" /> Unique{' '}
            </NavLink>
          </Navigation>
        </Segment>
        <Container>
          <Router>
            <Home path="/" />
            <MessageList path="/messages" />
            <MessageSingle path="/messages/:id" />
          </Router>
        </Container>
      </Wrapper>
    );
  }
}

const Navigation = styled.div`
  position: sticky;
  top: 0px;
`;

const Wrapper = styled.div`
  display: grid;
  grid: 1fr / 250px 1fr;
  height: 100%;
  .st-sidebar {
    border-radius: 0px !important;
    padding-bottom: 0px;
    margin-bottom: 0px !important;
  }
`;

const Container = styled.div`
  padding: 0px 10px;
  background-color: #f7f7f7;
`;

const NavLink = styled(Link)`
  display: block;
  text-decoration: none;
  padding: 10px;
  box-sizing: border-box;
  border: 2px solid transparent;
  &[aria-current='page'] {
    border-bottom: 2px solid #4183c4;
  }
`;

export default App_raw;
