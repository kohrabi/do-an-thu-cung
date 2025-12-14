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
│   ├── kennels/           - Kennel management components
│   │   ├── KennelGrid.tsx - Visual grid display of kennels
│   │   ├── KennelSlot.tsx - Individual kennel slot with status colors
│   │   └── KennelFilter.tsx - Filter by area/type
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
("use client");

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function AddPetForm() {
  const form = useForm({
    resolver: zodResolver(petSchema),
  });

  // Client-side interactivity
  return <form>...</form>;
}
```

2. **Data Access Strategy**:
   - Clear separation between Reads (queries) and Writes (mutations)
   - **Reads (Đọc dữ liệu):**
     - **Server Components:** Call database or service layer directly for initial data fetching
     - **Client Components:** Use API Routes combined with TanStack Query for interactive data fetching, polling, or real-time updates
   - **Writes (Ghi dữ liệu):**
     - **MUST use Server Actions** for all Create/Update/Delete operations (mutations)
     - Server Actions provide `revalidatePath` for cache invalidation and type-safety
     - Never use API Routes for mutations

```typescript
// Server Component - Direct DB access for initial data
// app/dashboard/manager/pets/page.tsx
export default async function PetsPage() {
  const pets = await db.pet.findMany(); // Direct database call
  return <PetsListClient initialPets={pets} />;
}

// Client Component - API Route + TanStack Query for interactive fetching
// components/pets/PetsListClient.tsx
("use client");

import { useQuery } from "@tanstack/react-query";

export function PetsListClient({ initialPets }: { initialPets: Pet[] }) {
  const { data: pets } = useQuery({
    queryKey: ["pets"],
    queryFn: () => fetch("/api/pets").then((res) => res.json()),
    initialData: initialPets, // Use server-fetched data as initial data
    refetchInterval: 5000, // Polling for real-time updates
  });

  return <div>{/* Render pets */}</div>;
}

// Server Action - MUST use for mutations
// app/actions/pets.actions.ts
("use server");

import { revalidatePath } from "next/cache";

export async function createPet(data: PetFormData) {
  const pet = await db.pet.create({ data });
  revalidatePath("/dashboard/manager/pets"); // Invalidate cache
  return pet;
}

// Client Component - Call Server Action for mutations
// components/forms/AddPetForm.tsx
("use client");

import { createPet } from "@/app/actions/pets.actions";

export function AddPetForm() {
  const onSubmit = async (data: PetFormData) => {
    await createPet(data); // Server Action, not API Route
  };

  return <form onSubmit={handleSubmit(onSubmit)}>...</form>;
}
```

3. **Data Fetching with TanStack Query**:
   - Client-side data synchronization and caching
   - Real-time updates via polling
   - Optimistic updates for better UX

```typescript
// lib/hooks/usePets.ts
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function usePets() {
  return useQuery({
    queryKey: ["pets"],
    queryFn: () => fetch("/api/pets").then((res) => res.json()),
  });
}

export function useCreatePet() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePetData) => createPet(data), // Server Action
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pets"] });
    },
  });
}
```

4. **Form Handling with React Hook Form + Zod**:
   - Type-safe form validation
   - Server Actions for form submission

```typescript
// lib/schemas/pet.schema.ts
import { z } from "zod";

export const petSchema = z.object({
  name: z.string().min(1, "Tên thú cưng là bắt buộc"),
  species: z.enum([
    "dog",
    "cat",
    "rabbit",
    "bird",
    "hamster",
    "parrot",
    "reptile",
  ]),
  breed: z.string().optional(),
  gender: z.enum(["male", "female"]),
  age: z.number().min(0),
  weight: z.number().min(0),
  color: z.string().optional(),
  healthStatus: z.string().optional(),
});

export type PetFormData = z.infer<typeof petSchema>;

// components/forms/AddPetForm.tsx
("use client");

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { petSchema, type PetFormData } from "@/lib/schemas/pet.schema";

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

5. **State Management with Zustand**:
   - Global state for user authentication, UI state
   - Local state for component-specific data

```typescript
// lib/stores/auth.store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

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
    { name: "auth-storage" }
  )
);
```

6. **Component Composition with shadcn/ui**:
   - Base UI components from shadcn/ui
   - Custom components built on top

