# Knowledge Spaces

## Overview

Knowledge Spaces is an interactive application built using React, Redux, and Next.js. It enables users to create, view, and relate knowledge cards in a spatial canvas. Each card may represent articles, videos, posts, and more — offering a clean and modern UX to explore information visually.

⸻

🧠 Key Decisions & Approach
 • Next.js 15 App Router was used for routing and server-side rendering.
 • Redux Toolkit was implemented for state management across components, including card states and navigation.
 • Component-Based Architecture promotes modularity and reuse (e.g., Article, SublimeVideo, etc.).
 • Jest and React Testing Library were integrated for unit and integration testing.
 • TypeScript enforces type safety and improves development velocity.

⸻

🛠 How to Run Locally

## 1. Install Dependencies

npm install

or

yarn install

## 2. Start the Development Server

npm run dev

or

yarn dev

Visit <http://localhost:3000> in your browser.

## 3. Run Tests

npm run test

or

yarn test

⸻

🚀 Performance Optimizations
 • Next/Image was used for optimized asset loading.
 • Redux slices were separated and memoized where necessary.
 • Selective Component Mocking for test performance.

⸻

⚠️ Challenges Faced

• Testing with Next.js 15 & TypeScript: Required setup of ts-jest, resolution of path aliases, and custom mocks for Next Image and router.

• Mocking SVGs and Styles: Setup of moduleNameMapper was required for proper mocking of .css and .svg files.

• Dynamic Imports for Assets: next/image required absolute or root-based paths in tests.

• Creating the Knowledge Spaces page: A major challenge involved designing a flexible UI where cards could be positioned, connected, and interacted with fluidly. Building the logic to create directional relationships between cards and managing card placement took significant effort to get right. Integrating this with Redux while maintaining good performance and UX was a deep engineering task.

⸻

🧩 What Could Be Improved
 • Code Splitting: Introduce dynamic imports for heavy content components.
 • UI Polish: Enhance visual design (hover states, animations, edge case layout).
 • Accessibility: Add keyboard navigation and ARIA attributes.
 • Undo/Redo: Add history management for relationships and card movement.
 • E2E Testing: hile the infrastructure is in place for unit testing, I didn't have the chance to fully implement testing.
 • CI/CD: Add GitHub Actions for automated testing and linting.

⸻

👨‍💻 Author

Andrés Billini

⸻

🙏 Thank You

Thank you for the opportunity to work on this challenge. I enjoyed the intersection of visual creativity, React logic, and data management. Looking forward to feedback!
