from pydantic import BaseModel
from fastapi import FastAPI, UploadFile, File
from database import SessionLocal
from models import UserDB, CandidateDB, RoleDB, RoleSkillDB
from fastapi.middleware.cors import CORSMiddleware
import PyPDF2
import re

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
         "http://localhost:5173",
         "https://ai-employability-system.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# Pydantic Models
# -------------------------

class User(BaseModel):
    name: str
    email: str


class Candidate(BaseModel):
    name: str
    email: str
    skills: str


class JobMatchRequest(BaseModel):
    role: str
    resume_skills: list[str]

class AnalyzeRequest(BaseModel):
    role: str


# -------------------------
# Home
# -------------------------
from database import SessionLocal
from models import RoleDB

@app.on_event("startup")
def load_roles():
    import insert_roles
    db = SessionLocal()

    if db.query(RoleDB).count() == 0:
        roles = [
            "Python Developer",
            "React Developer",
            "Full Stack Developer",
            "Java Developer",
            "Data Analyst",
            "Data Scientist",
            "DevOps Engineer",
            "Cloud Engineer",
            "Cybersecurity Analyst",
            "AI Engineer",
            "Electrical Engineer",
            "Mechanical Engineer",
            "Civil Engineer",
            "Chemical Engineer",
            "Biotechnologist"
        ]

        for role in roles:
            db.add(RoleDB(role_name=role))

        db.commit()

    db.close()
@app.get("/")
def home():
    return {"message": "AI Employability System Running"}


# -------------------------
# User APIs
# -------------------------

@app.post("/register")
def register(user: User):

    db = SessionLocal()

    new_user = UserDB(
        name=user.name,
        email=user.email
    )

    db.add(new_user)
    db.commit()

    return {
        "message": "User Registered",
        "user": user
    }


@app.get("/users")
def get_users():

    db = SessionLocal()

    users = db.query(UserDB).all()

    return users


# -------------------------
# Candidate APIs
# -------------------------

@app.post("/candidate")
def add_candidate(candidate: Candidate):

    db = SessionLocal()

    new_candidate = CandidateDB(
        name=candidate.name,
        email=candidate.email,
        skills=candidate.skills
    )

    db.add(new_candidate)
    db.commit()

    return {
        "message": "Candidate Added"
    }


@app.get("/candidates")
def get_candidates():

    db = SessionLocal()

    candidates = db.query(CandidateDB).all()

    return candidates

@app.get("/roles")
def get_roles():

    db = SessionLocal()

    roles = db.query(RoleDB).all()

    return [
        role.role_name
        for role in roles
    ]  
# -------------------------
# Resume Upload API
# -------------------------

@app.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):

    pdf_reader = PyPDF2.PdfReader(file.file)

    text = ""

    for page in pdf_reader.pages:
        text += page.extract_text()

    skill_list = [
        "Python",
        "JavaScript",
        "React",
        "FastAPI",
        "MySQL",
        "SQL",
        "HTML",
        "CSS",
        "Git",
        "GitHub"
    ]

    found_skills = []

    for skill in skill_list:
        if skill.lower() in text.lower():
            found_skills.append(skill)

    score = len(found_skills) * 10

    if score > 100:
        score = 100

    required_skills = [
        "Python",
        "SQL",
        "React",
        "FastAPI",
        "Docker",
        "AWS"
    ]

    missing_skills = []

    for skill in required_skills:
        if skill not in found_skills:
            missing_skills.append(skill)

    return {
        "skills": found_skills,
        "resume_score": score,
        "missing_skills": missing_skills,
        "recommendation": f"Learn {', '.join(missing_skills)} to improve employability."
    }


# -------------------------
# Job Match API
# -------------------------

@app.post("/job-match")
def job_match(data: JobMatchRequest):

    job_roles = {
        "Python Developer": [
            "Python",
            "FastAPI",
            "MySQL",
            "Docker",
            "AWS"
        ],

        "React Developer": [
            "React",
            "JavaScript",
            "HTML",
            "CSS",
            "Git"
        ]
    }

    required_skills = job_roles.get(data.role, [])

    matched = []
    missing = []

    for skill in required_skills:

        if skill in data.resume_skills:
            matched.append(skill)
        else:
            missing.append(skill)

    match_percentage = 0

    if len(required_skills) > 0:
        match_percentage = int(
            (len(matched) / len(required_skills)) * 100
        )

    return {
        "role": data.role,
        "match_percentage": match_percentage,
        "matched_skills": matched,
        "missing_skills": missing
    }

