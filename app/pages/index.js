import React, { Component } from 'react';
import { Router, Link } from '@reach/router';
import { Segment, Icon, Divider, Label } from 'semantic-ui-react';
import styled, { createGlobalStyle } from 'styled-components';
import Home from '../pages/home';
import MessageList from '../pages/message/list';
import MessageSingle from '../pages/message/single';

class App_raw extends Component {
  render() {
    return (
      <Wrapper>
        <GlobalStyle />
        <Segment inverted className='st-sidebar'>
          <Label color='blue' size='big'>
            Sega Tools (Kenzan)
          </Label>
          <Navigation>
            <NavLink to={'/'}>
              <Icon name='home' /> Home
            </NavLink>
            <NavLink to={'/login'}>
              <Icon name='lock' /> Login
            </NavLink>
            <NavLink to={'/search'}>
              <Icon name='search' /> Search
            </NavLink>
            <Divider />
            <NavLink to={'/messages'}>
              <Icon name='comment' /> Messages
            </NavLink>
            <NavLink to={'/names'}>
              <Icon name='group' /> Names
            </NavLink>
            <Divider />
            <NavLink to={'/unique'}>
              <Icon name='pencil' /> Unique
            </NavLink>
          </Navigation>
        </Segment>
        <Container>
          <ViewWrap>
            <Home path='/' />
            <MessageList path='/messages' />
            <MessageSingle path='/messages/:id' />
          </ViewWrap>
        </Container>
      </Wrapper>
    );
  }
}

const Navigation = styled.div`
  position: sticky;
  top: 0px;
`;

const ViewWrap = styled(Router)`
  height: 100%;
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

const GlobalStyle = createGlobalStyle`
#app {
  height: 100%;
  transform: translateZ(0);
}
`;

export default App_raw;
