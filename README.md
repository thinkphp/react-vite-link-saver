# Link Saver Client

Frontend for the **Link Saver** application, built with React and Vite.

The application allows users to save links by providing a title and URL. Saved links are retrieved from the Express backend and displayed in a simple interface.

The frontend is deployed to Vercel.

---

## 🛠️ Technologies

* React
* Vite
* JavaScript
* CSS
* Vercel

---

## 📁 Project Structure

```text
link-saver-client/
├── public/
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── .env
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

> The exact files may vary depending on the Vite version and project configuration.

---

# 🚀 Local Installation

## 1. Clone the repository

```bash
git clone <repository-url>
```

Navigate into the project:

```bash
cd link-saver-client
```

---

## 2. Install dependencies

```bash
npm install
```

The project uses React and Vite.

---

# ▶️ Start the Development Server

Run:

```bash
npm run dev
```

Vite will start the development server.

The application is available at:

```text
http://localhost:5173
```

---

# 🔗 Backend API

The frontend communicates with the Express backend through HTTP requests.

The backend provides:

```text
GET  /api/links
POST /api/links
```

The frontend does not connect directly to PostgreSQL.

The communication flow is:

```text
React
  ↓
Express API
  ↓
PostgreSQL
```

---

# 🔐 Environment Variables

The backend URL is configured using:

```text
VITE_API_URL
```

Create a `.env` file in the root of the frontend project:

```env
VITE_API_URL=http://localhost:3000
```

The frontend uses this variable when making API requests.

For example:

```js
const API_URL = import.meta.env.VITE_API_URL;
```

---

# 🌍 Production Environment

In production, the `VITE_API_URL` environment variable is configured in Vercel.

It should point to the deployed Express backend.

Example:

```text
VITE_API_URL=https://your-backend-url.vercel.app
```

The frontend then constructs the API endpoint:

```text
https://your-backend-url.vercel.app/api/links
```

> Do not add `/api/links` to `VITE_API_URL`. The frontend adds the endpoint path when making the request.

---

# ⚛️ React Application

The main application is implemented in:

```text
src/App.jsx
```

The application uses React hooks:

```js
import { useEffect, useState } from "react";
```

The following state is used:

```js
const [links, setLinks] = useState([]);
const [title, setTitle] = useState("");
const [url, setUrl] = useState("");
```

---

# 📦 Application State

## Links

The `links` state contains the links retrieved from the backend:

```js
const [links, setLinks] = useState([]);
```

Initially, the array is empty.

After fetching the API:

```js
setLinks(data);
```

the returned links are stored in React state.

---

## Title

The title input is controlled by:

```js
const [title, setTitle] = useState("");
```

The input value is connected to the state:

```jsx
value={title}
```

and updated with:

```jsx
onChange={(event) => setTitle(event.target.value)}
```

---

## URL

The URL input is controlled by:

```js
const [url, setUrl] = useState("");
```

The value is updated whenever the user types:

```jsx
onChange={(event) => setUrl(event.target.value)}
```

---

# 📥 Fetching Links

When the application loads, it requests the saved links from the backend.

This is handled with `useEffect`:

```js
useEffect(() => {
    fetch(`${API_URL}/api/links`)
        .then((response) => response.json())
        .then((data) => setLinks(data));
}, []);
```

The empty dependency array:

```js
[]
```

means the effect runs when the component is initially mounted.

---

# ➕ Creating a Link

When the form is submitted, `handleSubmit` is executed.

```js
async function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim() || !url.trim()) {
        return;
    }

    const response = await fetch(`${API_URL}/api/links`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title,
            url,
        }),
    });

    const newLink = await response.json();

    setLinks([newLink, ...links]);

    setTitle("");
    setUrl("");
}
```

---

# 🔄 Creating a Link Flow

When the user submits the form:

```text
User enters title and URL
          ↓
React form submission
          ↓
POST /api/links
          ↓
Express backend
          ↓
Neon PostgreSQL
          ↓
Created link returned
          ↓
React updates state
          ↓
New link appears in the UI
```

---

# 📝 Form Validation

Before sending the request, the frontend checks whether both fields contain data:

```js
if (!title.trim() || !url.trim()) {
    return;
}
```

This prevents submitting empty values.

The URL field also uses the HTML `url` input type:

```jsx
<input
    id="url"
    type="url"
/>
```

This provides basic browser-level URL validation.

---

# 🔗 Displaying Links

Links are rendered using:

```jsx
links.map((link) => (
    <article
        className="link-card"
        key={link.id}
    >
        ...
    </article>
))
```

Each link uses its database ID as the React key:

```jsx
key={link.id}
```

---

# 🌐 Opening Saved Links

Each saved link can be opened in a new browser tab:

```jsx
<a
    href={link.url}
    target="_blank"
    rel="noreferrer"
>
    {link.url}
</a>
```

The application also provides an explicit:

```text
Open →
```

button.

---

# 📊 Link Counter

The number of saved links is displayed using:

```jsx
<span className="count">
    {links.length}
