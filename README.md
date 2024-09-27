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

---

## Development

To start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

---

## Formatting with Prettier

To manually format the codebase with Prettier:

```bash
pnpm format
```

---

## Linting

To manually run ESLint across the codebase:

```bash
pnpm lint
```

---

## Local Build

To create a local build:

```bash
pnpm build
```
