# EcommercePro

A modern, responsive ecommerce web application built with React and Vite. This project features a clean UI, product catalog, shopping cart, wishlist, user profile, and more. Tailwind CSS is used for styling, and state management is handled with React Context.

## Features

- Product catalog with filtering, sorting, and search
- Product detail pages with image galleries and reviews
- Shopping cart with persistent state (localStorage)
- Wishlist functionality
- User profile page (demo data)
- Responsive design with dark/light theme toggle
- Toast notifications for user actions
- Modern UI with Tailwind CSS and DaisyUI
- Routing with React Router

## Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/) & [DaisyUI](https://daisyui.com/)
- [React Router](https://reactrouter.com/)
- [Framer Motion](https://www.framer.com/motion/) (animations)
- [Lucide React](https://lucide.dev/) (icons)
- [React Toastify](https://fkhadra.github.io/react-toastify/) (notifications)
- [Swiper](https://swiperjs.com/) (sliders)

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
https://github.com/your-username/ecommercePro.git
cd ecommercePro

# Install dependencies
npm install
# or
yarn install
```

### Development

```bash
# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173` (or as shown in your terminal).

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

- `src/` - Main source code
  - `components/` - Reusable UI components
  - `Context/` - React Context providers for state management
  - `hooks/` - Custom React hooks
  - `layout/` - Layout components (Header, Footer)
  - `pages/` - Main app pages (Shop, Cart, Product, Profile, etc.)
  - `assets/` - Images and static assets
- `public/` - Static files
- `index.html` - Main HTML entry point
- `vite.config.js` - Vite configuration
- `tailwind.config.js` - Tailwind CSS configuration

## Customization

- Add or edit products in `src/Context/ProductsContext.jsx`.
- Update theme colors in `tailwind.config.js`.
- Modify UI components in `src/components/` and `src/layout/`.

## License

This project is for educational/demo purposes. Feel free to use and modify it for your own learning!
