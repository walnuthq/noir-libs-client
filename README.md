# noir-libs - Noir package manager web app

This is a web application (client) for **[noir-libs.org](https://noir-libs.org/) package manager for [Noir](https://noir-lang.org/)**.
Built with [Next.js](https://nextjs.org).

Live version: [noir-libs.org](https://noir-libs.org/)

## Getting Started

Run the development server:

```bash
nvm use
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can configure backend API url in `.env` file.

Client is compatible with [noir-libs.org server](https://github.com/walnuthq/noir-libs-server) API.
## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deployment

This is a process of a deployment to production environment.

1. Assure `.env` file has values set for production environment.
2. Run `npm run deploy`