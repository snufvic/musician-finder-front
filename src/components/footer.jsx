function Footer({ icon }) {
  return (
    <footer className="border-top py-3 text-center bg-dark text-light">
      <i className={icon}></i>
      <span> Musician Finder App - Mantis Apps</span>
      <span className="mx-1">&copy;</span>
      <span>2021-{new Date().getFullYear()}</span>
    </footer>
  );
}

export default Footer;
