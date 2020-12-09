import mongoose, { model } from 'mongoose';

const { Schema } = mongoose;

const logsSchema = new Schema({
  method: String,
  path: String,
  payload: Object,
}, { timestamps: true, capped: { size: 1024 } });

const LogModel = model('Log', logsSchema);

export default LogModel;
