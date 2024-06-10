import { useState } from "react";
import { useNavigate } from "react-router";

const NavBar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const navigateToPages = (e: any) => {
    if (e.target.getAttribute("a-key") == 1) navigate("");
    if (e.target.getAttribute("a-key") == 2) navigate("/addVideo");
    if (e.target.getAttribute("a-key") == 3) {
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  return (
    <div className="navbar">
      <div className="navbar-center">Welcome User</div>
      <div className="navbar-buttons">
        <div className="dropdown">
          <i
            className="fa-solid fa-user"
            onClick={toggleDropdown}
            style={{ fontSize: "1.5rem", color: "#1e2496" }}
          />
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <button
                className="dropdown-item"
                onClick={navigateToPages}
                a-key={1}
              >
                <i
                  className="fa-regular fa-user"
                  style={{ fontSize: "1rem", color: "#1e2496" }}
                />
                &nbsp;My Profile
              </button>
              <button
                className="dropdown-item"
                onClick={navigateToPages}
                a-key={2}
              >
                <i className="fa-solid fa-video" style={{ color: "#1e2496" }} />
                &nbsp;Add Video
              </button>
              <button
                className="dropdown-item"
                onClick={navigateToPages}
                a-key={3}
              >
                <i
                  className="fa-solid fa-right-from-bracket"
                  style={{ fontSize: "1rem", color: "#1e2496" }}
                />
                &nbsp;Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
