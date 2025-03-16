# Next.js Starter

A basic Next.js with Tailwind CSS, Shadcn (initialization) and TypeScript.

## Features

- ⚡️ Next.js 15 (App Router)
- ⚛️ React 19
- ⛑ TypeScript
- Tailwind CSS - With the capability of `auto sort` Tailwind classes and included `Tailwind Typography`.
- Pre-built Components - With the help of `Shadcn`. Just add the component as you go!
- 🗂 Path Mapping — Import components or images using the `@/` prefix
- ⚙️ EditorConfig - Consistent coding styles across editors and IDEs
- 📏 ESLint — Find and fix problems in your code, also will `auto sort` your imports
- 💖 Prettier — Format your code consistently
- 🐶 Husky & Lint Staged — Run scripts on your staged files before they are committed
- 🤖 Conventional Commit Lint — Make sure you & your teammates follow conventional commit
- 🧳 T3 Env — Type-safe environment variables
- 👷 PR Workflow — Run Type Check & Linters on Pull Requests

## Getting Started

To use this starter template, you can use one of the following ways:

1. Fork Repository
2. Clone this Repo
3. Using `create-next-app`

```
npx create-next-app -e https://github.com/ahmdhndr/nextjs-starter-shadcn project-name --use-pnpm
```

## Development

To start the project locally, run:

```
pnpm dev
```

Open `http://localhost:3000` on your browser to see the result.

## Documentation

### Requirements

- Node.js >= 20
- pnpm 9

### Directory Structure

- [`.github`](.github) — GitHub configuration including the CI workflow.<br>
- [`.husky`](.husky) — Husky configuration and hooks.<br>
- [`public`](./public) — Static assets such as robots.txt, images, and favicon.<br>
- [`src`](./src) — Application source code, including pages, components, styles.

### Scripts

- `pnpm dev` — Starts the application in development mode at `http://localhost:3000`.
- `pnpm build` — Creates an optimized production build of your application.
- `pnpm start` — Starts the application in production mode.
- `pnpm type-check` — Validate code using TypeScript compiler.
- `pnpm lint` — Runs ESLint for all files in the `src` directory.
- `pnpm lint:fix` — Runs ESLint fix for all files in the `src` directory.
- `pnpm format` — Runs Prettier for all files in the `src` directory.
- `pnpm format:check` — Check Prettier list of files that need to be formatted.

### Path Mapping

TypeScript are pre-configured with custom path mappings. To import components or files, use the `@/` prefix.

```tsx
import { Button } from "@/components/ui/Button";
// To import images or other files from the public folder
import avatar from "@/public/avatar.png";
```

### Switch to Yarn/NPM

This starter uses `pnpm` by default, but this choice is yours. If you'd like to switch to Yarn/NPM, delete the `pnpm-lock.yaml` file, install the dependencies with Yarn/NPM, change the CI workflow and Husky Git hooks to use Yarn/NPM commands.

> **Note:** If you use Yarn, make sure to follow these steps from the [Husky documentation](https://typicode.github.io/husky/troubleshoot.html#yarn-on-windows) so that Git hooks do not fail with Yarn on Windows.

### Environment Variables

I use [T3 Env](https://env.t3.gg/) to manage environment variables. Create a `.env.local` file in the root of the project and add your environment variables there.

When adding additional environment variables, the schema in `./src/lib/env/client.ts` or `./src/lib/env/server.ts` should be updated accordingly.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for more information.
