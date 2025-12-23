# Route Organization - Super Admin & Admin Separation

## 📁 Folder Structure

```
frontend/src/pages/Admin/
├── AdminLayout.jsx          # Shared layout component
│
├── SuperAdmin/              # Super Admin Only Pages
│   ├── Dashboard.jsx                    # Super Admin Dashboard (Restaurant Management)
│   ├── RestaurantManagement.jsx          # Manage all restaurants
│   ├── AddRestaurant.jsx                 # Create restaurant
│   ├── EditRestaurant.jsx                # Edit restaurant
│   ├── AdminManagement.jsx               # Manage admins, assign restaurants, permissions
│   ├── AddAdmin.jsx                      # Create new admin
│   ├── SubscriptionManagement.jsx        # Manage subscriptions
│   ├── ProjectStatus.jsx                 # Project status
│   ├── ClientManagement.jsx              # Manage clients
│   ├── SystemAnalytics.jsx               # System analytics
│   ├── SecurityControl.jsx               # Security settings
│   ├── RestaurantStats.jsx               # Restaurant statistics
│   ├── RestaurantView.jsx                # View restaurant details
│   └── Settings.jsx                      # System settings
│
├── Admin/                   # Regular Admin Only Pages
│   └── AdminDashboard.jsx                # Admin Dashboard (Assigned Restaurants)
│
└── Shared/                  # Shared Pages (Both Super Admin & Admin)
    ├── Orders.jsx                        # Manage orders
    ├── MenuPage.jsx                      # Manage menu items
    ├── Categories.jsx                   # Manage categories
    └── Tables/                           # Table management
        ├── TableManagement.jsx
        ├── AddTable.jsx
        ├── EditTable.jsx
        ├── TableQR.jsx
        ├── AddTablePage.jsx
        ├── TableList.jsx
        ├── TableAnalytics.jsx
        └── QRPreview.jsx
```

---

## 🛣️ Route Structure

### Super Admin Routes (`/admin/*`)
- `/admin/dashboard` - Super Admin Dashboard (Restaurant Management)
- `/admin/restaurants` - Restaurant Management
- `/admin/restaurants/add` - Add Restaurant
- `/admin/restaurants/edit/:id` - Edit Restaurant
- `/admin/admin-management` - Admin Management
- `/admin/add-admin` - Add Admin
- `/admin/subscriptions` - Subscription Management
- `/admin/project-status` - Project Status
- `/admin/clients` - Client Management
- `/admin/analytics` - System Analytics
- `/admin/security` - Security Control

### Admin Routes (`/admin/*`)
- `/admin/admin-dashboard` - Admin Dashboard (Assigned Restaurants)

### Shared Routes (`/admin/*`) - Both Super Admin & Admin
- `/admin/orders` - Orders Management
- `/admin/menu` - Menu Management
- `/admin/categories` - Categories Management
- `/admin/tables` - Table Management
- `/admin/tables/add` - Add Table
- `/admin/tables/edit/:id` - Edit Table
- `/admin/tables/qr/:id` - Table QR Code

---

## 🔐 Route Protection

### Super Admin Only
All routes in `SuperAdmin/` folder are protected with:
```jsx
<ProtectedRoute requiredRole="superadmin">
  <Component />
</ProtectedRoute>
```

### Admin Only
Routes in `Admin/` folder are protected with:
```jsx
<ProtectedRoute requiredRole="admin">
  <Component />
</ProtectedRoute>
```

### Shared Routes
Routes in `Shared/` folder are accessible by both roles:
```jsx
<ProtectedRoute allowedRoles={["superadmin", "admin"]}>
  <Component />
</ProtectedRoute>
```

---

## 📝 Import Paths

### Super Admin Pages
```javascript
import Dashboard from "./pages/Admin/SuperAdmin/Dashboard";
import RestaurantManagement from "./pages/Admin/SuperAdmin/RestaurantManagement";
import AdminManagement from "./pages/Admin/SuperAdmin/AdminManagement";
// ... etc
```

### Admin Pages
```javascript
import AdminDashboard from "./pages/Admin/Admin/AdminDashboard";
```

### Shared Pages
```javascript
import Orders from "./pages/Admin/Shared/Orders";
import MenuPage from "./pages/Admin/Shared/MenuPage";
import Categories from "./pages/Admin/Shared/Categories";
import TableManagement from "./pages/Admin/Shared/Tables/TableManagement";
```

---

## ✅ Benefits of This Organization

1. **Clear Separation**: Easy to identify which pages belong to which role
2. **Maintainability**: Changes to one role don't affect the other
3. **Scalability**: Easy to add new pages to the correct folder
4. **Team Collaboration**: Different developers can work on different folders
5. **Code Organization**: Logical grouping of related functionality

---

## 🔄 Migration Notes

- All files have been copied to new locations
- Old files still exist in root `Admin/` folder (can be removed after verification)
- All imports in `App.jsx` have been updated
- `AppRoutes.jsx` has been updated (if used)
- Sidebar already supports role-based menu

---

## 🚀 Next Steps

1. Test all routes to ensure they work correctly
2. Remove old files from root `Admin/` folder after verification
3. Update any remaining internal imports if needed
4. Document any additional route requirements

