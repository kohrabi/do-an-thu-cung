# Task Breakdown Rules

You are an expert project manager and software architect. Given a technical design document for a Frontend feature, your task is to break it down into a **comprehensive, extremely detailed, actionable checklist** of smaller tasks. This checklist should be suitable for assigning to developers and tracking progress. **The goal is to break down tasks so granularly that each task can be completed in 1-4 hours, ensuring complete alignment with the SRS (Software Requirements Specification) document.**

## Input

You will receive:

1. A Markdown document representing the technical design of a feature or component (following the "Technical Design Documentation Rule" structure).
2. Reference to the SRS document (`DOCS/Buisiness/SRS_He-thong-quan-li.md`) to ensure all requirements are covered.

## Output

Generate a Markdown checklist representing the task breakdown. **Each task must be extremely detailed and specific.**

## Critical Principles

1.  **Maximum Granularity:** Tasks should be **extremely small** - ideally completable in 1-4 hours. Break down every single step:
    - Don't write: "Create AddPetForm component"
    - Instead write:
      - "Create AddPetForm.tsx file with 'use client' directive"
      - "Import React Hook Form dependencies"
      - "Set up useForm hook with defaultValues"
      - "Add name input field with label"
      - "Add species dropdown field with label"
      - "Add breed input field with label"
      - "Add gender radio buttons with label"
      - "Add age number input field with label"
      - "Add weight number input field with label"
      - "Add color input field with label"
      - "Add healthStatus textarea field with label"
      - "Connect each field to React Hook Form register"
      - "Add error display for name field"
      - "Add error display for species field"
      - "Add error display for all remaining fields"
      - "Add submit button"
      - "Add form onSubmit handler"
      - "Add loading state to submit button"
      - "Add form reset on successful submission"
2.  **Actionable:** Each task should describe a **specific, concrete, single action** that a developer can take. Use verbs like "Create", "Implement", "Add", "Update", "Refactor", "Test", "Style", "Integrate", "Import", "Export", "Define", "Configure", etc.

    **Bad Examples:**

    - "Implement form validation" (too vague)
    - "Add all form fields" (too large)
    - "Style the component" (too vague)

    **Good Examples:**

    - "Add name input field with label 'Tên thú cưng' in AddPetForm"
    - "Add Zod validation rule: name must be non-empty string with min length 1"
    - "Add Tailwind CSS classes for mobile-first responsive layout: 'w-full md:w-1/2 lg:w-1/3'"
    - "Add error message display below name input field that shows when validation fails"

3.  **SRS Alignment:** **CRITICAL** - Every task must map directly to requirements in the SRS document. When breaking down tasks:

    - Reference the specific SRS section (e.g., "MODULE 5: CHỦ NUÔI - 5.2.1. Thêm thú cưng mới")
    - Ensure all Input fields from SRS are covered
    - Ensure all Process steps from SRS are covered
    - Ensure all Output requirements from SRS are covered
    - Include validation rules exactly as specified in SRS
    - Include error messages in Vietnamese as specified in SRS

4.  **Dependencies:** Identify any dependencies between tasks. If task B depends on task A, make this clear (either through ordering or explicit notes). Use nested checklists to show sub-tasks.

5.  **Completeness:** The checklist should cover **every single aspect** of the technical design, including:
    - **Type definitions:** Every TypeScript interface, type, enum must have its own task
    - **Zod schemas:** Every field validation rule must be a separate task
    - **Component structure:** File creation, imports, exports, directives ('use client')
    - **Form fields:** Each form field (input, select, textarea, radio, checkbox) is a separate task
    - **Form validation:** Each validation rule is a separate task
    - **Error handling:** Field-level errors, form-level errors, API errors - each is a separate task
    - **UI states:** Loading, error, success, empty, initial - each state implementation is a separate task
    - **Styling:** Each responsive breakpoint, each Tailwind class group is a separate task
    - **Accessibility:** ARIA labels, keyboard navigation, focus management - each is a separate task
    - **API integration:** Server Action creation, API route creation, data fetching, error handling - each is a separate task
    - **State management:** Store creation, action creation, selector creation - each is a separate task
    - **Testing:** Each test case is a separate task
    - **Documentation:** JSDoc comments, README updates - each is a separate task
