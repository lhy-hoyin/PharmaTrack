import { Database } from "@db/sqlite";
const db = new Database("./database/main.db");

const create_table_command = `
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
`;

if (db.open) {
  db.exec(create_table_command);
} else {
  console.error("DB is not connected");
  Deno.exit(1);
}

export default db;
