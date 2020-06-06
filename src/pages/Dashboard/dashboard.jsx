import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@apollo/react-hooks";
import React, { Fragment, useState, useEffect } from "react";
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
} from "semantic-ui-react";

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
    deleteActive: false,
  });
  const { register, handleSubmit, setValue, watch, reset } = useForm();

  const url = watch("url");
  const name = watch("name");
  const active = watch("active");

  useEffect(() => {
    register({ name: "url", value: "" });
    register({ name: "name", value: "" });
    register({ name: "active", value: false });
  }, [register]);

  const onChange = (_, { name, value }) => {
    setValue(name, value);
  };

  const closeDialog = () => {
    setDialog({
      ...dialog,
      editActive: false,
      createActive: false,
      deleteActive: false,
    });
  };

  const createLinkClearOnClick = () => {
    reset();
    setErrors({});
  };

  const editLinkResetOnClick = (link) => {
    setValue("url", link.url);
    setValue("name", link.name);
    setValue("active", link.active);
    setErrors({});
  };

  const createLinkOnClick = () => {
    createLinkClearOnClick();
    setDialog({
      ...dialog,
      link: {},
      createActive: true,
    });
  };

  const editLinkOnClick = (link) => {
    editLinkResetOnClick(link);
    setDialog({
      ...dialog,
      link,
      editActive: true,
    });
  };

  const deleteLinkOnClick = (link) => {
    setDialog({
      ...dialog,
      link,
      deleteActive: true,
    });
  };

  const createLinkOnSubmit = (values) => {
    createLink({
      update(_, { data: { createLink: linkData } }) {
        data.getLinks.push(linkData);
      },
      variables: values,
    })
      .then(() => {
        closeDialog();
      })
      .catch((err) => {
        setErrors(err.graphQLErrors[0].extensions.exception.errors);
      });
  };

  const editLinkOnSubmit = (values, id) => {
    editLink({
      update(_, { data: { editLink: linkData } }) {
        data.getLinks.push(linkData);
      },
      variables: { ...values, _id: id },
    })
      .then(() => {
        closeDialog();
      })
      .catch((err) => {
        setErrors(err.graphQLErrors[0].extensions.exception.errors);
      });
  };

  const deleteLinkOnSubmit = (id) => {
    deleteLink({
      update(proxy) {
        const data = proxy.readQuery({ query: GET_LINKS });
        data.getLinks = data.getLinks.filter((l) => l._id !== id);
        proxy.writeQuery({ query: GET_LINKS, data });
      },
      variables: { _id: id },
    }).then(() => {
      closeDialog();
    });
  };

  const renderLinkEditDialog = () => {
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
                  label={`Link ${active ? "Enabled" : "Disabled"}`}
                  onClick={() => {
                    setValue("active", !active);
                  }}
                  checked={active}
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
                value={name}
                error={errors.name ? true : false}
              />
              <Form.Input
                fluid
                readOnly
                icon="linkify"
                type="text"
                label="URL"
                placeholder={url}
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
              onClick={handleSubmit((values) => {
                editLinkOnSubmit(values, dialog.link._id);
              })}
            />
          </Fragment>
        }
      />
    );
  };

  const renderLinkDeleteDialog = () => {
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
  };

  const renderLinkCreateDialog = () => {
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
              onClick={handleSubmit(createLinkOnSubmit)}
            />
          </Fragment>
        }
      />
    );
  };

  const renderTableLoader = () => {
    return (
      <Table.Row>
        <Table.Cell colSpan={5}>
          <Segment placeholder>
            <Loader active size="huge" inline="centered" />
          </Segment>
        </Table.Cell>
      </Table.Row>
    );
  };

  const renderTable404 = () => {
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
  };

  const renderTable = () => {
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
              ? data.getLinks.map((link) => (
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
  };

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
