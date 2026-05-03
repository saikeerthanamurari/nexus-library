const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const os = require('os');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) console.error(err.message);
});

// 1. Get books (Now filters by BOTH Genre AND Language!)
app.get('/api/books', (req, res) => {
    const genre = req.query.genre;
    const language = req.query.language;

    if (genre && language) {
        db.all("SELECT * FROM books WHERE genre = ? AND language = ?", [genre, language], (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        });
    } else {
        db.all("SELECT * FROM books", [], (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        });
    }
});

// 2. Borrow a book
app.post('/api/borrow', (req, res) => {
    const { book_id, name, roll_number } = req.body;

    db.get("SELECT quantity FROM books WHERE id = ?", [book_id], (err, book) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!book || book.quantity <= 0) {
            return res.status(400).json({ error: "Sorry, this book is currently completely out of stock." });
        }

        db.get("SELECT id FROM members WHERE roll_number = ?", [roll_number], (err, member) => {
            if (err) return res.status(500).json({ error: err.message });

            const processBorrow = (memberId) => {
                db.serialize(() => {
                    db.run("UPDATE books SET quantity = quantity - 1 WHERE id = ?", [book_id]);
                    db.run("INSERT INTO borrowings (book_id, member_id) VALUES (?, ?)", [book_id, memberId], function (err) {
                        if (err) return res.status(500).json({ error: err.message });
                        res.json({ message: "Book borrowed successfully!" });
                    });
                });
            };

            if (member) {
                processBorrow(member.id);
            } else {
                db.run("INSERT INTO members (name, roll_number) VALUES (?, ?)", [name, roll_number], function (err) {
                    if (err) return res.status(500).json({ error: err.message });
                    processBorrow(this.lastID);
                });
            }
        });
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n✅ Server is running! Our API is ready at http://localhost:${PORT}\n`);

    const interfaces = os.networkInterfaces();
    let networkIp = '';
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                networkIp = iface.address;
            }
        }
    }

    if (networkIp) {
        console.log(`📱 TO VIEW ON YOUR MOBILE PHONE (Must be on the same Wi-Fi):`);
        console.log(`👉 Open your phone's browser and go to: http://${networkIp}:${PORT}\n`);
    }
});
