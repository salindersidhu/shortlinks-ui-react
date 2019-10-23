import React, { Fragment, useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
    Form,
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

import { CREATE_LINK, GET_LINKS, DELETE_LINK } from '../graphql';
import { copyToClipboard } from '../utils';

import { useForm } from '../hooks';
import Dialog from '../components/Dialog';
import ShortLinksHeader from '../components/Header';
import ShortLinksFooter from '../components/Footer';

function Dashboard() {
    const { loading, data } = useQuery(GET_LINKS);
    const [deleteLink] = useMutation(DELETE_LINK);
    const [addLink] = useMutation(CREATE_LINK);
    const [dialog, setDialog] = useState({
        link: {},
        deleteActive: false,
        createActive: false
    });
    const [errors, setErrors] = useState({});
    const { onChange, onSubmit, values } = useForm(createLinkCallback, {
        url: '',
        name: ''
    });

    function createLinkCallback() {
        addLink({
            update(_, { data: { createLink: linkData } }) {
                data.getLinks.push(linkData);
            },
            onError(err) {
                setErrors(err.graphQLErrors[0].extensions.exception.errors);
            },
            variables: values
        });
        closeDialog();
    }

    function closeDialog() {
        setDialog({
            link: {},
            deleteActive: false,
            createActive: false
        });
    }

    function copyLink(shortId) {
        copyToClipboard(`${window.location.href}${shortId}`);
    }

    function clickCreateLink() {
        setDialog({
            link: {},
            createActive: true,
            deleteActive: false
        });
    }

    function clickDeleteLink(link) {
        setDialog({
            link,
            deleteActive: true,
            createActive: false
        });
    }

    function confirmDeleteLink(_id) {
        deleteLink({
            update(proxy) {
                const data = proxy.readQuery({ query: GET_LINKS });
                data.getLinks = data.getLinks.filter(l => l._id !== _id);
                proxy.writeQuery({ query: GET_LINKS, data });
            },
            variables: { _id }
        });
        closeDialog();
    }

    return (
        <Fragment>
            <Dialog
                size="tiny"
                duration={300}
                animation="scale"
                active={dialog.deleteActive}
                onClose={closeDialog}
                header={
                    <Header icon="question circle" content="Delete Link"/>
                }
                content={
                    <Fragment>
                        Are you sure you want to delete "<b>{dialog.link.name}</b>"
                    </Fragment>
                }
                actions={
                    <Fragment>
                        <Button
                            negative
                            onClick={closeDialog}
                        >
                            No
                        </Button>
                        <Button
                            positive
                            content="Yes"
                            icon="checkmark"
                            labelPosition="right"
                            onClick={() => { confirmDeleteLink(dialog.link._id); }}
                        />
                    </Fragment>
                }
            />
            <Dialog
                size="tiny"
                duration={300}
                animation="scale"
                active={dialog.createActive}
                onClose={closeDialog}
                header={
                    <Header icon="plus circle" content="Add Link"/>
                }
                content={
                    <Form
                        size='large'
                        noValidate
                    >
                        <Form.Input
                            fluid
                            name="name"
                            type="text"
                            icon="font"
                            onChange={onChange}
                            value={values.name}
                            error={errors.name ? true : false}
                            iconPosition="left"
                            placeholder="Link Name"
                        />
                        <Form.Input
                            fluid
                            name="url"
                            type="text"
                            icon="linkify"
                            onChange={onChange}
                            value={values.url}
                            error={errors.url ? true : false}
                            iconPosition="left"
                            placeholder="Link URL"
                        />
                    </Form>
                }
                actions={
                    <Fragment>
                        <Button
                            secondary
                        >
                            Clear
                        </Button>
                        <Button
                            positive
                            content="Submit"
                            icon="checkmark"
                            labelPosition="right"
                            onClick={onSubmit}
                        />
                    </Fragment>
                }
            />
            <ShortLinksHeader />
            <Container>
                <Header as="h1">Dashboard</Header>
                <Divider />
                <Message floating>
                    <Message.Header>Welcome!</Message.Header>
                    <p>You can use this dashboard to view statistics and manage your links.</p>
                </Message>
                <Grid>
                    <Grid.Column width={8}>
                        <Container textAlign="left">
                            <Button
                                icon
                                secondary
                                labelPosition="left"
                                onClick={clickCreateLink}
                            >
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
                        <Segment inverted color="blue">
                            <Container textAlign="center">
                                Statistic 1
                            </Container>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment inverted color="green">
                            <Container textAlign="center">
                                Statistic 2
                            </Container>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment inverted color="yellow">
                            <Container textAlign="center">
                                Statistic 3
                            </Container>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment inverted color="red">
                            <Container textAlign="center">
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
                                    <Loader active size="large" inline="centered" />
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
                                                            <Icon name="copy" />
                                                        </Button>
                                                    }
                                                    content="Copy Shortened Link"
                                                    inverted
                                                />
                                                <Popup
                                                    trigger={
                                                        <Button
                                                            icon
                                                            size="small"
                                                        >
                                                            <Icon name="edit" />
                                                        </Button>
                                                    }
                                                    content="Edit"
                                                    inverted
                                                />
                                                <Popup
                                                    trigger={
                                                        <Button
                                                            icon
                                                            negative
                                                            size="small"
                                                            onClick={() => {
                                                                clickDeleteLink(link);
                                                            }}
                                                        >
                                                            <Icon name="delete" />
                                                        </Button>
                                                    }
                                                    content="Delete"
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
