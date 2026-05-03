import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Replace these with the values from your GCP Identity Platform!
const firebaseConfig = {
  apiKey: "AIzaSyClDxRfhU1fePo3qBe7RHSCTJHv3MHB260",
  authDomain: "project-f35c2606-4468-474a-9ca.firebaseapp.com",
  projectId: "cloud-chaos-testing", // Replace if your project ID is different
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };


