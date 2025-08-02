#!/bin/bash

echo "🚀 Setting up Catsy SaaS v18 Local Development Environment"
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    echo "Please upgrade Node.js to version 18 or higher."
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "📦 Installing pnpm..."
    npm install -g pnpm
else
    echo "✅ pnpm is already installed: $(pnpm --version)"
fi

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Check if installation was successful
if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
else
    echo "❌ Failed to install dependencies. Please check your internet connection and try again."
    exit 1
fi

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo "🔧 Creating .env.local file..."
    cat > .env.local << 'EOF'
# Development Environment Variables
NEXT_PUBLIC_APP_NAME=Catsy SaaS
NEXT_PUBLIC_APP_VERSION=v18

# Add your API keys here when implementing backend
# DATABASE_URL=your_database_url
# NEXTAUTH_SECRET=your_secret_key
# NEXTAUTH_URL=http://localhost:3000
EOF
    echo "✅ Created .env.local file"
fi

echo ""
echo "🎉 Setup complete! You can now start the development server:"
echo ""
echo "   pnpm dev"
echo ""
echo "📱 Your app will be available at:"
echo "   • Client Dashboard: http://localhost:3000/app/dashboard"
echo "   • Provider Dashboard: http://localhost:3000/provider/dashboard"
echo "   • Login Page: http://localhost:3000/login"
echo ""
echo "🔧 Available commands:"
echo "   • pnpm dev     - Start development server"
echo "   • pnpm build   - Build for production"
echo "   • pnpm start   - Start production server"
echo "   • pnpm lint    - Run ESLint"
echo "" 