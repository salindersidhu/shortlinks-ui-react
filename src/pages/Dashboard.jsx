import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import {
    Header,
    Container,
    Message,
    Divider,
    Grid,
    Segment,
    Table,
    Loader,
    Checkbox,
    Button,
    Icon
} from 'semantic-ui-react';
import gql from 'graphql-tag';

import ShortLinksHeader from '../components/Header';
import ShortLinksFooter from '../components/Footer';

const FETCH_LINKS = gql`
    {
        getLinks {
            _id
            name
            longURL
            shortURL
            createdBy
        }
    }
`;

function Dashboard() {
    const {
        loading,
        data 
    } = useQuery(FETCH_LINKS);

    return (
        <Fragment>
            <ShortLinksHeader />
            <Container>
                <Header as='h1'>Dashboard</Header>
                <Divider />
                <Message color='blue'>
                    <Message.Header>Welcome User!</Message.Header>
                    <p>You can view dashboard statistics and manage your links.</p>
                </Message>
                <Grid columns={4} stackable>
                    <Grid.Column>
                        <Segment inverted color='blue'>
                            <Container textAlign='center'>
                                Statistic 1
                            </Container>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment inverted color='green'>
                            <Container textAlign='center'>
                                Statistic 2
                            </Container>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment inverted color='yellow'>
                            <Container textAlign='center'>
                                Statistic 3
                            </Container>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment inverted color='red'>
                            <Container textAlign='center'>
                                Statistic 4
                            </Container>
                        </Segment>
                    </Grid.Column>
                </Grid>
                <Table compact celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Status</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Original Link</Table.HeaderCell>
                            <Table.HeaderCell>Date Modified</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {loading ? (
                            <Table.Row>
                                <Table.Cell colSpan={5}>
                                    <Loader active size='medium' inline='centered' />
                                </Table.Cell>
                            </Table.Row>
                        ) : (
                            <Fragment>
                                {data &&
                                    data.getLinks.map(link => (
                                        <Table.Row key={link._id}>
                                            <Table.Cell collapsing>
                                                <Checkbox toggle defaultChecked />
                                            </Table.Cell>
                                            <Table.Cell>
                                                {link.name}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {link.longURL}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {new Date().toLocaleString()}
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Button icon>
                                                    <Icon name='copy' />
                                                </Button>
                                                <Button icon>
                                                    <Icon name='edit' />
                                                </Button>
                                                <Button icon color='red'>
                                                    <Icon name='delete' />
                                                </Button>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))
                                }
                            </Fragment>
                        )}
                    </Table.Body>
                </Table>
            </Container>
            <ShortLinksFooter />
        </Fragment>
    );
}

export default Dashboard;
