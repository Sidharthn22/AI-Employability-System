import { useState } from "react";
import "./ATSChecker.css";

function ATSChecker() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const pdfUrl = file ? URL.createObjectURL(file) : "";

  const analyzeResume = async () => {
    if (!file) {
      alert("Please upload a resume.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(
      "http://127.0.0.1:8000/ats-check",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    setResult(data);
    setLoading(false);
  };

  return (
    <div className="ats-wrapper">

      <div className="ats-header">

        <h1>ATS Resume Checker</h1>

        <p>
          Analyze your resume for ATS compatibility,
          formatting, resume quality and professional
          recommendations.
        </p>

      </div>

      <div className="upload-section">

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button onClick={analyzeResume}>
          Analyze Resume
        </button>

      </div>

      {loading && (

        <div className="loading-card">

          Analyzing Resume...

        </div>

      )}

      {result && (

        <div className="ats-dashboard">

          {/* Resume Preview */}

          <div className="resume-card">

            <h2>Resume Preview</h2>

            {file && (

              <iframe
                src={pdfUrl}
                title="Resume Preview"
              />

            )}

          </div>

          {/* ATS Score */}

          <div className="score-card">

            <h2>ATS Score</h2>

            <div className="score-circle">

              <span>{result.ats_score}%</span>

              <small>
                {result.resume_strength}
              </small>

            </div>

            <p className="verdict">

              {result.verdict}

            </p>

          </div>

          {/* Resume Strength */}

          <div className="strength-card">

            <h2>Resume Strength</h2>

            <h1>

              {result.resume_strength}

            </h1>

            <p>

              Overall ATS Compatibility

            </p>

          </div>

          {/* Statistics */}

          <div className="card stats-card">

            <h2>Resume Statistics</h2>

            <div className="stats-grid">

              <div className="stat-card">

                <h4>Pages</h4>

                <span>

                  {result.statistics.pages}

                </span>

              </div>

              <div className="stat-card">

                <h4>Words</h4>

                <span>

                  {result.statistics.words}

                </span>

              </div>

              <div className="stat-card">

                <h4>Characters</h4>

                <span>

                  {result.statistics.characters}

                </span>

              </div>

              <div className="stat-card">

                <h4>Keywords</h4>

                <span>

                  {result.statistics.professional_keywords}

                </span>

              </div>

            </div>

          </div>

          {/* Contact */}

          <div className="card contact-card">

            <h2>Contact Validation</h2>

            {Object.entries(result.contact).map(
              ([key, value]) => (

                <div
                  className="check-row"
                  key={key}
                >

                  <span>{key}</span>

                  <span>

                    {value ? "✅" : "❌"}

                  </span>

                </div>

              )
            )}

          </div>
                    {/* Section Analysis */}

          <div className="card sections-card">

            <h2>Resume Sections</h2>

            {Object.entries(result.sections).map(
              ([key, value]) => (

                <div
                  className="check-row"
                  key={key}
                >

                  <span>{key}</span>

                  <span>
                    {value ? "✅" : "❌"}
                  </span>

                </div>

              )
            )}

          </div>

          {/* Section Scores */}

          <div className="card">

            <h2>Section Scores</h2>

            {Object.entries(result.section_scores).map(
              ([key, value]) => (

                <div
                  className="score-row"
                  key={key}
                >

                  <span>{key}</span>

                  <div className="bar">

                    <div
                      className="fill"
                      style={{
                        width: `${value * 5}%`,
                      }}
                    ></div>

                  </div>

                  <span>{value}</span>

                </div>

              )
            )}

          </div>

          {/* Professional Keywords */}

          <div className="card keywords-card">

            <h2>Professional Keywords</h2>

            <div className="chip-container">

              {result.professional_keywords_found.length > 0 ? (

                result.professional_keywords_found.map(
                  (word, index) => (

                    <span
                      className="chip"
                      key={index}
                    >
                      {word}
                    </span>

                  )
                )

              ) : (

                <p>No professional keywords found.</p>

              )}

            </div>

          </div>

          {/* Strengths */}

          <div className="card">

            <h2>Strengths</h2>

            <ul>

              {result.strengths.length > 0 ? (

                result.strengths.map(
                  (item, index) => (

                    <li key={index}>
                      ✅ {item}
                    </li>

                  )
                )

              ) : (

                <li>No major strengths detected.</li>

              )}

            </ul>

          </div>

          {/* Suggestions */}

          <div className="card suggestions-card">

            <h2>Suggestions</h2>

            <ul>

              {result.suggestions.map(
                (item, index) => (

                  <li key={index}>
                    ⚠ {item}
                  </li>

                )
              )}

            </ul>

          </div>

          {/* Recruiter Summary */}

          <div className="summary-card">

            <h2>Recruiter Summary</h2>

            <p>

              {result.summary}

            </p>

          </div>

        </div>

      )}

    </div>

  );

}

export default ATSChecker;