@app.post("/analyze-role")
def analyze_role(data: AnalyzeRequest):

    job_roles = {
        "Python Developer": [
            "Python",
            "FastAPI",
            "MySQL",
            "Docker",
            "AWS"
        ],

        "React Developer": [
            "React",
            "JavaScript",
            "HTML",
            "CSS",
            "Git"
        ]
    }

    return {
        "role": data.role,
        "required_skills": job_roles.get(data.role, [])
    }
@app.post("/analyze-resume-role")
async def analyze_resume_role(
    file: UploadFile = File(...),
    role: str = "Python Developer"
):

    pdf_reader = PyPDF2.PdfReader(file.file)

    text = ""

    for page in pdf_reader.pages:
        text += page.extract_text()

    skill_list = [
        "Python",
        "JavaScript",
        "React",
        "FastAPI",
        "MySQL",
        "SQL",
        "HTML",
        "CSS",
        "Git",
        "GitHub",
        "Docker",
        "AWS"
    ]

    found_skills = []

    for skill in skill_list:
        if skill.lower() in text.lower():
            found_skills.append(skill)

    db = SessionLocal()

    role_data = db.query(RoleDB).filter(
        RoleDB.role_name == role
    ).first()

    required_skills = []

    if role_data:

        skills = db.query(RoleSkillDB).filter(
            RoleSkillDB.role_id == role_data.id
        ).all()

        required_skills = [skill.skill for skill in skills]

    matched_skills = []
    missing_skills = []

    for skill in required_skills:

        if skill in found_skills:
            matched_skills.append(skill)
        else:
            missing_skills.append(skill)

    match_percentage = 0

    if len(required_skills) > 0:
        match_percentage = int(
            (len(matched_skills) / len(required_skills)) * 100
        )

    # -------------------------
    # Top 3 Recommended Roles
    # -------------------------

    all_roles = db.query(RoleDB).all()

    recommended_roles = []

    for db_role in all_roles:

        role_skills = db.query(RoleSkillDB).filter(
            RoleSkillDB.role_id == db_role.id
        ).all()

        role_skill_names = [
            skill.skill for skill in role_skills
        ]

        if len(role_skill_names) == 0:
            continue

        matched_count = 0

        for skill in role_skill_names:
            if skill in found_skills:
                matched_count += 1

        role_match_percentage = int(
            (matched_count / len(role_skill_names)) * 100
        )

        recommended_roles.append({
            "role": db_role.role_name,
            "match_percentage": role_match_percentage
        })

    recommended_roles = sorted(
        recommended_roles,
        key=lambda x: x["match_percentage"],
        reverse=True
    )

    recommended_roles = recommended_roles[:3]

    return {
        "role": role,
        "resume_skills": found_skills,
        "required_skills": required_skills,
        "match_percentage": match_percentage,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "suitable_roles": recommended_roles,
       "recommendation": f"To improve your suitability for {role} roles, learn {', '.join(missing_skills)}."}
