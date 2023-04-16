import classes from "./Header.module.css";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { auth } from "../firebase";

function Header() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const onLogoutHandler = () => {
    dispatch(logout());
    auth.signOut().then(() => {
      // Sign-out successful.
          navigate("/");
          console.log("Signed out successfully")
      }).catch((error) => {
        console.log(error);
      });
  };

  return (
    <header className={classes.header}>
      <div>
        <Link to="/">
          <h1>AnimeList</h1>
        </Link>
      </div>
      <div>
        {isLoggedIn ? (
          <>
            <Link to="/profile">
              <Button>My Profile</Button>
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
