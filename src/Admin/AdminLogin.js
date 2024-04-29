import "../Login/Login.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [userData, setUserData] = useState([]);
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();
 
  useEffect(() => {
    fetch(
      "https://script.googleusercontent.com/macros/echo?user_content_key=30nP9Mv9axBo1tnjig79_xO9DgM7sf_sNDD0KH18t36FhyNGC_f5fAUxCFPLKQ7S0-1Gn1XJcuSOUUfmlvugEE81kV5PhH2Im5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnNKViQLgdyz8yhVEUxPPRvnd96PHWgVf2tw1-wnabMOYfRsOhXj3nmxs2QJfoWnO2G1BxpIuWFr1Tn2lk2GPDWmUAUcQaup-ndz9Jw9Md8uu&lib=MzEeILna0Gn7wHA9viCjAnwvNVPVFk1yv"
    )
      .then((response) => response.json())
      .then((data) => {
        setUserData(data.data);
        console.log(userData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleLogin = async () => {
    const user = userData.find(
      (user) => user.Email === email && user.Password === password
    );
    console.log(user);
    if (user) {
      localStorage.setItem("authToken", "admin");
      navigate("/admin");
      console.log("Login successful!");
    }else
    setLoginError(true)
  };
 
  return (
    <div className="loginDiv">
      <center>
        <div className="container">
          <div className="form" id="login">
            <h1 className="form__title">Sreyas</h1>
            <div className="form__input-group">
              <input
                type="text"
                className="form__input"
                autoFocus
                placeholder="Username"
                id="usernameinput"
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form__input-group">
              <input
                type="password"
                className="form__input"
                autoFocus
                placeholder="Password"
                id="passwordInput"
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="padding"></div>          
              <button
                className="form__button"
                id="loginButton"
                onClick={handleLogin}>
                Login
              </button>
            
            </div>
            {loginError && (
              <div className="error">Please wait or Try Again</div>
            )}
          </div>
        </div>
      </center>
    </div>
  );
}

export default Login;
