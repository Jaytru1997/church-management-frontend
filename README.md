# Church Management Frontend

A comprehensive church management system built with **Nuxt 4**, Pinia, and TailwindCSS. This frontend application provides tools for managing church operations including member management, donation tracking, campaign management, and real-time notifications.

## 🚀 Features

### Core Functionality

- **User Authentication & Authorization**
  - JWT-based authentication (handled by backend)
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
  - Online payments via Monnify integration (backend handles payment processing)
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

- **Frontend Framework**: Nuxt 4.x
- **State Management**: Pinia 3.x
- **Styling**: TailwindCSS 3.x
- **HTTP Client**: Nuxt 4 built-in `$fetch`
- **Real-time**: Pusher
- **Payment**: Monnify (backend integration)
- **Build Tool**: Vite
- **Package Manager**: npm
- **TypeScript**: Full TypeScript support

## 📋 Prerequisites

- Node.js 18.x or higher
- npm 8.x or higher
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

```text
church-management-frontend/
├── app.vue                    # Main app entry point (Nuxt 4)
├── assets/                    # Global styles and assets
│   └── css/
│       └── main.css          # Main CSS file with glassmorphic design system
├── components/               # Reusable Vue components
│   ├── DonationForm.vue     # Donation form component
│   └── ...                  # Other components
├── layouts/                 # Layout components
│   ├── default.vue          # Main application layout
│   └── auth.vue             # Authentication layout
├── pages/                   # Page components
│   ├── index.vue            # Landing page
│   ├── auth/                # Authentication pages
│   ├── dashboard.vue        # Main dashboard
│   └── ...                  # Other pages
├── stores/                  # Pinia stores (TypeScript)
│   ├── auth.ts              # Authentication state
│   ├── church.ts            # Church management state
│   ├── donation.ts          # Donation state
│   └── ...                  # Other stores
├── nuxt.config.ts           # Nuxt 4 configuration
├── tailwind.config.ts       # TailwindCSS configuration
├── tsconfig.json            # TypeScript configuration
├── vercel.json              # Vercel deployment configuration
└── package.json             # NPM configuration
```

## 🎨 Design System

### Modern Glassmorphic Design

The application features a modern glassmorphic design system with:

- **Glass Cards**: `backdrop-blur-xl bg-white/10 border border-white/20`
- **Gradient Backgrounds**: `bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900`
- **Smooth Animations**: CSS transitions and keyframe animations
- **Modern Color Palette**: Purple, slate, and accent colors
- **Responsive Design**: Mobile-first approach with TailwindCSS

### Key Design Classes

```css
/* Glass card effect */
.glass-card {
  @apply backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl;
}

/* Gradient text */
.gradient-text {
  @apply bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent;
}

/* Modern buttons */
.btn-primary {
  @apply bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300;
}
```

## 🔒 Security Features

- JWT token authentication (backend handled)
- Role-based access control
- Input validation and sanitization
- Secure HTTP headers
- Environment variable protection

## 📱 Mobile Support

- Responsive design
- Touch-friendly interface
- Progressive Web App features
- Optimized for mobile performance

## 🚀 Deployment

### Vercel Deployment

The project is configured for easy deployment on Vercel:

1. **Connect Repository**
   - Link your GitHub repository to Vercel
   - Vercel will auto-detect Nuxt 4 configuration

2. **Environment Variables**
   Set the following environment variables in Vercel:

   ```zsh
   API_BASE_URL=https://your-backend-api.com/api
   PUSHER_KEY=your_pusher_key
   PUSHER_CLUSTER=mt1
   NODE_ENV=production
   ```

3. **Build Configuration**
   - Build Command: `npm run build`
   - Output Directory: `.output/public`
   - Install Command: `npm install`

4. **Deploy**
   - Vercel will automatically build and deploy your application
   - The `vercel.json` configuration handles SPA routing

### Other Deployment Options

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

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run generate     # Generate static site

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run typecheck    # Run TypeScript type checking
```

### Architecture Overview

```text
Frontend (Nuxt 4) ←→ Backend API ←→ Database
     ↓                    ↓
  Pinia Stores      JWT Authentication
     ↓                    ↓
  Components        Monnify Integration
     ↓                    ↓
  Glassmorphic UI   Real-time (Pusher)
```

### Key Features

- **TypeScript**: Full type safety across the application
- **Pinia Stores**: Modern state management with TypeScript
- **Glassmorphic Design**: Modern, beautiful UI with smooth animations
- **Backend Integration**: Clean separation of concerns
- **Real-time Updates**: Live notifications and updates
- **Responsive Design**: Works on all devices

## 🤝 Contributing

### Development Workflow

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Make changes following coding standards
4. Test your changes
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Coding Standards

- **TypeScript**: Use TypeScript for all new code
- **Vue 3 Composition API**: Use `<script setup>` syntax
- **Pinia**: Use Pinia stores for state management
- **TailwindCSS**: Use utility classes for styling
- **ESLint**: Follow ESLint rules and Prettier formatting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Check the documentation
- Review the backend API documentation

## 🔄 Version History

- **v2.0.0**: Migrated to Nuxt 4, TypeScript, modern glassmorphic design
- **v1.0.0**: Initial release with Nuxt 2

---

Built with ❤️ for church communities worldwide.
