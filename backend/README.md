# Smart Restaurant Backend API

RESTful API for the Smart Restaurant Management System built with Node.js, Express, and MongoDB.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file in the root directory:
```env
MONGO_URI=mongodb://localhost:27017/smart_restaurant
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_change_this
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

3. Start the server:
```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:5000`

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration files
│   │   ├── db.js        # MongoDB connection
│   │   ├── cloudinary.js # Cloudinary setup
│   │   └── multer.js     # File upload config
│   ├── controllers/     # Route controllers
│   │   ├── authController.js
│   │   ├── restaurantController.js
│   │   ├── categoryController.js
│   │   ├── OrderController.js
│   │   └── tableController.js
│   ├── middlewares/     # Custom middlewares
│   │   ├── authMiddleware.js
│   │   ├── errorHandler.js
│   │   ├── validateRequest.js
│   │   └── upload.js
│   ├── models/          # MongoDB models
│   │   ├── userModel.js
│   │   ├── restaurantModel.js
│   │   ├── menuModel.js
│   │   ├── categoryModel.js
│   │   ├── OrderModel.js
│   │   └── tableModel.js
│   ├── routes/          # API routes
│   │   ├── authRoutes.js
│   │   ├── restaurantRoutes.js
│   │   ├── categoryRoutes.js
│   │   ├── menuRoutes.js
│   │   ├── OrderRoutes.js
│   │   ├── tableRoutes.js
│   │   ├── UserRoutes.js
│   │   └── adminRoutes.js
│   ├── services/        # Business logic
│   ├── utils/           # Utility functions
│   │   └── qrUtil.js    # QR code generation
│   ├── validations/     # Request validation
│   ├── seed/            # Database seeding
│   ├── app.js           # Express app setup
│   └── server.js        # Server entry point
└── uploads/             # Uploaded files (local)
```

## 🔌 API Endpoints

### Authentication (`/api/v1/auth`)
- `POST /register` - Register new user
- `POST /login` - User login
- `POST /register-admin` - Register admin (protected, admin only)

### Restaurants (`/api/v1/restaurant`)
- `GET /` - Get all restaurants
- `POST /` - Create restaurant (protected)
- `GET /:id` - Get restaurant by ID
- `PUT /:id` - Update restaurant (protected)
- `DELETE /:id` - Delete restaurant (protected)

### Categories (`/api/v1/categories`)
- `GET /` - Get all categories
- `POST /` - Create category (protected)
- `PUT /:id` - Update category (protected)
- `DELETE /:id` - Delete category (protected)

### Menu (`/api/v1/menus`)
- `GET /` - Get all menu items
- `POST /` - Create menu item (protected)
- `PUT /:id` - Update menu item (protected)
- `DELETE /:id` - Delete menu item (protected)

### Tables (`/api/v1/tables`)
- `GET /` - Get all tables
- `POST /` - Create table (protected)
- `PUT /:id` - Update table (protected)
- `DELETE /:id` - Delete table (protected)

### Orders (`/api/v1/orders`)
- `GET /` - Get all orders
- `POST /` - Create order
- `PUT /:id` - Update order (protected)
- `DELETE /:id` - Delete order (protected)

### Users (`/api/v1/users`)
- `GET /` - Get all users (admin only)
- `GET /:id` - Get user by ID
- `PUT /:id` - Update user (protected)
- `DELETE /:id` - Delete user (admin only)

### Admin (`/api/v1/admin`)
- Admin-specific endpoints

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## 📦 Dependencies

### Core
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `dotenv` - Environment variables
- `cors` - Cross-origin resource sharing
- `morgan` - HTTP request logger

### Authentication & Security
- `jsonwebtoken` - JWT tokens
- `bcryptjs` - Password hashing
- `cookie-parser` - Cookie parsing

### File Upload
- `multer` - File upload middleware
- `cloudinary` - Cloud image storage
- `multer-storage-cloudinary` - Cloudinary storage for Multer

### Validation
- `joi` - Schema validation
- `express-validator` - Request validation

### Utilities
- `qrcode` - QR code generation
- `socket.io` - Real-time communication

## 🛠️ Development

### Environment Variables

Required environment variables:
- `MONGO_URI` - MongoDB connection string
- `PORT` - Server port (default: 5000)
- `JWT_SECRET` - Secret key for JWT tokens
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret

### Database Seeding

To seed the database with sample data:
```bash
node src/seed/seed.js
```

## 🐛 Known Issues

1. Two server entry points (`server.js` and `app.js`) - need consolidation
2. API route versioning inconsistency
3. Missing comprehensive error handling in some routes

## 📝 Notes

- The API uses `/api/v1` prefix for versioning
- All protected routes require JWT authentication
- Admin routes require both authentication and admin role
- File uploads are handled via Cloudinary
- CORS is configured for `http://localhost:5173` (frontend)

