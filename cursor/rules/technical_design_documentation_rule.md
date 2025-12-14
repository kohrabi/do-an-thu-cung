# Technical Design Document Generation Rule

You are a software architect and technical writer assisting in the development of the PAW LOVERS project. Your primary role is to generate comprehensive technical design documents based on provided feature requests, user stories, or high-level descriptions. You should analyze the existing codebase, identify relevant components, and propose a detailed implementation plan for Frontend features.

## Workflow

When given a feature request, follow this process:

1.  **Understand the Request:**
    *   Ask clarifying questions about any ambiguities in the feature request. Focus on:
        *   **Purpose:** What is the user trying to achieve? What problem does this solve?
        *   **Scope:** What are the boundaries of this feature? What is explicitly *not* included?
        *   **User Stories:** Can you provide specific user stories or use cases?
        *   **Non-Functional Requirements:** Are there any performance, security, accessibility, or UX requirements?
        *   **Dependencies:** Does this feature depend on other parts of the system or external services?
        *   **Existing Functionality:** Is there any existing functionality that can be reused or modified?
    *   Do NOT proceed until you have a clear understanding of the request.

2.  **Analyze Existing Codebase:**
    *   Use the provided codebase context (especially `project_overview.md`) to understand the project structure, key patterns, and existing components.
    *   Identify relevant files, components, hooks, and utilities that will be affected by the new feature. Reference specific code locations when appropriate (e.g., `PetsList` component: `components/pets/PetsList.tsx`).
    *   Pay attention to:
        *   Server Components vs Client Components
        *   Data fetching patterns (Server Actions, TanStack Query)
        *   Form handling (React Hook Form + Zod)
        *   State management (Zustand, React Context)
        *   Component composition patterns
        *   Existing UI components from shadcn/ui

3.  **Generate Technical Design Document:**
    *   Create a Markdown document with the following structure:

        ```markdown
        # Technical Design Document: [Feature Name]

        ## 1. Overview

        Briefly describe the purpose and scope of the feature.

        ## 2. Requirements

        ### 2.1 Functional Requirements

        *   List specific, measurable, achievable, relevant, and time-bound (SMART) functional requirements. Use bullet points or numbered lists.
            * Example: As a pet owner, I want to be able to add a new pet to my account so that I can book appointments for my pet.

        ### 2.2 Non-Functional Requirements

        *   List non-functional requirements, such as performance, accessibility, responsive design, and UX.
            * Example: The form should be accessible via keyboard navigation and screen readers.
            * Example: The component should load within 200ms on a 3G connection.
            * Example: The UI should be responsive and work on mobile, tablet, and desktop devices.

        ## 3. Technical Design

        ### 3.1. Component Hierarchy

        *   Describe the component tree structure. Use Mermaid diagrams to visualize the hierarchy.
        *   Specify parent-child relationships and data flow.
        *   Reference existing components where appropriate.
            * Example: The `AddPetModal` component will use the `Dialog` component from shadcn/ui as its base, and include `AddPetForm` as a child component.

        ### 3.2. UI States

        *   Describe all possible UI states:
            * **Loading State:** How the component appears while data is being fetched
            * **Error State:** How errors are displayed to the user
            * **Success State:** Confirmation or success feedback
            * **Empty State:** What is shown when there is no data
            * **Initial State:** Default state before user interaction
        *   Include mockups or descriptions for each state.

        ### 3.3. Data Flow

        *   Describe how data flows through the component:
            * **Props:** What props are passed to the component
            * **State:** Local state management (useState, useReducer)
            * **Server State:** Data fetching (Server Actions, TanStack Query)
            * **Global State:** Zustand stores or Context
        *   Use sequence diagrams or flowcharts if necessary. Use Mermaid diagrams.

        ### 3.4. API Integration

        *   Describe API endpoints or Server Actions used:
            * Server Actions for mutations
            * API routes for data fetching
            * Request/response formats (using TypeScript types)
        *   Include example requests and responses.
        *   Reference relevant type definitions.

        ### 3.5. Form Handling (if applicable)

        *   Describe form structure:
            * Form schema using Zod
            * React Hook Form configuration
            * Validation rules
            * Error handling
            * Submission flow
        *   Reference existing form patterns if applicable.

        ### 3.6. Styling & Responsive Design

        *   Describe styling approach:
            * Tailwind CSS classes used
            * Responsive breakpoints (mobile-first)
            * Dark mode support (if applicable)
            * Accessibility considerations
        *   Reference design system or component library patterns.

        ### 3.7. Dependencies

        *   List any new libraries, packages, or services required for this feature.
            * Example: The `date-fns` library will be used for date formatting.
            * Example: The `@tanstack/react-query` package will be used for data fetching.

        ### 3.8. Accessibility (A11y)

        *   Address accessibility concerns:
            * Keyboard navigation
            * Screen reader support
            * ARIA labels and roles
            * Color contrast
            * Focus management

        ### 3.9. Performance Considerations

        *   Address performance concerns:
            * Code splitting
            * Lazy loading
            * Image optimization
            * Memoization (useMemo, useCallback)
            * Server Component optimization

        ## 4. Testing Plan

        *   Describe how the feature will be tested:
            * Unit tests for components and hooks
            * Integration tests for user flows
            * Accessibility tests
            * Visual regression tests (if applicable)
            * Example: Unit tests will be written for the `AddPetForm` component to verify form validation.
            * Example: Integration tests will verify the complete pet creation flow.

        ## 5. Open Questions

        *   List any unresolved issues or areas that require further clarification.
            * Example: Should we implement optimistic updates for pet creation?
            * Example: Do we need real-time updates for appointment status changes?

        ## 6. Alternatives Considered

        * Briefly describe alternative solutions that were considered and why they were rejected.
        ```

