## Development

Install dependencies:

```sh
pnpm install
```

To start the development server for all apps

```bash
pnpm dev
```

To start the dev development for the copilot-crm app

```bash
pnpm dev:crm
```

To start the dev development for the client-portal app

```bash
pnpm dev:portal
```

## Formatting with Prettier

To manually format the codebase with Prettier:

```bash
pnpm format
```

## Linting

To manually run ESLint across the codebase:

```bash
pnpm lint
```

## Build all apps

```sh
pnpm build
```

## Filtering

Turborepo allows you to filter which apps and packages the command should be run for,

For example here were are running the build command just on the `copilot-portal` app

```sh
pnpm build --filter=@repo/client-portal
```

## build

### Add ui components

Use the pre-made script:

```sh
pnpm ui add <component-name>
```

> This works just like the `shadcn/ui` CLI.

### Add a new app

Turborepo offer a simple command to add a new app:

```sh
pnpm turbo gen workspace --name <app-name>
```

This will create a new empty app in the `apps` directory.

If you want, you can copy an existing app with:

```sh
pnpm turbo gen workspace --name <app-name> --copy
```

> [!NOTE]
> Remember to run `pnpm install` after copying an app.

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `@repo/copilot-crm`: a [Next.js](https://nextjs.org/) app
- `@repo/client-portal`: a [Next.js](https://nextjs.org/) app
- `@repo/ui`: React component library (🚀 powered by **shadcn/ui**)
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

### Build

To build all apps and packages, run the following command:

```sh
pnpm build
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```sh
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)

Learn more about shadcn/ui:

- [Documentation](https://ui.shadcn.com/docs)

## Contributors Guide

### 1. **Identify or Create a GitHub Issue**

Before starting work, be sure you have an issue with relevant details identifying the work to be done. Ideally, the issue should provide clear acceptance criteria and as much additional context as feasible. If you're not already assigned, assign yourself to the issue to indicate ownership.

### 2. **Create a Branch**

Follow the branch naming convention to include the issue number and a brief description.

**Format:** `<issue-number>-<short-description>`

- **Issue Number**: Each branch must include the corresponding issue number to link it to the issue in GitHub.
- **Short Description**: Use a concise description of the branch purpose in kebab-case (e.g., `setup-storybook`).

  _Example:_ `43-setup-storybook`

_Alternatively_, use the "Create a branch for this issue or link a pull request" option from the GitHub issue sidebar to automatically apply the issue number and issue title as the branch name. You can then clone and checkout the created branch to your local git repository.

### 3. **Commit Guidelines**

Commit your work frequently, using descriptive messages, optionally following the [Conventional Commits](https://www.conventionalcommits.org/) specification for adding clarity to the purpose of each commit.

#### Best Practices

- **Be Concise**: Keep the description short and to the point, focusing on what the commit introduces or fixes.
- **Use Imperative Mood**: Write as if you are giving commands, not describing past actions (e.g., "adds feature" rather than "added feature").
- **Commit Often**: Commit regularly, with logical chunks of work.

### 4. **Open a Pull Request (PR)**

After completing your work, open a PR for the issue. This is a good time to do a final review of the code changes from the perspective of a code reviewer, looking for any unexpected changesets and ensuring there are no logs or stray code not intended to be merged.

When creating a Pull Request, **include the issue number** in the PR title or description (e.g., `Closes #123`). This ensures that the associated issue is automatically closed when the PR is merged.

_TODO: Add additional guidance on a PR description template. (Should we include screenshots or a more detailed breakdown of the work for the reviewer?)_

### 5. **Merge the PR**

Once approved by at least one peer and after confirming that all tests and checks (CI/CD pipeline, code quality checks, etc.) have passed, use the "Squash and Merge" option to combine your commits. (_TODO: Need to check if this can be turned on by default._)

> At some point, we will include a Design/QA/Product sign-off flow here as well.

### 6. **Delete the Branch**

Optionally, delete the branch after merging to keep the repository clean. _(TODO: Confirm branch deletion policy with the team.)_

## Data Loading

We use TanStack Query to fetch data from the API. The query client is configured in loaded in the entry file and is available in all components via the `useQuery` hook.

## Mocking API Requests with MSW

Add a new handler to the `src/mocks/handlers.ts` file. The mock server will automatically reload with the new handler. The server starts up on `pnpm dev`.

## Testing

See [Testing](./src/test/README.md) for more information.

## Analysis

### Run bundle-analyzer on all apps

```sh
pnpm analyze
```

This will open the multiple bundle analyzer windows in a web browser

### Run bundlewatch on all apps

```sh
pnpm bundlewatch
```

When hooked up to CI/CD This tracks changes in the bundle overtime. Also we can set thresholds to prevent unexpected bundle changes. For now you will need to run a build first in order for to generate a bundle size output from bundle watch locally. It will output the analysis in the command line.
