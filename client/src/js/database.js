import { openDB } from 'idb';

const initdb = async () =>
  // Make a new database call jate
  openDB('jate', 1, {

    // Add our database schema if for initialisation.
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true});
      console.log('jate database created');
    },
  });

// UPDATE METHOD
export const putDb = async (content) => {
    console.log('Adding text', content);

    // UPDATE method for indexedDB
    const jateDb = await openDB('jate', 1);
    const tx = jateDb.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    const request = store.put({ text: content, id: 1});
    const result = await request;
    return result;
};

// GET METHOD
export const getDb = async () => {

    // GET method for indexedDB
    const jateDb = await openDB('jate', 1);
    const tx = jateDb.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const request = store.get(1);
    const result = await request;
    return result;
};

initdb();
