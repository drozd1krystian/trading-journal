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
  const balanceRef = userRef.collection("balance");
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { name, email } = userAuth;
    const timestamp = new Date();

    const date = new Date();
    date.setDate(date.getDate() - 1);
    const formattedDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;

    try {
      await userRef.set({
        email,
        name,
        createdDate: timestamp,
        ...additionalData,
      });
      await balanceRef.set({
        balance: 2000,
        dates: [formattedDate],
        values: [0],
        loses: 0,
        wins: 0,
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
  // If trade in db update : to do
  firestore
    .collection("users")
    .doc(uid)
    .collection("trades")
    .add(trade)
    .then((docRef) => docRef);

export const updateUserBalance = (uid, balance) =>
  firestore
    .collection("users")
    .doc(uid)
    .collection("balance")
    .doc(balance.id)
    .set(balance);

export const fetchBalanceFromDb = async (uid) => {
  const balance = [];
  await firestore
    .collection("users")
    .doc(uid)
    .collection("balance")
    .get()
    .then((docs) =>
      docs.forEach((doc) => {
        return balance.push({
          id: doc.id,
          ...doc.data(),
        });
      })
    );
  return balance[0];
};

export const fetchTradesFromDb = async (uid) => {
  const trades = [];
  let tradesRef = firestore.collection("users").doc(uid).collection("trades");
  // if (tags.length > 0)
  //   tradesRef = tradesRef.where("tags", "array-contains-any", tags);
  // if (start && end) {
  //   if (start.getDate() === end.getDate())
  //     tradesRef = tradesRef.where(
  //       "date",
  //       "<=",
  //       new Date(new Date(start).setDate(new Date(start).getDate() + 1))
  //     );
  //   else
  //     tradesRef = tradesRef.where("date", ">=", start).where("date", "<=", end);
  // }

  // if (type !== "type") tradesRef = tradesRef.where("type", "==", type);
  // if (side !== "" && side !== "side")
  //   tradesRef = tradesRef.where("side", "==", side);
  // if (symbol.length) tradesRef = tradesRef.where("symbol", "==", symbol);

  await tradesRef.get().then((docs) =>
    docs.forEach((doc) =>
      trades.push({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date.toDate(),
      })
    )
  );
  return trades;
};

export const removeTradeFromDb = (uid, tradeId) =>
  firestore
    .collection("users")
    .doc(uid)
    .collection("trades")
    .doc(tradeId)
    .delete();

export const editTradeInDb = (uid, trade, id) =>
  firestore
    .collection("users")
    .doc(uid)
    .collection("trades")
    .doc(id)
    .set(trade);
