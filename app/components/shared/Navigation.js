import React from 'react';
import styled from 'styled-components';
import { Button, Segment, Icon } from 'semantic-ui-react';

const Navigation = props => (
  <Sticky>
    <Segment>
      <Grid>
        <div>
          <Button basic color='blue' size='large'>
            <Icon name='arrow alternate circle left outline' className='navigation-icon' />
            Previous
          </Button>
        </div>
        <div>
          <Button basic color='blue' size='large'>
            <Icon name='save outline' className='navigation-icon' />
            Save
          </Button>
        </div>
        <div>
          <Button basic color='blue' size='large'>
            Next
            <Icon name='arrow alternate circle right outline' className='navigation-icon' />
          </Button>
        </div>
      </Grid>
    </Segment>
  </Sticky>
);

export default Navigation;
const Sticky = styled.div`
  bottom: 0px;
  position: sticky;
`;
const Grid = styled.div`
  display: grid;
  grid: 1fr / repeat(3, 1fr);
  text-align: center;
`;
