
🛍️ Souqna – Modern E-Commerce Platform
Souqna is a modern, responsive e-commerce web application built using Next.js 14, TypeScript, and Tailwind CSS. It delivers a smooth shopping experience with powerful features like filtering, search, pagination, dynamic routing, and a persistent shopping cart – all powered by Redux Toolkit and RTK Query.

🚀 Features
⚡ Next.js 14 App Router with TypeScript

🎨 Fully responsive UI built using Tailwind CSS

🛒 Shopping cart powered by Redux Toolkit (with createAsyncThunk) and persisted in localStorage

🔍 Product filtering, search, and pagination

📦 API integration using RTK Query

💡 Clean folder structure for scalable development

🍞 Real-time user feedback using react-hot-toast

🧭 Dynamic routing with product detail pages

🎞️ Smooth animations with Framer Motion

📁 Folder Structure

src/
├── app/                # App Router (pages, layouts, templates)
├── components/         # Reusable UI components
│   ├── layout/         # Navbar, Footer, etc.
│   └── product/        # ProductCard, ProductList, etc.
├── context/            # Theme context (dark/light mode)
├── redux/              # Redux slices and store configuration
🧑‍💻 Tech Stack
Frontend: Next.js 14, React, TypeScript

State Management: Redux Toolkit (with createAsyncThunk), RTK Query

Styling: Tailwind CSS, Framer Motion

Utilities: react-hot-toast, Swiper.js

🛠️ Getting Started
Install dependencies


npm install

Run the development server


npm run dev

Open http://localhost:3000 to see the app running locally.

🌐 Live Demo
🔗 https://souqna.vercel.app

📦 API Source
All product and category data is fetched from:


https://task-ecommerce-api.vercel.app/api/products


🙌 Credits
Developed by Ali Elemam as part of a performance-focused e-commerce platform using modern React and Next.js tools.

