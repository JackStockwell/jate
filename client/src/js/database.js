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
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// CREATE METHOD
export const putDb = async (content) => {
    console.log('Adding text', content);

    // CREATE method for indexedDB
    const jateDb = await openDB('jate', 1);
    const tx = jateDb.transaction('contact', 'readwrite');
    const store = tx.objectStore('jate');
    const request = store.add(content);
    const result = await request;
    return result;
};

// GET METHOD
export const getDb = async () => {

    // GET method for indexedDB
    const jateDb = await openDB('jate', 1);
    const tx = jateDb.transaction('contact', 'read');
    const store = tx.objectStore('jate');
    const request = store.getAll();
    const result = await request;
    return result;
};

initdb();
