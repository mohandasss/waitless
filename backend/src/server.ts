import 'dotenv/config';
import app from "./app.js";


const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`
  🚀 Server ready at: http://localhost:${PORT}
  👉 Health check: http://localhost:${PORT}/
  `);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Process terminated');
  });
});
