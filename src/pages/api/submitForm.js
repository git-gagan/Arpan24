import Database from 'better-sqlite3';

export async function POST({ request }) {
    try {
        const db = new Database('./data/database.db');
        const data = await request.json();
        console.log("On Server Side: ", data)
        const { name, phone, message } = data;
        // Prepare an insert statement to save data to SQLite
        const stmt = db.prepare('INSERT INTO submissions (name, phone, message) VALUES (?, ?, ?)');
        stmt.run(name, phone, message);
        db.close();
        return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Error saving submission:', error);
        return new Response(JSON.stringify({ success: false, error: 'Submission failed' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
        });
    }
}
