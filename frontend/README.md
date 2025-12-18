# Smart Restaurant Frontend

React frontend for the Smart Restaurant Management System built with Vite, Redux Toolkit, and Tailwind CSS.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- npm or yarn
- Backend API running (see backend README)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file in the root directory:
```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
VITE_API_URL=http://localhost:5000/api/v1
```

3. Start the development server:
```bash
npm run dev
```

The app will run on `http://localhost:5173`

## 📁 Project Structure

```
frontend/
├── src/
│   ├── api/              # API client configurations
│   │   ├── authAPI.js
│   │   ├── axiosClient.js
│   │   └── tableAPI.js
│   ├── assets/           # Static assets (images, icons)
│   ├── components/       # Reusable components
│   │   ├── admin/        # Admin-specific components
│   │   └── Restaurant/   # Restaurant-related components
│   ├── context/          # React Context providers
│   │   └── AppContext.jsx
│   ├── layouts/          # Layout components
│   │   ├── AdminLayout.jsx
│   │   ├── AuthLayout.jsx
│   │   └── MainLayout.jsx
│   ├── pages/            # Page components
│   │   ├── Admin/        # Admin pages
│   │   └── ...
│   ├── redux/            # Redux store and slices
│   │   ├── store.js
│   │   ├── cartSlice.js
│   │   └── slices/
│   ├── routes/           # Route definitions
│   │   ├── AppRoutes.jsx
│   │   └── ProtectedRoute.jsx
│   ├── services/         # Service functions
│   ├── styles/           # CSS files
│   ├── utils/            # Utility functions
│   ├── App.jsx           # Main App component
│   └── main.jsx          # Entry point
├── public/               # Public assets
└── package.json
```

## 🎨 Features

- **User Authentication** - Login/Register with JWT
- **Restaurant Management** - View and manage restaurants
- **Menu Display** - Browse menu items by category
- **Shopping Cart** - Add items to cart and checkout
- **Table Management** - View and manage restaurant tables
- **Admin Dashboard** - Comprehensive admin panel with:
  - Restaurant management
  - Menu management
  - Order tracking
  - Analytics and statistics
  - Table management with QR codes

## 🛠️ Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Redux Toolkit** - State management
- **React Router** - Routing
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **Recharts** - Charts and analytics
- **React Toastify** - Notifications
- **Framer Motion** - Animations
- **GSAP** - Advanced animations

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔌 API Integration

The frontend communicates with the backend API. Make sure the backend is running before starting the frontend.

### API Configuration

The API base URL is configured in:
- `src/api/axiosClient.js` - Main API client
- `src/utils/axiosInstance.js` - Alternative instance
- Environment variables: `VITE_API_BASE_URL` or `VITE_API_URL`

### State Management

The app uses Redux Toolkit for state management:
- `cartSlice` - Shopping cart state
- `categorySlice` - Category state
- `restaurantSlice` - Restaurant state
- `tableSlice` - Table state

## 🎯 Key Components

### Pages
- **Home** - Landing page with restaurant listings
- **Menu** - Menu display with categories
- **Cart** - Shopping cart
- **Login/Register** - Authentication pages
- **Admin Dashboard** - Admin panel
- **Restaurant Management** - CRUD operations for restaurants
- **Menu Management** - CRUD operations for menu items
- **Table Management** - Table CRUD with QR generation

### Layouts
- **MainLayout** - Main app layout with navbar
- **AdminLayout** - Admin panel layout with sidebar
- **AuthLayout** - Authentication pages layout

## 🐛 Known Issues

1. Duplicate `tableSlice.js` files in different locations
2. Multiple axios instances with different configurations
3. API endpoint inconsistencies (some use `/api/v1`, others use `/api`)
4. Empty `data/` and `hooks/` directories

## 📝 Environment Variables

Required environment variables:
- `VITE_API_BASE_URL` - Backend API base URL (default: http://localhost:5000/api/v1)
- `VITE_API_URL` - Alternative API URL variable

Note: Vite requires the `VITE_` prefix for environment variables to be exposed to the client.

## 🎨 Styling

The project uses Tailwind CSS for styling with custom CSS files in the `styles/` directory:
- `auth.css` - Authentication pages
- `login.css` - Login page
- `register.css` - Register page
- `addRestaurant.css` - Restaurant forms
- `theme.css` - Theme variables

## 🚀 Building for Production

```bash
npm run build
```

The production build will be in the `dist/` directory.

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

See the main README.md for contributing guidelines.
