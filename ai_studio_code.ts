import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, onSnapshot } from "firebase/firestore";
import { SiteContent } from "./types";

// Firebase Console (console.firebase.google.com) থেকে আপনার প্রোজেক্টের তথ্য বসান
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// ডিফল্ট প্রাথমিক ডাটা (যদি ডাটাবেজে কিছু না থাকে)
export const initialSiteData: SiteContent = {
  orgName: "দক্ষিণ বাড়ন্তি সনাতনী যুব সংঘ",
  tagline: "সার্বজনীন ভৈরব তলী, মৌলভীবাজার",
  emergencyNotice: "আসন্ন শ্রীশ্রী শারদীয়া দুর্গা পূজা ও অষ্টপ্রহর নামকীর্তনের প্রস্তুতি সভা আগামী শুক্রবার সন্ধ্যা ৭টায় অনুষ্ঠিত হবে।",
  showNotice: true,
  heroTitle: "ঐতিহ্য ও আধ্যাত্মিকতার মিলনমেলা - সার্বজনীন ভৈরব তলী",
  heroDescription: "ধর্মীয় মূল্যবোধ রক্ষা, মন্দির নির্মাণ, অষ্টপ্রহর নামকীর্তন এবং মানবতার সেবায় আমরা ঐক্যবদ্ধ।",
  heroImage: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&q=80",
  eventTitle: "শ্রীশ্রী শারদীয়া দুর্গোৎসব ও নামকীর্তন",
  eventDate: "অক্টোবর ২০২৬",
  eventDetails: "ভক্তবৃন্দের উপস্থিতি ও সার্বিক সহযোগিতা একান্ত কাম্য।",
  bkashNumber: "017XXXXXXXX (Personal)",
  nagadNumber: "018XXXXXXXX (Personal)",
  rocketNumber: "019XXXXXXXX-X",
  bankDetails: "সোনালী ব্যাংক, মৌলভীবাজার শাখা, হিসাব নং: ১২৩৪৫৬৭৮৯",
  contactPhone: "+880 1700-000000",
  contactAddress: "দক্ষিণ বাড়ন্তি, ভৈরব তলী, মৌলভীবাজার, বাংলাদেশ"
};

// রিয়েল-টাইম ডাটা সিঙ্ক ফাংশন (কোনো রিলোড ছাড়াই ভিজিটরের কাছে আপডেট পৌঁছাবে)
export const subscribeToSiteData = (callback: (data: SiteContent) => void) => {
  const docRef = doc(db, "website", "content");
  return onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data() as SiteContent);
    } else {
      callback(initialSiteData);
    }
  });
};

// এডমিন থেকে ডাটা সেভ করার ফাংশন
export const saveSiteData = async (data: SiteContent) => {
  const docRef = doc(db, "website", "content");
  await setDoc(docRef, data, { merge: true });
};