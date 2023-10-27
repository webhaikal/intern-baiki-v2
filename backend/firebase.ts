// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, DocumentData, doc, getDoc, documentId} from "firebase/firestore";
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
export const addData = async (dataToSubmit: { name: string; address: string; postcode: string; district: string; state: string; location: string; description: string; time: string; contact: string; email: string; websiteUrl: string; facebookUrl: string; instagramUrl: string; twitterUrl: string; picture1: string; picture2: string; picture3: string; picture4: string; }) => {
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

    const companyData: { documentId: string; }[] = [];
    querySnapshot.forEach((doc) => {
      // Get data for each company and include the documentId
      const company = {
        documentId: doc.id,
        ...doc.data(),
      };
      companyData.push(company);
    });

    return companyData;
  } catch (error) {
    console.error('Error fetching companies data: ', error);
    return [];
  }
};

interface CompanyData {
  name: string;
  address: string;
  postcode: string;
  district: string;
  state: string;
  location: string;
  description: string;
  time: string;
  contact: string;
  websiteUrl: string;
  facebookUrl: string;
  instagramUrl: string;
  twitterUrl: string;
  picture1: string;
  // Add other properties as needed
}

// Modify your fetchCompanyDataById function in firebase.ts
export const fetchCompanyDataById = async (documentId: string): Promise<CompanyData | null> => {
  try {
    const companyDocRef = doc(db, 'companies', documentId);
    const companyDoc = await getDoc(companyDocRef);

    if (companyDoc.exists()) {
      const companyData = companyDoc.data() as CompanyData; // Cast the data to the CompanyData type
      return companyData;
    } else {
      console.error('Company document not found for documentId:', documentId);
      return null;
    }
  } catch (error) {
    console.error('Error fetching company data:', error);
    return null;
  }
};