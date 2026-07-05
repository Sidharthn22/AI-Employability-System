import "./About.css";

function About() {
  return (
    <div className="about-page">
      <div className="about-container">

        <h1>About AI Employability System</h1>

        <p className="about-intro">
          The AI Employability System is a web application designed to help
          students and job seekers improve their resumes through ATS analysis,
          job-role matching, and personalized career recommendations.
        </p>

        <div className="about-grid">

          <div className="about-card">
            <h2>ATS Resume Checker</h2>

            <p>
              Analyze your resume for Applicant Tracking System (ATS)
              compatibility. Receive an ATS score, section analysis,
              keyword evaluation, and actionable suggestions to improve
              recruiter visibility.
            </p>
          </div>

          <div className="about-card">
            <h2>Job Match Analysis</h2>

            <p>
              Compare your resume with a selected job role to calculate
              the match percentage, identify missing skills, and receive
              personalized recommendations for improving employability.
            </p>
          </div>

          <div className="about-card">
            <h2>Resume Insights</h2>

            <p>
              The system extracts resume information, evaluates professional
              keywords, analyzes resume structure, and provides personalized
              insights using rule-based skill matching and ATS evaluation.
            </p>
          </div>

          <div className="about-card">
            <h2>Project Objective</h2>

            <p>
              This project aims to bridge the gap between students'
              resumes and industry expectations by providing resume
              evaluation, ATS analysis, job-role matching, and
              personalized career recommendations.
            </p>
          </div>

        </div>

        <div className="tech-section">

          <h2>Technologies Used</h2>

          <div className="tech-list">

            <span>React.js</span>

            <span>FastAPI</span>

            <span>Python</span>

            <span>SQLAlchemy</span>

            <span>PostgreSQL</span>

            <span>Docker</span>

            <span>HTML</span>

            <span>CSS</span>

            <span>JavaScript</span>

          </div>

        </div>

      </div>
    </div>
  );
}

export default About;