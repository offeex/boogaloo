# Boogaloo

## Overview
SvelteKit-powered Full-stack blog application.

It utilizies: 
- **[SQLite](https://www.sqlite.org/index.html)** for database
- **[DrizzleORM](https://github.com/drizzle-team/drizzle-orm)** for ORM
- **[Lucia-Auth](https://github.com/lucia-auth/lucia)** for authentication
- **[TypeScript](https://github.com/microsoft/TypeScript)** for type safety

It features:
- Authentication (register/login/logout)
- Post creation (title, content)
- Comments and replies
- Username change

## Quick Start

### Prerequisites
You must have [pnpm](https://pnpm.io/) globally installed

1. Clone the repo
2. install all dependencies with `pnpm i`
3. Create *db* folder and add *main.db* file in repo's root (eg. *boogaloo/db/main.db*)
4. run `pnpm drizzle-kit push:sqlite` to initialize db
5. `pnpm run vite dev` to run app
