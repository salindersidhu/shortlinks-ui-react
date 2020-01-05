import React, { Fragment, useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
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
  Checkbox
} from "semantic-ui-react";

import { useForm } from "../../hooks";
import { copyToClipboard, browserifyLink } from "../../utils";
import { StandardLayout, Dialog, MessageList } from "../../components";
import { GET_LINKS, CREATE_LINK, EDIT_LINK, DELETE_LINK } from "../../graphql";

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
  const { onChange, onSubmit, values, reset } = useForm(createLinkOnSubmit, {
    url: "",
    name: ""
  });

  function closeDialog() {
    setDialog({
      ...dialog,
      editActive: false,
      createActive: false,
      deleteActive: false
    });
  }

  function createLinkClearOnClick() {
    reset();
    setErrors({});
  }

  function editLinkResetOnClick(link) {
    values.url = link.url;
    values.name = link.name;
    values.active = link.active;
    setErrors({});
  }

  function createLinkOnClick() {
    createLinkClearOnClick();
    setDialog({
      ...dialog,
      link: {},
      createActive: true
    });
  }

  function editLinkOnClick(link) {
    editLinkResetOnClick(link);
    setDialog({
      ...dialog,
      link,
      editActive: true
    });
  }

  function deleteLinkOnClick(link) {
    setDialog({
      ...dialog,
      link,
      deleteActive: true
    });
  }

  function createLinkOnSubmit() {
    createLink({
      update(_, { data: { createLink: linkData } }) {
        data.getLinks.push(linkData);
      },
      variables: values
    })
      .then(() => {
        closeDialog();
      })
      .catch(err => {
        setErrors(err.graphQLErrors[0].extensions.exception.errors);
      });
  }

  function editLinkOnSubmit(_id) {
    editLink({
      update(_, { data: { editLink: linkData } }) {
        data.getLinks.push(linkData);
      },
      variables: { ...values, _id }
    })
      .then(() => {
        closeDialog();
      })
      .catch(err => {
        setErrors(err.graphQLErrors[0].extensions.exception.errors);
      });
  }

  function deleteLinkOnSubmit(_id) {
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

  function renderLinkEditDialog() {
    return (
      <Dialog
        size="tiny"
        animation="fade down"
        open={dialog.editActive}
        onClose={closeDialog}
        header={<Header icon="edit" content="Edit Link" />}
        content={
          <Fragment>
            <MessageList
              error
              itemIcon="warning circle"
              list={Object.values(errors)}
            />
            <Form noValidate>
              <Segment size="large">
                <Checkbox
                  toggle
                  name="active"
                  onChange={onChange}
                  label={`Link ${values.active ? "Enabled" : "Disabled"}`}
                  onClick={() => {
                    values.active = !values.active;
                  }}
                  checked={values.active}
                />
              </Segment>
              <Form.Input
                fluid
                icon="write"
                type="text"
                label="Name"
                iconPosition="left"
                placeholder="Name"
                name="name"
                onChange={onChange}
                value={values.name}
                error={errors.name ? true : false}
              />
              <Form.Input
                fluid
                readOnly
                icon="linkify"
                type="text"
                label="URL"
                placeholder={values.url}
                iconPosition="left"
                value=""
              />
            </Form>
          </Fragment>
        }
        actions={
          <Fragment>
            <Button
              secondary
              content="Reset"
              onClick={() => {
                editLinkResetOnClick(dialog.link);
              }}
            />
            <Button
              positive
              content="Update"
              icon="checkmark"
              labelPosition="right"
              onClick={() => {
                editLinkOnSubmit(dialog.link._id);
              }}
            />
          </Fragment>
        }
      />
    );
  }

  function renderLinkDeleteDialog() {
    return (
      <Dialog
        size="tiny"
        animation="fade down"
        open={dialog.deleteActive}
        onClose={closeDialog}
        header={<Header icon="question circle" content="Delete Link" />}
        content={
          <Fragment>
            Do you want to delete <b>{dialog.link.name}</b>?
          </Fragment>
        }
        actions={
          <Fragment>
            <Button negative content="No" onClick={closeDialog} />
            <Button
              positive
              content="Yes"
              icon="checkmark"
              labelPosition="right"
              onClick={() => {
                deleteLinkOnSubmit(dialog.link._id);
              }}
            />
          </Fragment>
        }
      />
    );
  }

  function renderLinkCreateDialog() {
    return (
      <Dialog
        size="tiny"
        animation="fade down"
        open={dialog.createActive}
        onClose={closeDialog}
        header={<Header icon="edit" content="Add Link" />}
        content={
          <Fragment>
            <MessageList
              error
              itemIcon="warning circle"
              list={Object.values(errors)}
            />
            <Form noValidate>
              <Form.Input
                fluid
                icon="write"
                type="text"
                label="Name"
                iconPosition="left"
                placeholder="Name"
                name="name"
                onChange={onChange}
                value={values.name}
                error={errors.name ? true : false}
              />
              <Form.Input
                fluid
                icon="globe"
                type="text"
                label="URL"
                iconPosition="left"
                placeholder="URL"
                name="url"
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
              content="Clear"
              onClick={createLinkClearOnClick}
            />
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
    );
  }

  function renderTableLoader() {
    return (
      <Table.Row>
        <Table.Cell colSpan={5}>
          <Segment placeholder>
            <Loader active size="huge" inline="centered" />
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
              <Icon name="unlinkify" />
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
        <Message attached="top">
          <Popup
            inverted
            content="Add Link"
            trigger={
              <Button icon size="small" onClick={createLinkOnClick}>
                <Icon name="plus" />
              </Button>
            }
          />
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
            {loading
              ? renderTableLoader()
              : data && data.getLinks.length > 0
              ? data.getLinks.map(link => (
                  <Table.Row key={link._id}>
                    <Table.Cell collapsing>
                      <Label color={link.active ? "green" : "red"}>
                        {link.active ? "Enabled" : "Disabled"}
                      </Label>
                    </Table.Cell>
                    <Table.Cell>{link.name}</Table.Cell>
                    <Table.Cell>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
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
                          content="Copy"
                          trigger={
                            <Button
                              basic
                              icon
                              size="small"
                              onClick={() => {
                                copyToClipboard(
                                  `${window.origin}/${link.hash}`
                                );
                              }}
                            >
                              <Icon name="clone" />
                            </Button>
                          }
                        />
                        <Popup
                          inverted
                          content="Edit"
                          trigger={
                            <Button
                              basic
                              icon
                              size="small"
                              onClick={() => {
                                editLinkOnClick(link);
                              }}
                            >
                              <Icon name="edit" />
                            </Button>
                          }
                        />
                        <Popup
                          inverted
                          content="Delete"
                          trigger={
                            <Button
                              basic
                              icon
                              size="small"
                              onClick={() => {
                                deleteLinkOnClick(link);
                              }}
                            >
                              <Icon name="trash" />
                            </Button>
                          }
                        />
                      </Button.Group>
                    </Table.Cell>
                  </Table.Row>
                ))
              : renderTable404()}
          </Table.Body>
        </Table>
      </Fragment>
    );
  }

  return (
    <StandardLayout>
      {renderLinkEditDialog()}
      {renderLinkCreateDialog()}
      {renderLinkDeleteDialog()}
      <Header as="h1">Dashboard</Header>
      <Divider />
      <Message info>
        <Message.Header>Welcome!</Message.Header>
        <p>You can use this dashboard to view and manage your links.</p>
      </Message>
      {renderTable()}
    </StandardLayout>
  );
}
