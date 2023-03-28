import classes from "./AuthForm.module.css";
import { useState } from "react";
import { Form, Link, useSearchParams, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { getAuth } from "firebase/auth";

function RegistrationForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get('mode') === 'login';

  const onSubmitHandler = async (e) => {
    e.preventDefault()
   
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          navigate("/auth?mode=login")
          // ...
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          // ..
      });
    }
    const auth = getAuth();
    const user = auth.currentUser;

    const onLoginHandler = (e) => {
      e.preventDefault();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          dispatch(login());
          navigate("/profile");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    };
    

  return (
    <div className={classes.container}>
      <Form method="post" className={classes.form} style={{ marginTop: 100 + "px" }}>
        {!isLogin && (<>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" placeholder="Username" />
        </>
        )}

        <label htmlFor="email">Email:</label>
        <input type="email" 
                id="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required   
                placeholder="Email address" 
        />

        <label htmlFor="password">Password:</label>
        <input type="password" 
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                required 
                placeholder="Password"                                
        />

        {!isLogin && (<>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input type="password" id="confirmPassword" placeholder="Confirm Password" />
        </>
        )}

        {!isLogin ? (
          <button type="submit" onClick={onSubmitHandler}>Sign Up</button>
        ) : (
          <button type="submit" onClick={onLoginHandler}>Login</button>
        )}

        <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
        </Link>
      </Form>
    </div>
  );
}

export default RegistrationForm;