</span>
```

The counter automatically updates when the `links` state changes.

---

# 📭 Empty State

If there are no saved links:

```jsx
{links.length === 0 ? (
    <div className="empty">
        <p>No links saved yet.</p>
    </div>
) : (
    ...
)}
```

The user sees an empty-state message instead of an empty list.

---

# 🎨 Styling

The application styling is located in:

```text
src/App.css
```

The interface contains:

* page layout
* header
* form card
* input fields
* save button
* link cards
* link counter
* empty state
* open-link button

The design is intentionally simple and clean.

---

# 📄 Main `App.jsx`

The current application implementation:

```jsx
import { useEffect, useState } from "react";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
    const [links, setLinks] = useState([]);
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");

    useEffect(() => {
        fetch(`${API_URL}/api/links`)
            .then((response) => response.json())
            .then((data) => setLinks(data));
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();

        if (!title.trim() || !url.trim()) {
            return;
        }

        const response = await fetch(`${API_URL}/api/links`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                url,
            }),
        });

        const newLink = await response.json();

        setLinks([newLink, ...links]);

        setTitle("");
        setUrl("");
    }

    return (
        <main className="app">
            <div className="container">
                <header className="header">
                    <h1>Link Saver</h1>
                    <p>Save and organize your links.</p>
                </header>

                <section className="form-card">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="title">
                                Title
                            </label>

                            <input
                                id="title"
                                type="text"
                                placeholder="Ex: React Documentation"
                                value={title}
                                onChange={(event) =>
                                    setTitle(event.target.value)
                                }
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="url">
                                Link
                            </label>

                            <input
                                id="url"
                                type="url"
                                placeholder="https://example.com"
                                value={url}
                                onChange={(event) =>
                                    setUrl(event.target.value)
                                }
                            />
                        </div>

                        <button type="submit">
                            Save link
                        </button>
                    </form>
                </section>

                <section className="links-section">
                    <div className="section-header">
                        <h2>My Links</h2>

                        <span className="count">
                            {links.length}
                        </span>
                    </div>

                    {links.length === 0 ? (
                        <div className="empty">
                            <p>No links saved yet.</p>
                        </div>
                    ) : (
                        <div className="links-list">
                            {links.map((link) => (
                                <article
                                    className="link-card"
                                    key={link.id}
                                >
                                    <div className="link-content">
                                        <h3>{link.title}</h3>

                                        <a
                                            href={link.url}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            {link.url}
                                        </a>
                                    </div>

                                    <a
                                        className="open-button"
                                        href={link.url}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Open →
                                    </a>
                                </article>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}

export default App;
```

---

# 🏗️ Production Build

To create a production build:

```bash
npm run build
```

Vite generates the production files in:

```text
dist/
```

The `dist` directory should not normally be committed to GitHub.

---

# 👀 Preview Production Build

After building the application, the production build can be previewed locally with:

```bash
npm run preview
```

---

# ☁️ Vercel Deployment

The frontend is deployed to Vercel.

The deployment flow is:

```text
GitHub
   ↓
Vercel
   ↓
React + Vite
   ↓
Production website
```

Every new deployment builds the React application using the configured environment variables.

---

# 🔐 Vercel Environment Variable

For the production frontend, configure:

```text
VITE_API_URL
```

Example:

```text
VITE_API_URL=https://your-backend-url.vercel.app
```

After changing a `VITE_*` environment variable in Vercel, a new deployment is required because Vite injects these variables during the build process.

---

# 🌐 Frontend / Backend Architecture

The complete application consists of two separate repositories:

```text
GitHub
│
├── link-saver-client
│       │
│       └── React + Vite
│               ↓
│             Vercel
│
└── link-saver-server
        │
        └── Express
                ↓
              Vercel
                ↓
        Neon PostgreSQL
```

---

# 🔄 Application Data Flow

When the application loads:

```text
React
  ↓
GET /api/links
  ↓
Express
  ↓
Neon PostgreSQL
  ↓
Array of links
  ↓
React state
  ↓
Rendered link cards
```

When a new link is saved:

```text
User
  ↓
React form
  ↓
POST /api/links
  ↓
Express
  ↓
Neon PostgreSQL
  ↓
New link
  ↓
React state
  ↓
Updated UI
```

---

# 🧪 Testing Locally

Make sure the backend is running first:

```bash
cd link-saver-server
npm start
```

The backend should be available at:

```text
http://localhost:3000
```

Then start the frontend:

```bash
cd link-saver-client
npm run dev
```

The frontend should be available at:

```text
http://localhost:5173
```

The local configuration should be:

```text
React
http://localhost:5173
        ↓
Express
http://localhost:3000
        ↓
PostgreSQL Docker
```

---

# 🔒 Security Notes

Do not commit sensitive information such as:

```text
.env
API keys
passwords
database connection strings
secrets
```

The `.env` file should remain local.

For production, environment variables should be configured through Vercel.

---

# 📌 Development Checklist

Before starting development, make sure:

* [x] Node.js is installed
* [x] Dependencies are installed
* [x] Express backend is running
* [x] PostgreSQL is running locally
* [x] `VITE_API_URL` is configured
* [x] Frontend can access `/api/links`
* [x] Frontend can create new links
* [x] Links are displayed after creation

---

# 📚 Project Status

The frontend currently includes:

* [x] React
* [x] Vite
* [x] React state management with `useState`
* [x] API requests with `fetch`
* [x] Loading links with `useEffect`
* [x] Create-link form
* [x] Basic form validation
* [x] Link counter
* [x] Empty state
* [x] Link cards
* [x] External link handling
* [x] Responsive UI
* [x] Environment variables
* [x] Vercel deployment
* [x] Communication with Express backend

---

## 📄 License

This project is for learning and personal development.
