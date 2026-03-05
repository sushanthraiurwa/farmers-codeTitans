# FarmLink

A modern farm-to-table marketplace built with Next.js 14, TypeScript, and TailwindCSS.

## 🌾 Features

- **Multi-role Platform**: Farmers, Buyers, and Admin dashboards
- **AI-powered Chatbot**: Smart assistance for users
- **Real-time Analytics**: Sales charts and demand forecasting
- **Responsive Design**: Mobile-first approach with TailwindCSS
- **TypeScript**: Full type safety across the application
- **Modern UI**: Clean, professional interface with TailwindCSS

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **State Management**: React Hooks

## 📁 Project Structure

```
farmlink/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Landing page
│   │   ├── layout.tsx         # Root layout
│   │   ├── auth/              # Authentication pages
│   │   ├── farmer/            # Farmer dashboard
│   │   ├── buyer/             # Buyer dashboard
│   │   └── admin/             # Admin dashboard
│   ├── components/            # Reusable components
│   │   ├── ui/                # Base UI components
│   │   ├── chatbot/           # AI Chatbot
│   │   ├── product/           # Product components
│   │   ├── cart/              # Shopping cart
│   │   └── dashboard/         # Dashboard components
│   ├── hooks/                 # Custom React hooks
│   ├── utils/                 # Utility functions
│   ├── types/                 # TypeScript type definitions
│   └── data/                  # Mock data
└── public/                    # Static assets
```

## 🛠️ Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:3000`

## 📱 Pages & Features

### Landing Page
- Multilingual support (English, Hindi, Kannada)
- Hero section with call-to-action
- Feature highlights
- AI demand forecast banner
- Statistics showcase

### Authentication
- Sign In / Sign Up pages
- Role-based access (Farmer/Buyer)
- Form validation
- Responsive design

### Farmer Dashboard
- **Overview**: Earnings, orders, ratings
- **Add Produce**: Product listing with AI price suggestions
- **Orders Management**: Accept/reject orders
- **Analytics**: Sales charts and performance metrics
- **Demand Map**: AI-powered demand heatmap

### Buyer Dashboard
- **Browse Products**: Advanced filtering and search
- **Shopping Cart**: Add/remove items, quantity management
- **Order History**: Track past purchases
- **Subscriptions**: Weekly/Monthly delivery plans
- **AI Chatbot**: Real-time assistance

### Admin Dashboard
- Platform statistics
- Farmer management
- Order monitoring
- System analytics

## 🎨 UI Components

### Reusable Components
- `Button`: Multiple variants and sizes
- `Input`: Form inputs with validation
- `Card`: Flexible card layouts
- `Badge`: Status indicators
- `StatsCard`: Dashboard statistics
- `SalesChart`: Interactive charts

### Specialized Components
- `Chatbot`: AI-powered assistant
- `ProductGrid`: Product display with filtering
- `CartItem`: Shopping cart management
- `DemandMap`: Visual demand analytics

## 🔧 Custom Hooks

- `useCart`: Shopping cart state management
- `useAuth`: Authentication state
- `useFilters`: Product filtering logic

## 📊 Data Management

- **Mock Data**: Products, farmers, orders, reviews
- **Type Safety**: Full TypeScript interfaces
- **Scalable**: Easy to replace with API calls

## 🌍 Multilingual Support

Built-in support for:
- English (en)
- Hindi (hi)
- Kannada (kn)

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Auto-deploy on push

### Other Platforms
```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🌟 Made with ❤️ for farmers everywhere
