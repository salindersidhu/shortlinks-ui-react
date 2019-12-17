import React, { Fragment, useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
    Icon,
    Table,
    Popup,
    Label,
    Loader,
    Button,
    Header,
    Message,
    Divider,
    Segment
} from 'semantic-ui-react';

import { useForm } from '../../hooks';
import { copyToClipboard, browserifyLink } from '../../utils';
import { PageLayoutStandard, Dialog, MessageList } from '../../components';
import { GET_LINKS, CREATE_LINK, EDIT_LINK, DELETE_LINK } from '../../graphql';

export default function Dashboard() {
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

    function copyLink(shortId) {
        copyToClipboard(`${window.origin}/${shortId}`);
    }

    function renderTableLoader() {
        return (
            <Table.Row>
                <Table.Cell colSpan={5}>
                    <Segment placeholder>
                        <Loader active size='huge' inline='centered'/>
                    </Segment>
                </Table.Cell>
            </Table.Row>
        );
    }

    function renderTable404() {
        return (
            <Table.Row>
                <Table.Cell colSpan={5}>
                    <Segment placeholder>
                        <Header icon>
                            <Icon name='unlinkify'/>
                            No Links Found
                        </Header>
                    </Segment>
                </Table.Cell>
            </Table.Row>
        );
    }

    function renderTable() {
        return (
            <Fragment>
                <Message attached='top'>
                    <Popup inverted content='Add Link' trigger={
                        <Button icon size='small'>
                            <Icon name='plus'/>
                        </Button>
                    }/>
                </Message>
                <Table compact attached celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Status</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>URL</Table.HeaderCell>
                            <Table.HeaderCell>Modified</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            loading ? renderTableLoader() : data && data.getLinks.length > 0 ? data.getLinks.map(link =>
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
                                            <Popup inverted content='Copy' trigger={
                                                <Button icon size='small' onClick={() => {
                                                    copyLink(link.hash);
                                                }}>
                                                    <Icon name='linkify'/>
                                                </Button>
                                            }/>
                                            <Popup inverted content='Edit' trigger={
                                                <Button icon size='small'>
                                                    <Icon name='edit'/>
                                                </Button>
                                            }/>
                                            <Popup inverted content='Delete' trigger={
                                                <Button icon negative size='small'>
                                                    <Icon name='delete'/>
                                                </Button>
                                            }/>
                                        </Button.Group>
                                    </Table.Cell>
                                </Table.Row>
                            ) : renderTable404()
                        }
                    </Table.Body>
                </Table>
            </Fragment>
        );
    }

    return (
        <PageLayoutStandard>
            <Header as='h1'>Dashboard</Header>
            <Divider />
            <Message info>
                <Message.Header>Welcome!</Message.Header>
                <p>You can use this dashboard to view and manage your links.</p>
            </Message>
            {renderTable()}
        </PageLayoutStandard>
    );
}
