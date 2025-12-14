# PAW LOVERS Project Overview

## Project Structure
The project follows Next.js App Router architecture with feature-based organization and component composition:

```
paw-lovers/
├── app/                    - Next.js App Router pages and layouts
│   ├── (auth)/            - Authentication routes (login, register, reset-password)
│   ├── dashboard/         - Protected dashboard routes
│   │   ├── manager/       - Manager dashboard and features
│   │   ├── vet/           - Veterinarian dashboard and features
│   │   ├── care-staff/    - Care staff dashboard and features
│   │   ├── receptionist/   - Receptionist dashboard and features
│   │   └── owner/         - Pet owner dashboard and features
│   ├── layout.tsx         - Root layout
│   └── page.tsx           - Home page
├── components/             - Reusable React components
│   ├── ui/                - shadcn/ui base components
│   ├── forms/             - Form components (LoginForm, RegistrationForm, etc.)
│   ├── modals/            - Modal components (AddPetModal, BookAppointmentModal, etc.)
│   ├── tables/            - Table components (ServiceTable, StaffTable, etc.)
│   ├── charts/             - Chart components (RevenueChart, etc.)
│   ├── dashboard/         - Dashboard-specific components
│   └── layout/            - Layout components (Sidebar, DashboardHeader, etc.)
├── lib/                    - Utility libraries and configurations
│   ├── api/               - API client functions
│   ├── hooks/             - Custom React hooks
│   ├── stores/            - State management (Zustand stores)
│   ├── utils/             - Utility functions (constants, validation, theme)
│   └── types/             - TypeScript type definitions
├── styles/                 - Global styles and Tailwind configurations
└── public/                 - Static assets
```

## Key Patterns & Concepts

1. **Server Components vs Client Components**:
   - Server Components (default): Fetch data, render on server, no JavaScript sent to client
   - Client Components (`'use client'`): Interactive UI, hooks, browser APIs
   
```typescript
// Server Component (default)
// app/dashboard/manager/pets/page.tsx
export default async function PetsPage() {
  const pets = await fetchPets(); // Server-side data fetching
  
  return <PetsList pets={pets} />;
}

// Client Component
// components/forms/AddPetForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export function AddPetForm() {
  const form = useForm({
    resolver: zodResolver(petSchema),
  });
  
  // Client-side interactivity
  return <form>...</form>;
}
```

2. **Data Fetching with TanStack Query**:
   - Server-side fetching in Server Components
   - Client-side fetching with React Query for real-time updates
   
```typescript
// lib/hooks/usePets.ts
'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function usePets() {
  return useQuery({
    queryKey: ['pets'],
    queryFn: () => fetch('/api/pets').then(res => res.json()),
  });
}

export function useCreatePet() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreatePetData) => 
      fetch('/api/pets', { method: 'POST', body: JSON.stringify(data) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pets'] });
    },
  });
}
```

3. **Form Handling with React Hook Form + Zod**:
   - Type-safe form validation
   - Server Actions for form submission
   
```typescript
// lib/schemas/pet.schema.ts
import { z } from 'zod';

export const petSchema = z.object({
  name: z.string().min(1, 'Tên thú cưng là bắt buộc'),
  species: z.enum(['dog', 'cat', 'rabbit', 'bird', 'hamster', 'parrot', 'reptile']),
  breed: z.string().optional(),
  gender: z.enum(['male', 'female']),
  age: z.number().min(0),
  weight: z.number().min(0),
  color: z.string().optional(),
  healthStatus: z.string().optional(),
});

export type PetFormData = z.infer<typeof petSchema>;

// components/forms/AddPetForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { petSchema, type PetFormData } from '@/lib/schemas/pet.schema';

export function AddPetForm() {
  const form = useForm<PetFormData>({
    resolver: zodResolver(petSchema),
  });
  
  const onSubmit = async (data: PetFormData) => {
    // Server Action or API call
    await createPet(data);
  };
  
  return <form onSubmit={form.handleSubmit(onSubmit)}>...</form>;
}
```

4. **State Management with Zustand**:
   - Global state for user authentication, UI state
   - Local state for component-specific data
   
```typescript
// lib/stores/auth.store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
    }),
    { name: 'auth-storage' }
  )
);
```

5. **Component Composition with shadcn/ui**:
   - Base UI components from shadcn/ui
   - Custom components built on top
   
```typescript
// components/ui/button.tsx (shadcn/ui)
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export const Button = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md text-sm font-medium',
          className
        )}
        {...props}
      />
    );
  }
);

// components/forms/SubmitButton.tsx (custom)
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export function SubmitButton({ isLoading, children }: SubmitButtonProps) {
  return (
    <Button type="submit" disabled={isLoading}>
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
}
```

