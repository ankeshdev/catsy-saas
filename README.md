# Catsy SaaS v18 - Managed Automation Platform

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.9-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

> **Automated product listing management for e-commerce sellers across multiple marketplaces**

Catsy is a comprehensive SaaS platform that streamlines the process of creating, managing, and optimizing product listings for e-commerce businesses. Built with modern web technologies, it provides a dual-interface architecture serving both clients (e-commerce sellers) and providers (service managers).

## 🚀 Features

### For E-commerce Sellers (Client Interface)
- **📊 Dashboard Analytics**: Real-time insights into workflow performance, success rates, and processing times
- **🔄 Workflow Management**: Create and manage automated workflows for different product categories
- **📁 File Generation**: Generate marketplace-ready CSV/Excel files for bulk uploads
- **👥 Team Collaboration**: Manage team members with role-based permissions
- **⚙️ Settings & Configuration**: Customize workflows and marketplace integrations
- **🔍 Global Search**: Search across workflows, files, and team members

### For Service Providers (Provider Interface)
- **📈 Client Management**: Oversee multiple client accounts and their workflows
- **📊 Analytics Dashboard**: Comprehensive reporting and performance metrics
- **🔄 Workflow Oversight**: Monitor and manage client workflows
- **👥 Team Management**: Manage provider team members and permissions
- **📋 Queue Management**: Handle pending requests and approvals
- **⚙️ Provider Settings**: Configure platform-wide settings and integrations

### Multi-Marketplace Support
- **Amazon**: Complete integration for product listings
- **Flipkart**: Native support for Indian e-commerce
- **Myntra**: Fashion and lifestyle products
- **Ajio**: Premium fashion marketplace
- **Pepperfry**: Home and furniture
- **Decathlon**: Sports and fitness equipment

## 🏗️ Architecture

### Dual-Interface Design
```
Catsy SaaS v18
├── Client Interface (/app/*)
│   ├── Dashboard - Analytics & Overview
│   ├── Create Listings - File Upload & Processing
│   ├── Workflows - Automation Management
│   ├── Files - Generated Outputs
│   ├── Team - User Management
│   └── Settings - Configuration
│
└── Provider Interface (/provider/*)
    ├── Dashboard - Client Overview
    ├── Clients - Account Management
    ├── Workflows - Multi-client Oversight
    ├── Analytics - Performance Metrics
    ├── Team - Provider Team Management
    └── Settings - Platform Configuration
```

### Technology Stack
- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4.1.9, Radix UI Components
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Charts**: Recharts for data visualization
- **Package Manager**: pnpm

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm
- Git

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/ankeshdev/catsy-saas.git
   cd catsy-saas
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

## 🎯 Usage

### Client Interface (`/app/*`)
1. **Dashboard**: View analytics, recent workflows, and quick actions
2. **Create Listings**: Upload product data and generate marketplace files
3. **Workflows**: Manage automated processes for different product categories
4. **Files**: Access generated CSV/Excel files for marketplace uploads
5. **Team**: Invite team members and manage permissions
6. **Settings**: Configure account and workflow settings

### Provider Interface (`/provider/*`)
1. **Dashboard**: Overview of all clients and their performance
2. **Clients**: Manage client accounts and their workflows
3. **Workflows**: Oversee and optimize client automation processes
4. **Analytics**: Generate reports and performance insights
5. **Team**: Manage provider team members
6. **Settings**: Configure platform-wide settings

## 🎨 UI Components

The application uses a comprehensive set of UI components built with Radix UI and styled with Tailwind CSS:

- **Layout Components**: Sidebar navigation, headers, and responsive layouts
- **Form Components**: Inputs, selects, checkboxes, and form validation
- **Data Display**: Tables, cards, badges, and progress indicators
- **Feedback**: Toasts, alerts, and loading states
- **Navigation**: Breadcrumbs, pagination, and search functionality

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the root directory:

```env
# Database (if using)
DATABASE_URL=your_database_url

# Authentication (if implementing)
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000

# API Keys (for marketplace integrations)
AMAZON_API_KEY=your_amazon_api_key
FLIPKART_API_KEY=your_flipkart_api_key
```

### Customization
- **Themes**: Modify `tailwind.config.js` for custom colors and styling
- **Components**: Customize UI components in `components/ui/`
- **Layouts**: Adjust layouts in `components/layouts/`

## 📁 Project Structure

```
catsy-saas-v18/
├── app/                          # Next.js app directory
│   ├── app/                      # Client interface routes
│   │   ├── dashboard/           # Client dashboard
│   │   ├── create-listings/     # File upload & processing
│   │   ├── workflows/           # Workflow management
│   │   ├── files/              # Generated files
│   │   ├── team/               # Team management
│   │   └── settings/           # Client settings
│   ├── provider/                # Provider interface routes
│   │   ├── dashboard/          # Provider dashboard
│   │   ├── clients/            # Client management
│   │   ├── workflows/          # Workflow oversight
│   │   ├── analytics/          # Performance metrics
│   │   ├── team/              # Provider team
│   │   └── settings/          # Provider settings
│   ├── login/                  # Authentication pages
│   ├── signup/
│   └── layout.tsx             # Root layout
├── components/                  # Reusable components
│   ├── layouts/               # Layout components
│   │   ├── client-layout.tsx  # Client interface layout
│   │   └── provider-layout.tsx # Provider interface layout
│   └── ui/                    # UI components
├── hooks/                      # Custom React hooks
├── lib/                        # Utility functions
├── public/                     # Static assets
└── styles/                     # Global styles
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `pnpm build`
3. Set publish directory: `.next`

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Built by**: [Nexen Labs](https://nexenlabs.com)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📞 Support

For support, email support@catsy.com or join our Slack channel.

---

**Made with ❤️ by the Nexen Labs team** # Dual Repository Test - Sat Aug  2 19:24:44 IST 2025
