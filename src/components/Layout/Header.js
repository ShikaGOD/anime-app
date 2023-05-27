import classes from "./Header.module.css";
import Button from "./Button";
import SearchBar from "./SearchBar";
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { logout, login } from "../../store/authSlice";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Користувач авторизований
        dispatch(login({ userId: user.uid }));
      } else {
        // Користувач не авторизований
        dispatch(logout());
      }
      setIsLoading(false);
    });

    // Прибираємо прослуховувач під час знищення компонента
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
            <Link to="/catalog?filter=bypopularity&type=tv&page=1">
              Catalog
            </Link>
          </li>
        </ul>
      </div>
      {location.pathname !== "/" && <SearchBar />}
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
