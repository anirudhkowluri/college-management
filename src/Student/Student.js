import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import './stu.css'
function Student() {
  
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken || authToken !== "student") {
      navigate("/");
    }
  }, [navigate]);
  const [studentData, setStudentData] = useState([]);

  useEffect(() => {
    // Fetch student data based on email ID from local storage
    const userEmail = localStorage.getItem("userEmail");

    const fetchData = async () => {
      const studentsCollectionRef = collection(db, "students");
      const q = query(studentsCollectionRef, where("Email", "==", userEmail));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      if (data.length > 0) {
       
        const sortedMarks = Object.entries(data[0].Grades).sort(
          (a, b) => parseInt(a[0].slice(3)) - parseInt(b[0].slice(3))
        );
        setStudentData({
          marks: sortedMarks,
          fatherEmail: data[0].FatherEmail,
        });
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="container">
    <h2 className="heading">Semester-wise Marks</h2>
    <h4 className="welcome">Welcome {localStorage.getItem("userEmail")}</h4>
    <p className="father-email">Father's Email: {studentData.fatherEmail}</p>
    <div className="button-container">
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
      <div className="link-container">
        <Link to="/notes" className="link">
          Notes
        </Link>
        <Link to="/previouspaper" className="link">
          Question Paper
        </Link>
      </div>
    </div>
    <div className="marks-container">
      {studentData.marks &&
        studentData.marks.map(([semester, marks]) => (
          <div key={semester} className="semester-card">
            <h2 className="semester-heading">{`Semester ${semester}`}</h2>
            <p className="gpa">GPA: {marks.GPA}</p>
            <p className="attendance">Attendance: {marks.Attendance}</p>
          </div>
        ))}
    </div>
    <Link to="" className="visualize-link">
      Visualize
    </Link>
  </div>

  );
}

export default Student;
