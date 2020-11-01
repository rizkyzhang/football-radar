import { openDB } from "idb";

const idbPromised = openDB("fbl-radar-db", 1, {
  upgrade(db) {
    db.createObjectStore("favorite", { keyPath: "id" });
  },
});

export const addData = (store, data) => new Promise((resolve, reject) => {
  idbPromised
    .then((db) => {
      db.add(store, data);
    })
    .then(() => resolve(true))
    .catch((error) => reject(error));
});

export const getAllData = (store) => new Promise((resolve, reject) => {
  idbPromised
    .then((db) => {
      const data = db.getAll(store);
      return data;
    })
    .then((data) => resolve(data))
    .catch((error) => reject(error));
});

export const getSingleData = (store, key) => new Promise((resolve, reject) => {
  idbPromised
    .then((db) => {
      const data = db.get(store, key);
      return data;
    })
    .then((data) => resolve(data))
    .catch((error) => reject(error));
});

export const deleteSingleData = (store, key) => new Promise((resolve, reject) => {
  idbPromised
    .then((db) => {
      db.delete(store, key);
    })
    .then(() => resolve(true))
    .catch((error) => reject(error));
});
