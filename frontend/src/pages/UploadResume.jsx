import { useNavigate } from "react-router-dom";
import { useResume } from "../context/ResumeContext";
import "./UploadResume.css";

function UploadResume() {
  const navigate = useNavigate();

  const { file, setFile } = useResume();

  return (
    <div className="upload-page">

      <div className="upload-container">

        {/* HERO */}

        <div className="upload-hero">

          <div className="hero-dots-left"></div>

          <div className="hero-dots-right"></div>

          <h1>
            Upload Your <span>Resume</span>
          </h1>

          <p>
            Upload your resume once and choose the type of analysis
            you want to perform.
          </p>

        </div>

        

        

        

          {file && (

            <div className="file-card">

              <div className="file-left">

                <div className="file-icon">
                  📑
                </div>

                <div className="file-details">

                  <h3>{file.name}</h3>

                  <p>
                    PDF Resume Successfully Uploaded
                  </p>

                </div>

              </div>

              <div className="file-status">
                ✓
              </div>

            </div>

          )}

        </div>

        {/* FEATURE CARDS */}

        <div className="choice-grid">

          {/* ATS CARD */}

          <div
            className="choice-card ats-card"
          >

            <div className="card-icon">
              📊
            </div>

            <h2>
              ATS Resume Checker
            </h2>

            <p>
              Analyze your resume for ATS compatibility and
              receive professional suggestions to improve
              recruiter visibility.
            </p>

            <ul className="feature-list">

              <li>ATS Compatibility Score</li>

              <li>Resume Structure Analysis</li>

              <li>Professional Keywords</li>

              <li>Section Validation</li>

              <li>Recruiter Suggestions</li>

            </ul>

            <button
              className="card-btn"
              onClick={() => navigate("/ats-checker")}
            >
              Start ATS Check →
            </button>

          </div>

          {/* JOB MATCH CARD */}

          <div
            className="choice-card job-card"
          >

            <div className="card-icon">
              🎯
            </div>

            <h2>
              Job Match
            </h2>

            <p>
              Match your resume with your desired job role
              and discover missing skills with personalized
              recommendations.
            </p>

            <ul className="feature-list">

              <li>Job Match Percentage</li>

              <li>Required Skills</li>

              <li>Missing Skills</li>

              <li>Suitable Roles</li>

              <li>Career Recommendation</li>

            </ul>

            <button
              className="card-btn"
              
              onClick={() => navigate("/job-match")}
            >
              Start Job Match →
            </button>

          </div>

        </div>

      </div>

    
  );
}

export default UploadResume;