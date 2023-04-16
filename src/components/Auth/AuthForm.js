import classes from "./AuthForm.module.css";
import useInput from "../hooks/use-input";
import { useState } from "react";
import { Form, Link, useSearchParams, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";
import { getAuth } from "firebase/auth";

const isNotEmpty = (value) => value.trim() !== '';
const isEmail = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};
const isPassword = (value) => value.length >= 6;

function RegistrationForm() {
  console.log('rerender');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get('mode') === 'login';

  

  const {
    value: usernameValue,
    isValid: usernameIsValid,
    hasError: usernameHasError,
    valueChangeHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
    reset: resetUsername,
  } = useInput(isNotEmpty);

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isEmail);

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(isPassword);

  const {
    value: confirmPasswordValue,
    isValid: confirmPasswordIsValid,
    hasError: confirmPasswordHasError,
    valueChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    reset: resetConfirmPassword,
  } = useInput((value) => value === passwordValue);

  let formIsValid = false;

  if (usernameIsValid && emailIsValid && passwordIsValid && confirmPasswordIsValid) {
    formIsValid = true;
  }


  const onSignUpHandler = async (e) => {
    e.preventDefault()

    if (!formIsValid) {
      return;
    }

    resetUsername();
    resetEmail();
    resetPassword();
    resetConfirmPassword();
   
    await createUserWithEmailAndPassword(auth, emailValue, passwordValue)
      .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          // navigate("/auth?mode=login")
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
      signInWithEmailAndPassword(auth, emailValue, passwordValue)
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

  const usernameClasses = usernameHasError ? `${classes['form-control']} ${classes.invalid}` : classes['form-control'];
  const emailClasses  = emailHasError  ? `${classes['form-control']} ${classes.invalid}` : classes['form-control'];
  const passwordClasses  = passwordHasError  ? `${classes['form-control']} ${classes.invalid}` : classes['form-control'];
  const confirmPasswordClasses = confirmPasswordHasError ? `${classes['form-control']} ${classes.invalid}` : classes['form-control'];

    

  return (
    <div className={classes.container}>
      <Form method="post" className={classes.form} style={{ marginTop: 100 + "px" }}>
        {!isLogin ?
        (<>
          <div className={usernameClasses}>
            <label htmlFor="username">Username:</label>
            <input type="text" 
                  id="username" 
                  placeholder="Username"
                  value={usernameValue}
                  onChange={usernameChangeHandler}
                  onBlur={usernameBlurHandler}
                    />
            {usernameHasError && <p className={classes['error-text']}>Please enter a username.</p>}
          </div>

          <div className={emailClasses}>
            <label htmlFor="email">Email:</label>
            <input type="email" 
                    id="email" 
                    value={emailValue}
                    onChange={emailChangeHandler}
                    onBlur={emailBlurHandler}
                    required   
                    placeholder="Email address" 
            />
            {emailHasError && <p className={classes['error-text']}>Please enter a valid email address.</p>}
          </div>

          <div className={passwordClasses}>
            <label htmlFor="password">Password:</label>
            <input type="password" 
                    id="password"
                    value={passwordValue}
                    onChange={passwordChangeHandler} 
                    onBlur={passwordBlurHandler}
                    required 
                    placeholder="Password"                                
            />
            {passwordHasError && <p className={classes['error-text']}>Password must include at least 6 characters.</p>}
          </div>

          <div className={confirmPasswordClasses}>
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input type="password" 
                    id="confirmPassword" 
                    value={confirmPasswordValue}
                    onChange={confirmPasswordChangeHandler} 
                    onBlur={confirmPasswordBlurHandler}
                    required 
                    placeholder="Confirm Password"
                      />
              {confirmPasswordHasError && <p className={classes['error-text']}>Passwords don`t match.</p>}
          </div>
        </>)  : 
        <>
          <div className={emailClasses}>
              <label htmlFor="email">Email:</label>
              <input type="email" 
                      id="email" 
                      value={emailValue}
                      onChange={emailChangeHandler}
                      onBlur={emailBlurHandler}
                      required   
                      placeholder="Email address" 
              />        
          </div>

            <div className={passwordClasses}>
              <label htmlFor="password">Password:</label>
              <input type="password" 
                      id="password"
                      value={passwordValue}
                      onChange={passwordChangeHandler} 
                      onBlur={passwordBlurHandler}
                      required 
                      placeholder="Password"                                
              />
              {(passwordHasError || emailHasError) && <p className={classes['error-text']}>Wrong password or email.</p>}
            </div>
        </> 
      }


        {!isLogin ? (
          <button disabled={!formIsValid} type="submit" onClick={onSignUpHandler}>Sign Up</button>
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
