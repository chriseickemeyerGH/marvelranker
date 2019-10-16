import React from "react";
import "../css/Components/footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <footer>
      <a
        className="repoLink"
        href="https://gitlab.com/chris_eickemeyer/marvel-ranker"
      >
        <FontAwesomeIcon icon={["fab", "gitlab"]} size="lg" />
      </a>
    </footer>
  );
};

export default Footer;
