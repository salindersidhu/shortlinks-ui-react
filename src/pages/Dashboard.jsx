import React, { Fragment, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import {
    Icon,
    Label,
    Table,
    Popup,
    Loader,
    Button,
    Header,
    Message,
    Divider,
    Container
} from 'semantic-ui-react';

import { GET_LINKS } from '../graphql';
import { copyToClipboard } from '../utils';

import Dialog from '../components/Dialog';
import ShortLinksHeader from '../components/Header';
import ShortLinksFooter from '../components/Footer';

function Dashboard() {
    const { loading, data } = useQuery(GET_LINKS);
    const [dialog, setDialog] = useState({
        title: '',
        content: '',
        open: false
    });

    function closeDialog() {
        setDialog({
            title: '',
            content: '',
            open: false
        });
    }

    function copyLink(shortId) {
        copyToClipboard(`${window.location.href}${shortId}`);
    }

    function deleteLink(link) {
        setDialog({
            open: true,
            title: 'Delete Link',
            content: `Are you sure you want to delete "${link.name}"?`
        });
    }

    return (
        <Fragment>
            <Dialog
                size='tiny'
                type='decision'
                open={dialog.open}
                title={dialog.title}
                onClose={closeDialog}
                content={dialog.content}
                onClickNo={closeDialog}
                onClickYes={closeDialog}
            />
            <ShortLinksHeader />
            <Container>
                <Header as='h1'>Dashboard</Header>
                <Divider />
                <Message color='blue'>
                    <Message.Header>Welcome!</Message.Header>
                    <p>You can view dashboard statistics and manage your links.</p>
                </Message>
                {/*
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
                */}
                <Table compact celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Status</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Original Link</Table.HeaderCell>
                            <Table.HeaderCell>Last Modified</Table.HeaderCell>
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
                                                <Label color={link.active ? 'green' : 'red'}>
                                                    {link.active ? 'Active' : 'Disabled'}
                                                </Label>
                                            </Table.Cell>
                                            <Table.Cell>
                                                {link.name}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {link.longURL}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {new Date(parseInt(link.updatedAt)).toLocaleString()}
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Popup
                                                    trigger={
                                                        <Button
                                                            icon
                                                            onClick={() => {
                                                                copyLink(link.shortURL);
                                                            }}
                                                        >
                                                            <Icon name='eye' />
                                                        </Button>
                                                    }
                                                    content='Copy Short Link'
                                                    inverted
                                                />
                                                <Popup
                                                    trigger={
                                                        <Button
                                                            icon
                                                        >
                                                            <Icon name='edit' />
                                                        </Button>
                                                    }
                                                    content='Edit'
                                                    inverted
                                                />
                                                <Popup
                                                    trigger={
                                                        <Button
                                                            icon
                                                            color='red'
                                                            onClick={() => {
                                                                deleteLink(link);
                                                            }}
                                                        >
                                                            <Icon name='delete' />
                                                        </Button>
                                                    }
                                                    content='Delete'
                                                    inverted
                                                />
                                            </Table.Cell>
                                        </Table.Row>
                                    ))
                                }
                            </Fragment>
                        )}
                    </Table.Body>
                    <Table.Footer fullWidth>
                        <Table.Row>
                            <Table.HeaderCell colSpan="5">
                                <Button
                                    icon
                                    floated='right'
                                    labelPosition='left'
                                >
                                    <Icon name='plus' /> Add Link
                                </Button>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
            </Container>
            <ShortLinksFooter />
        </Fragment>
    );
}

export default Dashboard;
