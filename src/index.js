import app from './server';
import { PORT } from './config/config';

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