```typescript
// components/ui/button.tsx (shadcn/ui)
import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium",
        className
      )}
      {...props}
    />
  );
});

// components/forms/SubmitButton.tsx (custom)
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

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
export type UserRole =
  | "manager"
  | "vet"
  | "care-staff"
  | "receptionist"
  | "owner";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  address?: string;
}

// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken, getUserRole } from "@/lib/auth";

// Role-based route access mapping
const roleRoutes: Record<string, string[]> = {
  manager: ["/dashboard/manager"],
  vet: ["/dashboard/vet"],
  "care-staff": ["/dashboard/care-staff"],
  receptionist: ["/dashboard/receptionist"],
  owner: ["/dashboard/owner"],
};

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token");
  const { pathname } = request.nextUrl;

  // Protect dashboard routes
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Verify token and get user role
    try {
      const payload = verifyToken(token.value);
      const userRole = getUserRole(payload);

      // Check if user has access to this route
      const allowedRoutes = roleRoutes[userRole] || [];
      const hasAccess = allowedRoutes.some((route) =>
        pathname.startsWith(route)
      );

      if (!hasAccess) {
        // Redirect to user's default dashboard
        const defaultRoute = allowedRoutes[0] || "/dashboard";
        return NextResponse.redirect(new URL(defaultRoute, request.url));
      }
    } catch (error) {
      // Invalid token, redirect to login
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
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
  gender: "male" | "female";
  age: number;
  weight: number;
  color?: string;
  healthStatus?: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type PetSpecies =
  | "dog"
  | "cat"
  | "rabbit"
  | "bird"
  | "hamster"
  | "parrot"
  | "reptile";
```

3. **Appointment System**:
   - Appointment booking and management
   - Status tracking (pending, confirmed, in-progress, completed, cancelled)

```typescript
// lib/types/appointment.types.ts
export type AppointmentStatus =
  | "pending"
  | "confirmed"
  | "in-progress"
  | "completed"
  | "cancelled";

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
export type ServiceType =
  | "bath"
  | "spa"
  | "exam"
  | "vaccination"
  | "grooming"
  | "boarding";

export interface Service {
  id: string;
  name: string;
  type: ServiceType;
  description?: string;
  price: number;
  unit: "per-visit" | "per-day" | "per-month";
  status: "active" | "inactive";
}
```

5. **Boarding & Kennel Management**:
   - Kennel entity with status tracking
   - Boarding booking linking pets to kennels
   - Visual kennel map for selection

```typescript
// lib/types/kennel.types.ts
export type KennelStatus = "available" | "occupied" | "maintenance" | "dirty";
export type KennelSize = "small" | "medium" | "large" | "xlarge";
export type KennelType = "dog-small" | "dog-large" | "cat" | "special";

export interface Kennel {
  id: string;
  name: string; // e.g., "C001", "C002"
  location: string; // e.g., "Tầng 1 - Khu A"
  size: KennelSize;
  type: KennelType;
  status: KennelStatus;
  description?: string;
  suitableFor: PetSpecies[]; // Which pet species can use this kennel
  createdAt: Date;
  updatedAt: Date;
}

export interface BoardingBooking {
  id: string;
  petId: string;
  kennelId: string;
  checkInAt: Date;
  checkOutAt?: Date;
  expectedCheckOutAt?: Date;
  status: "scheduled" | "checked-in" | "checked-out" | "cancelled";
  notes?: string;
  dailyRate: number;
  totalDays?: number;
  totalCost?: number;
  createdAt: Date;
  updatedAt: Date;
  // Relations
  pet?: Pet;
  kennel?: Kennel;
}
```

6. **Real-time Updates**:
   - Kennel status updates in real-time
   - Options: Supabase Realtime, React Query polling, or WebSocket

```typescript
// lib/hooks/useKennels.ts - Real-time kennel status
"use client";

import { useQuery } from "@tanstack/react-query";

export function useKennels(options?: {
  area?: string;
  status?: KennelStatus[];
  pollingInterval?: number; // For real-time updates
}) {
  return useQuery({
    queryKey: ["kennels", options],
    queryFn: () => fetchKennels(options),
    refetchInterval: options?.pollingInterval || 5000, // Poll every 5 seconds for real-time updates
    staleTime: 0, // Always consider data stale to get fresh updates
  });
}

// Alternative: Using Supabase Realtime (if using Supabase)
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export function useKennelsRealtime() {
  const [kennels, setKennels] = useState<Kennel[]>([]);
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    // Initial fetch
    fetchKennels().then(setKennels);

    // Subscribe to real-time changes
    const channel = supabase
      .channel("kennels-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "kennels" },
        (payload) => {
          // Update local state based on real-time event
          if (payload.eventType === "UPDATE") {
            setKennels((prev) =>
              prev.map((k) =>
                k.id === payload.new.id ? (payload.new as Kennel) : k
              )
            );
          } else if (payload.eventType === "INSERT") {
            setKennels((prev) => [...prev, payload.new as Kennel]);
          } else if (payload.eventType === "DELETE") {
            setKennels((prev) => prev.filter((k) => k.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { data: kennels, isLoading: false };
}
```

## Infrastructure Highlights

1. **API Integration**:
   - Server Actions for mutations
   - API routes for external integrations
   - Type-safe API clients

```typescript
// app/actions/pets.actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { petSchema, type PetFormData } from "@/lib/schemas/pet.schema";

export async function createPet(data: PetFormData) {
  const validated = petSchema.parse(data);

  // Database operation
  const pet = await db.pet.create({ data: validated });

  revalidatePath("/dashboard/manager/pets");
  return pet;
}

// lib/api/pets.api.ts
export async function fetchPets(): Promise<Pet[]> {
  const res = await fetch(`${process.env.API_URL}/pets`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Failed to fetch pets");
  return res.json();
}
```

