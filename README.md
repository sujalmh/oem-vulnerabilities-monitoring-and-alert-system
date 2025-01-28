# OEM Vulnerability Monitoring and Alert System

## Project Overview
This project is designed to monitor OEM (Original Equipment Manufacturer) websites for real-time vulnerability information and send targeted alerts to predefined email addresses. The primary goal is to track critical and high-severity vulnerabilities in IT and OT equipment for organizations in critical sectors.

![dashboard](https://github.com/user-attachments/assets/adb51ca6-d434-45d5-9a91-f5ec11463d80)
![table](https://github.com/user-attachments/assets/9fa86ede-fb4d-4110-8166-0a249ede61a5)
![more-details](https://github.com/user-attachments/assets/5e912230-c172-48e5-b62b-d3ae33a7f610)
![email](https://github.com/user-attachments/assets/e63ea210-9527-4048-a40a-bf29ff95694f)

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
   - Node.js-based frontend where users can provide links for scraping.
   - Displays a searchable and sortable table of vulnerability data stored in the database.

---

## Tech Stack
- **Backend**: Python, Flask
- **Frontend**: Node.js, React (optional for UI)
- **Database**: SQLite
- **Web Scraping**: BeautifulSoup, Selenium (if required), OpenAI
- **Email Integration**: SMTP library
- **Deployment**: WSGI server, Docker (optional)

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


