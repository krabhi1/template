# tanstack-cloudflare-template

A tanstack start template for Cloudflare Workers.

### Features

- **better-auth**: with login with google, email/password (forgot, verify via OTP).
- **Vitest**: for testing, test via cloudflare workers environment.
- **Tailwind**: for styling, with dark mode support.
- **biome**: for linting and formatting.
- **shadcn-ui**: shadcn ui components for building UI faster. run `pnpm dlx shadcn@latest add <component-name>` to add a component.
- **tanstack-start**: with tanstack query, router, remote functions, cloudflare context integration
- **zod schemas**: for validation and type inference.
- **drizzle-orm**: for database management, migration, and type inference.
- Dynamic / based on user is authenticated or not. If user is authenticated, show the <Dashboard>, otherwise show Landing page.
