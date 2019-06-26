import React from "react";
import "../css/Components/footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <footer>
      <p className="marginLeft">
        Made with
        <FontAwesomeIcon
          aria-hidden="true"
          title="Made with love!"
          icon="heart"
          className="footerHeart"
        />
      </p>
      <a
        className="repoLink"
        href="https://gitlab.com/chris_eickemeyer/marvel-ranker"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon icon={["fab", "gitlab"]} size="lg" />
      </a>
    </footer>
  );
};

export default Footer;
