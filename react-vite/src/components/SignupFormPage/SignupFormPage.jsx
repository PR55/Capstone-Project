import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { thunkSignup } from "../../redux/session";

function SignupFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/");
    }
  };

  useEffect(()=>{
    const errObj = {}

    if(!email.toLowerCase().match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-]/)){
      errObj.email = 'Not a valid email'
    }

    let splitUser = username.split('')

    if(splitUser.includes(' ')){
      errObj.username = 'Usernames contain no spaces'
    }else if(splitUser.length < 4){
      errObj.username = 'Usernames must be at least 4 characters long'
    }else if (splitUser.length > 40){
      errObj.username = 'Usernames have a max of 40 characters'
    }

    let splitPass = password.split('')

    if(splitPass.includes(' ')){
      errObj.password = 'Passwords contain no spaces'
    }
    else if(splitPass.length < 6){
      errObj.password = 'Passwords must be at least 6 characters long'
    }

    if(password != confirmPassword){
      errObj.confirmPassword = 'Password and Confirm Password must match'
    }

    setErrors(errObj)
  },[email,password,username,confirmPassword])

  return (
    <div className="loginFormHolder">
      <h1>Sign Up</h1>
      {errors.server && <p>{errors.server}</p>}
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
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p className="errors">{errors.username}</p>}
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
        <label className="labelHolder">
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p className="errors">{errors.confirmPassword}</p>}
        <button className='loginButton' type="submit" disabled={Object.values(errors).length}>Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormPage;
