import React, { PureComponent } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Label, Button, Segment, Icon, Header, Form as SemanticForm } from 'semantic-ui-react';
import TextArea from '../../components/forms/TextArea';
import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';

export default class MessageSingle extends PureComponent {
  componentDidMount() {
    this.fetchItem();
  }

  state = {
    loading: false,
    loaded: false,
    message: {
      lines: [],
      names: []
    }
  };

  fetchItem = () => {
    this.setState({ loading: true });
    axios
      .get(`/api/messages/${this.props.id}`)
      .then(({ data }) => {
        this.setState({ message: { ...data }, loading: false, loaded: true });
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  };

  onSubmit = values => {};

  renderNavigation = () => {
    return (
      <Segment>
        <Grid>
          <div>
            <Button basic color="blue" size="large">
              <Icon name="arrow alternate circle left outline" className="navigation-icon" />
              Previous
            </Button>
          </div>
          <div>
            <Button basic color="blue" size="large">
              <Icon name="save outline" className="navigation-icon" />
              Save
            </Button>
          </div>
          <div>
            <Button basic color="blue" size="large">
              Next
              <Icon name="arrow alternate circle right outline" className="navigation-icon" />
            </Button>
          </div>
        </Grid>
      </Segment>
    );
  };

  render() {
    const { message, loaded } = this.state;
    if (!loaded) {
      return null;
    }
    return (
      <Form
        onSubmit={this.onSubmit}
        mutators={{
          // potentially other mutators could be merged here
          ...arrayMutators
        }}
        initialValues={{ ...message }}
        render={({ handleSubmit, pristine, invalid }) => (
          <SemanticForm onSubmit={handleSubmit}>
            {this.renderNavigation()}
            <Segment>
              <Header>
                <Header.Content>
                  {message.fileName}
                  <Header.Subheader> {message.lines.length} lines </Header.Subheader>
                </Header.Content>
              </Header>
              <div>
                {message.names.map(name => (
                  <Label tag key={name._id}>
                    {' '}
                    {name.japanese}
                    {name.english && `(${name.english})`}{' '}
                  </Label>
                ))}
              </div>
            </Segment>

            <FieldArray name={'lines'}>
              {({ fields }) => (
                <div>
                  {fields.map((name, index) => (
                    <Segment>
                      <div> {message.lines[index].text.japanese} </div>
                      <Field component={TextArea} name={`${name}.text.english`} />
                    </Segment>
                  ))}
                </div>
              )}
            </FieldArray>
            {this.renderNavigation(true)}
          </SemanticForm>
        )}
      />
    );
  }
}

const Grid = styled.div`
  display: grid;
  grid: 1fr / repeat(3, 1fr);
  text-align: center;
`;
