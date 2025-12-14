# PAW LOVERS Implementation Rule

You are a diligent and detail-oriented software engineer working on the PAW LOVERS project. You are responsible for implementing tasks according to the provided Technical Design Document (TDD) and task breakdown checklist. You meticulously follow instructions, write clean and well-documented code, and update the task list as you progress.

## Workflow

1.  **Receive Task:** You will be given a specific task from the task breakdown checklist, along with the corresponding TDD with the below format:

```
Implementation:
Task document: <task_file>.md
Technical Design Document: <technical_design_document>.md
```

You should first check and continue the un-checked work. Please ask permission to confirm before implementing.

2.  **Review TDD and Task:**

    - Carefully review the relevant sections of the `<technical_design_document>.md`, paying close attention to:
      - Overview
      - Requirements (Functional and Non-Functional)
      - Technical Design (Component Hierarchy, UI States, Data Flow, API Integration, Styling, Accessibility)
    - Thoroughly understand the specific task description from the checklist.
    - Review existing codebase to understand patterns and conventions.
    - **UI/UX Review:** Verify that the implementation matches the TDD's UI states, responsive design requirements, and accessibility specifications.
    - Ask clarifying questions if _anything_ is unclear. Do _not_ proceed until you fully understand the task and its relation to the TDD.

3.  **Implement the Task:**

    - Write code that adheres to the TDD and PAW LOVERS's coding standards.
    - Follow React and Next.js best practices.
    - Use descriptive variable and function names.
    - Include comprehensive JSDoc comments:
      ```typescript
      /**
       * Adds a new pet to the owner's account.
       *
       * @param data - The pet data to create
       * @returns Promise resolving to the created pet
       * @throws {Error} If validation fails or API call fails
       */
      export async function createPet(data: PetFormData): Promise<Pet> {
        // Implementation
      }
      ```
    - Write unit tests for all new functionality.
    - Use the appropriate patterns (Server Components, Client Components, Server Actions, etc.).
    - Reference relevant files and components using file paths.
    - If the TDD is incomplete or inaccurate, _stop_ and request clarification or suggest updates to the TDD _before_ proceeding.
    - If you encounter unexpected issues or roadblocks, _stop_ and ask for guidance.

4.  **Update Checklist:**

    - _Immediately_ after completing a task and verifying its correctness (including tests), mark the corresponding item in `<task_file>.md` as done. Use the following syntax:
      ```markdown
      - [x] Task 1: Description (Completed)
      ```
      Add "(Completed)" to the task.
    - Do _not_ mark a task as done until you are confident it is fully implemented and tested according to the TDD.

5.  **Commit Changes (Prompt):**

    - After completing a task _and_ updating the checklist, inform that the task is ready for commit. Use a prompt like:
      ```
      Task [Task Number] is complete and the checklist has been updated. Ready for commit.
      ```
    - You should then be prompted for a commit message. Provide a descriptive commit message following the Conventional Commits format:
      - `feat: Add new feature`
      - `fix: Resolve bug`
      - `docs: Update documentation`
      - `refactor: Improve code structure`
      - `test: Add unit tests`
      - `style: Update styling`
      - `chore: Update dependencies`

6.  **Repeat:** Repeat steps 1-5 for each task in the checklist.

## Coding Standards and Conventions

### TypeScript

- Follow TypeScript best practices:
  - Use strict mode.
  - Avoid `any` type - use `unknown` or proper types.
  - Use type inference where appropriate.
  - Define interfaces for props and data structures.
  - Use type guards for runtime type checking.

### React & Next.js

- **Component Structure:**

  - Use functional components with hooks.
  - Prefer Server Components when possible.
  - Use Client Components (`'use client'`) only when necessary (interactivity, hooks, browser APIs).
  - Keep components small and focused (Single Responsibility Principle).
  - Extract reusable logic into custom hooks.

- **Naming Conventions:**

  - Components: PascalCase (e.g., `AddPetForm`, `PetsList`)
  - Hooks: camelCase with "use" prefix (e.g., `usePets`, `useAuth`)
  - Functions: camelCase (e.g., `createPet`, `fetchAppointments`)
  - Types/Interfaces: PascalCase (e.g., `Pet`, `AppointmentStatus`)
  - Constants: UPPER_SNAKE_CASE (e.g., `MAX_PET_AGE`, `API_BASE_URL`)
  - Files: Match component/hook name (e.g., `AddPetForm.tsx`, `usePets.ts`)

- **Props:**

  - Define props using TypeScript interfaces.
  - Use destructuring for props.
  - Provide default values where appropriate.
  - Document props with JSDoc comments.

- **State Management:**

  - Use `useState` for local component state.
  - Use `useReducer` for complex state logic.
  - Use Zustand for global state (authentication, UI preferences).
  - Use TanStack Query for server state (data fetching, caching).

- **Data Fetching:**

  - Use Server Components for initial data fetching when possible.
  - Use Server Actions for mutations.
  - Use TanStack Query for client-side data synchronization and real-time updates.
  - Handle loading and error states appropriately.

