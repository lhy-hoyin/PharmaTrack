import { Database } from "@db/sqlite";
const db = new Database("./database/products.db");

const create_table_command = `
        CREATE TABLE IF NOT EXISTS products(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                product_id INTEGER NOT NULL,
                name TEXT NOT NULL,
                manufacturer TEXT NOT NULL,
                supplier TEXT NOT NULL,
                batch_id INTEGER NOT NULL,
                quantity INTEGER NOT NULL,
                expiry INTEGER NOT NULL
        )
`;

if (db.open) {
  db.exec(create_table_command);
} else {
  console.error("DB is not connected");
  Deno.exit(1);
}

export default db;
