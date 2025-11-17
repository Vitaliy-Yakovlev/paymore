# PayMore App - Device Trade-In Quote System

A modern React TypeScript application for generating instant device trade-in quotes with Supabase backend integration. This application provides a comprehensive solution for customers to get instant quotes for their electronic devices with real-time pricing calculations.

## 🚀 Features

### Core Functionality
- **Multi-Step Quote Process**: Intuitive 3-step wizard for device selection, details entry, and quote locking
- **Real-Time Price Calculation**: Dynamic pricing based on device condition, accessories, and battery health
- **Device Search & Discovery**: Advanced search with voice input, barcode scanning, and photo upload
- **Category Management**: Organized device categories with subcategories and device specifications
- **Quote Management**: Secure quote storage with 10-minute hold periods and expiration tracking

### Advanced Features
- **Voice Input**: Web Speech API integration for hands-free device search
- **Barcode Scanning**: Automatic device identification using camera or uploaded photos
- **Business Support**: Multi-device quotes with quantity multipliers
- **Rewards System**: Commission tracking and affiliate program integration
- **Responsive Design**: Mobile-first UI with modern styling

### Technical Features
- **Supabase Integration**: Real-time database with authentication and data management
- **TypeScript**: Full type safety and enhanced developer experience
- **Modern React**: Hooks-based architecture with custom hooks for data management
- **Error Handling**: Comprehensive error states and user feedback
- **Performance Optimized**: Efficient data loading and caching strategies

## 🏗️ Architecture

### Frontend Stack
- **React 19.2.0** - Modern React with latest features
- **TypeScript 4.9.5** - Type-safe development
- **Lucide React** - Modern icon library
- **Custom CSS** - Tailwind-inspired utility classes

### Backend & Database
- **Supabase** - Backend-as-a-Service with PostgreSQL
- **Real-time subscriptions** - Live data updates
- **Row Level Security (RLS)** - Secure data access
- **Authentication** - Built-in user management

### Key Components

```
src/
├── components/
│   ├── AuthComponent.tsx          # User authentication
│   ├── PriceSearchComponent.tsx  # Price search interface
│   ├── SuccessPage.tsx           # Quote success screen
│   ├── ErrorPage.tsx             # Error handling
│   └── SupabaseTest.tsx          # Database testing
├── hooks/
│   ├── useAuth.ts                # Authentication management
│   ├── useSupabase.ts            # Database operations
│   ├── useCategories.ts          # Device categories
│   └── usePriceList.ts           # Price calculations
├── utils/
│   ├── priceListService.ts       # Price calculation logic
│   ├── categoriesService.ts      # Category management
│   └── supabaseExamples.ts       # Usage examples
├── lib/
│   └── supabase.ts               # Supabase configuration
└── config/
    └── supabase.ts               # Environment configuration
```

## 📊 Database Schema

### Price List Table
Stores device pricing information with comprehensive specifications:

