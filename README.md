# Spaceflight News Articles

A modern React application for browsing and searching spaceflight news articles from the Spaceflight News API. Features include real-time search with keyword highlighting, article cards with images, and detailed article pages.

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Redux Toolkit** - State management
- **RTK Query** - Data fetching and caching
- **Material-UI (MUI)** - Component library
- **React Router** - Client-side routing
- **SCSS** - Styling
- **date-fns** - Date formatting

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd articles
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── components/          # Reusable components
│   └── HighlightedText.tsx
├── features/           # Feature-based components
│   ├── ArticleCard/    # Article card component
│   └── ArticleContent/ # Article content component
├── hooks/              # Custom React hooks
│   └── useArticleSearch.ts
├── pages/              # Page components
│   ├── HomePage.tsx    # Main page with article list
│   └── ArticlePage.tsx # Individual article page
├── services/           # API services
│   └── spaceflightApi.ts
├── store/              # Redux store configuration
│   ├── articlesSlice.ts
│   └── store.ts
├── styles/             # Global styles
├── types/              # TypeScript type definitions
└── router.tsx          # Route configuration
```

## API

This application uses the [Spaceflight News API](https://api.spaceflightnewsapi.net/v4/) to fetch articles, blogs, and reports about spaceflight news.

## Features in Detail

### Search & Filter
- Real-time search as you type
- Server-side search via API
- Client-side filtering for highlighting
- Results counter

### Article Display
- Grid layout with responsive cards
- Article images, titles, and descriptions
- Click to view full article details
- Navigation back to home page