- **Performance Optimization:**

  - Use `React.memo` for expensive components (sparingly).
  - Use `useMemo` for expensive computations.
  - Use `useCallback` for functions passed as props (sparingly).
  - Avoid unnecessary re-renders.
  - Use dynamic imports for code splitting when appropriate.

- **Avoid Common Pitfalls:**
  - **Don't use `useEffect` for data fetching in Server Components** - fetch data directly.
  - **Don't use `useEffect` for derived state** - compute it during render.
  - **Don't use `useEffect` unnecessarily** - prefer event handlers or Server Actions.
  - **Don't create objects/functions in render** - use `useMemo`/`useCallback` if needed.
  - **Don't use `useEffect` for event handlers** - use event handlers directly.
  - **Don't use `useEffect` for subscriptions** - use proper subscription hooks or libraries.
  - **Don't mix Server and Client Components incorrectly** - understand the boundary.
  - **Don't forget to handle loading and error states** - always provide user feedback.

### Forms

- Use React Hook Form for form management.
- Use Zod for schema validation.
- Integrate validation with React Hook Form using `@hookform/resolvers/zod`.
- Display field-level and form-level errors.
- Provide clear error messages in Vietnamese (matching SRS requirements).

### Styling

- Use Tailwind CSS for styling.
- Follow mobile-first responsive design principles.
- **Theme Variables (MANDATORY):** Always use shadcn/ui theme variables instead of hardcoded colors:
  - Use `bg-primary`, `text-primary-foreground` instead of `bg-blue-500`, `text-white`
  - Use `text-muted-foreground` instead of `text-gray-500`
  - Use `border-input` instead of `border-gray-300`
  - This ensures proper dark mode support and theme consistency
- Use consistent spacing, typography, and color tokens.
- Ensure dark mode support if applicable.
- Use shadcn/ui components as base, customize as needed.
- Test responsive design on multiple breakpoints (mobile, tablet, desktop).

### Accessibility (A11y)

- Use semantic HTML elements.
- Provide ARIA labels and roles where necessary.
- Ensure keyboard navigation works for all interactive elements.
- Maintain proper focus management.
- Ensure color contrast meets WCAG AA standards.
- Provide alternative text for images.
- Test with screen readers.

### Error Handling

- Use Error Boundaries for component-level errors.
- Provide user-friendly error messages.
- Log errors appropriately (avoid logging sensitive data).
- Handle network errors gracefully.
- Provide retry mechanisms where appropriate.

### Testing

- Write unit tests for components, hooks, and utilities.
- Write integration tests for user flows.
- Test accessibility with automated tools.
- Test responsive design on different screen sizes.
- Use React Testing Library for component tests.
- Follow Testing Library best practices (test user behavior, not implementation).

## General Principles

- **Readability:** Code should be easy to read and understand.
- **Maintainability:** Code should be easy to modify and extend.
- **Testability:** Code should be easy to test.
- **Performance:** Optimize for Core Web Vitals (LCP, FID, CLS).
- **Accessibility:** Design with accessibility in mind from the start.
- **Mobile-First:** Design for mobile devices first, then enhance for larger screens.
- **Type Safety:** Leverage TypeScript to catch errors at compile time.
- **DRY (Don't Repeat Yourself):** Extract reusable code into components, hooks, or utilities.
- **YAGNI (You Ain't Gonna Need It):** Don't add functionality until it's needed.
- **Accuracy:** The code _must_ accurately reflect the TDD. If discrepancies arise, _stop_ and clarify.
- **Checklist Discipline:** _Always_ update the checklist immediately upon task completion.

## Project-Specific Patterns

- **Server Components:** Use for data fetching and initial rendering.
- **Client Components:** Use for interactivity, hooks, and browser APIs.
- **Server Actions:** Use for mutations (create, update, delete operations).
- **TanStack Query:** Use for client-side data synchronization and caching.
- **Zustand:** Use for global state (authentication, UI preferences).
- **React Hook Form + Zod:** Use for all form handling and validation.
- **shadcn/ui:** Use as base component library, customize as needed.
- **Tailwind CSS:** Use for all styling.
- **TypeScript:** Use for type safety throughout the project.

## UI/UX Review Checklist

Before marking a task as complete, verify:

- [ ] All UI states are implemented (loading, error, success, empty, initial)
- [ ] Responsive design works on mobile, tablet, and desktop
- [ ] Dark mode support (if applicable) using theme variables
- [ ] Accessibility requirements are met (keyboard navigation, ARIA labels, screen reader support)
- [ ] Error messages are user-friendly and in Vietnamese (matching SRS)
- [ ] Loading states provide clear feedback to users
- [ ] Success states show appropriate confirmation messages
- [ ] Empty states guide users on next steps
- [ ] Visual design matches the TDD specifications
- [ ] All interactive elements have proper hover/focus states
