import React, { useState } from "react";

import { Box, Container, CssBaseline } from "@material-ui/core";

import { Header, Sidebar, Copyright } from "../../widgets";

import useStyles from "./styles";

function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

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
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}

export default Dashboard;
