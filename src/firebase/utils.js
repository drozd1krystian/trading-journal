import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { firebaseConfig } from "./config";

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const handleUserProfile = async ({ userAuth, additionalData }) => {
  if (!userAuth) return;
  const { uid } = userAuth;
  const userRef = firestore.doc(`users/${uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { name, email } = userAuth;
    const timestamp = new Date();

    try {
      await userRef.set({
        email,
        name,
        createdDate: timestamp,
        ...additionalData,
      });
    } catch (err) {
      // console.log(err);
    }
  }

  return userRef;
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged((userAuth) => {
      resolve(userAuth);
    }, reject);
  });
};

export const addPostToDb = (post, uid) => {
  firestore.collection("users").doc(uid).collection("posts").doc().set(post);
};

export const fetchPosts = async (uid) => {
  const posts = [];
  await firestore
    .collection("users")
    .doc(uid)
    .collection("posts")
    .get()
    .then((docs) =>
      docs.forEach((doc) => {
        const data = doc.data();
        posts.push({ ...data, id: doc.id });
      })
    );
  return posts;
};
