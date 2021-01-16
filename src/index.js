// import mongoose from 'mongoose';
import db from '../models';
import app from './server';

const { PORT = 3000 } = process.env;

const startServer = async () => {
  try {
    // await mongoose.connect(process.env.DB_URL, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   useFindAndModify: false,
    //   useCreateIndex: true,
    // });
    await db.sequelize.sync({ force: true });
    app.listen(PORT, () => {
      console.log(`Server running on PORT ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

startServer();
