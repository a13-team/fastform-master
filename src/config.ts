import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

export const { PORT, CRM_URL, FORM_PATH = "/app.php" } = process.env;
