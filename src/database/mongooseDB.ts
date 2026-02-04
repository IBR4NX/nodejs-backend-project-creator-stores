//  mongodb+srv://thrivq_db_ibovd:OFmfyK8Ddpa06ukX@ibovsdb.coaq32q.mongodb.net/?appName=ibovsDB
// mongoose.connect('mongodb+srv://thrivq_db_ibovd:OFmfyK8Ddpa06ukX@ibovsdb.coaq32q.mongodb.net/?appName=ibovsDB')
// const databaseurl =`mongodb+srv://Ibrahim:Ibr.714339227@cluster0.utsd0uz.mongodb.net/?appName=Cluster0`;
// const uri ="mongodb+srv://ibovstest:ibovs12345@ibr4nx.sjth1pb.mongodb.net/?appName=ibr4nx";
import mongoose from"mongoose";
import {DB_URL} from'../config';
mongoose
  .connect(DB_URL?.toString() || "")
  .then(() => {
    // console.log("DB Connected mongoose ✅");
    console.log( "\x1b[32m Connected mongoose ✅ \x1b[0m");
  })
  .catch((err) => console.error("DB Connection Error ❌", err));

  export default mongoose;