# Tech Context

## Technologies Used

### Core Framework & Libraries
- **Next.js 15.0.2**: React framework for production applications
- **React 18.2.0**: JavaScript library for building user interfaces
- **TypeScript 5**: Typed superset of JavaScript
- **TailwindCSS 3.4.1**: Utility-first CSS framework

### UI & Animation
- **shadcn/ui**: Reusable components built with Radix UI
  - `@radix-ui/react-dialog`
  - `@radix-ui/react-navigation-menu`
  - `@radix-ui/react-slot`
- **Framer Motion 11.11.11**: Animation library for React
- **Lenis 1.1.21**: Smooth scrolling library
- **Lucide React 0.454.0**: Icon library
- **Tabler Icons React 3.21.0**: Alternative icon library

### Styling Utilities
- **class-variance-authority 0.7.0**: For creating variant components
- **clsx 2.1.1**: Utility for conditionally joining classNames
- **tailwind-merge 2.5.4**: Utility for merging Tailwind CSS classes
- **tailwindcss-animate 1.0.7**: Animation utilities for Tailwind
- **tailwindcss-motion 0.4.1-beta**: Motion utilities for Tailwind

### Development Tools
- **ESLint 8**: JavaScript linting utility
- **PostCSS 8**: Tool for transforming CSS with JavaScript
- **eslint-config-next 15.0.2**: ESLint configuration for Next.js

## Development Setup

### Environment Requirements
- **Node.js**: Latest LTS version recommended
- **npm/yarn/pnpm**: Package manager for dependencies

### Project Structure
```
portfolio/
├── .next/                # Next.js build output
├── node_modules/         # Dependencies
├── public/               # Static assets
├── src/                  # Source code
│   ├── app/              # Next.js app router
│   ├── components/       # React components
│   ├── lib/              # Utility functions
│   ├── styles/           # Global styles
│   └── types/            # TypeScript type definitions
├── .eslintrc.json        # ESLint configuration
├── components.json       # shadcn/ui components configuration
├── next-env.d.ts         # Next.js TypeScript declarations
├── next.config.ts        # Next.js configuration
├── package.json          # Project dependencies and scripts
├── postcss.config.mjs    # PostCSS configuration
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

### Setup Commands
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Technical Constraints

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- IE11 not supported

### Performance Targets
- Lighthouse performance score > 90
- First Contentful Paint < 1.8s
- Largest Contentful Paint < 2.5s
- Time to Interactive < 3.8s

### Accessibility Requirements
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader friendly

## Dependencies Management
Dependencies are managed through npm with package.json. All required dependencies are listed in the package.json file. The project uses a mix of production dependencies and development dependencies to ensure optimal build size. 