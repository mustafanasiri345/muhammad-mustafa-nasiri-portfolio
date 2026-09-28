/**
 * IndexedDB helper for storing high-resolution original profile photos.
 * Avoids localStorage 5MB QuotaExceededError while preserving original image fidelity.
 */

const DB_NAME = 'NasiriPortfolioDB';
const DB_VERSION = 1;
const STORE_NAME = 'profile_assets';
const KEY = 'original_profile_photo';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      return reject(new Error('IndexedDB not supported'));
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveProfileImage(data: string): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(data, KEY);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('Could not persist profile image in IndexedDB:', err);
    // Fallback: try localStorage safely with try-catch
    try {
      localStorage.setItem('mustafa_profile_photo', data);
    } catch {
      // Ignore quota errors in fallback
    }
  }
}

export async function savePortfolioImage(projectId: string, data: string): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(data, `portfolio_${projectId}`);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('Could not persist portfolio image in IndexedDB:', err);
  }
}

export async function getPortfolioImage(projectId: string): Promise<string | null> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(`portfolio_${projectId}`);
      req.onsuccess = () => {
        resolve(req.result ? (req.result as string) : null);
      };
      req.onerror = () => {
        resolve(null);
      };
    });
  } catch {
    return null;
  }
}

export async function getProfileImage(): Promise<string | null> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(KEY);
      req.onsuccess = () => {
        if (req.result) {
          resolve(req.result as string);
        } else {
          // Check fallback localStorage
          try {
            resolve(localStorage.getItem('mustafa_profile_photo'));
          } catch {
            resolve(null);
          }
        }
      };
      req.onerror = () => {
        try {
          resolve(localStorage.getItem('mustafa_profile_photo'));
        } catch {
          resolve(null);
        }
      };
    });
  } catch {
    try {
      return localStorage.getItem('mustafa_profile_photo');
    } catch {
      return null;
    }
  }
}

export async function clearProfileImage(): Promise<void> {
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(KEY);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('Could not clear IndexedDB image:', err);
  }

  try {
    localStorage.removeItem('mustafa_profile_photo');
  } catch {
    // Ignore
  }
}
