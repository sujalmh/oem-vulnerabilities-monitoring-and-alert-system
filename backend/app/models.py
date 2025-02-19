from app import db
from flask_login import UserMixin
from datetime import datetime
import pytz

ist = pytz.timezone('Asia/Kolkata')
class User(UserMixin, db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    is_admin = db.Column(db.Boolean, default=False, nullable=False)
    
    # Fields for user interest areas
    interested_in_critical = db.Column(db.Boolean, default=True, nullable=False)
    interested_in_high = db.Column(db.Boolean, default=True, nullable=False)
    interested_in_product_categories = db.Column(db.Text)  # Stores product categories of interest, like 'Networking, OS'

    def __init__(self, username, email, password, interested_in_critical=True, interested_in_high=True, interested_in_product_categories=''):
        self.username = username
        self.email = email
        self.password = password
        self.interested_in_critical = interested_in_critical
        self.interested_in_high = interested_in_high
        self.interested_in_product_categories = interested_in_product_categories

    def get_id(self):
        """Override `get_id` to return a string (required by Flask-Login)."""
        return str(self.id)
    

class OTP(db.Model):
    __tablename__ = 'otp'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), nullable=False)  # Email associated with the OTP
    otp = db.Column(db.String(6), nullable=False)  # 6-digit OTP
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)  # Timestamp of OTP creation

    def __init__(self, email, otp):
        self.email = email
        self.otp = otp



class OEMWebsite(db.Model):
    __tablename__ = 'oem_websites'

    id = db.Column(db.Integer, primary_key=True)
    oem_name = db.Column(db.String(150), nullable=False)
    website_url = db.Column(db.Text, nullable=False)
    scrape_frequency = db.Column(db.Integer, default=60)
    last_scraped = db.Column(db.DateTime, nullable=True)
    is_it = db.Column(db.Boolean, default=True, nullable=False)
    is_official = db.Column(db.Boolean, default=True, nullable=False)
    is_rss = db.Column(db.Boolean, default=False, nullable=True)
    contains_cve = db.Column(db.Boolean, default=False, nullable=False)
    contains_listing = db.Column(db.Boolean, default=False, nullable=False)
    contains_date = db.Column(db.Boolean, default=False, nullable=False)
    contains_details = db.Column(db.Boolean, default=False, nullable=False)
    website_hash = db.Column(db.String(100), nullable=True)

    def __init__(self, oem_name, website_url, scrape_frequency=60, last_scraped=None, is_it=True, is_rss=False, is_official=True, contains_listing=False, contains_date=False, contains_details=False, contains_cve=False):
        self.oem_name = oem_name
        self.website_url = website_url
        self.scrape_frequency = scrape_frequency
        self.last_scraped = last_scraped
        self.is_it = is_it
        self.is_rss = is_rss
        self.contains_cve = contains_cve
        self.is_official = is_official
        self.contains_listing = contains_listing
        self.contains_date = contains_date
        self.contains_details = contains_details

    
class ScrapingLogs(db.Model):
    __tablename__ = 'scraping_logs'

    id = db.Column(db.Integer, primary_key=True)
    website_id = db.Column(db.Integer, db.ForeignKey('oem_websites.id'), nullable=False)  # Reference to OEMWebsite
    website_url = db.Column(db.String(255), nullable=False) 
    status = db.Column(db.String(50), nullable=False)  # 'success' or 'error'
    error_message = db.Column(db.String(500), nullable=True)  # Nullable in case of success
    scraped_at = db.Column(db.DateTime, default=datetime.now(ist), nullable=False)

    # Relationship to the OEMWebsite model
    website = db.relationship('OEMWebsite', backref=db.backref('scraping_logs', lazy=True))

    def __init__(self, website_url, status, error_message=None, website_id=None, scraped_at=datetime.now(ist)):
        self.website_url = website_url
        self.status = status
        self.error_message = error_message
        self.website_id = website_id
        self.scraped_at = scraped_at

    def __repr__(self):
        return f"<ScrapingLog {self.website_url}, {self.status}>"


from datetime import datetime

