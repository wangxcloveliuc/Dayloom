# Dayloom - MyLife

This repository contains a Next.js frontend and a NestJS backend for the "MyLife" personal journal project.

Quick start (development):

1. Backend

   - cd backend
   - copy `.env.example` to `.env` and adjust values (the backend uses `@nestjs/config` to load `.env` via `ConfigModule`)
   - npm install
   - npm run build
   - npm run start:dev

2. Frontend

   - cd frontend
   - copy `.env.local.example` to `.env.local`
   - npm install
   - npm run dev

Project structure and initial TypeORM entities/migrations are provided under `backend/src/entities` and `backend/src/migrations`.
