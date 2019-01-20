import React, { PureComponent } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Label, Segment, Header, Form as SemanticForm, Grid, Button, Icon } from 'semantic-ui-react';
import { Table, Column, AutoSizer } from 'react-virtualized';
import { Form, Field } from 'react-final-form';
import { forEach, get } from 'lodash';
import TextArea from '../../components/forms/TextArea';
import Navigation from 'app/components/shared/Navigation';
import Preview from 'app/components/message/Preview';

export default class MessageSingle extends PureComponent {
  state = {
    loading: false,
    loaded: false,
    message: {
      lines: [],
      names: []
    },
    preview: {
      open: false,
      message: {}
    },
    errorMessage: null
  };

  componentDidMount() {
    this.fetchItem();
  }

  onMessagePreview = message => () => {
    this.setState({
      preview: {
        open: true,
        message
      }
    });
  };

  onMessagePreviewClose = () => {
    this.setState({
      preview: {
        open: false,
        message: {}
      }
    });
  };

  fetchItem = () => {
    this.setState({ loading: true });

    axios
      .get(`/api/messages/${this.props.id}`)
      .then(({ data }) => {
        this.setState({
          message: { ...data },
          loading: false,
          loaded: true
        });
      })
      .catch(() => {
        this.setState({
          loading: false
        });
      });
  };

  onSubmit = values => {
    this.setState({ loading: true });

    const data = {
      chapterName: undefined,
      updatedLines: [],
      updateMany: true
    };

    if (this.state.message.chapterName !== values.chapterName) {
      data.chapterName = values.chapterName;
    }

    forEach(this.state.message.lines, (line, index) => {
      if (line.text.japanese !== null && get(values.lines, [index, 'text', 'english']) !== line.text.english) {
        data.updatedLines.push({
          japanese: line.text.japanese,
          english: get(values.lines, [index, 'text', 'english'])
        });
      }
    });

    axios
      .post(`/api/messages/${this.props.id}`, data, {
        headers: {
          token: window.localStorage.getItem('token')
        }
      })
      .then(() => {
        this.setState({
          message: values,
          errorMessage: null
        });
      })
      .catch(error => {
        this.setState({
          errorMessage: error.response.data || error.message
        });
      });
  };

  render() {
    const { message, loaded, errorMessage, preview } = this.state;

    if (!loaded) {
      return null;
    }

    return (
      <>
        {preview.open && <Preview close={this.onMessagePreviewClose} message={preview.message} />}
        <Form
          onSubmit={this.onSubmit}
          validateOnBlur={false}
          subscription={{ values: true }}
          initialValues={{ ...message }}
          render={({ handleSubmit, pristine, invalid, values }) => (
            <StyledForm onSubmit={handleSubmit} height='100%'>
              <div>{errorMessage}</div>
              <EditLayout>
                <Segment raised>
                  <Header>
                    <Header.Content>
                      {message.fileName}
                      <Header.Subheader> {message.lines.length} lines </Header.Subheader>
                    </Header.Content>
                  </Header>
                  <div>
                    {message.names.map(name => (
                      <Label tag key={name._id}>
                        {name.japanese}
                        {name.english && `(${name.english})`}{' '}
                      </Label>
                    ))}
                  </div>
                  <div>{errorMessage}</div>
                </Segment>
                <div>
                  <AutoSizer>
                    {({ width, height }) => (
                      <Table
                        height={height}
                        rowCount={message.lines.length}
                        rowHeight={190}
                        width={width}
                        rowGetter={({ index }) => values.lines[index]}
                      >
                        <Column
                          dataKey={'name'}
                          width={300}
                          disableSort
                          cellRenderer={({ rowIndex, dataKey }) => (
                            <Segment raised height={'190px'}>
                              <Grid stackable columns={2}>
                                <Grid.Column>
                                  <JapaneseMessage> {values.lines[rowIndex].text.japanese} </JapaneseMessage>
                                </Grid.Column>
                                <Grid.Column>
                                  <Field
                                    component={TextArea}
                                    name={`lines[${rowIndex}].text.english`}
                                    subscription={{ value: true }}
                                  />
                                </Grid.Column>
                              </Grid>
                              <Options>
                                <Button as='div' labelPosition='right'>
                                  <Button basic color='blue'>
                                    Times used:
                                  </Button>
                                  <Label as='a' basic color='blue' pointing='left'>
                                    {message.lines[rowIndex].count}
                                  </Label>
                                </Button>

                                <Button
                                  icon
                                  labelPosition='left'
                                  type='button'
                                  primary
                                  onClick={this.onMessagePreview(values.lines[rowIndex].text.english)}
                                >
                                  <Icon name='eye' />
                                  Preview
                                </Button>
                              </Options>
                            </Segment>
                          )}
                        />
                      </Table>
                    )}
                  </AutoSizer>
                </div>
                <Navigation />
              </EditLayout>
            </StyledForm>
          )}
        />
      </>
    );
  }
}

const Options = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1em;
  justify-content: space-between;
`;

const StyledForm = styled(SemanticForm)`
  height: 100%;
`;

const EditLayout = styled.div`
  display: grid;
  grid: 110px 1fr 75px / 1fr;
  height: 100%;
`;

const JapaneseMessage = styled.pre`
  white-space: pre-line;
`;
