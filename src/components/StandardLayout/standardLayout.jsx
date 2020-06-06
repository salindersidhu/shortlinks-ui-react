import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { Container } from "semantic-ui-react";

import { PageHeader, PageFooter } from "../../components";

export default function StandardLayout(props) {
  return (
    <Fragment>
      <PageHeader />
      <Container>{props.children}</Container>
      <PageFooter />
    </Fragment>
  );
}

StandardLayout.propTypes = {
  children: PropTypes.array,
};
