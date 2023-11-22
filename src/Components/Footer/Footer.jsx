import { Box, Button, Container, Link, Typography } from "@mui/material";
import "./Footer.css";
import Logo from "../../img/logo_footer.svg";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

const Footer = () => {
  return (
    <footer className="footer">
      <Container sx={{ paddingTop: 1 }}>
        <Link
          href="/"
          sx={{ display: "inline-block", marginBottom: 2 }}
          underline="hover"
        >
          <img src={Logo} alt="Formula" className="footer_logo" />
        </Link>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body2">
            ©Formula 2023. All Rights Reserved
          </Typography>
          <Button
            variant="text"
            target="_top"
            rel="noopener noreferrer"
            href={`mailto:info@formula.com`}
            startIcon={<EmailOutlinedIcon />}
            style={{ textTransform: "none", color: "#4E5460" }}
          >
            info@formula.com
          </Button>
        </Box>
      </Container>
    </footer>
  );
};

export default Footer;
