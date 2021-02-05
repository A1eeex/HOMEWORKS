'use strict'

const USER_URL = 'https://api.github.com/users/{{login}}'
const input = document.querySelector('#input')
const wrap = document.querySelector('.wrap')
const userInfo = document.querySelector('#user-info')
const userInfoTemplate = document.querySelector('#user-info-template').innerHTML

document
  .querySelector('#form')
  .addEventListener('submit', onFormClick)

function onFormClick(event) {
  event.preventDefault()


  fetch(USER_URL.replace('{{login}}', input.value))
    .then((response) => {
      clearInput()
      return response.json()
    })
    .then((data) => {
      renderUser(data)
    })
    .catch((error) => console.error(error))
}

function renderUser(data) {
  const dataHtml = generateDataHtml(data)
  userInfo.innerHTML = dataHtml
}

function generateDataHtml(data) {
  return userInfoTemplate
    .replace('{{data.avatar_url}}', data.avatar_url)
    .replace('{{data.public_repos}}', data.public_repos)
    .replace('{{data.followers}}', data.followers)
    .replace('{{data.following}}', data.following)
}

function clearInput() {
  input.value = ''
}