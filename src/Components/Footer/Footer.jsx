import { Container, Link } from "@mui/material";
import "./Footer.css";
import Logo from "../../img/logo.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Link href="/" className="footer_link" underline="hover">
          <img src={Logo} alt="Formula" className="footer_logo" />
        </Link>
        footer
      </Container>
    </footer>
  );
};

export default Footer;
