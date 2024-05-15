import { connect as _connect } from "mongoose";
const connectDb = async () => {
  try {
    // kya hi kr loge uri chori krke ;)
    const connect = await _connect(
      "mongodb+srv://shubh622005:1234567890@tms.dyhe8ut.mongodb.net/?retryWrites=true&w=majority&appName=tms"
    );
    console.log(
      "Db Connected: ",
      connect.connection.host,
      connect.connection.name
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default connectDb;
