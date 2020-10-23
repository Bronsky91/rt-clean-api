import "./LoadEnv"; // Must be the first import
import app from "./Server"
import logger from "./shared/Logger";

const env = process.env.NODE_ENV;
// Start the server
const port = env !== 'production' ? 8000 : process.env.PORT;
app.listen(port, () => {
  logger.info("Express server started on port: " + port);
});
