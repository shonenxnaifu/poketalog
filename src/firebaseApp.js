import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyCXP0SKI6sV19xQK_LD6BHy0cUVKSLeRc4',
  authDomain: 'poketalog.firebaseapp.com',
  databaseURL: 'https://poketalog.firebaseio.com/',
  projectId: 'poketalog',
  storageBucket: 'poketalog.appspot.com',
  messagingSenderId: '924347601373'
}

export const firebaseApp = firebase.initializeApp(config)
export const myPokemonsRef = firebaseApp.database().ref().child('mypokemons')
