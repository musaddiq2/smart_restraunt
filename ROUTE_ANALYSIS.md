# Route Analysis & Fixes Report

## 🔍 Current Route Status

### Backend Routes Analysis

#### ✅ `backend/src/app.js` (COMPLETE - Uses `/api/v1` prefix)
- `/api/v1/auth` → authRoutes ✅
- `/api/v1/admin` → adminRoutes ✅
- `/api/v1/categories` → categoryRoutes ✅
- `/api/v1/restaurant` → restaurantRoutes ✅
- `/api/v1/menus` → menuRoutes ✅
- `/api/v1/orders` → orderRoutes ✅
- `/api/v1/users` → userRoutes ✅
- `/api/v1/tables` → tableRoutes ✅

#### ⚠️ `backend/src/server.js` (INCOMPLETE - Uses `/api` prefix)
- `/api/auth` → authRoutes ⚠️ (should be `/api/v1/auth`)
- `/api/categories` → categoryRoutes ⚠️ (should be `/api/v1/categories`)
- `/api/restaurant` → restaurantRoutes ⚠️ (should be `/api/v1/restaurant`)
- `/api/tables` → tableRoutes ⚠️ (should be `/api/v1/tables`)
- ❌ Missing: orders, menus, users, admin routes

**ISSUE**: `server.js` is the entry point but doesn't import `app.js`. It has incomplete routes.

---

### Frontend Routes Analysis

#### ✅ Correct Routes (Using `/api/v1`)
- `Login.jsx` → `/api/v1/auth/login` ✅
- `Register.jsx` → `/api/v1/auth/register` ✅
- `categorySlice.js` → `/api/v1/categories` ✅
- `restaurantSlice.js` → `/api/v1/restaurant` ✅

#### ❌ Incorrect Routes (Using `/api` or wrong paths)
- `authAPI.js` → `/api/auth/*` ❌ (should be `/api/v1/auth/*`)
- `tableSlice.js` (slices) → `/api/tables` ❌ (should be `/api/v1/tables`)
- `tableAPI.js` → `/tables/add` ❌ (should be `/api/v1/tables`)
- `tableSlice.js` (root) → `/api/tables` ❌ (should be `/api/v1/tables`)

#### ⚠️ Hardcoded URLs (Should use env variables)
- Multiple files use `http://localhost:5000` directly
- Should use `import.meta.env.VITE_API_BASE_URL`

---

## 🔧 Required Fixes

### Priority 1: Backend Server Consolidation
1. **Fix `server.js`** to import and use `app.js` OR merge them
2. **Standardize all routes** to use `/api/v1` prefix

### Priority 2: Frontend Route Standardization
1. **Fix `authAPI.js`** - Change `/api/auth` to `/api/v1/auth`
2. **Fix `tableSlice.js` (slices)** - Change `/api/tables` to `/api/v1/tables`
3. **Fix `tableAPI.js`** - Update to use correct base path
4. **Remove duplicate `tableSlice.js`** in root redux folder
5. **Replace hardcoded URLs** with environment variables

### Priority 3: Environment Variables
1. **Create `.env.example` files** (if not already created)
2. **Update all frontend files** to use `import.meta.env.VITE_API_BASE_URL`

---

## 📋 Detailed Route Mapping

### Backend Route Structure (from app.js)

| Route | Method | Endpoint | Controller |
|-------|--------|----------|------------|
| Auth | POST | `/api/v1/auth/register` | registerUser |
| Auth | POST | `/api/v1/auth/login` | loginUser |
| Auth | POST | `/api/v1/auth/register-admin` | registerAdmin (protected) |
| Restaurant | GET | `/api/v1/restaurant` | getAllRestaurants |
| Restaurant | GET | `/api/v1/restaurant/find/:restaurantId` | getRestaurantByRestaurantId |
| Restaurant | GET | `/api/v1/restaurant/:id` | getRestaurantById |
| Restaurant | POST | `/api/v1/restaurant/add` | addRestaurant |
| Restaurant | PUT | `/api/v1/restaurant/:id` | editRestaurant |
| Restaurant | DELETE | `/api/v1/restaurant/:id` | deleteRestaurant |
| Category | GET | `/api/v1/categories` | getAllCategories |
| Category | POST | `/api/v1/categories` | createCategory |
| Category | PUT | `/api/v1/categories/:id` | updateCategory |
| Category | DELETE | `/api/v1/categories/:id` | deleteCategory |
| Menu | GET | `/api/v1/menus` | getAllMenuItems |
| Menu | POST | `/api/v1/menus` | createMenuItem |
| Table | GET | `/api/v1/tables` | getTables |
| Table | POST | `/api/v1/tables` | addTable |
| Table | PUT | `/api/v1/tables/:id` | updateTable |
| Table | DELETE | `/api/v1/tables/:id` | deleteTable |
| Order | GET | `/api/v1/orders` | getAllOrders |
| Order | POST | `/api/v1/orders` | placeOrder |
| Order | GET | `/api/v1/orders/:orderId` | getOrderById |
| Order | PATCH | `/api/v1/orders/:orderId/status` | updateOrderStatus |
| Order | DELETE | `/api/v1/orders/:orderId` | cancelOrder |
| User | GET | `/api/v1/users` | getAllUsers |
| Admin | POST | `/api/v1/admin/register-admin` | registerAdmin |

---

## 🎯 Action Items

### Immediate Actions:
1. ✅ Fix `backend/src/server.js` to use `app.js`
2. ✅ Fix `frontend/src/api/authAPI.js` routes
3. ✅ Fix `frontend/src/redux/slices/tableSlice.js` routes
4. ✅ Fix `frontend/src/api/tableAPI.js` routes
5. ✅ Remove duplicate `frontend/src/redux/tableSlice.js`
6. ✅ Replace hardcoded URLs with env variables

### Documentation:
- ✅ Create route mapping document
- ✅ Update README with correct API endpoints

