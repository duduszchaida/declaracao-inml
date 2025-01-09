const Header = () => {
  return (
    <header>
      <div className="navbar">
        <div className="left">
          <img
            className="image-top-screen-navbar"
            src="https://inml.com.br/pg/wp-content/uploads/2023/01/logo_dourado_100x60-px.png"
            alt="logo-inml"
          />
        </div>
        <div className="right">
          <div className="students-area">
            <a
              className="student-area"
              href="https://inml.memberkit.com.br/"
              style={{textDecoration: "none"}}       
            >
              Área do Aluno
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
