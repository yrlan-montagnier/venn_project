import { getApp, getApps, initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  getDocFromCache,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAxv1-aES_Bbc-qYw5DaFTkIzWPEj6B6aY",
  authDomain: "expoproject-d2a56.firebaseapp.com",
  databaseURL:
    "https://expoproject-d2a56-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "expoproject-d2a56",
  storageBucket: "expoproject-d2a56.appspot.com",
  messagingSenderId: "175582489900",
  appId: "1:175582489900:web:56335c47b46ef01ac7d089",
  measurementId: "G-PQ1EZ838YR",
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

function parseDocument(document) {
  return { id: document.id, ...document.data() };
}

export async function getAll(name) {
  const snapshot = await getDocs(query(collection(db, name)));
  return snapshot.docs.map(parseDocument);
}

export async function getOne(name, id) {
  const snapshot = await getDocFromCache(doc(db, name, id));
  return parseDocument(snapshot);
}
