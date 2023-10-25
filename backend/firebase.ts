// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, DocumentData, doc, getDoc} from "firebase/firestore";
import { getDocs, query, where, orderBy } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

// Reference to a Firestore collection
const dataCollection = collection(db, "companies"); // Replace with the actual collection name

// Add a new document with the data
export const addData = async (dataToSubmit: { name: string; state: string; district: string; description: string; time: string; contact: string; dribbleUrl: string; facebookUrl: string; instagramUrl: string; twitterUrl: string; picture1: string; picture2: string; picture3: string; picture4: string; }) => {
  try {
    const docRef = await addDoc(dataCollection, dataToSubmit);
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

// Function to fetch company data from Firestore
export const fetchCompanyData = async () => {
  try {
    const q = query(collection(db, 'companies'));

    const querySnapshot = await getDocs(q);

    const companyData: DocumentData[] = [];
    querySnapshot.forEach((doc) => {
      // Get data for each company
      const company = doc.data();
      companyData.push(company);
    });

    return companyData;
  } catch (error) {
    console.error('Error fetching companies data: ', error);
    return [];
  }
};

// Function to fetch a specific company's data by companyId
export const fetchCompanyDataById = async (companyId: string) => {
  try {
    const companyDocRef = doc(db, 'companies', companyId);
    const companyDoc = await getDoc(companyDocRef);
    
    if (companyDoc.exists()) {
      const companyData = companyDoc.data();
      return companyData;
    } else {
      console.error('Company document not found.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching company data: ', error);
    return null;
  }
};