6.  **Clarity:** Use clear and concise language. Avoid jargon or ambiguity.
7.  **Checklist Format:** Use Markdown's checklist syntax:
    ```
    - [ ] Task 1: Description of task 1
    - [ ] Task 2: Description of task 2
    - [ ] Task 3: Description of task 3 (depends on Task 2)
    ```
8.  **Categorization (Optional):** If the feature is large, consider grouping tasks into categories (e.g., "Types & Schemas", "Components", "Hooks", "API Integration", "Styling", "Testing").
9.  **Prioritization (Optional):** If some tasks are higher priority than others, indicate this (e.g., using "(High Priority)" or a similar marker).

## Example

**Input (Technical Design Document - Excerpt):**

```markdown
## AddPetModal Component

**Overview:** A modal component that allows pet owners to add a new pet to their account.

**Component Hierarchy:**

- AddPetModal (Client Component)
  - Dialog (shadcn/ui)
    - AddPetForm
      - FormField components
      - SubmitButton

**UI States:**

- Loading: Show spinner while submitting
- Error: Display validation errors or API errors
- Success: Show success message and close modal

**Data Flow:**

- Form data → Zod validation → Server Action → Database → Revalidate → Update UI
```

**Output (Task Breakdown):**

```markdown
**Types & Schemas:**

- [ ] Task 1: Create `PetFormData` TypeScript type in `lib/types/pet.types.ts`.
- [ ] Task 2: Create `petSchema` Zod schema in `lib/schemas/pet.schema.ts`.
  - [ ] Add validation rules for `name` (required, min length 1).
  - [ ] Add validation rules for `species` (enum: dog, cat, rabbit, etc.).
  - [ ] Add validation rules for `gender` (enum: male, female).
  - [ ] Add validation rules for `age` (number, min 0).
  - [ ] Add validation rules for `weight` (number, min 0).

**Components:**

- [ ] Task 3: Create `AddPetModal` component in `components/modals/AddPetModal.tsx`.
  - [ ] Mark as Client Component (`'use client'`).
  - [ ] Import and use `Dialog` component from shadcn/ui.
  - [ ] Add open/close state management.
  - [ ] Add `AddPetForm` as child component.
- [ ] Task 4: Create `AddPetForm` component in `components/forms/AddPetForm.tsx`.
  - [ ] Mark as Client Component (`'use client'`).
  - [ ] Set up React Hook Form with Zod resolver.
  - [ ] Add form fields: name, species, breed, gender, age, weight, color, healthStatus.
  - [ ] Add form validation using `petSchema`.
  - [ ] Add error display for each field.
  - [ ] Add submit button with loading state.
- [ ] Task 5: Create reusable `FormField` component in `components/forms/FormField.tsx` (if it doesn't exist).
  - [ ] Support label, input, error message.
  - [ ] Integrate with React Hook Form.

**API Integration:**

- [ ] Task 6: Create `createPet` Server Action in `app/actions/pets.actions.ts`.
  - [ ] Validate input data with `petSchema`.
  - [ ] Create pet in database.
  - [ ] Revalidate `/dashboard/owner/pets` path.
  - [ ] Return success/error response.
- [ ] Task 7: Integrate Server Action in `AddPetForm`.
  - [ ] Call `createPet` on form submission.
  - [ ] Handle success: show success message, close modal, reset form.
  - [ ] Handle error: display error message to user.

**Styling & UX:**

- [ ] Task 8: Style `AddPetModal` with Tailwind CSS.
  - [ ] Ensure responsive design (mobile-first).
  - [ ] Add proper spacing and typography.
  - [ ] Ensure accessibility (keyboard navigation, ARIA labels).
- [ ] Task 9: Add loading state to submit button.
  - [ ] Show spinner icon when submitting.
  - [ ] Disable button during submission.
- [ ] Task 10: Add error state handling.
  - [ ] Display field-level validation errors.
  - [ ] Display API-level error messages.
  - [ ] Ensure error messages are accessible.

**Testing:**

- [ ] Task 11: Write unit tests for `AddPetForm` component.
  - [ ] Test form validation (required fields, invalid data).
  - [ ] Test form submission success flow.
  - [ ] Test form submission error handling.
- [ ] Task 12: Write integration tests for `AddPetModal`.
  - [ ] Test modal open/close functionality.
  - [ ] Test complete pet creation flow.
  - [ ] Test error scenarios.

**Documentation:**

- [ ] Task 13: Add JSDoc comments to `AddPetModal` and `AddPetForm` components.
- [ ] Task 14: Update component documentation if applicable.
```