2. **Error Handling**:
   - Error boundaries for component-level errors
   - Global error handling in layouts
   - User-friendly error messages

```typescript
// app/error.tsx
"use client";

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
import { Suspense } from "react";
import { PetsList } from "@/components/pets/PetsList";
import { PetsListSkeleton } from "@/components/pets/PetsListSkeleton";

export default function PetsPage() {
  return (
    <Suspense fallback={<PetsListSkeleton />}>
      <PetsList />
    </Suspense>
  );
}
```

4. **Visual Kennel Map Components**:
   - Grid-based visual representation of kennels
   - Real-time status updates with color coding
   - Interactive selection for booking

```typescript
// components/kennels/KennelGrid.tsx
"use client";

import { useKennels } from "@/lib/hooks/useKennels";
import { KennelSlot } from "./KennelSlot";
import { KennelFilter } from "./KennelFilter";
import { useState } from "react";

export function KennelGrid() {
  const [filters, setFilters] = useState({ area: "", status: [] as string[] });
  const { data: kennels, isLoading } = useKennels({
    ...filters,
    pollingInterval: 3000, // Real-time updates every 3 seconds
  });

  if (isLoading) return <KennelGridSkeleton />;

  return (
    <div className="space-y-4">
      <KennelFilter filters={filters} onFiltersChange={setFilters} />
      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
        {kennels?.map((kennel) => (
          <KennelSlot
            key={kennel.id}
            kennel={kennel}
            onClick={() => handleKennelSelect(kennel)}
          />
        ))}
      </div>
    </div>
  );
}

// components/kennels/KennelSlot.tsx
("use client");

import { Kennel, KennelStatus } from "@/lib/types/kennel.types";
import { cn } from "@/lib/utils";

const statusColors: Record<KennelStatus, string> = {
  available: "bg-green-500 hover:bg-green-600",
  occupied: "bg-red-500 hover:bg-red-600",
  maintenance: "bg-yellow-500 hover:bg-yellow-600",
  dirty: "bg-orange-500 hover:bg-orange-600",
};

export function KennelSlot({
  kennel,
  onClick,
}: {
  kennel: Kennel;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={kennel.status !== "available"}
      className={cn(
        "p-4 rounded-lg text-white font-semibold transition-colors",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        statusColors[kennel.status]
      )}
      aria-label={`Chuồng ${kennel.name}, Trạng thái: ${kennel.status}`}
    >
      <div className="text-sm">{kennel.name}</div>
      <div className="text-xs mt-1 opacity-90">
        {kennel.status === "available" && "Trống"}
        {kennel.status === "occupied" && "Đang dùng"}
        {kennel.status === "maintenance" && "Bảo trì"}
        {kennel.status === "dirty" && "Cần vệ sinh"}
      </div>
    </button>
  );
}

// components/kennels/KennelFilter.tsx
("use client");

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export function KennelFilter({
  filters,
  onFiltersChange,
}: {
  filters: { area: string; status: string[] };
  onFiltersChange: (filters: { area: string; status: string[] }) => void;
}) {
  return (
    <div className="flex gap-4 items-center">
      <Select
        value={filters.area}
        onValueChange={(value) => onFiltersChange({ ...filters, area: value })}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Chọn khu vực" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">Tất cả khu vực</SelectItem>
          <SelectItem value="floor-1">Tầng 1</SelectItem>
          <SelectItem value="floor-2">Tầng 2</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex gap-2">
        {["available", "occupied", "maintenance", "dirty"].map((status) => (
          <label key={status} className="flex items-center gap-2">
            <Checkbox
              checked={filters.status.includes(status)}
              onCheckedChange={(checked) => {
                onFiltersChange({
                  ...filters,
                  status: checked
                    ? [...filters.status, status]
                    : filters.status.filter((s) => s !== status),
                });
              }}
            />
            <span className="text-sm">{getStatusLabel(status)}</span>
          </label>
        ))}
      </div>
    </div>
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
- TanStack Query (React Query) - For data fetching and real-time polling
- Zustand - For global state management
- Lucide React (icons)
- date-fns (date utilities)
- @supabase/supabase-js (optional) - For real-time updates via Supabase Realtime

## Real-time Updates Strategy

For the Visual Kennel Map feature, we support multiple approaches:

1. **React Query Polling (Recommended for MVP)**:

   - Set `refetchInterval` to 3-5 seconds for kennel status
   - Simple to implement, no additional infrastructure
   - Suitable for moderate update frequency

2. **Supabase Realtime (For Production)**:

   - Real-time database subscriptions
   - Instant updates when kennel status changes
   - Requires Supabase backend setup

3. **WebSocket (For Custom Backend)**:
   - Custom WebSocket server for real-time updates
   - Full control over update logic
   - More complex to implement

**Recommendation**: Start with React Query polling for MVP, migrate to Supabase Realtime or WebSocket for production if needed.

This structure provides a maintainable foundation for a pet care management system with robust user experience, type safety, performance optimization, and real-time capabilities for critical features like kennel management.
