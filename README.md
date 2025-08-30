# Dayloom - MyLife Personal Journal Application

MyLife is a modern personal diary and life recording application that provides a secure, private, and feature-rich user experience. The application is developed with full-stack TypeScript, using NestJS for the backend and Next.js for the frontend, supporting responsive design.

## 🚀 Features

### ✅ Completed Features (Issue #2)

#### 🔐 End-to-End User Authentication System
- **User Registration**: Supports email and password registration, including data validation and password hashing
- **User Login**: Secure login verification and JWT token generation
- **Session Management**: Stateless authentication based on JWT
- **Route Protection**: Automatic redirection of unauthenticated users to the login page
- **State Management**: Use Zustand to manage global authentication state
- **Password Security**: Use bcrypt for password hashing and storage

#### 🖥️ User Interface
- **Responsive Design**: Supports desktop, tablet, and mobile devices
- **Modern UI**: Build beautiful user interfaces with Tailwind CSS
- **Form Validation**: Client-side and server-side dual validation
- **Error Handling**: Friendly error prompts and loading states
- **Navigation Bar**: Display user status and quick action buttons

### 🔮 Planned Features
- Personal diary CRUD operations
- Multimedia file upload and management
- Theme and template system
- Search and filtering functionality
- Data export and backup

## 🛠️ Tech Stack

| Level | Technology | Version | Description |
|------|------|------|------|
| **Frontend** | Next.js | 15.5.2 | React framework, supports server-side rendering |
| **Frontend** | Tailwind CSS | 4.0 | Utility-first CSS framework |
| **Frontend** | Zustand | Latest | Lightweight state management |
| **Frontend** | React Hook Form | Latest | Form handling and validation |
| **Frontend** | Axios | Latest | HTTP client |
| **Backend** | NestJS | 11.0.1 | Enterprise-grade Node.js framework |
| **Backend** | TypeORM | 0.3.18 | TypeScript ORM |
| **Backend** | JWT + Passport | Latest | Authentication |
| **Backend** | bcryptjs | 2.4.3 | Password hashing |
| **Database** | SQLite | 5.1.6 | Lightweight database |

## 🚀 Quick Start

### Environment Requirements
- Node.js >= 18
- npm >= 8

### 1. Clone the Project
```bash
git clone <repository-url>
cd Dayloom
```

### 2. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Configure environment variables (default configuration provided)
# JWT_SECRET, PORT, SQLITE_DB_PATH, etc., are already configured in .env

# Compile TypeScript
npm run build

# Run database migrations
npm run typeorm:migrate

# Start development server
npm run start:dev
```

Backend service will start at http://localhost:2001

### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Configure environment variables (default configuration provided)
# NEXT_PUBLIC_API_URL is already configured in .env.local

# Start development server
npm run dev
```

Frontend service will start at http://localhost:2002

## 📁 Project Structure

```
Dayloom/
├── backend/                 # NestJS backend
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   │   ├── dto/        # Data transfer objects
│   │   │   ├── guards/     # Authentication guards
│   │   │   └── strategies/ # Passport strategies
│   │   ├── users/          # User module
│   │   ├── entities/       # TypeORM entities
│   │   └── migrations/     # Database migrations
│   └── data/              # SQLite database file
├── frontend/               # Next.js frontend
│   ├── src/
│   │   ├── app/           # App Router pages
│   │   │   ├── login/     # Login page
│   │   │   ├── register/  # Register page
│   │   │   └── dashboard/ # Dashboard page
│   │   ├── components/    # React components
│   │   ├── lib/          # API service layer
│   │   └── store/        # Zustand state management
│   └── public/           # Static resources
```

## 🔑 API Endpoints

### Authentication Related
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /auth/profile` - Get user information (authentication required)
- `PUT /auth/preferences` - Update user preferences (authentication required)

### Database Structure
- **User**: User table (id, email, password, selectedTheme, createdAt)
- **DiaryEntry**: Diary entry table (to be implemented)
- **Media**: Media file table (to be implemented)
- **Theme**: Theme table (to be implemented)

## 🔒 Security Features

- **Password Hashing**: Use bcrypt for secure password storage
- **JWT Token**: Stateless authentication, 24-hour expiration
- **Input Validation**: Client and server-side dual data validation
- **CORS Configuration**: Secure cross-origin resource sharing settings
- **Auto Cleanup**: Automatic cleanup of expired tokens and redirection

## 🎨 User Experience

- **Responsive Design**: Adapts to all device sizes
- **Loading States**: Elegant loading animations and status prompts
- **Error Handling**: User-friendly error message display
- **Form Validation**: Real-time input validation and feedback
- **Route Protection**: Automatic authentication check and redirection

## 🧪 Testing

1. Visit http://localhost:2002
2. Click the "Get started" button to register a new user
3. Log in using the registered email and password
4. Access the dashboard to view user information and features

## 📝 Development Notes

### Adding New Authentication Routes
1. Add new controller methods in `backend/src/auth/auth.controller.ts`
2. Add corresponding API calls in `frontend/src/lib/api.ts`
3. Update frontend components to use the new API

### Database Migration
```bash
# Generate new migration files
npm run typeorm:migrate:gen

# Run migrations
npm run typeorm:migrate
```

### Environment Variables
- Backend: `.env` file contains JWT secret, database path, etc.
- Frontend: `.env.local` file contains API endpoint configuration

## 🔄 Next Steps

- [ ] Implement diary CRUD functionality
- [ ] Add media file upload
- [ ] Implement theme system
- [ ] Add search and filtering
- [ ] Mobile optimization
- [ ] Unit test coverage
- [ ] API documentation generation
- [ ] Deployment configuration

## 📄 License

Private project - All rights reserved
