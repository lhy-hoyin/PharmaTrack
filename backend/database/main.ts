import { Database } from "@db/sqlite";
const db = new Database("./database/main.db");

const create_tables_command = `
        CREATE TABLE IF NOT EXISTS users(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL,
                password TEXT NOT NULL,
                salt TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS products(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                description TEXT,
                manufacturer TEXT NOT NULL,
                supplier TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS stock(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                product_id INTEGER NOT NULL,
                batch_number TEXT NOT NULL,
                manufacture_date INTEGER,
                expiry_date INTEGER,
                quantity INTEGER NOT NULL,
                FOREIGN KEY(product_id) REFERENCES products(id)
        );
        CREATE TABLE IF NOT EXISTS purchase_orders(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                timestamp TEXT NOT NULL,
                items TEXT NOT NULL,
                bill_to TEXT NOT NULL,
                deliver_to TEXT NOT NULL,
                requester INTEGER NOT NULL,
                approver INTEGER,
                status TEXT NOT NULL,
                FOREIGN KEY(requester) REFERENCES users(id),
                FOREIGN KEY(approver) REFERENCES users(id)
        );
`;

if (db.open) {
  db.exec(create_tables_command);
} else {
  console.error("DB is not connected");
  Deno.exit(1);
}

export default db;
