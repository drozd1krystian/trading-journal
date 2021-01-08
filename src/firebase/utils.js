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

export const getUserId = () => auth.currentUser;

export const addPostToDb = (post, uid) => {
  firestore.collection("users").doc(uid).collection("posts").doc().set(post);
};

export const fetchPosts = async (uid, dateRange = [], search) => {
  const posts = [];
  const [start, end] = dateRange;
  let ref = firestore.collection("users").doc(uid).collection("posts");
  if (start && end) {
    if (start.getDate() === end.getDate())
      ref = ref.where(
        "postDate",
        "<=",
        new Date(new Date(start).setDate(new Date(start).getDate() + 1))
      );
    else ref = ref.where("postDate", ">=", start).where("postDate", "<=", end);
  }

  await ref.get().then((docs) =>
    docs.forEach((doc) => {
      const data = doc.data();
      if (search) {
        if (data.postTitle.toLowerCase().includes(search.toLowerCase()))
          posts.push({ ...data, id: doc.id, postDate: data.postDate.toDate() });
      } else
        posts.push({ ...data, id: doc.id, postDate: data.postDate.toDate() });
    })
  );
  return posts;
};

export const editPost = (uid, doc, data) =>
  firestore
    .collection("users")
    .doc(uid)
    .collection("posts")
    .doc(doc)
    .update(data);
