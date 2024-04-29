import "./Login.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";


function Login() {
  const [uD, suD] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [tuD, stuD] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentsCollectionRef = collection(db, "students");
        const teachersCollectionRef = collection(db, "teachers");

        const studentsSnapshot = await getDocs(studentsCollectionRef);
        const teachersSnapshot = await getDocs(teachersCollectionRef);

        const studentsData = studentsSnapshot.docs.map((doc) => doc.data());
        const teachersData = teachersSnapshot.docs.map((doc) => doc.data());

        suD(studentsData);
        stuD(teachersData);
        console.log(tuD);
        console.log(uD);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const NAV=()=>{
    navigate("/admin/login");
  }



  const handleLogin = () => {
    if (!email || !password) {
      setLoginError(true);
      return;
    }

    const studentUser = uD.find(
      (user) => user.Email === email && user.Password === password
    );
    const teacherUser = tuD.find(
      (user) => user.Email === email && user.Password === password
    );

    if (studentUser) {
      localStorage.setItem("authToken", "student");
      localStorage.setItem("userEmail", email);
      navigate("/student");
    } else if (teacherUser) {
      localStorage.setItem("authToken", "teacher");
      localStorage.setItem("userEmail", email);
      navigate("/teacher");
    } else {
      setLoginError(true);
    }
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
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? "Loading..." : "Login"}
              </button>
              <br/><br/>
              <button
                className="form__button"
                id="loginButton"
                onClick={NAV}>
                Admin Login
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