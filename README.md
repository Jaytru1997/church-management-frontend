# Church Management Frontend

A comprehensive church management system built with Nuxt.js, Pinia, and TailwindCSS. This frontend application provides tools for managing church operations including member management, donation tracking, campaign management, and real-time notifications.

## 🚀 Features

### Core Functionality

- **User Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (Admin, Volunteer, Member)
  - Profile management and password updates

- **Church Management**
  - Multi-church support
  - Church profile and settings management
  - Logo and banner uploads
  - Service scheduling

- **Member Management**
  - Add, edit, and delete church members
  - Attendance tracking
  - Volunteer team management
  - First-timer follow-up system

- **Donation Management**
  - Manual donation recording
  - Online payments via Monnify integration
  - Donation categorization
  - Receipt generation

- **Campaign Management**
  - Fundraising campaign creation
  - Progress tracking
  - Social media sharing
  - Campaign updates and milestones

- **Real-Time Notifications**
  - Pusher integration for live updates
  - Email notifications
  - Browser notifications
  - Church-wide and team-specific alerts

## 🛠️ Tech Stack

- **Frontend Framework**: Nuxt.js 2.x
- **State Management**: Pinia
- **Styling**: TailwindCSS
- **HTTP Client**: Axios
- **Real-time**: Pusher
- **Payment**: Monnify
- **Build Tool**: Webpack
- **Package Manager**: npm

## 📋 Prerequisites

- Node.js 14.x or higher
- npm 6.x or higher
- Backend API server running (see backend repository)

## 🚀 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd church-management-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:

   ```env
   # API Configuration
   API_BASE_URL=http://localhost:5000/api
   
   # Pusher Configuration
   PUSHER_KEY=your_pusher_key
   PUSHER_CLUSTER=mt1
   
   # Monnify Configuration
   MONNIFY_PUBLIC_KEY=your_monnify_public_key
   MONNIFY_CONTRACT_CODE=your_contract_code
   
   # App Configuration
   NODE_ENV=development
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
church-management-frontend/
├── assets/                 # Global styles and assets
│   └── css/
│       └── main.css       # Main CSS file with Tailwind imports
├── components/            # Reusable Vue components
│   ├── DonationForm.vue  # Donation form component
│   └── ...               # Other components
├── layouts/              # Layout components
│   ├── default.vue       # Main application layout
│   └── auth.vue          # Authentication layout
├── pages/                # Page components
│   ├── index.vue         # Landing page
│   ├── auth/             # Authentication pages
│   ├── dashboard.vue     # Main dashboard
│   └── ...               # Other pages
├── plugins/              # Nuxt.js plugins
│   ├── pinia.js          # Pinia integration
│   ├── axios.js          # Axios configuration
│   ├── pusher.js         # Pusher integration
│   ├── toast.js          # Toast notifications
│   └── monnify.js        # Monnify payment integration
├── stores/               # Pinia stores
│   ├── auth.js           # Authentication state
│   ├── church.js         # Church management state
│   ├── member.js         # Member management state
│   ├── donation.js       # Donation state
│   └── notification.js   # Notification state
├── nuxt.config.js        # Nuxt.js configuration
├── tailwind.config.js    # TailwindCSS configuration
├── package.json          # Dependencies and scripts
└── README.md             # This file
```

## 🔧 Configuration

### Nuxt.js Configuration

The `nuxt.config.js` file contains:

- Module configurations (Axios, Auth, TailwindCSS)
- Build settings
- Environment variables
- Server configuration

### TailwindCSS Configuration

The `tailwind.config.js` file includes:

- Custom color schemes
- Component classes
- Purge settings for production builds

### Store Configuration

Each Pinia store manages specific domain:

- **Auth Store**: User authentication and profile
- **Church Store**: Church data and settings
- **Member Store**: Member management and teams
- **Donation Store**: Donations and campaigns
- **Notification Store**: Real-time notifications

## 🚀 Development

### Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Generate static site
npm run generate

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix
```

### Code Style

- **Indentation**: 2 spaces
- **Quotes**: Single quotes
- **Semicolons**: Required
- **Line length**: 80 characters max
- **Vue component structure**: Template, Script, Style order

### Component Guidelines

- Use composition API with Pinia stores
- Implement proper error handling
- Add loading states for async operations
- Use TailwindCSS utility classes
- Follow Vue.js best practices

## 🔌 API Integration

### Backend Endpoints

The frontend integrates with these backend endpoints:

- **Authentication**: `/api/auth/*`
- **Churches**: `/api/churches/*`
- **Members**: `/api/members/*`
- **Donations**: `/api/donations/*`
- **Campaigns**: `/api/campaigns/*`
- **Notifications**: `/api/notifications/*`

### Authentication Flow

1. User submits login credentials
2. Backend validates and returns JWT token
3. Frontend stores token in localStorage
4. Token included in subsequent API requests
5. Automatic token refresh and logout on expiration

## 🎨 UI Components

### Design System

- **Colors**: Blue primary, gray neutrals, semantic colors
- **Typography**: Inter font family
- **Spacing**: Consistent 4px grid system
- **Components**: Cards, buttons, forms, modals

### Responsive Design

- Mobile-first approach
- Responsive grid layouts
- Touch-friendly interactions
- Adaptive navigation

## 🔒 Security Features

- JWT token authentication
- Role-based access control
- Input validation and sanitization
- CSRF protection
- Secure HTTP headers

## 📱 Mobile Support

- Responsive design
- Touch-friendly interface
- Progressive Web App features
- Offline capability (planned)

## 🚀 Deployment

### Production Build

```bash
npm run build
npm run start
```

### Environment Variables

Ensure all production environment variables are set:

- API endpoints
- Pusher credentials
- Monnify configuration
- Security keys

### Deployment Options

- **Vercel**: Zero-config deployment
- **Netlify**: Static site hosting
- **AWS S3**: Static hosting with CloudFront
- **Docker**: Containerized deployment

## 🧪 Testing

### Test Setup

```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

### Testing Framework

- **Jest**: Unit and integration tests
- **Vue Test Utils**: Component testing
- **jsdom**: DOM environment simulation

## 📊 Performance

### Optimization Features

- Code splitting and lazy loading
- Image optimization
- CSS purging in production
- Service worker for caching
- Bundle analysis tools

### Monitoring

- Performance metrics tracking
- Error logging and reporting
- User analytics integration

## 🤝 Contributing

### Development Workflow

1. Fork the repository
2. Create feature branch
3. Make changes following coding standards
4. Add tests for new functionality
5. Submit pull request

### Code Review Process

- Automated linting and testing
- Manual code review
- Performance and security checks
- Documentation updates

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

### Documentation

- [Nuxt.js Documentation](https://nuxtjs.org/docs)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)

### Issues and Questions

- Create GitHub issues for bugs
- Use discussions for questions
- Check existing issues and solutions

### Community

- Join our Discord server
- Follow project updates
- Contribute to documentation

## 🔮 Roadmap

### Upcoming Features

- **Advanced Analytics**: Detailed reporting and insights
- **Mobile App**: React Native companion app
- **Multi-language Support**: Internationalization
- **Advanced Permissions**: Granular role management
- **Integration APIs**: Third-party service connections

### Long-term Goals

- **AI-powered Insights**: Predictive analytics
- **Blockchain Integration**: Transparent donation tracking
- **Virtual Events**: Online service management
- **Community Features**: Member interaction tools

---

**Built with ❤️ for the church community**
