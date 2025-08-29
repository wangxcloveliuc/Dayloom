### **Project Requirements Document: MyLife - Your Multi-Functional Personal Journal App**

**Version:** 1.0
**Date:** August 29, 2025

### 1. Project Overview

#### 1.1 Project Introduction
"MyLife" is a modern, private, and feature-rich personal diary and lifestyle recording application. It aims to provide a safe, visually appealing, and highly personalized space for users to record daily life's morsels, manage their personal media assets, and express creativity. The application adopts responsive design, ensuring excellent user experiences on desktop, tablets, and mobile devices.

#### 1.2 Target Users
Anyone who wants to record their life digitally, protect privacy, and enjoy personalized experiences. For example: students, writers, travelers, or anyone who has a habit of recording and reflecting.

#### 1.3 Core Values
* **Privacy**: All data is stored in individual, privately owned database files that are fully controlled by the user.
* **Multimedia Support**: Not just text, enrich memory through images and videos.
* **High Customization**: Provide diverse themes and templates to make each person's diary unique.
* **Modern Technology Stack**: Utilize cutting-edge technologies to ensure application performance, development efficiency, and future scalability.

### 2. Technology Stack

| Category    | Technology          | Notes                                               |
| :---------- | :------------------ | :------------------------------------------------- |
| **Frontend** | Next.js (React) | Used to build quick, server-side rendered user interfaces. |
| **Backend** | NestJS (Node.js) | A high-performance, scalable TypeScript backend framework. |
| **ORM** | TypeORM       | A TypeScript ORM framework for simplifying database operations. |
| **Database** | SQLite        | A lightweight, serverless database suitable for personal applications. |
| **Styles** | Tailwind CSS  | (Recommended) A utility-first CSS framework for quickly building responsive interfaces. |
| **State Management** | Zustand / Redux | (Recommended) Used to manage complex frontend application states. |
| **Authentication** | JWT           | (Recommended) Using JSON Web Tokens for stateless authentication. |

### 3. Functional Requirements

#### 3.1 User Authentication Module
* **3.1.1 User registration**: Users can create new accounts using email and password. Passwords must be hashed and stored securely.
* **3.1.2 User login**: Users can log in to the system using their registration credentials, and obtain a JWT with a time limit upon successful login.
* **3.1.3 User logout**: Users can safely log out of their accounts at any time.
* **3.1.4 Route protection**: All pages and API interfaces must be authenticated except for the login/registration pages.

#### 3.2 Personalized Diary Module
* **3.2.1 Create diary (CRUD - Create)**
    * Users can create a new diary.
    * Each diary includes a title and content.
    * The content should support rich text editing (e.g., bold, italic, lists, quotes).
    * Users can insert images and videos into the diary.
* **3.2.2 View diary (CRUD - Read)**
    * Provide a diary list page that displays the titles, dates, and summaries of all diaries in reverse chronological order.
    * Clicking on a diary entry on the list page takes you to the diary details page to view the complete content and media files.
* **3.2.3 Edit diary (CRUD - Update)**
    * Users can modify their own diaries, including the title, content, and media files.
* **3.2.4 Delete diary (CRUD - Delete)**
    * Users can permanently delete their own diaries. There should be a confirmation prompt before deletion.
* **3.2.5 Media upload**
    * Support user upload of images (`.jpg`, `.png`, `.gif`, `.webp`) and videos (`.mp4`).
    * The backend should handle file reception, storage (recommended to store in a specific folder, with the path recorded in the database), and access.
    * Restrict the size of uploaded files (e.g., images < 5MB, videos < 50MB).
* **3.2.6 Themes and templates**
    * The system should pre-set various visual themes (e.g., dark mode, retro mode, clean mode, etc.).
    * Users can select and switch the theme in the settings.
    * (Optional advanced function) Provide diary templates, such as "Daily questions" (e.g., "What did I do today?", "What am I grateful for?", "Weekly review" etc.), allowing users to quickly start a diary by selecting a template when creating a new diary.

#### 3.3 Search and Filter Module
* **3.3.1 Keyword search**: Users can search for keywords in the titles and contents of all diaries.
* **3.3.2 Date filter**: Users can filter diaries by a specific date range.

### 4. Non-Functional Requirements

* **4.1 Responsive design**: The interface must be able to adapt to different screen sizes (mobile, tablet, desktop) and provide a consistent good experience.
* **4.2 Performance**:
    * Page load speed should be fast, particularly for media resources (e.g., images, videos) should be appropriately optimized (e.g., lazy loading).
    * The response time of the API should be within 200ms (under reasonable load).
* **4.3 Security**:
    * All user passwords must be encrypted using a strong hashing algorithm (e.g., bcrypt) when stored.
    * All client-server communication must use HTTPS.
    * Prevent common web attacks such as XSS, CSRF, and SQL injection.
* **4.4 Data persistence**: The SQLite database file should be properly stored on the server and recommend a backup mechanism.

### 5. Database Model Design (Entity-Relationship)

Define the following entities using TypeORM:

1.  **User (User)**
    * `id`: `uuid` (Primary Key)
    * `email`: `string` (Unique)
    * `password`: `string` (Stores hashed value)
    * `createdAt`: `datetime`
    * `selectedTheme`: `string` (Foreign key referencing Theme)

2.  **DiaryEntry (Diary Entry)**
    * `id`: `uuid` (Primary Key)
    * `title`: `string`
    * `content`: `text` (Stores rich text HTML or Markdown)
    * `entryDate`: `datetime`
    * `createdAt`: `datetime`
    * `updatedAt`: `datetime`
    * `userId`: `uuid` (Foreign key, referencing User)
    * *Relationship*: One User can have multiple DiaryEntry (`OneToMany`)

3.  **Media (Media File)**
    * `id`: `uuid` (Primary Key)
    * `type`: `enum` ('IMAGE', 'VIDEO')
    * `path`: `string` (File storage path on the server)
    * `mimetype`: `string`
    * `uploadedAt`: `datetime`
    * `entryId`: `uuid` (Foreign key, referencing DiaryEntry)
    * *Relationship*: One DiaryEntry can have multiple Media (`OneToMany`)

4.  **Theme (Theme)**
    * `id`: `integer` (Primary Key)
    * `name`: `string` (e.g., 'dark', 'light', 'retro')
    * `properties`: `json` (Stores CSS variable information)

### 6. API Design (RESTful API Endpoints)

The following are the main API endpoints provided by the backend NestJS:

| HTTP Method | Path                      | Description                       | Authentication |
| :---------- | :------------------------ | :--------------------------------- | :------------- |
| `POST`      | `/auth/register`          | Register a new user                | No             |
| `POST`      | `/auth/login`             | User login, return JWT            | No             |
| `GET`       | `/diary`                  | Get the list of all diaries of the current user | Required |
| `POST`      | `/diary`                  | Create a new diary                | Required       |
| `GET`       | `/diary/:id`              | Get the detailed information of a specific diary | Required |
| `PUT`       | `/diary/:id`              | Update a diary                    | Required       |
| `DELETE`    | `/diary/:id`              | Delete a diary                    | Required       |
| `POST`      | `/diary/:id/media`        | Upload media files for a specific diary | Required     |
| `DELETE`    | `/media/:mediaId`         | Delete a specific media file      | Required       |
| `GET`       | `/themes`                 | Get all available themes           | Required       |
| `PUT`       | `/user/preferences`       | Update user preferences (e.g., selected theme) | Required |