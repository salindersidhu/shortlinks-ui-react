import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import React, { useState, useEffect } from "react";
import { Grid, Loader, Container } from "semantic-ui-react";

import "./linkRedirect.scss";
import { NotFound } from "../";
import { browserifyLink } from "../../utils";
import { GET_LINK_URL } from "../../graphql";

export default function LinkRedirect() {
  const { hash } = useParams();
  const [url, setUrl] = useState("");
  const { loading, data, error } = useQuery(GET_LINK_URL, {
    variables: { hash }
  });

  useEffect(() => {
    if (!loading && !error) {
      // Obtain link with matching hash
      const { getLinkURL: linkURL } = data;
      if (linkURL) {
        // Browserify link and redirect
        setUrl(browserifyLink(linkURL));
        window.location.replace(url);
      }
    }
  }, [loading, error, data, hash, url]);

  function renderLoad() {
    return <Loader active size="massive" inline="centered" />;
  }

  return (
    <Container>
      <Grid verticalAlign="middle" className="link-grid">
        <Grid.Column>
          {loading ? renderLoad() : url ? renderLoad() : <NotFound />}
        </Grid.Column>
      </Grid>
    </Container>
  );
}
