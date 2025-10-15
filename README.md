## TechNova – Internal Catalog Management System

A Next.js + TypeScript application built to digitize and streamline the management of tech products, users, and orders for TechNova, replacing error-prone spreadsheets with a secure, consistent, and type-safe web platform.

## Features
Product Management: Create, read, update, and delete tech products with unique SKU validation.
User Authentication: Secure login with role-based access (simulated for demo).
Reusable UI Components: Custom Button, Badge, and Card with TypeScript interfaces and Tailwind styling.
Full CRUD Dashboard: Grid-based product listing with edit/delete actions.
Type-Safe Architecture: Strict TypeScript interfaces for Product and User.
MongoDB Integration: Persistent data storage via Mongoose models.
Axios Services: Clean API consumption layer for frontend-backend communication


## Tech Stack
Frontend: Next.js (Pages Router), React, TypeScript, Tailwind CSS
State Management: Context API + Hooks
Backend: Next.js API Routes, Mongoose, MongoDB
HTTP Client: Axios
UI Components: Custom Button, Badge, Card


## Requirements
Node.js 18+
npm or yarn
MongoDB (local instance or MongoDB Atlas)

## Setup & Installation

1.Clone the repository
git clone https://github.com/jaiderr1582/technova.git


2.Install dependencies

npm install

3.Set up environment variables
Create a .env.local file in the root directory:


4.Run the development server
npm run dev

## Login Credentials (Demo)
Email: admin@technova.com
Password: 123


## Project Structure

tech-nova/
├── public/
│   └── (imágenes estáticas si las necesitas)
├── src/
│   ├── components/
│   │   ├── ui/                 ← Button, Badge, Card
│   │   └── layout/             ← DashboardLayout, AuthLayout
│   ├── contexts/
│   │   └── AuthContext.tsx     ← Estado global de autenticación
│   ├── hooks/
│   │   └── useProducts.ts      ← Lógica reutilizable para productos
│   ├── lib/
│   │   └── api.ts              ← Instancia de Axios
│   ├── models/                 ← Interfaces TypeScript (NO Mongoose aquí)
│   │   ├── Product.ts
│   │   └── User.ts
│   ├── pages/
│   │   ├── api/
│   │   │   └── products/       ← API Routes de Next.js (con Mongoose)
│   │   │       ├── id.ts
│   │   │       └── index.ts
│   │   ├── login.tsx
│   │   ├── dashboard.tsx       ← Página principal
│   │   └── _app.tsx
│   ├── services/
│   │   └── productService.ts   ← Servicios Axios
│   └── utils/
│       └── decorators.ts       ← Decorador para UserStore
├── .env.local
├── next.config.js
├── tsconfig.json
└── README.md

## API Endpoints
GET
/api/products
List all products
POST
/api/products
Create new product
PUT
/api/products/:id
Update product
DELETE
/api/products/:id
Delete product


## Author
Name: Jaider Yesid Rodriguez Robles
Clan: Macondo
Email: jaideryesid28@gmail.com