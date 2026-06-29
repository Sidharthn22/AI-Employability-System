import "./Home.css";
import { useNavigate } from "react-router-dom";
import { FaShieldAlt, FaBullseye, FaChartLine } from "react-icons/fa";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <section className="hero">

        <div className="hero-left">

          <h1>
            Smart Employability
            <br />
            <span>System</span>
          </h1>

          <p>
            Transform your resume into a job-ready profile.
            Get ATS insights, skill-gap analysis, role matching,
            and personalized career recommendations.
          </p>

          <button
            className="hero-btn"
            onClick={() => navigate("/upload")}
          >
            Get Started
          </button>

          <div className="features-row">

            <div className="feature">
              <FaShieldAlt className="feature-icon" />
              <h3>ATS Checker</h3>
              <p>Evaluate resume structure and sections.</p>
            </div>

            <div className="feature">
              <FaBullseye className="feature-icon" />
              <h3>Job Match</h3>
              <p>Match your skills with relevant roles.</p>
            </div>

            <div className="feature">
              <FaChartLine className="feature-icon" />
              <h3>Smart Insights</h3>
              <p>Get personalized recommendations.</p>
            </div>

          </div>

        </div>

        <div className="hero-right">
          <img
            src="/resume-hero.png"
            alt="Resume Illustration"
          />
        </div>

      </section>
      <section className="about-system">

  <h2>Why Use Smart Employability System?</h2>

  <div className="about-grid">

    <div className="about-card">
      <h3>ATS Resume Checker</h3>
      <p>
        Analyze resume structure, identify missing sections,
        and improve ATS compatibility.
      </p>
    </div>

    <div className="about-card">
      <h3>Job Skill Match</h3>
      <p>
        Compare your resume skills with industry job roles
        and calculate match percentage.
      </p>
    </div>

    <div className="about-card">
      <h3>Skill Gap Analysis</h3>
      <p>
        Discover missing skills required for your target role
        and get improvement suggestions.
      </p>
    </div>

    <div className="about-card">
      <h3>Career Recommendations</h3>
      <p>
        Explore alternative job roles that best match your
        current skill set.
      </p>
    </div>

    <div className="about-card">
      <h3>Resume Insights</h3>
      <p>
        Identify strengths, action words, keywords,
        and resume quality indicators.
      </p>
    </div>

    <div className="about-card">
      <h3>Fresher Friendly</h3>
      <p>
        Designed for students and fresh graduates looking
        to improve employability.
      </p>
    </div>

  </div>

</section>
    </div>
    
  );
}

export default Home;