```sql
CREATE TABLE price_list (
  id SERIAL PRIMARY KEY,
  device_name VARCHAR(255) NOT NULL,
  brand VARCHAR(100) NOT NULL,
  storage VARCHAR(50) NOT NULL,
  sale_price DECIMAL(10, 2),
  condition VARCHAR(20) CHECK (condition IN ('Excellent', 'Good', 'Fair')),
  is_active BOOLEAN DEFAULT TRUE,
  device_image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Quotes Table
Stores customer quotes with complete transaction details:

```sql
CREATE TABLE quotes (
  id SERIAL PRIMARY KEY,
  store VARCHAR(255),
  mode VARCHAR(50),
  category VARCHAR(100),
  subcategory VARCHAR(100),
  device_name VARCHAR(255),
  brand VARCHAR(100),
  model VARCHAR(100),
  condition VARCHAR(50),
  battery_percentage INTEGER,
  has_original_box BOOLEAN DEFAULT FALSE,
  has_original_charger BOOLEAN DEFAULT FALSE,
  unlocked BOOLEAN DEFAULT TRUE,
  quote_amount DECIMAL(10, 2),
  is_eligible BOOLEAN DEFAULT FALSE,
  customer_first_name VARCHAR(100),
  customer_last_name VARCHAR(100),
  customer_email VARCHAR(255),
  customer_phone VARCHAR(50),
  is_business_customer BOOLEAN DEFAULT FALSE,
  business_quantity INTEGER DEFAULT 1,
  rewards_code VARCHAR(50),
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status VARCHAR(50) DEFAULT 'pending'
);
```

### Categories & Devices
Hierarchical structure for device organization:

```sql
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  key VARCHAR(100) UNIQUE NOT NULL,
  label VARCHAR(255) NOT NULL,
  icon VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE subcategories (
  id SERIAL PRIMARY KEY,
  category_id INTEGER REFERENCES categories(id),
  key VARCHAR(100) UNIQUE NOT NULL,
  label VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE devices (
  id SERIAL PRIMARY KEY,
  category_id INTEGER REFERENCES categories(id),
  subcategory_id INTEGER REFERENCES subcategories(id),
  key VARCHAR(100) UNIQUE NOT NULL,
  label VARCHAR(255) NOT NULL,
  brand VARCHAR(100),
  model VARCHAR(100),
  storage VARCHAR(50),
  buy_min DECIMAL(10, 2),
  resale_floor DECIMAL(10, 2),
  device_image TEXT,
  icon VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 💰 Pricing Algorithm

The application uses a sophisticated pricing algorithm that considers multiple factors:

### Base Price Calculation
1. **Sale Price**: Starting point from database
2. **Margin Application**: Apply PayMore margin percentage
3. **Shipping Costs**: Subtract shipping expenses
4. **Accessory Deductions**: Reduce for missing box/charger

### Condition Adjustments
- **Excellent/Like New**: Full base price
- **Good**: 15% discount from base price
- **Fair**: 30% discount from base price

### Battery Health Impact
- **81-100%**: No deduction
- **61-80%**: 5% deduction
- **41-60%**: 15% deduction
- **0-40%**: 25% deduction

### Business Multipliers
- Business customers receive quantity-based multipliers (1-30x)
- Individual customers receive standard pricing

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 16+ and npm
- Supabase account and project
- Modern web browser with camera/microphone access

### 1. Clone Repository
```bash
git clone <repository-url>
cd paymore-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create `.env` file with your Supabase credentials:

```env
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Database Setup
Execute SQL scripts in Supabase Dashboard:

```bash
# Run these SQL scripts in order:
1. create_categories_tables.sql
2. create_quotes_table.sql
3. create_offer_settings_table.sql
4. populate_categories_data.sql
5. populate_clean_price_list.sql
```

### 5. Start Development Server
```bash
npm start
```

The application will be available at `http://localhost:3000`

## 🎯 Usage Guide

### For Customers

#### Step 1: Device Selection
1. **Choose Category**: Select device type (Smartphones, Laptops, etc.)
2. **Search Device**: Use text search, voice input, or barcode scanning
3. **Select Model**: Pick specific device from filtered results
4. **Verify Details**: Confirm device specifications and pricing thresholds

#### Step 2: Device Details
1. **Personal Information**: Enter name, email, and phone number
2. **Device Condition**: Select condition (Like New, Good, Fair)
3. **Accessories**: Specify if original box and charger are included
4. **Battery Health**: Set battery percentage (if applicable)
5. **Business Options**: Enable business mode for multiple devices
6. **Rewards Code**: Enter 4-digit commission code (optional)

#### Step 3: Quote Lock
1. **Review Summary**: Verify all details and calculated price
2. **Store Information**: View store location and contact details
3. **Lock Quote**: Secure 10-minute hold on the offer
4. **Confirmation**: Receive success notification with next steps

### For Administrators

#### Managing Price List
```typescript
import { addPriceListItem, updatePriceListItem } from './utils/priceListService';

// Add new device pricing
await addPriceListItem({
  device_name: 'iPhone 15 Pro',
  brand: 'Apple',
  storage: '256GB',
  sale_price: 1200.00,
  condition: 'Excellent',
  is_active: true
});

// Update existing pricing
await updatePriceListItem(deviceId, {
  sale_price: 1100.00
});
```

#### Managing Categories
```typescript
import { useCategories } from './hooks/useCategories';

function CategoryManager() {
  const { categories, devices, loading } = useCategories();
  
  // Categories are automatically loaded and cached
  return (
    <div>
      {categories.map(category => (
        <div key={category.id}>
          <h3>{category.label}</h3>
          {/* Render devices for this category */}
        </div>
      ))}
    </div>
  );
}
```

## 🔧 API Reference

### Price Calculation Service

#### `getPriceForDevice(deviceName, storage, condition, originalBox, originalCharger, unlocked, batteryPercentage)`
Calculate final price for a specific device configuration.

**Parameters:**
- `deviceName` (string): Device model name
- `storage` (string): Storage capacity
- `condition` ('Excellent'|'Good'|'Fair'): Device condition
- `originalBox` (boolean): Has original packaging
- `originalCharger` (boolean): Has original charger
- `unlocked` (boolean): Device is unlocked
- `batteryPercentage` (number): Battery health percentage

**Returns:** `PriceResult` object with calculated pricing

#### `searchPrices(params)`
Search for devices matching specified criteria.

**Parameters:**
- `params` (PriceSearchParams): Search criteria object

**Returns:** Array of `PriceResult` objects

### Authentication Hooks

#### `useAuth()`
Manage user authentication state and operations.

**Returns:**
- `user`: Current authenticated user
- `session`: Active session data
- `loading`: Authentication state loading
- `signIn(email, password)`: Sign in user
- `signOut()`: Sign out user
- `signUp(email, password)`: Register new user

#### `useSupabase()`
Generic Supabase operations for data management.

**Returns:**
- `fetchData(table, options)`: Retrieve data
- `insertData(table, data)`: Create new records
- `updateData(table, id, data)`: Update existing records
- `deleteData(table, id)`: Delete records

## 🔒 Security Features

### Row Level Security (RLS)
- User-specific data access controls
- Anonymous quote creation support
- Admin-level data management

### Data Validation
- Client-side form validation
- Server-side data sanitization
- Type-safe database operations

### Privacy Protection
- Secure credential storage
- Encrypted data transmission
- GDPR-compliant data handling

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Environment Variables
Ensure production environment has:
- `REACT_APP_SUPABASE_URL`
- `REACT_APP_SUPABASE_ANON_KEY`

### Supabase Configuration
1. Enable Row Level Security on all tables
2. Configure authentication providers
3. Set up proper CORS policies
4. Configure rate limiting

## 🧪 Testing

### Running Tests
```bash
npm test
```

### Test Coverage
- Component rendering tests
- Hook functionality tests
- API integration tests
- User flow validation

## 📈 Performance Optimization

### Data Loading
- Efficient database queries with proper indexing
- Client-side caching for frequently accessed data
- Lazy loading for large datasets

### UI Optimization
- React.memo for expensive components
- useCallback for event handlers
- Optimized re-rendering strategies

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create feature branch
3. Install dependencies
4. Make changes with tests
5. Submit pull request

### Code Standards
- TypeScript strict mode
- ESLint configuration
- Prettier formatting
- Comprehensive error handling

## 📞 Support

### Store Information
- **Location**: 577 Yonge St #102, Toronto, ON M4Y 1Z2
- **Phone**: (416) 815-4588
- **Email**: Support available through contact form

### Technical Support
- Check console for error messages
- Verify Supabase connection
- Review environment configuration
- Test with sample data

## 📄 License

This project is proprietary software developed for PayMore Toronto Downtown. All rights reserved.

---

**PayMore App** - Modern device trade-in quote system with real-time pricing and comprehensive customer management.