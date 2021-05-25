# coding: utf-8
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()



class LogInfo(db.Model):
    __tablename__ = 'log_info'

    meeting_id = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.String(20), nullable=False)
    log_time = db.Column(db.String(10), nullable=False)
    log_feeling = db.Column(db.String(10), nullable=False)
    log_text = db.Column(db.String(100), nullable=False)
    idx = db.Column(db.Integer, primary_key=True)



class MeetingInfo(db.Model):
    __tablename__ = 'meeting_info'

    meeting_id = db.Column(db.Integer, primary_key=True)
    meeting_name = db.Column(db.String(20), nullable=False)
    meeting_date = db.Column(db.DateTime, nullable=False)



class ProjectInfo(db.Model):
    __tablename__ = 'project_info'

    project_id = db.Column(db.Integer, primary_key=True)
    project_name = db.Column(db.String(50), nullable=False)



class ProjectIssue(db.Model):
    __tablename__ = 'project_issue'

    project_id = db.Column(db.Integer, nullable=False, index=True)
    issue_content = db.Column(db.String(100), nullable=False)
    idx = db.Column(db.Integer, primary_key=True)



class ProjectMeeting(db.Model):
    __tablename__ = 'project_meeting'

    meeting_id = db.Column(db.Integer, nullable=False, index=True)
    project_id = db.Column(db.Integer, nullable=False)
    idx = db.Column(db.Integer, primary_key=True)



class Test(db.Model):
    __tablename__ = 'test'

    num = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(45), nullable=False)



class UserInfo(db.Model):
    __tablename__ = 'user_info'

    user_id = db.Column(db.String(20), primary_key=True)
    user_pw = db.Column(db.String(20), nullable=False)
    user_email = db.Column(db.String(30), nullable=False)
    user_name = db.Column(db.String(10), nullable=False)



class UserProject(db.Model):
    __tablename__ = 'user_project'

    user_id = db.Column(db.String(20), nullable=False)
    project_id = db.Column(db.Integer, nullable=False, index=True)
    idx = db.Column(db.Integer, primary_key=True)
