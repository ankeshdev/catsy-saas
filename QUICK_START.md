# 🚀 Quick Start - Local Development

## Prerequisites
- Node.js 18+ 
- Git
- Terminal/Command Prompt

## Setup Steps

### Option 1: Automated Setup (Recommended)
```bash
# Make the setup script executable
chmod +x setup-dev.sh

# Run the automated setup
./setup-dev.sh
```

### Option 2: Manual Setup
```bash
# 1. Install dependencies
pnpm install

# 2. Start development server
pnpm dev
```

## 🎯 Access Your App

Once the server starts, visit these URLs:

### Client Interface
- **Dashboard**: http://localhost:3000/app/dashboard
- **Create Listings**: http://localhost:3000/app/create-listings
- **Workflows**: http://localhost:3000/app/workflows
- **Files**: http://localhost:3000/app/files
- **Team**: http://localhost:3000/app/team
- **Settings**: http://localhost:3000/app/settings

### Provider Interface
- **Dashboard**: http://localhost:3000/provider/dashboard
- **Clients**: http://localhost:3000/provider/clients
- **Workflows**: http://localhost:3000/provider/workflows
- **Analytics**: http://localhost:3000/provider/analytics
- **Team**: http://localhost:3000/provider/team
- **Settings**: http://localhost:3000/provider/settings

### Authentication
- **Login**: http://localhost:3000/login
- **Signup**: http://localhost:3000/signup

## 🔧 Development Commands

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
pnpm dev --port 3001
```

### Dependencies Issues
```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Build Errors
```bash
# Clean build
rm -rf .next
pnpm build
```

## 📱 What You'll See

- **Modern UI** with indigo/purple theme
- **Responsive design** for all devices
- **Mock data** for realistic preview
- **Interactive components** and forms
- **Professional layout** with sidebar navigation

## 🎨 Features to Explore

1. **Dashboard Analytics** - View mock statistics and charts
2. **Workflow Management** - See automated processes
3. **File Generation** - Browse generated marketplace files
4. **Team Management** - User roles and permissions
5. **Global Search** - Search across workflows and files
6. **Settings** - Configuration options

## 🚀 Next Steps

1. **Explore the UI** - Navigate through different pages
2. **Check Responsiveness** - Test on different screen sizes
3. **Review Code** - Examine component structure
4. **Customize** - Modify colors, layouts, or add features
5. **Deploy** - Push to Vercel or other platforms

---

**Happy coding! 🎉** 