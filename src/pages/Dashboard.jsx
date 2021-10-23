import React, { useState } from "react";
import moment from "moment";
import { Box, Container, CssBaseline, Grid, Link, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useQuery } from "@apollo/react-hooks";

import { browserifyLink } from "../utils";
import { Copyright, DataTable, Header, Sidebar } from "../widgets";
import { GET_LINKS } from "../graphql";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
}));

function Dashboard() {
  const classes = useStyles();

  const [open, setOpen] = useState(true);
  const { data } = useQuery(GET_LINKS);

  const TABLE_COLS = [
    {
      id: "active",
      label: "Status",
      render: (row) => (row.active ? "Enabled" : "Disabled"),
    },
    { id: "name", label: "Name" },
    {
      id: "url",
      label: "Original URL",
      render: (row) => (
        <Link target="_blank" rel="noopener" href={browserifyLink(row.url)}>
          {row.url}
        </Link>
      ),
    },
    {
      id: "updatedAt",
      label: "Date Modified",
      render: (row) => moment(parseInt(row.updatedAt)).format("YYYY-MM-DD"),
    },
  ];

  const handleDrawerOpen = () => setOpen(true);

  const handleDrawerClose = () => setOpen(false);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header isDrawerOpen={open} onOpenDrawer={handleDrawerOpen} />
      <Sidebar isDrawerOpen={open} onCloseDrawer={handleDrawerClose} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <DataTable
                  title="My Links"
                  cols={TABLE_COLS}
                  rows={data ? data.getLinks : []}
                />
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}

export default Dashboard;
