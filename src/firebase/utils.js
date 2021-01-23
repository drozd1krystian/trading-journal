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

export const addPostToDb = async (post, uid) =>
  firestore
    .collection("users")
    .doc(uid)
    .collection("posts")
    .add(post)
    .then((docRef) => docRef);

export const fetchPosts = async (uid, dateRange = [], search = []) => {
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
  if (search.length > 0) {
    ref = ref.where("tags", "array-contains-any", search);
  }
  await ref.get().then((docs) =>
    docs.forEach((doc) => {
      const data = doc.data();
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

export const deletePostInDb = (uid, doc) =>
  firestore.collection("users").doc(uid).collection("posts").doc(doc).delete();

export const addTradeToDb = (uid, trade) =>
  firestore
    .collection("users")
    .doc(uid)
    .collection("trades")
    .add(trade)
    .then((docRef) => docRef);

export const updateUserBalance = (uid, balance) => {
  console.log(balance);
  firestore.collection("users").doc(uid).update({
    balance,
  });
};

export const fetchBalanceFromDb = async (uid) => {
  const balance = [];
  await firestore
    .collection("users")
    .doc(uid)
    .collection("balance")
    .get()
    .then((docs) =>
      docs.forEach((doc) => {
        const dates = doc.data().chart_data.dates;
        const values = doc.data().chart_data.values;
        return balance.push({ id: doc.id, dates, values });
      })
    );
  return balance[0];
};
