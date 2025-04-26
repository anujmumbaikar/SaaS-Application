VideoShare is a full-featured video sharing platform built with Next.js, featuring secure authentication, video compression, and social sharing capabilities.
https://github.com/user-attachments/assets/74a6c84d-7003-4191-a8c1-1192827b19ca
✨ Features

User Authentication: Secure sign-up and sign-in powered by Clerk
Video Upload: Upload and host videos with Cloudinary integration
Video Compression: Automatically generate compressed versions for easy downloading
Protected Routes: Secure content access with authenticated routes.


🛠️ Tech Stack
Frontend: Next.js, React, TailwindCSS
Authentication: Clerk
Database: PostgreSQL (Neon DB)
ORM: Prisma
Cloud Storage: Cloudinary for video hosting
Deployment: Vercel

📋 Prerequisites
Before you begin, ensure you have:

Node.js 18+ installed
A Clerk account for authentication
A Cloudinary account for media storage
A PostgreSQL database (Neon DB recommended)

🚀 Getting Started
1. Clone the repository
bashgit clone https://github.com/yourusername/videoshare.git
cd videoshare
2. Install dependencies
bashnpm install
# or
yarn install
3. Set up environment variables
Create a .env.local file in the root directory with the following variables:
env# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in

# Database
DATABASE_URL="your_postgresql_connection_string"

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name
4. Set up the database
bashnpx prisma db push
5. Run the development server
bashnpm run dev
# or
yarn dev
Open http://localhost:3000 to see the application.