**Another Example (with dependencies and categories):**

**Input (Technical Design Document - Excerpt - for a hypothetical "Pets List" feature):**

```markdown
## PetsList Component

**Overview:** Displays a list of pets with filtering and pagination.

**Component Hierarchy:**

- PetsList (Server Component)
  - PetsListClient (Client Component)
    - PetCard components
    - FilterBar
    - Pagination

**Data Flow:**

- Server Component fetches initial data
- Client Component handles filtering and pagination
- TanStack Query for client-side data synchronization
```

**Output (Task Breakdown):**

```markdown
**Types:**

- [ ] Task 1: Create `Pet` interface in `lib/types/pet.types.ts` (if it doesn't exist). (High Priority)
- [ ] Task 2: Create `PetsListFilters` type for filter state.

**Server Component:**

- [ ] Task 3: Create `PetsList` Server Component in `app/dashboard/owner/pets/page.tsx`.
  - [ ] Fetch initial pets data from database.
  - [ ] Pass data to `PetsListClient` component.

**Client Components:**

- [ ] Task 4: Create `PetsListClient` component in `components/pets/PetsListClient.tsx`.
  - [ ] Mark as Client Component (`'use client'`).
  - [ ] Accept initial pets data as props.
  - [ ] Set up TanStack Query with initial data.
  - [ ] Add `FilterBar` component.
  - [ ] Add `PetCard` components (map over pets).
  - [ ] Add `Pagination` component.
- [ ] Task 5: Create `PetCard` component in `components/pets/PetCard.tsx`.
  - [ ] Display pet information (name, species, age, weight).
  - [ ] Add edit/delete buttons (if user has permission).
  - [ ] Style with Tailwind CSS.
- [ ] Task 6: Create `FilterBar` component in `components/pets/FilterBar.tsx`.
  - [ ] Add filter by species dropdown.
  - [ ] Add search by name input.
  - [ ] Use debounced search (useDebounce hook).
- [ ] Task 7: Create `Pagination` component in `components/ui/Pagination.tsx` (if it doesn't exist).
  - [ ] Use shadcn/ui Pagination component as base.
  - [ ] Handle page changes.

**Hooks:**

- [ ] Task 8: Create `usePets` hook in `lib/hooks/usePets.ts`.
  - [ ] Use TanStack Query for data fetching.
  - [ ] Support filtering and pagination parameters.
  - [ ] Return pets data, loading state, error state.

**Styling:**

- [ ] Task 9: Style `PetsListClient` with responsive grid layout.
  - [ ] Mobile: 1 column
  - [ ] Tablet: 2 columns
  - [ ] Desktop: 3 columns
- [ ] Task 10: Add loading skeleton for `PetCard` components.
- [ ] Task 11: Add empty state when no pets are found.

**Testing:**

- [ ] Task 12: Write unit tests for `PetCard` component.
- [ ] Task 13: Write unit tests for `FilterBar` component.
- [ ] Task 14: Write integration tests for `PetsListClient` component.
  - [ ] Test filtering functionality.
  - [ ] Test pagination functionality.
```

## Mapping SRS Requirements to Tasks

When breaking down tasks, follow this mapping from SRS structure:

### SRS Input Section → Tasks

- Each **form field** in SRS Input becomes:
  - Type definition task
  - Zod schema validation task
  - Form field component task
  - Label task
  - Error display task
  - Accessibility (ARIA label) task

