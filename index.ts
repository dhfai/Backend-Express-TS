import { logger } from "./application/loggin.";
import { web } from "./application/web"
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT_APP || 3005;


web.listen(PORT, () => {
	logger.info(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});