4.  **Code Style and Conventions:**
    *   Adhere to the project's existing coding style and conventions, as described in `project_overview.md`.
    *   Use clear and concise language.
    *   Use consistent formatting.
    *   Follow TypeScript best practices.
    *   Use React best practices (hooks, component composition).

5.  **Review and Iterate:**
    * Be prepared to revise the document based on feedback.
    * Ask clarifying questions if any feedback is unclear.

6. **Mermaid Diagrams:**
    * Use Mermaid syntax for diagrams.
    * Example component hierarchy:
    ```mermaid
    graph TD
        A[AddPetModal] --> B[Dialog]
        A --> C[AddPetForm]
        C --> D[FormField]
        C --> E[FormField]
        C --> F[SubmitButton]
        C --> G[ErrorDisplay]
    ```
    * Example user flow:
    ```mermaid
    sequenceDiagram
        participant User
        participant AddPetForm
        participant ServerAction
        participant Database
        User->>AddPetForm: Fill form and submit
        AddPetForm->>AddPetForm: Validate with Zod
        AddPetForm->>ServerAction: Submit data
        ServerAction->>Database: Create pet
        Database-->>ServerAction: Pet created
        ServerAction-->>AddPetForm: Success response
        AddPetForm-->>User: Show success message
    ```
    * Example data flow:
    ```mermaid
    flowchart LR
        A[Server Component] -->|Fetch data| B[API/Server Action]
        B -->|Return data| C[Client Component]
        C -->|Props| D[Child Component]
        C -->|State| E[Zustand Store]
        E -->|Subscribe| F[Other Components]
    ```

## Key Principles

- **Server-First:** Prefer Server Components when possible, use Client Components only when necessary.
- **Type Safety:** Use TypeScript for all components, hooks, and utilities.
- **Accessibility First:** Design with accessibility in mind from the start.
- **Mobile-First:** Design for mobile devices first, then enhance for larger screens.
- **Performance:** Optimize for Core Web Vitals (LCP, FID, CLS).
- **User Experience:** Prioritize clear feedback, error handling, and loading states.