### SRS Process Section → Tasks

- Each **step** in SRS Process becomes:
  - Server Action/API function task
  - Validation logic task
  - Database operation task (if applicable)
  - State update task
  - UI update task

### SRS Output Section → Tasks

- Each **output requirement** becomes:
  - Success message display task
  - Error message display task
  - UI update/refresh task
  - Navigation/redirect task (if applicable)

## Detailed Example: Mapping SRS to Tasks

**SRS Section (MODULE 5: CHỦ NUÔI - 5.2.1. Thêm thú cưng mới):**

```
Input:
- Tên thú cưng (tenthucung) - Bắt buộc, text
- Loài (loai) - Bắt buộc, dropdown (chó, mèo, thỏ, chim, hamster, vẹt, bò sát...)
- Giống (giong) - Tùy chọn, text
- Giới tính (gioitinh) - Bắt buộc, radio (Đực/Cái)
- Tuổi (tuoi) - Bắt buộc, number (tháng hoặc năm)
- Cân nặng (cannang) - Bắt buộc, number (kg)
- Màu sắc (mau) - Tùy chọn, text
- Tình trạng sức khỏe ban đầu (tinh trang) - Tùy chọn, textarea

Process:
1. Hệ thống validate dữ liệu đầu vào
2. Hệ thống tự động lấy mã chủ nuôi (machunoi) từ session đăng nhập
3. Hệ thống tự động tạo mã định danh duy nhất cho thú cưng (mathucung)
4. Hệ thống lưu thông tin vào bảng Pets
5. Hệ thống tạo bản ghi lịch sử trong bảng PetHistory

Output:
- Thông báo thành công: "Đã thêm thú cưng [Tên] thành công với mã [Mã]"
- Hiển thị lại danh sách thú cưng với thú cưng vừa thêm
- Nút "Thêm thú cưng khác" để tiếp tục thêm
```

**Corresponding Task Breakdown (Extremely Detailed):**

