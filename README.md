# Multi-Select Filter

A React application that implements a multi-select filter with search functionality. Users can search, filter, and select multiple items, with selected items displayed at the top of the list and persisted across page reloads. The application is built using modern frontend technologies and follows best practices for performance, maintainability, and user experience.

## Features

- **Multi-Select Filter:** Search, filter, and select multiple items from a dynamic list.

- **Optimized Performance:** Implements a **debounced search** using a custom hook to reduce unnecessary API calls.

- **Persistent Selection:** Selected items are stored in `localStorage` and persist across page reloads.

- **Responsive Design:** Adapts to different screen sizes for desktop and mobile devices.

- **Advanced CSS:** Uses **Sass, Flexbox**, and modern CSS techniques for a clean and responsive layout.

- **Type-Safe:** Built with **TypeScript** for improved developer experience and fewer runtime errors.

- **Tested:** Includes unit tests with **React Testing Library** and **Vitest** for better code reliability.

- **Modern Tooling:** Uses **Vite** for fast development and building, and **React Query** for data fetching and caching.

## How It Works

- The application fetches a list of items (from a provided JSON file) via HTTP.

- Users can search for items in real-time using a search input.
  🔸 **Debouncing** is applied: the search only triggers a new search after the user stops typing for a short delay, reducing unnecessary requests.

- The search is case-insensitive.

- Users can select multiple items, which are **highlighted** and displayed at the top of the list, separate from the search results.

- The selected items are stored in `localStorage`, ensuring they remain selected even after a page reload.

- The design is **responsive** and adjusts to various screen sizes, following the visual reference provided in the UI design (with approximate sizes that can be easily adjusted in the CSS).

## Technologies Used

- **React**: For building the UI components.
- **TypeScript**: For type safety and better developer experience.
- **Sass**: For CSS preprocessing.
- **React Query**: For data fetching and caching.
- **Vitest + React Testing Library**: For testing.
- **Vite**: For fast development and build setup.

## Installation

---

1. Clone the repository

```bash
git clone git@github.com:AlessandraPetry/Multi-Select-Filter.git
```

2. Navigate to the project directory

```bash
cd multi-select-filter
```

3. Install dependencies

```bash
npm install
```

4. Start the development server

```bash
npm run dev
```

## Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the application for production
- `npm run preview`: Preview the production build locally
- `npm run lint`: Run ESLint to check code quality
- `npm test`: Run tests in watch mode
- `npm run test:coverage`: Run tests with coverage report

## Live Demo

You can view the live version of the project [here](https://multi-select-filter-two.vercel.app/) (deployed via Vercel).

## Next Steps / Improvements

Here are some ideas for further improvements:

- 🛠️ Add animations or transitions for a smoother UX.

- 🛠️ Improve accessibility (e.g., ARIA roles and keyboard navigation).

- 🛠️ Implement integration tests for full user flows.

- 🛠️ Fetch items in batches.

- 🛠️ Add list sorting

## Design Reference

The layout was created based on the image below.

> Please note that some spacing and sizes are approximate and can be easily adjusted as needed.

![Layout of the implementation](/public/images/multi-select-filter.jpg)
