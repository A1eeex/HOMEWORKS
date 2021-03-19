const ALBUMS_URL = 'https://jsonplaceholder.typicode.com/albums'
const PHOTOS_URL = 'https://jsonplaceholder.typicode.com/photos?albumId='


const API = {
    getAlbums: () => {
        return fetch(ALBUMS_URL).then((response) => response.json());
    },


    getPhotos: (id) => {
        return fetch(PHOTOS_URL + id).then((response) => response.json())
    }
}