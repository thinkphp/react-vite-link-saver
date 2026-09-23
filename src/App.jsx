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
                    <p>Salvează și organizează linkurile tale.</p>
                </header>

                <section className="form-card">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="title">Titlu</label>

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
                            <label htmlFor="url">Link</label>

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
                            Salvează link
                        </button>
                    </form>
                </section>

                <section className="links-section">
                    <div className="section-header">
                        <h2>Linkurile mele</h2>

                        <span className="count">
                            {links.length}
                        </span>
                    </div>

                    {links.length === 0 ? (
                        <div className="empty">
                            <p>Nu ai niciun link salvat încă.</p>
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
                                        Deschide →
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

