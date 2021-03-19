const LIST_ALBUM_CLASS = 'list-album'

const listPhotoTemplate = document.querySelector('#listPhotoTemplate').innerHTML
const listAlbumTemplate = document.querySelector('#listAlbumTemplate').innerHTML

const listAlbums = document.querySelector('#listAlbums')
const listPhotos = document.querySelector('#listPhotos')

listAlbums.addEventListener('click', onAlbumListClick)


init();

function init() {
    getAlbums()
}


function getAlbums() {
    return API.getAlbums()
    .then((list) => {
        renderAlbumList(list)
        return list
    })
        .then(getFirstAlbumPhotos)
}

function getFirstAlbumPhotos(data) {
    if (data.length) {
        getPhotos(data[0].id)
    }
}

function renderAlbumList(list) {
    listAlbums.innerHTML = list.map(getAlbumHtml).join('')
}

function getAlbumHtml(album) {
    return listAlbumTemplate
        .replace('{{id}}', album.id)
        .replace('{{title}}', album.title);
}

function getPhotos(id) {
    return API.getPhotos(id)
    .then(renderPhotos)
}

function renderPhotos(list) {
    listPhotos.innerHTML = list
        .map((photo) => getPhotoHtml(photo)).join('')
}

function getPhotoHtml(photo) {
    return listPhotoTemplate
        .replace('{{title}}', photo.title)
        .replace('{{small-photo}}', photo.thumbnailUrl)
}

function onAlbumListClick(e) {
    getPhotos(e.target.dataset.id)
}
