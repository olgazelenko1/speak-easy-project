# 🎓 Speak Easy - Language Teachers Platform

> A modern web application for finding and booking English language teachers. Built with React, TypeScript, and Firebase.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2-61dafb.svg)](https://reactjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-12.8-orange.svg)](https://firebase.google.com/)
[![Vite](https://img.shields.io/badge/Vite-7.2-646cff.svg)](https://vitejs.dev/)

## ✨ Features

### 🔐 Authentication

- User registration and login with Firebase Authentication
- Secure password validation with Yup schemas
- Persistent authentication state with React Context
- Private routes protection for authorized users

### 👨‍🏫 Teachers

- Browse teachers with detailed profiles
- Filter by language, level, and price
- Real-time data from Firebase Realtime Database
- Teacher cards with avatar, languages, experience, and ratings

### ❤️ Favorites

- Add/remove teachers to personal favorites
- Synchronized favorites across devices
- Private favorites page for authorized users
- Real-time updates using AuthContext

### 📱 Responsive Design

- Mobile-first approach with CSS Modules
- Burger menu for mobile devices (≤860px)
- Full desktop navigation (≥861px)
- Optimized layouts for all screen sizes
- Dark/Light theme toggle

### 📅 Booking System

- Book trial lessons with teachers
- Interactive booking modal with time slots
- Form validation with React Hook Form
- Toast notifications for user feedback

## 🛠 Tech Stack

### Frontend

- **React 19.2** - UI library
- **TypeScript 5.9** - Type safety
- **React Router 7.12** - Client-side routing
- **React Hook Form 7.71** - Form management
- **Yup 1.7** - Schema validation
- **React Toastify 11.0** - Toast notifications
- **React CountUp 6.5** - Animated statistics
- **CSS Modules** - Scoped styling

### Backend & Services

- **Firebase 12.8**
  - Authentication (Email/Password)
  - Realtime Database
  - Hosting ready

### Build Tools

- **Vite 7.2** - Fast build tool with HMR
- **ESLint 9.39** - Code linting
- **TypeScript ESLint 8.46** - TypeScript linting

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd speak-easy-project
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

## 🚀 Available Scripts

| Command           | Description                                   |
| ----------------- | --------------------------------------------- |
| `npm run dev`     | Start development server (default port: 5173) |
| `npm run build`   | Build for production (outputs to `dist/`)     |
| `npm run preview` | Preview production build locally              |
| `npm run lint`    | Run ESLint for code quality checks            |

## 📁 Project Structure

```
speak-easy-project/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── AuthContext/     # Authentication context provider
│   │   ├── Header/          # Main navigation header
│   │   ├── Hero/            # Landing page hero section
│   │   ├── MobileMenu/      # Mobile burger menu
│   │   ├── TeacherCard/     # Teacher display card
│   │   ├── FilterBar/       # Teachers filtering
│   │   ├── BookModal/       # Lesson booking modal
│   │   ├── LoginModal/      # Login form modal
│   │   ├── RegisterModal/   # Registration form
│   │   └── Ui/              # UI primitives (Button, etc.)
│   ├── pages/               # Route pages
│   │   ├── HomePage/        # Landing page
│   │   ├── TeachersPage/    # Teachers catalog
│   │   └── FavoritesPage/   # User's favorites
│   ├── routes/              # Routing configuration
│   │   ├── AppRoutes.tsx    # Main routes setup
│   │   └── PrivateRoute.tsx # Protected route wrapper
│   ├── firebase/            # Firebase services
│   │   ├── auth.ts          # Authentication methods
│   │   ├── teachers.ts      # Teachers CRUD
│   │   ├── booking.ts       # Booking logic
│   │   └── config.ts        # Firebase initialization
│   ├── hooks/               # Custom React hooks
│   │   └── useAuth.ts       # Auth context hook
│   ├── types/               # TypeScript definitions
│   │   ├── teacher.ts       # Teacher interface
│   │   └── user.ts          # User types
│   ├── App.tsx              # Root component
│   ├── Layout.tsx           # App layout wrapper
│   └── main.tsx             # Application entry point
├── public/                  # Static assets
│   ├── icon/               # App icons
│   └── images/             # Public images
├── dist/                    # Production build (generated)
├── .env                     # Environment variables (not tracked)
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies & scripts
```

## 🎨 Design Features

- **Mobile-first responsive design**
- **CSS Modules** for scoped styling
- **CSS Custom Properties** for theming
- **Smooth animations** and transitions
- **Accessible UI** components
- **Breakpoints**:
  - Mobile: ≤860px
  - Desktop: ≥861px

## 🔒 Security

- Firebase Authentication for secure user management
- Environment variables for sensitive configuration
- Protected routes for authorized content
- Client-side form validation with server-side backup

## 🧪 Code Quality

- TypeScript for type safety
- ESLint for code consistency
- Modular component architecture
- Custom hooks for logic reusability
- React Context for state management

## 📝 Future Enhancements

- [ ] Teacher reviews and ratings system
- [ ] Advanced search with multiple filters
- [ ] Teacher availability calendar
- [ ] Payment integration
- [ ] Multi-language support (i18n)
- [ ] Video call integration for lessons
- [ ] Admin dashboard for teacher management

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

Built with ❤️ by Olga Zelenko

---

**Happy Teaching! 🎓✨**