## Core Domain Models

1. **User Roles & Authentication**:
   - Manager, Veterinarian, Care Staff, Receptionist, Pet Owner
   - Role-based access control (RBAC)
   - Protected routes with middleware
   
```typescript
// lib/types/user.types.ts
export type UserRole = 'manager' | 'vet' | 'care-staff' | 'receptionist' | 'owner';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  address?: string;
}

// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token');
  const { pathname } = request.nextUrl;
  
  // Protect dashboard routes
  if (pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  return NextResponse.next();
}
```

2. **Pet Management**:
   - Pet entity with full CRUD operations
   - Pet history tracking
   
```typescript
// lib/types/pet.types.ts
export interface Pet {
  id: string;
  name: string;
  species: PetSpecies;
  breed?: string;
  gender: 'male' | 'female';
  age: number;
  weight: number;
  color?: string;
  healthStatus?: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type PetSpecies = 'dog' | 'cat' | 'rabbit' | 'bird' | 'hamster' | 'parrot' | 'reptile';
```

3. **Appointment System**:
   - Appointment booking and management
   - Status tracking (pending, confirmed, in-progress, completed, cancelled)
   
```typescript
// lib/types/appointment.types.ts
export type AppointmentStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'in-progress' 
  | 'completed' 
  | 'cancelled';

export interface Appointment {
  id: string;
  petId: string;
  serviceId: string;
  scheduledAt: Date;
  status: AppointmentStatus;
  notes?: string;
  createdAt: Date;
}
```

4. **Service Management**:
   - Service catalog with pricing
   - Service types (bath, spa, exam, vaccination, grooming, boarding)
   
```typescript
// lib/types/service.types.ts
export type ServiceType = 'bath' | 'spa' | 'exam' | 'vaccination' | 'grooming' | 'boarding';

export interface Service {
  id: string;
  name: string;
  type: ServiceType;
  description?: string;
  price: number;
  unit: 'per-visit' | 'per-day' | 'per-month';
  status: 'active' | 'inactive';
}
```

## Infrastructure Highlights

1. **API Integration**:
   - Server Actions for mutations
   - API routes for external integrations
   - Type-safe API clients
   
```typescript
// app/actions/pets.actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { petSchema, type PetFormData } from '@/lib/schemas/pet.schema';

export async function createPet(data: PetFormData) {
  const validated = petSchema.parse(data);
  
  // Database operation
  const pet = await db.pet.create({ data: validated });
  
  revalidatePath('/dashboard/manager/pets');
  return pet;
}

// lib/api/pets.api.ts
export async function fetchPets(): Promise<Pet[]> {
  const res = await fetch(`${process.env.API_URL}/pets`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  
  if (!res.ok) throw new Error('Failed to fetch pets');
  return res.json();
}
```

2. **Error Handling**:
   - Error boundaries for component-level errors
   - Global error handling in layouts
   - User-friendly error messages
   
```typescript
// app/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2>Đã xảy ra lỗi!</h2>
      <button onClick={reset}>Thử lại</button>
    </div>
  );
}
```

3. **Loading States**:
   - Loading UI with Suspense
   - Skeleton loaders
   - Optimistic updates
   
```typescript
// app/dashboard/manager/pets/page.tsx
import { Suspense } from 'react';
import { PetsList } from '@/components/pets/PetsList';
import { PetsListSkeleton } from '@/components/pets/PetsListSkeleton';

export default function PetsPage() {
  return (
    <Suspense fallback={<PetsListSkeleton />}>
      <PetsList />
    </Suspense>
  );
}
```

## Key Flows

1. **Pet Registration Flow**:
   ```
   Owner Dashboard → Add Pet Form → Validation → Server Action → Database → Revalidate → Update UI
   ```

2. **Appointment Booking Flow**:
   ```
   Owner Dashboard → Select Pet → Select Service → Choose Date/Time → 
   Check Availability → Submit → Server Action → Create Appointment → Notification
   ```

3. **Authentication Flow**:
   ```
   Login Page → Form Submission → API Call → JWT Token → Store in Zustand → 
   Redirect to Dashboard → Protected Route Check
   ```

## Getting Started Tips

1. Start with Server Components for data fetching
2. Use Client Components only when needed (interactivity, hooks, browser APIs)
3. Leverage Server Actions for mutations
4. Use TanStack Query for client-side data synchronization
5. Follow mobile-first responsive design principles
6. Ensure accessibility (A11y) from the start

## Important Dependencies
- Next.js 14+ (App Router)
- React 18+
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Hook Form
- Zod
- TanStack Query (React Query)
- Zustand
- Lucide React (icons)
- date-fns (date utilities)

This structure provides a maintainable foundation for a pet care management system with robust user experience, type safety, and performance optimization.

