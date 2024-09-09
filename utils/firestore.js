import { getFirestore } from "firebase/firestore";
import app from "./firebaseConfog";

const db = getFirestore(app);
export default db;


