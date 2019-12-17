import React, { Fragment, useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
    Form,
    Icon,
    Label,
    Table,
    Popup,
    Loader,
    Button,
    Header,
    Message,
    Divider,
    Segment,
    Checkbox,
    Container
} from 'semantic-ui-react';

import { copyToClipboard, browserifyLink } from '../utils';
import { CREATE_LINK, GET_LINKS, EDIT_LINK, DELETE_LINK } from '../graphql';

import { useForm } from '../hooks';
import { Dialog, PageHeader, PageFooter, MessageList } from '../components';

function Dashboard() {
    const [errors, setErrors] = useState({});
    const [createLink] = useMutation(CREATE_LINK);
    const [editLink] = useMutation(EDIT_LINK);
    const [deleteLink] = useMutation(DELETE_LINK);
    const { loading, data } = useQuery(GET_LINKS);
    const [dialog, setDialog] = useState({
        link: {},
        editActive: false,
        createActive: false,
        deleteActive: false
    });
    const { onChange, onSubmit, values, reset } = useForm(createLinkCallback, {
        url: '',
        name: ''
    });

    function createLinkCallback() {
        createLink({
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

    function editLinkCallback(_id) {
        editLink({
            update(_, { data: { editLink: linkData } }) {
                data.getLinks.push(linkData);
            },
            variables: { ...values, _id }
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
        copyToClipboard(`${window.origin}/${shortId}`);
    }

    function clearCreateLinkForm() {
        reset();
        setErrors({});
    }

    function closeDialog() {
        setDialog({
            ...dialog,
            editActive: false,
            deleteActive: false,
            createActive: false
        });
    }

    function clickEditLinkReset(link) {
        values.url = link.url;
        values.name = link.name;
        values.active = link.active;
        setErrors({});
    }

    function clickEditLink(link) {
        clickEditLinkReset(link);
        setDialog({
            ...dialog,
            link,
            editActive: true
        });
    }

    function clickCreateLink() {
        clearCreateLinkForm();
        setDialog({
            ...dialog,
            link: {},
            createActive: true
        });
    }

    function clickDeleteLink(link) {
        setDialog({
            ...dialog,
            link,
            deleteActive: true
        });
    }

    function renderLinkEditDialog() {
        return <Dialog
            size='tiny'
            animation='fade down'
            open={dialog.editActive}
            onClose={closeDialog}
            header={
                <Header icon='edit' content='Edit Link' />
            }
            content={
                <Fragment>
                    <MessageList
                        error
                        itemIcon='warning circle'
                        list={Object.values(errors)}
                    />
                    <Form size='large' noValidate>
                        <Segment size='large'>
                            <Checkbox 
                                toggle
                                name="active"
                                onChange={onChange}
                                label={
                                    `Link ${values.active ? 'Enabled' : 'Disabled'}`
                                }
                                onClick={() => {
                                    values.active = !values.active;
                                }}
                                checked={values.active}
                            />
                        </Segment>
                        <Form.Input
                            fluid
                            type='text'
                            name='name'
                            placeholder='Name'
                            icon='write'
                            iconPosition='left'
                            onChange={onChange}
                            value={values.name}
                            error={errors.name ? true : false}
                        />
                        <Form.Input
                            fluid
                            disabled
                            type='text'
                            icon='linkify'
                            placeholder='URL'
                            iconPosition='left'
                            value={values.url}
                        />
                    </Form>
                </Fragment>
            }
            actions={
                <Fragment>
                    <Button
                        secondary
                        content='Reset'
                        onClick={() => { clickEditLinkReset(dialog.link); }}
                    />
                    <Button
                        positive
                        content='Update'
                        icon='checkmark'
                        labelPosition='right'
                        onClick={() => {
                            editLinkCallback(dialog.link._id);
                        }}
                    />
                </Fragment>
            }
        />;
    }

    function renderLinkDeleteDialog() {
        return <Dialog
            size='tiny'
            animation='fade down'
            open={dialog.deleteActive}
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
                    <Button
                        negative
                        content='No'
                        onClick={closeDialog}
                    />
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
            animation='fade down'
            open={dialog.createActive}
            onClose={closeDialog}
            header={
                <Header icon='edit' content='Add Link'/>  
            }
            content={
                <Fragment>
                    <MessageList
                        error
                        itemIcon='warning circle'
                        list={Object.values(errors)}
                    />
                    <Form size='large' noValidate>
                        <Form.Input
                            fluid
                            type='text'
                            name='name'
                            placeholder='Name'
                            icon='write'
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
                            icon='linkify'
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
                        content='Clear'
                        onClick={clearCreateLinkForm}
                    />
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
        return <Fragment>
            <Popup
                inverted
                content='Add Link'
                trigger={
                    <Button
                        icon
                        size='small'
                        onClick={clickCreateLink}
                    >
                        <Icon name='plus'/>
                    </Button>
                }
            />
        </Fragment>;
    }

    function renderDataTableHeader() {
        return <Table.Row>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Link</Table.HeaderCell>
            <Table.HeaderCell>Updated</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
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
            <Table.Row key={link._id} negative={!link.active}>
                <Table.Cell collapsing>
                    <Label color={link.active ? 'green' : 'red'}>
                        {link.active ? 'Enabled' : 'Disabled'}
                    </Label>
                </Table.Cell>
                <Table.Cell>
                    {link.name}
                </Table.Cell>
                <Table.Cell>
                    <a
                        target='_blank'
                        rel='noopener noreferrer'
                        href={browserifyLink(link.url)}
                    >
                        {link.url}
                    </a>
                </Table.Cell>
                <Table.Cell>
                    {new Date(parseInt(link.updatedAt)).toLocaleString()}
                </Table.Cell>
                <Table.Cell>
                    <Button.Group>
                        <Popup
                            inverted
                            content='Copy'
                            trigger={
                                <Button
                                    icon
                                    size='small'
                                    onClick={() => {
                                        copyLink(link.hash);
                                    }}
                                >
                                    <Icon name='linkify' />
                                </Button>
                            }
                        />
                        <Popup
                            inverted
                            content='Edit'
                            trigger={
                                <Button
                                    icon
                                    size='small'
                                    onClick={() => {
                                        clickEditLink(link);
                                    }}
                                >
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
            <Table compact attached celled>
                <Table.Header>
                    {renderDataTableHeader()}
                </Table.Header>
                <Table.Body>
                    {renderDataTableBody()}
                </Table.Body>
            </Table>
        </Fragment>;
    }

    return (
        <Fragment>
            <PageHeader />
            {renderLinkEditDialog()}
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
            <PageFooter />
        </Fragment>
    );
}

export default Dashboard;
