import app from './server';

const { PORT = 3000 } = process.env;

const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server running on PORT ${PORT} :)`);
    });
  } catch (e) {
    console.log(e);
  }
};

startServer();
