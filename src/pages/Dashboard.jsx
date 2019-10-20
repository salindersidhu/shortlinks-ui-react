import React, { Fragment, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import {
    Icon,
    Grid,
    Menu,
    Label,
    Input,
    Table,
    Popup,
    Loader,
    Button,
    Header,
    Message,
    Divider,
    Segment,
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
                <Message floating>
                    <Message.Header>Welcome!</Message.Header>
                    <p>You can use this dashboard to view statistics and manage your links.</p>
                </Message>
                <Grid>
                    <Grid.Column width={8}>
                        <Container textAlign="left">
                            <Button icon secondary labelPosition="left">
                                <Icon name="plus"/> Add Link
                            </Button>
                        </Container>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Container textAlign="right">
                            <Input icon="search" placeholder="Search..." />
                        </Container>
                    </Grid.Column>
                </Grid>
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
                <Table compact striped celled>
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
                                    <Loader active size='large' inline='centered' />
                                </Table.Cell>
                            </Table.Row>
                        ) : (
                            <Fragment>
                                { data && data.getLinks.length > 0 ? data.getLinks.map(link => (
                                    <Table.Row key={link._id}>
                                        <Table.Cell collapsing>
                                            <Label ribbon color={link.active ? 'green' : 'red'}>
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
                                            <Button.Group>
                                                <Popup
                                                    trigger={
                                                        <Button
                                                            icon
                                                            size="small"
                                                            onClick={() => {
                                                                copyLink(link.shortURL);
                                                            }}
                                                        >
                                                            <Icon name='copy' />
                                                        </Button>
                                                    }
                                                    content='Copy Shortened Link'
                                                    inverted
                                                />{' '}
                                                <Popup
                                                    trigger={
                                                        <Button
                                                            icon
                                                            size="small"
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
                                                            negative
                                                            size="small"
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
                                            </Button.Group>
                                        </Table.Cell>
                                    </Table.Row>
                                )) : (
                                    <Table.Row>
                                        <Table.Cell colSpan="5">
                                            <Segment placeholder>
                                                <Header icon>
                                                    <Icon name="unlinkify" />
                                                    No Links found for current user.
                                                </Header>
                                            </Segment>
                                        </Table.Cell>
                                    </Table.Row>
                                )}
                            </Fragment>
                        )}
                    </Table.Body>
                    <Table.Footer fullWidth>
                        <Table.Row>
                            <Table.HeaderCell colSpan="5">
                                <Menu floated="right" pagination>
                                    <Menu.Item as="a" icon>
                                        <Icon name="chevron left" />
                                    </Menu.Item>
                                    <Menu.Item as="a">1</Menu.Item>
                                    <Menu.Item as="a">2</Menu.Item>
                                    <Menu.Item as="a">3</Menu.Item>
                                    <Menu.Item as="a">4</Menu.Item>
                                    <Menu.Item as="a" icon>
                                        <Icon name="chevron right" />
                                    </Menu.Item>
                                </Menu>
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
