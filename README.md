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

1. Clone the repo
2. Create _db_ folder and add _main.db_ file in repo's root (eg. _boogaloo/db/main.db_)
3. run `drizzle-kit push:sqlite` to initialize db
4. `vite dev` to run app
