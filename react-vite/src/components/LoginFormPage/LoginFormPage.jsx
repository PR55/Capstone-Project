import { useEffect, useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import "./LoginForm.css";

function LoginFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/");
    }
  };

  const loginDemo = async (e) =>{
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email:'demo@aa.io',
        password:'password',
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/");
    }
  }

  useEffect(()=> {

    const errObj = {}

    if(!email.toLowerCase().match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-]/)){
      errObj.email = 'Not a valid email'
    }

    let splitPass = password.split('')

    if(splitPass.includes(' ')){
      errObj.password = 'Passwords must contain no spaces'
    }
    else if(splitPass.length < 6){
      errObj.password = 'Passwords must be at least 6 characters long'
    }

    setErrors(errObj)

  }, [email, password])


  return (
    <div className="loginFormHolder">
      <h1>Log In</h1>
      {errors.length > 0 &&
        errors.map((message) => <p key={message}>{message}</p>)}
      <form onSubmit={handleSubmit} className="loginForm">
        <label className="labelHolder">
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p className="errors">{errors.email}</p>}
        <label className="labelHolder">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p className="errors">{errors.password}</p>}
        <button className="loginButton" type="submit" disabled={Object.values(errors).length}>Log In</button>
      </form>
      <button onClick={(e) => loginDemo(e)} className="loginButtonDemo">Log In demo user</button>
    </div>
  );
}

export default LoginFormPage;
