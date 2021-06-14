import React, { useState } from "react";

import moment from "moment";
import { useQuery } from "@apollo/react-hooks";
import {
  Box,
  Grid,
  Link,
  Paper,
  Container,
  CssBaseline,
} from "@material-ui/core";

import { Header, Sidebar, Copyright, DataTable } from "../../widgets";

import useStyles from "./styles";
import { GET_LINKS } from "../../graphql";
import { browserifyLink } from "../../utils";

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