```markdown
**Types & Schemas:**

- [ ] Task 1: Create `PetFormData` interface in `lib/types/pet.types.ts`.
  - [ ] Add `name: string` property.
  - [ ] Add `species: PetSpecies` property.
  - [ ] Add `breed?: string` property (optional).
  - [ ] Add `gender: 'male' | 'female'` property.
  - [ ] Add `age: number` property.
  - [ ] Add `weight: number` property.
  - [ ] Add `color?: string` property (optional).
  - [ ] Add `healthStatus?: string` property (optional).
- [ ] Task 2: Create `PetSpecies` type in `lib/types/pet.types.ts`.
  - [ ] Define as union type: 'dog' | 'cat' | 'rabbit' | 'bird' | 'hamster' | 'parrot' | 'reptile'.
- [ ] Task 3: Create `petSchema` Zod schema in `lib/schemas/pet.schema.ts`.
  - [ ] Import `z` from 'zod'.
  - [ ] Create base schema object.
  - [ ] Add `name` field with `.min(1, 'Tên thú cưng là bắt buộc')` validation.
  - [ ] Add `species` field with `.enum(['dog', 'cat', 'rabbit', 'bird', 'hamster', 'parrot', 'reptile'], { message: 'Loài thú cưng là bắt buộc' })` validation.
  - [ ] Add `breed` field with `.string().optional()` validation.
  - [ ] Add `gender` field with `.enum(['male', 'female'], { message: 'Giới tính là bắt buộc' })` validation.
  - [ ] Add `age` field with `.number().min(0, 'Tuổi phải lớn hơn hoặc bằng 0')` validation.
  - [ ] Add `weight` field with `.number().min(0, 'Cân nặng phải lớn hơn hoặc bằng 0')` validation.
  - [ ] Add `color` field with `.string().optional()` validation.
  - [ ] Add `healthStatus` field with `.string().optional()` validation.
  - [ ] Export `PetFormData` type using `z.infer<typeof petSchema>`.

**Component Structure:**

- [ ] Task 4: Create `AddPetForm.tsx` file in `components/forms/` directory.
  - [ ] Add `'use client'` directive at the top.
  - [ ] Import `React` from 'react'.
  - [ ] Import `useForm` from 'react-hook-form'.
  - [ ] Import `zodResolver` from '@hookform/resolvers/zod'.
  - [ ] Import `petSchema` and `PetFormData` from schema file.
  - [ ] Create functional component `AddPetForm`.
  - [ ] Export `AddPetForm` as default export.

**Form Setup:**

- [ ] Task 5: Set up React Hook Form with shadcn/ui Form components in `AddPetForm`.
  - [ ] Import `Form` from `@/components/ui/form`.
  - [ ] Import `FormProvider` or use `Form` component from shadcn/ui.
  - [ ] Call `useForm<PetFormData>()` hook.
  - [ ] Configure with `resolver: zodResolver(petSchema)`.
  - [ ] Set `mode: 'onChange'` for real-time validation.
  - [ ] Destructure `form` object from `useForm` return value.
  - [ ] Wrap form content with `<Form {...form}>` component from shadcn/ui.

**Form Fields - Name:**

- [ ] Task 6: Add name input field using shadcn/ui Form components to `AddPetForm`.
  - [ ] Import `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormMessage` from `@/components/ui/form`.
  - [ ] Import `Input` from `@/components/ui/input`.
  - [ ] Add `<FormField>` component with:
    - `control={form.control}`
    - `name="name"`
  - [ ] Inside `<FormField>`, add `<FormItem>` wrapper.
  - [ ] Inside `<FormItem>`, add `<FormLabel>` with text "Tên thú cưng" and required indicator (`*`).
  - [ ] Inside `<FormItem>`, add `<FormControl>` wrapper.
  - [ ] Inside `<FormControl>`, add `<Input>` component with:
    - `type="text"`
    - `placeholder="Nhập tên thú cưng"`
    - Connect to form using `field` prop from render function: `{({ field }) => <Input {...field} />}`
  - [ ] Inside `<FormItem>`, add `<FormMessage />` component for automatic error display.

**Form Fields - Species:**

- [ ] Task 7: Add species dropdown field using shadcn/ui Form and Select components to `AddPetForm`.
  - [ ] Import `Select`, `SelectContent`, `SelectItem`, `SelectTrigger`, `SelectValue` from `@/components/ui/select`.
  - [ ] Add `<FormField>` component with:
    - `control={form.control}`
    - `name="species"`
  - [ ] Inside `<FormField>`, add `<FormItem>` wrapper.
  - [ ] Inside `<FormItem>`, add `<FormLabel>` with text "Loài" and required indicator.
  - [ ] Inside `<FormItem>`, add `<FormControl>` wrapper.
  - [ ] Inside `<FormControl>`, add `<Select>` component with:
    - Connect to form using `field` prop: `{({ field }) => <Select onValueChange={field.onChange} value={field.value}>...</Select>}`
  - [ ] Inside `<Select>`, add `<SelectTrigger>` with placeholder "Chọn loài".
  - [ ] Inside `<Select>`, add `<SelectContent>`.
  - [ ] Inside `<SelectContent>`, add `<SelectItem value="dog">Chó</SelectItem>`.
  - [ ] Inside `<SelectContent>`, add `<SelectItem value="cat">Mèo</SelectItem>`.
  - [ ] Inside `<SelectContent>`, add `<SelectItem value="rabbit">Thỏ</SelectItem>`.
  - [ ] Inside `<SelectContent>`, add `<SelectItem value="bird">Chim</SelectItem>`.
  - [ ] Inside `<SelectContent>`, add `<SelectItem value="hamster">Hamster</SelectItem>`.
  - [ ] Inside `<SelectContent>`, add `<SelectItem value="parrot">Vẹt</SelectItem>`.
  - [ ] Inside `<SelectContent>`, add `<SelectItem value="reptile">Bò sát</SelectItem>`.
  - [ ] Inside `<FormItem>`, add `<FormMessage />` component for automatic error display.

**Form Fields - Breed (Optional):**

- [ ] Task 8: Add breed input field using shadcn/ui Form components to `AddPetForm`.
  - [ ] Add `<FormField>` component with `control={form.control}` and `name="breed"`.
  - [ ] Inside `<FormField>`, add `<FormItem>` wrapper.
  - [ ] Inside `<FormItem>`, add `<FormLabel>` with text "Giống" (no required indicator).
  - [ ] Inside `<FormItem>`, add `<FormControl>` wrapper.
  - [ ] Inside `<FormControl>`, add `<Input>` component connected to form field.
  - [ ] Inside `<FormItem>`, add `<FormMessage />` component for error display.

**Form Fields - Gender:**

- [ ] Task 9: Add gender radio buttons using shadcn/ui Form and RadioGroup components to `AddPetForm`.
  - [ ] Import `RadioGroup`, `RadioGroupItem` from `@/components/ui/radio-group`.
  - [ ] Import `Label` from `@/components/ui/label`.
  - [ ] Add `<FormField>` component with `control={form.control}` and `name="gender"`.
  - [ ] Inside `<FormField>`, add `<FormItem>` wrapper.
  - [ ] Inside `<FormItem>`, add `<FormLabel>` with text "Giới tính" and required indicator.
  - [ ] Inside `<FormItem>`, add `<FormControl>` wrapper.
  - [ ] Inside `<FormControl>`, add `<RadioGroup>` component connected to form field:
    - `{({ field }) => <RadioGroup onValueChange={field.onChange} value={field.value}>...</RadioGroup>}`
  - [ ] Inside `<RadioGroup>`, add first radio option:
    - `<div className="flex items-center space-x-2">`
    - `<RadioGroupItem value="male" id="gender-male" />`
    - `<Label htmlFor="gender-male">Đực</Label>`
    - `</div>`
  - [ ] Inside `<RadioGroup>`, add second radio option:
    - `<div className="flex items-center space-x-2">`
    - `<RadioGroupItem value="female" id="gender-female" />`
    - `<Label htmlFor="gender-female">Cái</Label>`
    - `</div>`
  - [ ] Inside `<FormItem>`, add `<FormMessage />` component for error display.

**Form Fields - Age:**

- [ ] Task 10: Add age number input field using shadcn/ui Form components to `AddPetForm`.
  - [ ] Add `<FormField>` component with `control={form.control}` and `name="age"`.
  - [ ] Inside `<FormField>`, add `<FormItem>` wrapper.
  - [ ] Inside `<FormItem>`, add `<FormLabel>` with text "Tuổi (tháng)" and required indicator.
  - [ ] Inside `<FormItem>`, add `<FormControl>` wrapper.
  - [ ] Inside `<FormControl>`, add `<Input>` component with:
    - `type="number"`
    - `min="0"`
    - `step="1"`
    - `placeholder="Nhập tuổi"`
    - Connected to form field with `valueAsNumber` handling: `{({ field }) => <Input {...field} type="number" onChange={(e) => field.onChange(parseInt(e.target.value) || 0)} />}`
  - [ ] Inside `<FormItem>`, add `<FormMessage />` component for error display.

**Form Fields - Weight:**

- [ ] Task 11: Add weight number input field using shadcn/ui Form components to `AddPetForm`.
  - [ ] Add `<FormField>` component with `control={form.control}` and `name="weight"`.
  - [ ] Inside `<FormField>`, add `<FormItem>` wrapper.
  - [ ] Inside `<FormItem>`, add `<FormLabel>` with text "Cân nặng (kg)" and required indicator.
  - [ ] Inside `<FormItem>`, add `<FormControl>` wrapper.
  - [ ] Inside `<FormControl>`, add `<Input>` component with:
    - `type="number"`
    - `min="0"`
    - `step="0.1"`
    - `placeholder="Nhập cân nặng"`
    - Connected to form field with `valueAsNumber` handling: `{({ field }) => <Input {...field} type="number" onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)} />}`
  - [ ] Inside `<FormItem>`, add `<FormMessage />` component for error display.

**Form Fields - Color (Optional):**

- [ ] Task 12: Add color input field using shadcn/ui Form components to `AddPetForm`.
  - [ ] Add `<FormField>` component with `control={form.control}` and `name="color"`.
  - [ ] Inside `<FormField>`, add `<FormItem>` wrapper.
  - [ ] Inside `<FormItem>`, add `<FormLabel>` with text "Màu sắc".
  - [ ] Inside `<FormItem>`, add `<FormControl>` wrapper.
  - [ ] Inside `<FormControl>`, add `<Input>` component connected to form field.
  - [ ] Inside `<FormItem>`, add `<FormMessage />` component for error display.

**Form Fields - Health Status (Optional):**

- [ ] Task 13: Add health status textarea field using shadcn/ui Form components to `AddPetForm`.
  - [ ] Import `Textarea` from `@/components/ui/textarea`.
  - [ ] Add `<FormField>` component with `control={form.control}` and `name="healthStatus"`.
  - [ ] Inside `<FormField>`, add `<FormItem>` wrapper.
  - [ ] Inside `<FormItem>`, add `<FormLabel>` with text "Tình trạng sức khỏe ban đầu".
  - [ ] Inside `<FormItem>`, add `<FormControl>` wrapper.
  - [ ] Inside `<FormControl>`, add `<Textarea>` component with:
    - `rows={4}`
    - `placeholder="Nhập tình trạng sức khỏe (nếu có)"`
    - Connected to form field: `{({ field }) => <Textarea {...field} />}`
  - [ ] Inside `<FormItem>`, add `<FormMessage />` component for error display.

**Submit Button:**

- [ ] Task 14: Add submit button to `AddPetForm`.
  - [ ] Create `<button type="submit">` element.
  - [ ] Add `disabled={isSubmitting}` attribute.
  - [ ] Add Tailwind classes for styling.
  - [ ] Add conditional loading spinner: `{isSubmitting && <Loader2 className="animate-spin" />}`.
  - [ ] Add button text: "Thêm thú cưng" (or conditional: "Đang thêm..." when submitting).

**Form Submission Handler:**

- [ ] Task 15: Implement form submission handler in `AddPetForm`.
  - [ ] Create `onSubmit` async function.
  - [ ] Add parameter: `(data: PetFormData)`.
  - [ ] Add try-catch block.
  - [ ] Call `createPet` Server Action with `data`.
  - [ ] On success: show success toast message "Đã thêm thú cưng [name] thành công với mã [id]".
  - [ ] On success: reset form using `form.reset()`.
  - [ ] On success: close modal (if in modal) or redirect.
  - [ ] On error: display error message to user.
  - [ ] Connect handler to form: `onSubmit={handleSubmit(onSubmit)}`.

**Server Action:**

- [ ] Task 16: Create `createPet` Server Action in `app/actions/pets.actions.ts`.
  - [ ] Add `'use server'` directive.
  - [ ] Import `petSchema` and `PetFormData`.
  - [ ] Import database client/ORM.
  - [ ] Import `revalidatePath` from 'next/cache'.
  - [ ] Create async function `createPet(data: PetFormData)`.
  - [ ] Add Zod validation: `const validated = petSchema.parse(data)`.
  - [ ] Get owner ID from session/auth: `const ownerId = await getCurrentUserId()`.
  - [ ] Generate pet ID: `const petId = generatePetId()` (format: PET-YYYYMMDD-XXX).
  - [ ] Create pet in database: `await db.pet.create({ data: { ...validated, id: petId, ownerId } })`.
  - [ ] Create history record: `await db.petHistory.create({ data: { petId, action: 'created' } })`.
  - [ ] Revalidate path: `revalidatePath('/dashboard/owner/pets')`.
  - [ ] Return `{ success: true, pet: { id: petId, name: validated.name } }`.
  - [ ] Handle errors and return `{ success: false, error: error.message }`.

**Success Message Display:**

- [ ] Task 17: Add success message display to `AddPetForm`.
  - [ ] Import toast component (e.g., from shadcn/ui).
  - [ ] In `onSubmit` success handler, call `toast.success('Đã thêm thú cưng [name] thành công với mã [id]')`.
  - [ ] Ensure message matches SRS output exactly.

**Error Handling:**

- [ ] Task 18: Add comprehensive error handling to `AddPetForm`.
  - [ ] Display field-level validation errors (already done in Tasks 6-13).
  - [ ] Add form-level error state: `const [formError, setFormError] = useState<string | null>(null)`.
  - [ ] In `onSubmit` error handler, set `setFormError(error.message)`.
  - [ ] Display form error: `{formError && <div className="text-red-500">{formError}</div>}`.
  - [ ] Clear form error on successful submission.

**Styling & Responsive Design:**

- [ ] Task 19: Apply Tailwind CSS styling to `AddPetForm`.
  - [ ] Add container with `max-w-2xl mx-auto p-6`.
  - [ ] Add form element with `space-y-4`.
  - [ ] Ensure all form fields are full width on mobile: `w-full`.
  - [ ] Add responsive grid for larger screens: `md:grid md:grid-cols-2 md:gap-4` (for fields that can be side-by-side).
  - [ ] Add proper spacing between fields: `mb-4` or `space-y-4`.
  - [ ] Style labels: `block text-sm font-medium text-gray-700 mb-1`.
  - [ ] Style inputs: `w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`.
  - [ ] Style error messages: `text-red-500 text-sm mt-1`.
  - [ ] Style submit button: `w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50`.

**Accessibility:**

- [ ] Task 20: Ensure accessibility in `AddPetForm`.
  - [ ] Add `aria-label` to form: `aria-label="Form thêm thú cưng mới"`.
  - [ ] Ensure all inputs have associated labels (using `htmlFor` and `id`).
  - [ ] Add `aria-required="true"` to required fields.
  - [ ] Add `aria-invalid` and `aria-describedby` to fields with errors (already done).
  - [ ] Ensure keyboard navigation works (Tab order is logical).
  - [ ] Test with screen reader.

**Integration with Modal (if applicable):**

- [ ] Task 21: Integrate `AddPetForm` into `AddPetModal` component.
  - [ ] Import `AddPetForm` into `AddPetModal.tsx`.
  - [ ] Add `AddPetForm` as child of Dialog component.
  - [ ] Add modal open/close state management.
  - [ ] Close modal on successful form submission.
  - [ ] Add "Thêm thú cưng khác" button that resets form and keeps modal open.

**Testing:**

- [ ] Task 22: Write unit tests for `AddPetForm` component.
  - [ ] Test: Form renders all fields correctly.
  - [ ] Test: Required field validation (name, species, gender, age, weight).
  - [ ] Test: Age validation (must be >= 0).
  - [ ] Test: Weight validation (must be >= 0).
  - [ ] Test: Form submission with valid data calls createPet.
  - [ ] Test: Form submission with invalid data shows errors.
  - [ ] Test: Loading state during submission.
  - [ ] Test: Success message display.
  - [ ] Test: Error message display.
  - [ ] Test: Form reset after successful submission.

**Documentation:**

- [ ] Task 23: Add JSDoc comments to `AddPetForm` component.
  - [ ] Add component description.
  - [ ] Add @example usage.
- [ ] Task 24: Update README or component documentation if applicable.
```

## Frontend-Specific Considerations

- **Server vs Client Components:** Clearly indicate which components should be Server Components and which should be Client Components. Break down the decision process as a task.
- **Data Fetching:** Specify whether to use Server Actions, API routes, or TanStack Query. Each approach should have separate tasks.
- **State Management:** Indicate when to use local state (useState), global state (Zustand), or server state (TanStack Query). Each state management decision should be a separate task.
- **Accessibility:** Always include accessibility tasks (keyboard navigation, ARIA labels, screen reader support). Each accessibility feature is a separate task.
- **Responsive Design:** Include tasks for mobile-first responsive design. Each breakpoint (mobile, tablet, desktop) should have separate styling tasks.
- **Performance:** Include tasks for optimization (memoization, lazy loading, code splitting). Each optimization technique is a separate task.