class Vulnerabilities(db.Model):
    __tablename__ = 'vulnerabilities'

    id = db.Column(db.Integer, primary_key=True)
    product_name_version = db.Column(db.Text, nullable=True)
    vendor = db.Column(db.String(150), nullable=False)
    severity_level = db.Column(db.Text, nullable=False, default='High')  # Critical or High
    vulnerability = db.Column(db.Text, nullable=True)
    remediation = db.Column(db.Text, nullable=True)
    published_date = db.Column(db.Date, nullable=False)
    unique_id = db.Column(db.String(50), unique=True, nullable=False)  # CVE ID or similar
    scraped_date = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())
    cvss_score = db.Column(db.Text, nullable=True)
    reference = db.Column(db.Text, nullable=True)
    impact = db.Column(db.Text, nullable=True)
    oem_website_id = db.Column(db.Integer, db.ForeignKey('oem_websites.id'), nullable=False)
    oem_website = db.relationship('OEMWebsite', backref=db.backref('vulnerabilities', lazy=True))
    additional_details = db.Column(db.Text, nullable=True)
    email_sent = db.Column(db.Boolean, default=False)

    def __init__(
        self,
        product_name_version,
        severity_level,
        vendor,
        vulnerability,
        remediation,
        published_date,
        unique_id,
        oem_website_id,
        scraped_date=None,
        impact=None,
        cvss_score=None,
        reference=None,
        additional_details=None,
        email_sent=False
    ):
        self.product_name_version = product_name_version
        self.severity_level = severity_level
        self.vendor = vendor
        self.vulnerability = vulnerability
        self.remediation = remediation
        self.published_date = published_date
        self.unique_id = unique_id
        self.oem_website_id = oem_website_id
        self.scraped_date = scraped_date or datetime.utcnow()  # Set to current time if not provided
        self.impact = impact
        self.cvss_score = cvss_score
        self.reference = reference
        self.additional_details = additional_details
        self.email_sent = email_sent

    
    def to_dict(self):
        return {
            'id': self.id,
            'product_name_version': self.product_name_version,
            'severity_level': self.severity_level,
            'vendor': self.vendor,
            'vulnerability': self.vulnerability,
            'remediation': self.remediation,
            'published_date': self.published_date,
            'unique_id': self.unique_id,
            'scraped_date': self.scraped_date,
            'impact': self.impact,
            'cvss_score': self.cvss_score,
            'reference': self.reference,
            'additional_details': self.additional_details,
            'email_sent': self.email_sent
        }


class Alert(db.Model):
    __tablename__ = 'alerts'

    id = db.Column(db.Integer, primary_key=True)
    vulnerability_id = db.Column(db.Integer, db.ForeignKey('vulnerabilities.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    email_sent_timestamp = db.Column(db.DateTime, default=db.func.current_timestamp())
    status = db.Column(db.String(50), nullable=False)  # 'Pending', 'Sent', or 'Failed'

    # Relationships
    vulnerability = db.relationship('Vulnerabilities', backref=db.backref('alerts', lazy=True))
    user = db.relationship('User', backref=db.backref('alerts', lazy=True))

    def __init__(self, vulnerability_id, user_id, status='Pending'):
        self.vulnerability_id = vulnerability_id
        self.user_id = user_id
        self.status = status


class ScrapeDetail(db.Model):
    __tablename__ = 'scrape_details'

    id = db.Column(db.Integer, primary_key=True)
    scrape_started_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    scrape_ended_at = db.Column(db.DateTime, nullable=True)
    scraped_websites = db.Column(db.Text, nullable=False)  # Comma-separated list of website URLs
    status = db.Column(db.String(50), nullable=False)  # 'In Progress', 'Completed', 'Failed'
    error_message = db.Column(db.Text, nullable=True)

    def __init__(self, scraped_websites, status='In Progress', error_message=None):
        self.scraped_websites = scraped_websites
        self.status = status
        self.error_message = error_message


class ReportedVulnerability(db.Model):
    __tablename__ = 'reported_vulnerabilities'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # Associate with user
    user = db.relationship('User', backref=db.backref('reported_vulnerabilities', lazy=True))
    
    product_name = db.Column(db.String(150), nullable=False)
    oem_name = db.Column(db.String(150), nullable=False)
    vulnerability_description = db.Column(db.Text, nullable=False)
    severity_level = db.Column(db.Float, nullable=False)  # Critical, High, Medium, etc.
    suggested_mitigation = db.Column(db.Text, nullable=True)
    status = db.Column(db.String(50), default='Pending')  # 'Pending', 'Reviewed', 'Resolved'
    reported_date = db.Column(db.DateTime, default=db.func.current_timestamp())

    def __init__(self, user_id, product_name, oem_name, vulnerability_description, severity_level, suggested_mitigation=None):
        self.user_id = user_id
        self.product_name = product_name
        self.oem_name = oem_name
        self.vulnerability_description = vulnerability_description
        self.severity_level = severity_level
        self.suggested_mitigation = suggested_mitigation


class Thread(db.Model):
    __tablename__ = 'threads'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    # Relationship
    user = db.relationship('User', backref=db.backref('threads', lazy=True))
    comments = db.relationship('Comment', backref='thread', lazy=True, cascade='all, delete-orphan')

    def __init__(self, title, user_id):
        self.title = title
        self.user_id = user_id


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.Text, nullable=False)
    upvotes = db.Column(db.Integer, default=0, nullable=False)
    downvotes = db.Column(db.Integer, default=0, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    thread_id = db.Column(db.Integer, db.ForeignKey('threads.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    # Relationships
    user = db.relationship('User', backref=db.backref('comments', lazy=True))

    def __init__(self, text, thread_id, user_id):
        self.text = text
        self.thread_id = thread_id
        self.user_id = user_id
