# OEM Vulnerability Monitoring and Alert System

## Project Overview
This project is designed to monitor OEM (Original Equipment Manufacturer) websites for real-time vulnerability information and send targeted alerts to predefined email addresses. The primary goal is to track critical and high-severity vulnerabilities in IT and OT equipment for organizations in critical sectors.

![dashboard](https://github.com/user-attachments/assets/7297e0f1-acf8-408c-b883-11a8887d9ba0)
![table](https://github.com/user-attachments/assets/fb105b44-aa31-4342-bc20-1e0bc7cd7692)
![more-details](https://github.com/user-attachments/assets/66bbf196-bd05-476f-a6d5-4bfdcf59b899)
![email](https://github.com/user-attachments/assets/ce209d16-7935-4271-a747-257d194fdbe8)

---

## Key Features
1. **Dynamic Web Scraping**:
   - Once a link is supplied, the system dynamically loads, parses, and extracts pages using OpenAI for content analysis.

2. **Targeted Alerts**:
   - Sends email notifications for vulnerabilities related to the user's specified areas of interest.

3. **User Management**:
   - Users can select specific areas of interest to receive customized alerts.

4. **Vulnerability Classification**:
   - Filters vulnerabilities based on severity levels (critical, high).

5. **Email Integration**:
   - Sends detailed email alerts to users with links to the vulnerability information.

6. **Frontend Dashboard**:
   - React-based frontend where users can provide links for scraping.
   - Displays a searchable and sortable table of vulnerability data stored in the database.

---

## Tech Stack
- **Backend**: Python, Flask
- **Frontend**: React
- **Database**: SQLite
- **Web Scraping**: BeautifulSoup, Playwright, OpenAI
- **Email Integration**: SMTP library
- **Scheduler**: APScheduler
---

## Usage

1. **User Registration**:
   - Add users through the admin interface or an API endpoint.
   - Define areas of interest for each user to customize alerts.

2. **Dynamic Monitoring and Scraping**:
   - Supply links via the frontend dashboard to dynamically load and parse pages, extracting relevant vulnerability information using OpenAI.

3. **Vulnerability Table**:
   - View vulnerabilities in a sortable and searchable table on the frontend dashboard.

4. **Alert System**:
   - Sends email alerts with detailed information about vulnerabilities relevant to the user's areas of interest.


