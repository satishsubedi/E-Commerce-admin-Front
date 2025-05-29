# E-commerce Admin Frontend

A modern, responsive admin dashboard for managing e-commerce operations built with React and Vite.

## 🚀 Features

- Modern UI with Tailwind CSS and shadecn
- Responsive design
- React Router for navigation
- Toast notifications
- Form handling with validation
- Component-based architecture
- Hot Module Replacement (HMR)
- State management with Redux Toolkit

## 🛠️ Tech Stack

- **Framework:** React 19
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS 4
- **UI Components:**
  -shadeCN UI
- **Routing:** React Router DOM 7
- **Icons:** Lucide React & React Icons
- **Notifications:** React Toastify
- **State Management:** Redux Toolkit & React Redux

## 📦 Installation

1. Create a new Vite project:

```bash
git clone https://github.com/Mahesh0426/E-Commerce-admin-Front.git
cd ecom-admin-fe
```

2. Install base dependencies:

```bash
yarn
```

3. Install Tailwind CSS and its dependencies:

```bash
yarn add -D tailwindcss @tailwindcss/vite
```

```bash
npx shadcn@latest init
```

4. Install additional dependencies:

```bash
# UI and Icons
yarn add react-icons

# Routing
yarn add react-router-dom

# Notifications
yarn add react-toastify

# State Management
yarn add react-redux @reduxjs/toolkit

# API handling
yarn add axios

# global state management
yarn add react-redux
yarn add @reduxjs/toolkit
```

5. Create a `.env file in the root directory and add your environment variables:

```env
VITE_API_URL=your_api_url
```

## 🚀 Development

To start the development server:

```bash
yarn dev
```

The application will be available at `http://localhost:5173`

## 🏗️ Build

To create a production build:

```bash
yarn build
```

## 📁 Project Structure

```
src/
├── assets/        # Static assets
├── components/    # Reusable UI components
├── hooks/         # Custom React hooks
├── lib/          # Utility functions and configurations
├── pages/        # Page components
├── store/        # Redux store configuration
├── App.jsx       # Main application component
└── main.jsx      # Application entry point
```

## 📝 License

MIT Licenses

## 👥 Contributing

- Dinesh
- Sikher
- kovid
- Satish
- Mahesh
