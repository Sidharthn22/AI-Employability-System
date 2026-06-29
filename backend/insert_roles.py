from database import SessionLocal
from models import RoleDB, RoleSkillDB

db = SessionLocal()

roles_data = {
    "Python Developer": [
        "Python", "FastAPI", "MySQL", "Docker", "AWS"
    ],

    "Java Developer": [
        "Java", "Spring Boot", "MySQL", "Git", "Maven"
    ],

    "Full Stack Developer": [
        "HTML", "CSS", "JavaScript", "React", "Node.js", "MySQL", "Git"
    ],

    "Frontend Developer": [
        "HTML", "CSS", "JavaScript", "React", "Bootstrap"
    ],

    "Backend Developer": [
        "Python", "FastAPI", "Node.js", "SQL", "Git"
    ],

    "React Developer": [
        "React", "JavaScript", "HTML", "CSS", "Git"
    ],

    "Node.js Developer": [
        "Node.js", "Express.js", "MongoDB", "JavaScript", "Git"
    ],

    "DevOps Engineer": [
        "Docker", "Kubernetes", "AWS", "Linux", "Jenkins", "Git"
    ],

    "Data Analyst": [
        "SQL", "Excel", "Power BI", "Python", "Tableau"
    ],

    "Data Scientist": [
        "Python", "Machine Learning", "Pandas", "NumPy", "SQL"
    ],

    "Machine Learning Engineer": [
        "Python", "TensorFlow", "PyTorch", "Machine Learning", "SQL"
    ],

    "AI Engineer": [
        "Python", "Machine Learning", "TensorFlow", "PyTorch", "FastAPI"
    ],

    "Software Engineer": [
        "Python", "Java", "SQL", "Git", "OOP"
    ],

    "QA Engineer": [
        "Testing", "Selenium", "SQL", "JIRA", "Git"
    ],

    "Automation Test Engineer": [
        "Selenium", "Python", "Java", "TestNG", "Git"
    ],

    "Cyber Security Analyst": [
        "Network Security", "Linux", "Python", "SIEM", "Cyber Security"
    ],

    "Cloud Engineer": [
        "AWS", "Azure", "Docker", "Linux", "Terraform"
    ],

    "Database Administrator": [
        "MySQL", "SQL", "Backup", "Performance Tuning", "Database Design"
    ],

    "Business Analyst": [
        "Excel", "SQL", "Power BI", "Communication", "Documentation"
    ],

    "Android Developer": [
        "Java", "Kotlin", "Android Studio", "SQLite", "Git"
    ],

    "Flutter Developer": [
        "Flutter", "Dart", "Firebase", "REST API", "Git"
    ],

    "UI/UX Designer": [
        "Figma", "Wireframing", "Prototyping", "UI Design", "UX Design"
    ],

    "System Administrator": [
        "Linux", "Windows Server", "Networking", "Shell Scripting"
    ],

    "Network Engineer": [
        "Networking", "Cisco", "Routing", "Switching", "TCP/IP"
    ]
}

for role_name, skills in roles_data.items():

    role = RoleDB(role_name=role_name)

    db.add(role)
    db.commit()
    db.refresh(role)

    for skill in skills:
        role_skill = RoleSkillDB(
            role_id=role.id,
            skill=skill
        )

        db.add(role_skill)

    db.commit()

print("Roles and Skills Inserted Successfully!")