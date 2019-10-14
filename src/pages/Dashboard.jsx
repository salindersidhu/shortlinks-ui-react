import React, { Fragment } from 'react';
import {
    Header,
    Container,
    Message,
    Divider,
    Grid,
    Segment,
    Table,
    Checkbox,
    Button,
    Icon
} from 'semantic-ui-react';

import ShortLinksHeader from '../components/Header';
import ShortLinksFooter from '../components/Footer';

function Dashboard() {
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
                                Content
                            </Container>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment inverted color='green'>
                            <Container textAlign='center'>
                                Content
                            </Container>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment inverted color='yellow'>
                            <Container textAlign='center'>
                                Content
                            </Container>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment inverted color='red'>
                            <Container textAlign='center'>
                                Content
                            </Container>
                        </Segment>
                    </Grid.Column>
                    <Table
                        compact
                        celled
                        style={{
                            paddingLeft: '0',
                            paddingRight: '0',
                            marginLeft: '1em',
                            marginRight: '1em'
                        }}
                    >
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Status</Table.HeaderCell>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Link</Table.HeaderCell>
                                <Table.HeaderCell>Date Modified</Table.HeaderCell>
                                <Table.HeaderCell>Actions</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell collapsing>
                                    <Checkbox toggle defaultChecked/>
                                </Table.Cell>
                                <Table.Cell>Cell</Table.Cell>
                                <Table.Cell>Cell</Table.Cell>
                                <Table.Cell>Cell</Table.Cell>
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
                            <Table.Row>
                                <Table.Cell collapsing>
                                    <Checkbox toggle defaultChecked/>
                                </Table.Cell>
                                <Table.Cell>Cell</Table.Cell>
                                <Table.Cell>Cell</Table.Cell>
                                <Table.Cell>Cell</Table.Cell>
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
                            <Table.Row>
                                <Table.Cell collapsing>
                                    <Checkbox toggle defaultChecked/>
                                </Table.Cell>
                                <Table.Cell>Cell</Table.Cell>
                                <Table.Cell>Cell</Table.Cell>
                                <Table.Cell>Cell</Table.Cell>
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
                        </Table.Body>
                    </Table>
                </Grid>
            </Container>
            <ShortLinksFooter />
        </Fragment>
    );
}

export default Dashboard;
