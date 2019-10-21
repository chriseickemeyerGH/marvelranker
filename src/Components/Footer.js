import React from "react";
import "../css/Components/footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <footer>
      <a
        className="repoLink"
        href="https://github.com/chriseickemeyerGH/marvelranker"
      >
        <FontAwesomeIcon icon={["fab", "github"]} size="lg" />
      </a>
    </footer>
  );
};

export default Footer;