@app.post("/ats-check")
async def ats_check(file: UploadFile = File(...)):

    pdf_reader = PyPDF2.PdfReader(file.file)

    text = ""

    for page in pdf_reader.pages:
        page_text = page.extract_text()

        if page_text:
            text += page_text

    text_lower = text.lower()
    # -------------------------
    # Resume Statistics
    # -------------------------

    page_count = len(pdf_reader.pages)

    word_count = len(text.split())

    character_count = len(text)
    ats_score = 0

    strengths = []
    suggestions = []

    # -------------------------
    # Section Checks
    # -------------------------

    contact_found = "@" in text
    education_found = "education" in text_lower
    skills_found = "skills" in text_lower
    projects_found = "project" in text_lower
    experience_found = "experience" in text_lower

    certification_found = (
        "certificate" in text_lower
        or "certification" in text_lower
    )

    sections = {
        "Contact Information": contact_found,
        "Education": education_found,
        "Skills": skills_found,
        "Projects": projects_found,
        "Experience": experience_found,
        "Certifications": certification_found
    }
            # -------------------------
        # Contact Validation
        # -------------------------

    email_found = bool(
        re.search(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}",
        text
            )
        )

    phone_found = bool(
            re.search(
                r"\b\d{10}\b",
                text
            )
        )

    linkedin_found = "linkedin" in text_lower

    github_found = "github" in text_lower

    portfolio_found = ("portfolio" in text_lower
            or "https://" in text_lower
            or "http://" in text_lower
        )

    contact = {
            "email": email_found,
            "phone": phone_found,
            "linkedin": linkedin_found,
            "github": github_found,
            "portfolio": portfolio_found
        }
    if contact_found:
        ats_score += 10
    else:
        suggestions.append("Add contact information")

    if education_found:
        ats_score += 15
    else:
        suggestions.append("Add education section")

    if skills_found:
        ats_score += 15
    else:
        suggestions.append("Add skills section")

    if projects_found:
        ats_score += 15
        strengths.append("Strong project section")
    else:
        suggestions.append("Add projects section")

    if experience_found:
        ats_score += 15
    else:
        suggestions.append("Add experience section")

    if certification_found:
        ats_score += 10
    else:
        suggestions.append("Add certifications section")

        # -------------------------
        # Action Words
        # -------------------------

    # Professional Keywords

    keywords = [
        "developed",
        "built",
        "designed",
        "implemented",
        "created",
        "managed",
        "led",
        "optimized",
        "engineered",
        "analyzed",
        "integrated",
        "coordinated",
        "organized",
        "improved",
        "automated",
        "evaluated",
        "studied",
        "characterized",
        "extracted",
        "assisted"
    ]

    professional_keywords_found = []

    for word in keywords:
        if word in text_lower:
            professional_keywords_found.append(word)

    if len(professional_keywords_found) >= 5:
        ats_score += 10
        strengths.append("Good use of professional keywords")
    else:
        suggestions.append(
            "Use more professional keywords such as Developed, Built, Designed"
        )

    # LinkedIn

    if "linkedin" in text_lower:
        ats_score += 5
        strengths.append("LinkedIn profile included")
    else:
        suggestions.append("Add LinkedIn profile")

    # GitHub / Portfolio

    if "github" in text_lower:
        ats_score += 5
        strengths.append("GitHub profile included")
    else:
        suggestions.append("Consider adding professional profiles such as LinkedIn")

    if "portfolio" in text_lower:
        ats_score += 5
        strengths.append("Portfolio included")
    else:
        suggestions.append("Add portfolio website")
    # -------------------------
    # Section Scores
    # -------------------------

    section_scores = {
        "Contact Information": 10 if contact_found else 0,
        "Education": 15 if education_found else 0,
        "Skills": 15 if skills_found else 0,
        "Projects": 15 if projects_found else 0,
        "Experience": 15 if experience_found else 0,
        "Certifications": 10 if certification_found else 0
        }
    # Verdict

    if ats_score >= 85:
        verdict = "Your resume is ATS-friendly and well structured."
    elif ats_score >= 70:
        verdict = "Your resume is good, but a few improvements can increase visibility."

    elif ats_score >= 50:
        verdict = "Your resume needs moderate improvements to increase ATS performance."

    else:
       verdict = "Your resume requires significant improvements for ATS compatibility."
    # -------------------------
    # Resume Statistics
    # -------------------------

    sections_found = sum(sections.values())

    statistics = {
        "pages": page_count,
        "words": word_count,
        "characters": character_count,
        "sections_found": sections_found,
        "professional_keywords": len(professional_keywords_found)
    }
    # -------------------------
# Resume Strength
# -------------------------

    if ats_score >= 90:
        resume_strength = "Excellent"

    elif ats_score >= 75:
        resume_strength = "Strong"

    elif ats_score >= 60:
        resume_strength = "Average"

    else:
        resume_strength = "Needs Improvement"
    # -------------------------
    # Recruiter Summary
    # -------------------------

    summary = (
        f"Your resume contains {sections_found} major sections, "
        f"{len(professional_keywords_found)} professional action words "
        f"and achieved an ATS score of {ats_score}. "
        )

    if suggestions:
        summary += (
            "Recommended improvements: "
            + ", ".join(suggestions[:3])
            + "."
        )
    return {
    "ats_score": ats_score,
    "verdict": verdict,
    "resume_strength": resume_strength,
    "statistics": statistics,
    "contact": contact,
    "sections": sections,
    "section_scores": section_scores,
    "strengths": strengths,
    "professional_keywords_found": professional_keywords_found,
    "suggestions": suggestions,
    "summary": summary
}
