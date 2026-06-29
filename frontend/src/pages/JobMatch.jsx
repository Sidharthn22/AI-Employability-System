import { useEffect, useState } from "react";
import "./JobMatch.css";

function JobMatch() {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const pdfUrl = file ? URL.createObjectURL(file) : "";

  useEffect(() => {
    fetch("http://127.0.0.1:8000/roles")
      .then((res) => res.json())
      .then((data) => {
        setRoles(data);
        if (data.length > 0) {
          setSelectedRole(data[0]);
        }
      });
  }, []);

  const analyzeResume = async () => {
    if (!file) {
      alert("Please select a resume");
      return;
    }

    const formData = new FormData();

    formData.append("file", file);

    const response = await fetch(
      `http://127.0.0.1:8000/analyze-resume-role?role=${selectedRole}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    setResult(data);
  };

  return (
    <div className="jobmatch-wrapper">
    <div className="container">
      <div className="analyze-box">

  <h1>AI Employability System</h1>

  <p className="subtitle">
    Upload your resume and choose your target role.
  </p>

  <div className="upload-section">

    <label className="file-btn">

      Choose Resume

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

    </label>

    {file && (
      <span className="file-name">
        📄 {file.name}
      </span>
    )}

    <select
      value={selectedRole}
      onChange={(e) => setSelectedRole(e.target.value)}
    >
      {roles.map((role, index) => (
        <option key={index} value={role}>
          {role}
        </option>
      ))}
    </select>

    <button onClick={analyzeResume}>
      Analyze Resume
    </button>

  </div>

</div>

      {result && (
<div className="dashboard">

  {/* LEFT PANEL */}

  <div className="left-panel">

    <div className="resume-preview-card">

      <h3>Resume Preview</h3>

      {file && (
        <iframe
            src={pdfUrl}
            title="Resume Preview"
        />
      )}

    </div>

    <div className="score-card">

      <h3>Job Match Score</h3>

      <div className="score-circle">
        <span>{result.match_percentage}%</span>
        <small>Great Match</small>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${result.match_percentage}%`,
          }}
        ></div>
      </div>

    </div>

    <div className="stats-grid">

      <div className="stat-box">
        <h4>Skills Found</h4>
        <span>{result.resume_skills.length}</span>
      </div>

      <div className="stat-box">
        <h4>Required Skills</h4>
        <span>{result.required_skills.length}</span>
      </div>

      <div className="stat-box">
        <h4>Matched Skills</h4>
        <span>
          {result.required_skills.length -
            result.missing_skills.length}
        </span>
      </div>

      <div className="stat-box">
        <h4>Missing Skills</h4>
        <span>{result.missing_skills.length}</span>
      </div>

    </div>

    <div className="target-role">
      <h3>Target Role</h3>
      <p>{selectedRole}</p>
    </div>

  </div>

  {/* RIGHT PANEL */}

  <div className="right-panel">

    <h2>{selectedRole} Analysis</h2>

    <div className="upload-card">
      <div>
        <h3>Uploaded Resume</h3>
        <p>{file?.name}</p>
      </div>

      <span className="success-badge">
        Successfully Uploaded
      </span>
    </div>

    <div className="skills-grid">

      <div className="detail-card green">
        <h3>Resume Skills</h3>

        {result.resume_skills.map((skill, index) => (
          <p key={index}>✓ {skill}</p>
        ))}
      </div>

      <div className="detail-card blue">
        <h3>Required Skills</h3>

        {result.required_skills.map((skill, index) => (
          <p key={index}>• {skill}</p>
        ))}
      </div>

      <div className="detail-card red">
        <h3>Missing Skills</h3>

        {result.missing_skills.map((skill, index) => (
          <p key={index}>✕ {skill}</p>
        ))}
      </div>

    </div>

    <div className="bottom-grid">

      <div className="detail-card">

        <h3>Top Matching Roles</h3>

        {result.suitable_roles.map((role, index) => (
          <div className="role-bar" key={index}>

            <span>{role.role}</span>

            <div className="bar">
              <div
                className="fill"
                style={{
                  width: `${role.match_percentage}%`,
                }}
              ></div>
            </div>

            <span>{role.match_percentage}%</span>

          </div>
        ))}

      </div>

      <div className="detail-card">

        <h3>Recommendation</h3>

        <p>{result.recommendation}</p>

      </div>

    </div>

    <div className="recommendation-card">

  

  <img
    src="/floating-image.png"
    alt="Recommendation"
    className="recommendation-image"
  />

</div>

  </div>

</div>
)}
 </div>
  </div>
);
}

export default JobMatch;