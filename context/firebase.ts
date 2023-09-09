import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore"

export interface ILibrary {
  userID: string;
  movieTitle: string;
}
const firebaseConfig = {
  apiKey: "AIzaSyCLOZT-LI2p0gAkMsVMS9cQEr2g-03l_2U",
  authDomain: "reflix-cafa3.firebaseapp.com",
  projectId: "reflix-cafa3",
  storageBucket: "reflix-cafa3.appspot.com",
  messagingSenderId: "455480239031",
  appId: "1:455480239031:web:7ea4e8e0ec97e7b15fbe32",
  measurementId: "G-QLNTW2MQJH"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

const firestore = getFirestore(app);

export async function addNewDocument(title: String) {
  const docsName = doc(firestore, `library/${localStorage.getItem('auth') + title.toLowerCase().replace(" ", "")}`)
  const docData = {
    userID: localStorage.getItem('auth'),
    movieTitle: title,
  };
  try {
    await setDoc(docsName, docData);
    alert(`Added ${title} to your library.`);
  } catch (error) {
    alert(`Got error while trying to save movie to library: ${error}`);
  }
}

export async function removeDocument(title: String) {
  try {
    await deleteDoc(doc(firestore, "library", localStorage.getItem('auth') + title.toLowerCase().replace(" ", "")));
    alert(`Removed ${title} from your library.`);
  } catch (error) {
    console.log(`Got error while trying to remove movie from library: ${error}`);
  }
}

export async function queryForDocuments() {
  const userLibraryQuery = query(
    collection(firestore, 'library'),
    where('userID', '==', localStorage.getItem('auth'))
  );

  const querySnapshot = await getDocs(userLibraryQuery);

  let movies: ILibrary[] = [];

  querySnapshot.forEach((snap) => {
    movies.push(JSON.parse(JSON.stringify(snap.data())));
  });
  return movies;
}

export async function isDocExist(title: string) {
  const docsName = doc(firestore, `library/${localStorage.getItem('auth') + title.toLowerCase().replace(" ", "")}`)
  const mySnapshot = await getDoc(docsName);
  return mySnapshot.exists();
}

export default app;
