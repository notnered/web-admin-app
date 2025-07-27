# User Administration Web Interface

## Overview

This project is a web interface for administering registered users of a website. It provides functionality for:

- Viewing a paginated and sortable list of users (by username, name, birthdate)
- Viewing detailed information about a selected user
- Adding new users
- Editing existing users
- Deleting users

Access to the interface is restricted to authenticated users with admin rights.

---

## Technology Stack

- **Backend:** Node.js (v16+), Express.js framework  
- **Database:** SQLite (using Sequelize ORM)  
- **Frontend:** Vanilla HTML/CSS/JavaScript with Vite  
- **Authentication:** JWT (jsonwebtoken), password hashing with bcrypt  
- **Others:** CORS enabled for local development, modular routing

---

## Project Structure

- `/api` — Express backend with API routes and DB models
- `/static` - CSS Styles
- `/utils` - Usefull utility functions
- `/components` - Components for client  
- `/db` — Sequelize models and database initialization  
- `README.md` — This documentation  

---

## Installation and Setup

### Prerequisites

- Node.js v16 or above  
- npm (Node Package Manager)  
- SQLite3 installed (if using SQLite CLI for DB dumps)  

### Steps

1. Clone the repository:  
   ```bash
   git clone https://github.com/notnered/user-admin.git
   cd user-admin
   ```
