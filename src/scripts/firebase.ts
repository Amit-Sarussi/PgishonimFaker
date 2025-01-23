import { initializeApp } from "firebase/app";
import { getDocs, getFirestore } from 'firebase/firestore';
import { collection, addDoc } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const usersCollectionRef = collection(db, 'permits');

const saveDataToFirebase = async (name: string) => {

    const dataToSave = {
        name: name,
        time: Date.now(),
    };

    console.log('Data to save:', dataToSave); // Log the data before sending

    try {
        await addDoc(usersCollectionRef, dataToSave);
    } catch (error) {
        console.error('Error saving data:', error); // Log any errors
    }
};

const getDataFromFirebase = async () => {
    try {
        const querySnapshot = await getDocs(usersCollectionRef);
        const data = querySnapshot.docs.map((doc) => doc.data());

        return data.sort((a, b) => b.time - a.time);

        // ... use the 'data' array in your component 

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

export { saveDataToFirebase, getDataFromFirebase };
