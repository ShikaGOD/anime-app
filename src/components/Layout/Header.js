import classes from "./Header.module.css";
import Button from "./Button";
import SearchBar from "./SearchBar";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { auth } from "../firebase";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const onLogoutHandler = () => {
    dispatch(logout());
    auth
      .signOut()
      .then(() => {
        // Sign-out successful.
        navigate("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <header className={classes.mainHeader}>
      <div>
        <Link to="/">
          <h1>AnimeList</h1>
        </Link>
        <ul className={classes.nav}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/catalog">Catalog</Link>
          </li>
        </ul>
      </div>
      {location.pathname !== "/" && (
        <SearchBar />
      )}
      <div>
        {isLoggedIn ? (
          <>
            <Link to="/my-list">
              <Button>My List</Button>
            </Link>
            <Button onClick={onLogoutHandler}>Sign out</Button>
          </>
        ) : (
          <>
            <Link to="/auth?mode=login">
              <Button>Log in</Button>
            </Link>
            <Link to="/auth?mode=signup">
              <Button>Sign up</Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
