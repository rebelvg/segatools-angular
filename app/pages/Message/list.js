import React, { PureComponent } from 'react';
import { Dimmer, Loader, Segment, Header, Label, Divider, Progress, Pagination } from 'semantic-ui-react';
import qs from 'query-string';
import { Link } from '@reach/router';
import axios from 'axios';
import styled from 'styled-components';

export default class MessageListPage extends PureComponent {
  state = {
    loading: false,
    messages: [],
    page: 1,
    limit: null,
    pages: 0,
    total: null
  };

  componentDidMount() {
    const initialParams = qs.parse(this.props.location.search);
    this.setState(
      {
        page: initialParams.page || this.state.page,
        limit: initialParams.limit || this.state.limit
      },
      () => this.fetchItems()
    );
  }

  fetchItems() {
    this.setState({ loading: true });

    const params = {
      page: this.state.page,
      limit: this.state.limit
    };

    axios
      .get('/api/messages', { params })
      .then(({ data }) => {
        this.setState({
          loading: false,
          ...data
        });
      })
      .catch(() => {
        this.setState({
          loading: false
        });
      });
  }

  getColorByPercent(percent) {
    switch (true) {
      case percent <= 25:
        return 'red';
      case percent <= 60:
        return 'yellow';
      default:
        return 'green';
    }
  }

  renderMessages() {
    const { messages } = this.state;

    if (!messages) {
      return <div> No Messages Found </div>;
    }

    return messages.map(message => (
      <Segment raised key={message._id}>
        <Link to={`/messages/${message._id}`}>
          <Header as='h5'>
            <Grid>
              <div>
                {message.fileName}
                <Label color='blue'>{message.lines.length} lines</Label>

                <Label> {message.chapterName}</Label>
              </div>
              <div>
                <Progress
                  percent={message.percentDone.toFixed(2)}
                  indicating
                  progress
                  color={this.getColorByPercent(message.percentDone)}
                />
              </div>
            </Grid>
          </Header>
          <Divider />
          {message.names.map(name => (
            <Label tag key={name._id}>
              {' '}
              {name.japanese}
              {name.english && `(${name.english})`}{' '}
            </Label>
          ))}
        </Link>
      </Segment>
    ));
  }

  onPageChange = (e, { activePage }) => {
    this.setState({ page: activePage }, () => this.fetchItems());
  };

  renderPagination() {
    const { page, pages } = this.state;
    return (
      <TextCenter>
        <Pagination
          activePage={page}
          onPageChange={this.onPageChange}
          totalPages={pages}
          firstItem={'First'}
          lastItem={'Last'}
          nextItem={'Next'}
          prevItem={'Previous'}
        />
      </TextCenter>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <div>
        <Dimmer active={loading}>
          <Loader>Loading</Loader>
        </Dimmer>
        {this.renderPagination()}
        {this.renderMessages()}
        {this.renderPagination()}
      </div>
    );
  }
}

const Grid = styled.div`
  display: grid;
  grid: 1fr / 4fr 1fr;
  .progress {
    margin-bottom: 0 !important;
  }
`;

const TextCenter = styled.div`
  display: flex;
  justify-content: center;
`;
