# Testing

Tests using [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).

CI/CD tests run on every pull request and on every push to main. These are configured in `.github/workflows/test.yml`, running as GitHub Actions.

## Running Locally

```bash
pnpm test
```

## Writing Tests

1. Use the `__tests__` directory or co-locate test files next to the components they're testing.
2. Follow the naming convention of `componentName.test.tsx` for test files.
3. Use React Testing Library for rendering components and querying the DOM.
4. Test both synchronous Server and Client Components. For async Server Components, consider using E2E tests instead[1].

## Best Practices

1. **Isolate tests**: Ensure each test is independent and doesn't rely on the state of other tests.
2. **Use descriptive test names**: Write clear test descriptions that explain the expected behavior.
3. **Mock external dependencies**: Use mocking for API calls, database interactions, etc.. Can use msw for mocking API calls.
4. **Test edge cases**: Include tests for error states and boundary conditions.
5. **Snapshot testing**: Use snapshot tests sparingly for UI components that change infrequently.
6. **Coverage**: Aim for adequate test coverage, but focus on critical paths and complex logic.
7. **Continuous Integration**: Ensure tests continue automatically in our CI/CD pipeline.
8. **Keep tests fast**: Optimize test performance to maintain a quick feedback loop.
9. **Refactor tests**: Regularly review and refactor tests to keep them maintainable.
10. **Test accessibility**: Include tests for accessibility concerns using appropriate testing libraries.

## Example Test

Here's a simple example component test:

```typescript
import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from '../app/page'

test('Home page renders correctly', () => {
  render(<Home />)
  expect(screen.getByRole('heading', { level: 1, name: 'Welcome' })).toBeDefined()
})
```
