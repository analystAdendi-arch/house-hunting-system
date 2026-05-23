# House Hunting System

A comprehensive web-based platform for apartment hunting with user authentication, property listings, monthly payments, messaging, and reviews.

## Features

- 🔐 **User Authentication** - Signup/Login with JWT
- 🏠 **Property Listings** - Browse apartments with detailed information
- 🔍 **Search & Filters** - Filter by location, price, bedrooms, amenities
- 💬 **Messaging System** - Direct communication between landlords and tenants
- ⭐ **Reviews & Ratings** - Rate properties and landlords
- 💳 **Monthly Payments** - Track and manage rental payments
- 📊 **Dashboard** - User profile, bookings, and payment history

## Tech Stack

### Frontend
- **React 18** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **CSS** - Styling
- **Redux** - State management

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **JWT** - Authentication
- **Bcryptjs** - Password hashing
- **Mongoose** - ODM

## Project Structure

```
house-hunting-system/
├── backend/
│   ├── models/          # Database schemas
│   ├── routes/          # API endpoints
│   ├── middleware/      # Authentication & validation
│   ├── config/          # Database configuration
│   ├── server.js        # Express server
│   ├── package.json     # Backend dependencies
│   └── .env.example     # Environment variables template
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable components (Navbar, Footer)
│   │   ├── pages/       # Page components (Home, Login, Signup, etc)
│   │   ├── redux/       # Redux store and slices
│   │   ├── App.jsx      # Main App component
│   │   └── App.css      # Global styles
│   ├── public/
│   │   └── index.html   # HTML template
│   └── package.json     # Frontend dependencies
├── docker-compose.yml   # Docker configuration
└── .gitignore          # Git ignore rules
```

## Installation & Setup

### Prerequisites
- Node.js (v14+)
- MongoDB
- npm or yarn

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

The app will open at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (requires token)
- `PUT /api/auth/profile` - Update user profile (requires token)

### Properties
- `GET /api/properties` - List all properties with filters
- `GET /api/properties/:id` - Get property details
- `POST /api/properties` - Create property (landlord only)
- `PUT /api/properties/:id` - Update property
- `DELETE /api/properties/:id` - Delete property

### Messaging
- `GET /api/messages` - Get user messages
- `POST /api/messages` - Send message
- `GET /api/conversation/:userId` - Get conversation with user
- `PUT /api/messages/:id/read` - Mark message as read

### Reviews
- `POST /api/reviews` - Create review
- `GET /api/reviews/property/:propertyId` - Get property reviews
- `GET /api/reviews/landlord/:landlordId` - Get landlord reviews
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

### Payments
- `POST /api/payments` - Create payment record
- `GET /api/payments` - Get user payments
- `GET /api/payments/history/:propertyId` - Payment history
- `PUT /api/payments/:id` - Update payment status

## Environment Variables

### Backend .env
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/house-hunting
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
API_URL=http://localhost:5000
FRONTEND_URL=http://localhost:3000
```

### Frontend .env
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Database Models

### User
- firstName, lastName, email, password
- phone, profileImage, bio, address, city, state, zipCode
- role (tenant, landlord, admin)
- verificationStatus

### Property
- title, description, address, city, state, zipCode
- bedrooms, bathrooms, squareFeet, monthlyRent
- images, amenities, petFriendly, furnished, parkingAvailable
- landlordId, isAvailable, averageRating, reviewCount

### Message
- senderId, receiverId, propertyId
- message, isRead, createdAt

### Review
- propertyId, userId, landlordId
- rating (1-5), title, comment
- cleanliness, maintenance, communication ratings
- isVerifiedTenant

### Payment
- tenantId, landlordId, propertyId
- amount, month, year, status
- transactionId, paymentMethod, dueDate, paidDate

## Key Features Explained

### User Authentication
- JWT-based authentication for secure access
- Password hashing with bcryptjs
- Role-based access (tenant/landlord/admin)

### Property Listings
- Search by city, price range, number of bedrooms
- Filter by amenities (pet-friendly, furnished, parking)
- Detailed property information with images
- Landlord contact information

### Messaging System
- Real-time messaging between landlords and tenants
- Conversation history
- Message read status

### Reviews & Ratings
- Rate properties and landlords (1-5 stars)
- Detailed review comments
- Separate ratings for cleanliness, maintenance, communication
- Verified tenant badges

### Payment Management
- Track monthly rental payments
- Payment history per property
- Multiple payment methods support
- Payment status tracking (pending, completed, failed, overdue)

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/analystAdendi-arch/house-hunting-system.git
cd house-hunting-system
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd frontend
npm install
```

4. Set up MongoDB:
- Start MongoDB service
- Create database: `house-hunting`

5. Configure environment variables:
- Copy `.env.example` to `.env` in backend folder
- Update with your MongoDB connection string and JWT secret

6. Run the application:

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd frontend
npm start
```

7. Visit `http://localhost:3000` in your browser

## Docker Setup (Optional)

Run everything with Docker:
```bash
docker-compose up
```

This will start:
- MongoDB on port 27017
- Backend on port 5000
- Frontend on port 3000

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues, questions, or suggestions, please open a GitHub issue.

---

Happy house hunting! 🏠
