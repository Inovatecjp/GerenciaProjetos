const App = require('./app')
const app = new App()

app.start(3012)

process.on('SIGINT', () => {
    app.redisClient.quit()
      .then(() => {
        console.log('Redis client disconnected');
        process.exit(0);
      })
      .catch((err) => {
        console.error('Error disconnecting Redis client:', err);
        process.exit(1);
      });
  });