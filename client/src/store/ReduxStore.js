import { configureStore } from '@reduxjs/toolkit';
import reducers from '../Reducers';

function saveToLocalStorage(store) {
  try {
    const serializedStore = JSON.stringify(store.getState());
    localStorage.setItem('store', serializedStore);
  } catch (e) {
    console.log(e);
  }
}

function loadFromLocalStorage() {
  try {
    const serializedStore = localStorage.getItem('store');
    if (serializedStore === null) return undefined;
    return JSON.parse(serializedStore);
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

const preloadedState = loadFromLocalStorage();

const store = configureStore({
  reducer: reducers, // Use `reducer` instead of `reducers`
  preloadedState,
});

store.subscribe(() => saveToLocalStorage(store));

export default store;
