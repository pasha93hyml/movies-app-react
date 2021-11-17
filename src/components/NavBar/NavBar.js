import "./NavBar.css";

const NavBar = () => {
  return (
    <>
      <div className="topnav">
        <span>Movies App</span>
        <a className="active" href="#home">
          Home
        </a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
        <div className="search-container">
          <form action="/action_page.php">
            <input type="text" placeholder="Search.." name="search" />
            <button type="submit">
              <i className="fa fa-search"></i>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default NavBar;
