import { Container, Link } from "@mui/material";
import Logo from "../../img/logo.svg";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <Container>
        <Link href="/" className="header_link" underline="hover">
          <img src={Logo} alt="Formula" className="header_logo" />
        </Link>
      </Container>
    </header>
  );
};

export default Header;
