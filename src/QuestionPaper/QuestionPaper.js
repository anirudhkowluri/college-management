import React, { useState, useEffect, useRef } from "react";
import ReactToPrint from "react-to-print";
import pdfMake from "pdfmake/build/pdfmake";
import './qr.css'

function QuestionPaper() {
  const [sub1Questions, setSub1Questions] = useState([]);
  const [sub2Questions, setSub2Questions] = useState([]);
  const [sub3Questions, setSub3Questions] = useState([]);
  const [sub4Questions, setSub4Questions] = useState([]);
  const [sub5Questions, setSub5Questions] = useState([]);
  const [sub6Questions, setSub6Questions] = useState([]);
  const [sub7Questions, setSub7Questions] = useState([]);
  const [waiting,setWaiting]=useState(true);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [questions, setQuestions] = useState([]);
  const [submittedQuestions, setSubmittedQuestions] = useState([]);
  const componentRef = useRef();



  useEffect(() => {
    const fetchData = async () => {
      try {
        const sub1Response = await fetch("https://script.googleusercontent.com/macros/echo?user_content_key=i6OHPRTPrw1m_J7XZtwrGqMRZhJhHcxsFHAiLW-4DUc0wshNeqk2eijM6BxNfsnbrG3godBBtYu8XgQP1tbHglo9y0_FCwoqm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnA4zwiUb8OAlRvyHr14x-uNy7TpJEiNc2y-z8PEta5vh8p0yGB8S7Wj6w5f8RVtZmolJQhYrT6O3dqyvYUWxWVn6DT740wPkog&lib=M4uKqzUKBqtZTJrGBFYzvzgvNVPVFk1yv");
        const sub1Data = await sub1Response.json();
        setSub1Questions(sub1Data.data);

        const sub2Response = await fetch("https://script.googleusercontent.com/macros/echo?user_content_key=FyFo9x5guwWN-JlrvuelJ4sELKjbSmqVHWWkrAEsTkf6fow2FLXMS2yqKIVZxufXUP7Q4xDPIoHywdsVd2ms1aeCEIN29QjIm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnNZ8bOttv-5BEc_2Ks89z_sjgSbSpVaXWlsbRetqGSiq6vWM8FdNJL358nn8Fl9aP2AofdG39JbsTYRS0rp65nb3noDGt1ohidz9Jw9Md8uu&lib=M1NPUlIbPAJBkJhz7oJuDtwvNVPVFk1yv");
        const sub2Data = await sub2Response.json();
        setSub2Questions(sub2Data.data);

        const sub3Response = await fetch("https://script.google.com/macros/s/AKfycbwFoieHkLu3rvDdMSKt468OfeGi0Aq2PzCiHBv66NhCpyNlbkzGspGrNU5BmXZQ6ITUqw/exec");
        const sub3Data = await sub3Response.json();
        setSub3Questions(sub3Data.data);

        const sub4Response=await fetch('https://script.googleusercontent.com/macros/echo?user_content_key=9MufU-ZGvkcKo-hv989SnTtf3Pt1mFT0SSxOsPSpOv--Y_OCFGE4P2uDjxidOkQC7SeRgJA_kJjdvKCHtDrYJdqu5v2CLejDm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnMIvkiz5mTTxqk9-caFrJzU-glZeyK2TAoP1E9lPm6IQUtb4b_hSEpeWfmymHDy3Qy1IaES3osFwrKNni1EUGVLqgRNgpOKiyw&lib=MBEZQH9ORa1vP5QhCAJ5qtinJpr_g_Fc_')
        const sub4Data = await sub4Response.json();
        setSub4Questions(sub4Data.data);

        const sub5Response=await fetch('https://script.google.com/macros/s/AKfycbzj7TuyqnjOIMIRXPid6lM7VUpM2w5nVlgZQRMI1tDUFF8J8LNIRDVNob15WZu45mDH7A/exec')
        const sub5Data = await sub5Response.json();
        setSub5Questions(sub5Data.data);

        const sub6Response=await fetch('https://script.google.com/macros/s/AKfycbwFbs6u-fxpiimGA54i1u8yz50Meq5v2ZyJechaw9Fvvr9bIwcuwkKCbm2s1pYxLbFs/exec')
        const sub6Data = await sub6Response.json();
        setSub6Questions(sub6Data.data);

        const sub7Response=await fetch('https://script.google.com/macros/s/AKfycbzuSoKlEiu6OI-VhUCgQ7TCUPFzWPvRBNUDZALLgQvU24y5UAGM5L2svRax3OoQ71iswA/exec')
        const sub7Data = await sub7Response.json();
        setSub7Questions(sub7Data.data);
        setWaiting(false);
     
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedSubject === "NNDL") {
      setQuestions(sub1Questions);
    } else if (selectedSubject === "RL") {
      setQuestions(sub2Questions);
    } else if (selectedSubject === "ADHOC") {
      setQuestions(sub3Questions);
    }
    else if (selectedSubject === "CLOUD") {
      setQuestions(sub4Questions);
    }
    else if (selectedSubject === "SEMANTIC-WEB") {
      setQuestions(sub5Questions);
    }
    else if (selectedSubject === "ORGANIZATIONAL-BEHAVIOR") {
      setQuestions(sub6Questions);
    }
    else if (selectedSubject === "ENVIRONMENTAL-IMPACT") {
      setQuestions(sub7Questions);
    }

   
  }, [selectedSubject, sub1Questions, sub2Questions, sub3Questions,sub4Questions,sub5Questions,sub6Questions,sub7Questions]);

  // Helper function to shuffle an array
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleSubmission = () => {
    // Check for duplicate questions by ID before adding to submittedQuestions
    const uniqueQuestions = questions.filter(
      (q1) =>
        !submittedQuestions.some(
          (q2) => q2.Id === q1.Id && q2.Marks === q1.Marks
        )
    );

    // Filter questions based on the desired distribution
    const desiredQuestionDistribution = {
      2: 1,
      3: 1,
      5: 4,
    };
    const updatedQuestions = uniqueQuestions.filter((question) => {
      const { Marks } = question;
      return desiredQuestionDistribution[Marks] > 0;
    });

    // Select questions based on the desired distribution
    Object.entries(desiredQuestionDistribution).forEach(([marks, count]) => {
      for (let i = 0; i < count; i++) {
        const selectedQuestion = updatedQuestions.find(
          (question) => question.Marks === parseInt(marks)
        );
        if (selectedQuestion) {
          submittedQuestions.push(selectedQuestion);
          updatedQuestions.splice(updatedQuestions.indexOf(selectedQuestion), 1);
        }
      }
    });

    setQuestions([]);
  };

  const generatePdf = () => {
    const questionsTable = {
      table: {
        body: submittedQuestions.map((question, index) => [
          { text: question.Question, style: "question" },
          { text: question.Marks.toString(), style: "marks" },
        ]),
      },
      styles: {
        question: { bold: true, fontSize: 14, margin: 10, padding: 14 },
        marks: { fontSize: 14, margin: 10, padding: 14 },
      },
    };

    const pdfDoc = pdfMake.createPdf(questionsTable);
    // pdfDoc.download("question-paper.pdf");
  };

  const handleClear = () => {
    setSelectedSubject("");
    setQuestions([]);
    setSubmittedQuestions([]);
  };
  return (
    <div>{waiting && <div>Loading...</div>}
      {!waiting &&
      <div>
      <label>Subject</label>
      <select
        value={selectedSubject}
        onChange={(e) => setSelectedSubject(e.target.value)}
      >
        <option value="">Select Subject</option>
        <option value="NNDL">NNDL</option>
        <option value="RL">RL</option>
        <option value="ADHOC">ADHOC</option>
        <option value="CLOUD">CLOUD</option>
        <option value="SEMANTIC-WEB">SEMANTIC-WEB</option>
        <option value="ORGANIZATIONAL-BEHAVIOR">ORGANIZATIONAL-BEHAVIOR</option>
        <option value="ENVIRONMENTAL-IMPACT">ENVIRONMENTAL-IMPACT</option>
      </select>
      <br />
      <button onClick={handleSubmission}>Submit</button>
      <button onClick={handleClear}>Clear</button>
      <ReactToPrint
        trigger={() => <button>Print PDF</button>}
        content={() => componentRef.current}
        onAfterPrint={generatePdf}
      />
      <br />
      <div ref={componentRef}>
        {submittedQuestions.length === 0 ? (
          <p>No submitted questions yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Question</th>
                <th>Marks</th>
              </tr>
            </thead>
            <tbody>
              {submittedQuestions.map((question, index) => (
                <tr key={index}>
                  <td>{question.Question}</td>
                  <td>{question.Marks}</td>
</tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
}
    </div>
  );
}

export default QuestionPaper;