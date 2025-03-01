import React from "react";
import { Header, Icon } from "semantic-ui-react";

const NotFound = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px", color: "white" }}>
      <Header as="h2" icon>
        Page Not Found
        <Header.Subheader>
          The page you are looking for does not exist.
        </Header.Subheader>
      </Header>
    </div>
  );
};

export default NotFound;
