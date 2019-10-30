import React, { Fragment, useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
    Form,
    Icon,
    Grid,
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
    Container,
    Pagination
} from 'semantic-ui-react';

import { copyToClipboard, browserifyLink } from '../utils';
import { CREATE_LINK, GET_LINKS, DELETE_LINK } from '../graphql';

import { useForm } from '../hooks';
import Dialog from '../components/Dialog';
import ShortLinksHeader from '../components/Header';
import ShortLinksFooter from '../components/Footer';
import MessageList from '../components/MessageList';

function Dashboard() {
    const [errors, setErrors] = useState({});
    const [addLink] = useMutation(CREATE_LINK);
    const [deleteLink] = useMutation(DELETE_LINK);
    const { loading, data } = useQuery(GET_LINKS);
    const [dialog, setDialog] = useState({
        link: {},
        createActive: false,
        deleteActive: false
    });
    const { onChange, onSubmit, values, reset } = useForm(createLinkCallback, {
        url: '',
        name: ''
    });

    function createLinkCallback() {
        addLink({
            update(_, { data: { createLink: linkData } }) {
                data.getLinks.push(linkData);
            },
            variables: values
        }).then(() => {
            closeDialog();
        }).catch(err => {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        });
    }

    function deleteLinkCallback(_id) {
        deleteLink({
            update(proxy) {
                const data = proxy.readQuery({ query: GET_LINKS });
                data.getLinks = data.getLinks.filter(l => l._id !== _id);
                proxy.writeQuery({ query: GET_LINKS, data });
            },
            variables: { _id }
        }).then(() => {
            closeDialog();
        });
    }

    function copyLink(shortId) {
        copyToClipboard(`${window.location.href}${shortId}`);
    }

    function clearCreateLinkForm() {
        reset();
        setErrors({});
    }

    function closeDialog() {
        clearCreateLinkForm();
        setDialog({
            link: {},
            deleteActive: false,
            createActive: false
        });
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

    function renderLinkDeleteDialog() {
        return <Dialog
            size='tiny'
            animation='scale'
            animationDuration={300}
            active={dialog.deleteActive}
            onClose={closeDialog}
            header={
                <Header icon='question circle' content='Delete Link' />
            }
            content={
                <Fragment>
                    Do you want to delete <b>{dialog.link.name}</b>?
                </Fragment>
            }
            actions={
                <Fragment>
                    <Button negative onClick={closeDialog}>No</Button>
                    <Button
                        positive
                        content='Yes'
                        icon='checkmark'
                        labelPosition='right'
                        onClick={() => {
                            deleteLinkCallback(dialog.link._id);
                        }}
                    />
                </Fragment>
            }
        />;
    }

    function renderLinkCreateDialog() {
        return <Dialog
            size='tiny'
            animation='scale'
            animationDuration={300}
            active={dialog.createActive}
            onClose={closeDialog}
            header={
                <Header icon='plus circle' content='Add Link'/>  
            }
            content={
                <Fragment>
                    <MessageList
                        error
                        list={Object.values(errors)}
                        listItemIcon='warning circle'
                        listItemContentStyles={{ textAlign: 'left' }}
                    />
                    <Form size='large' noValidate>
                        <Form.Input
                            fluid
                            type='text'
                            name='name'
                            placeholder='Name'
                            icon='linkify'
                            iconPosition='left'
                            onChange={onChange}
                            value={values.name}
                            error={errors.name ? true : false}
                        />
                        <Form.Input
                            fluid
                            type='text'
                            name='url'
                            placeholder='URL'
                            icon='globe'
                            iconPosition='left'
                            onChange={onChange}
                            value={values.url}
                            error={errors.url ? true : false}
                        />
                    </Form>
                </Fragment>
            }
            actions={
                <Fragment>
                    <Button
                        secondary
                        onClick={clearCreateLinkForm}
                    >
                        Clear
                    </Button>
                    <Button
                        positive
                        content='Submit'
                        icon='checkmark'
                        labelPosition='right'
                        onClick={onSubmit}
                    />
                </Fragment>
            }
        />;
    }

    function renderDataTableAttached() {
        return <Grid>
            <Grid.Column width={8}>
                <Container textAlign='left'>
                    <Button
                        icon
                        secondary
                        labelPosition='left'
                        onClick={clickCreateLink}
                    >
                        <Icon name='plus'/> Add Link
                    </Button>
                </Container>
            </Grid.Column>
            <Grid.Column width={8}>
                <Container textAlign='right'>
                    <Input icon='search' placeholder='Search...' />
                </Container>
            </Grid.Column>
        </Grid>;
    }

    function renderDataTableHeader() {
        return <Table.Row>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Link</Table.HeaderCell>
            <Table.HeaderCell>Last Modified</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
        </Table.Row>;
    }

    function renderDataTableFooter() {
        return <Table.Row>
            <Table.HeaderCell colSpan='5' textAlign='right'>
                <Pagination
                    size='small'
                    totalPages={3}
                    defaultActivePage={1}
                    firstItem={{
                        icon: true,
                        content: <Icon name='angle double left' />
                    }}
                    lastItem={{
                        icon: true,
                        content: <Icon name='angle double right' />
                    }}
                    prevItem={{
                        icon: true,
                        content: <Icon name='angle left' />
                    }}
                    nextItem={{
                        icon: true,
                        content: <Icon name='angle right' />
                    }}
                    ellipsisItem={{
                        icon: true,
                        content: <Icon name='ellipsis horizontal' />
                    }}
                />
            </Table.HeaderCell>
        </Table.Row>;
    }

    function renderDataTableLoading() {
        return <Table.Row>
            <Table.Cell colSpan={5}>
                <Segment placeholder>
                    <Loader active size='huge' inline='centered' />
                </Segment>
            </Table.Cell>
        </Table.Row>;
    }

    function renderDataTable404() {
        return <Table.Row>
            <Table.Cell colSpan='5'>
                <Segment placeholder>
                    <Header icon>
                        <Icon name='unlinkify' />
                        No Links Found
                    </Header>
                </Segment>
            </Table.Cell>
        </Table.Row>;
    }

    function renderDataTableBody() {
        return loading ? renderDataTableLoading() : data && data.getLinks.length > 0 ? data.getLinks.map(link =>
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
                    <a
                        target='_blank'
                        rel='noopener noreferrer'
                        href={browserifyLink(link.longURL)}
                    >
                        {link.longURL}
                    </a>
                </Table.Cell>
                <Table.Cell>
                    {new Date(parseInt(link.updatedAt)).toLocaleString()}
                </Table.Cell>
                <Table.Cell>
                    <Button.Group>
                        <Popup
                            inverted
                            content='Copy Shortened Link'
                            trigger={
                                <Button
                                    icon
                                    size='small'
                                    onClick={() => {
                                        copyLink(link.shortURL);
                                    }}
                                >
                                    <Icon name='copy' />
                                </Button>
                            }
                        />
                        <Popup
                            inverted
                            content='Edit'
                            trigger={
                                <Button icon size='small'>
                                    <Icon name='edit' />
                                </Button>
                            }
                        />
                        <Popup
                            inverted
                            content='Delete'
                            trigger={
                                <Button
                                    icon
                                    negative
                                    size='small'
                                    onClick={() => {
                                        clickDeleteLink(link);
                                    }}
                                >
                                    <Icon name='delete' />
                                </Button>
                            }
                        />
                    </Button.Group>
                </Table.Cell>
            </Table.Row>
        ) : renderDataTable404();
    }

    function renderDataTable() {
        return <Fragment>
            <Message attached='top'>
                {renderDataTableAttached()}
            </Message>
            <Table compact striped attached stackable>
                <Table.Header>
                    {renderDataTableHeader()}
                </Table.Header>
                <Table.Body>
                    {renderDataTableBody()}
                </Table.Body>
                <Table.Footer fullWidth>
                    {renderDataTableFooter()}
                </Table.Footer>
            </Table>
        </Fragment>;
    }

    return (
        <Fragment>
            <ShortLinksHeader />
            {renderLinkCreateDialog()}
            {renderLinkDeleteDialog()}
            <Container>
                <Header as='h1'>Dashboard</Header>
                <Divider />
                <Message info>
                    <Message.Header>Welcome!</Message.Header>
                    <p>
                        You can use this dashboard to view and manage your links.
                    </p>
                </Message>
                {renderDataTable()}
            </Container>
            <ShortLinksFooter />
        </Fragment>
    );
}

export default Dashboard;
