# World of Cocktails

Live Version: [World of Cocktails App](https://capstone-project-snowy-three.vercel.app)

This website is your go-to solution for crafting cocktails at home!

## Features

-   **Ingredient Selection:** Choose and save ingredients available at your home bar.
-   **Virtual Bar:** Manage your selected ingredients for easy access.
-   **Cocktail Recommendations:** Get cocktail recipes based on your chosen ingredients.
-   **User Authentication:** Login via GitHub to save and access your ingredient list across
    sessions.
-   **Data Storage:** Ingredient data is securely stored in MongoDB.
-   **API Integration:** Cocktail recipes are fetched from
    [The Cocktail DB API](https://www.thecocktaildb.com).

## Tech Stack

### Frontend

-   **React.js:** Built on React.js for a dynamic and interactive user interface.
-   **Framer Motion:** Enhanced UI with animations and transitions.
-   **Styled Components:** Utilized for styled and responsive UI components.

### Backend

-   **Next.js:** Leveraged for server-side rendering and seamless user experience.
-   **Next-Auth:** Integrated for user authentication via GitHub.
-   **MongoDB:** Storage for user ingredient data.

## Dependencies

The app utilizes a variety of dependencies, including Axios for API requests, Mongoose for MongoDB
interaction, and Jest for testing.

For the complete list of dependencies and devDependencies, refer to the
[package.json](./package.json) file in the repository.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## TypeScript migration

The original Pages Router, component folders, styles, routes, MongoDB models,
and cocktail matching behavior are preserved. Source files use `.ts` / `.tsx`.
Runtime dependencies now include Next.js 16.4, React 19, styled-components 6,
Zustand 5, Framer Motion 12, and Mongoose 9. NextAuth 4 and its MongoDB 4 adapter
remain together for compatibility. Unused Create React App / Storybook template
dependencies were removed because they target older React versions; their original
configuration files remain as reference.

### Local setup

Use Node.js 22.13+ and pnpm 11.25.0.

```sh
pnpm install
cp .env.example .env.local
pnpm dev
```

Fill in `.env.local` with your own MongoDB URI, GitHub OAuth app credentials,
and a random NextAuth secret. Set the GitHub callback URL to
`http://localhost:3000/api/auth/callback/github`.
The archive contains no database export: the existing `ingredients` collection
must be restored or populated in your MongoDB database. The original ingredient
import endpoints remain available. Recipes are fetched from TheCocktailDB.

```sh
pnpm typecheck
pnpm lint
pnpm test --runInBand
pnpm build
pnpm start
```

Webpack and the original Babel configuration are retained for styled-components.
The legacy image component preserves the original image layout while links use
the modern Next.js API. Database connections initialize on request, allowing
builds without production secrets.
# world-of-cocktails
