import React from "react";
//import "../css/Components/footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const footerStyle = {
  position: "absolute",
  bottom: 0,
  width: "100%",
  height: 50,
  backgroundColor: "rgb(214, 214, 214)",
  display: "flex",
  flexFlow: "row nowrap",
  justifyContent: "spaceAround"
};

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <p style={{ width: "33.3%", marginLeft: 10 }}>
        Made with
        <FontAwesomeIcon
          aria-hidden="true"
          title="Made with love!"
          icon="heart"
          style={{ marginLeft: 5 }}
        />
      </p>
      <p style={{ width: "33.3%", textAlign: "center" }}>
        <FontAwesomeIcon icon={["fab", "gitlab"]} size="lg" />
      </p>
      <p style={{ width: "33.3%" }} />
    </footer>
  );
};

export default Footer;
