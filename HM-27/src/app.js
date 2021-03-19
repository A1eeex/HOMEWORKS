import $ from 'jquery';
import Chat from './Chat';

import './Skeleton/normalize.css';
import './Skeleton/skeleton.css';
import './styles.css';

const $newMessages = $('#newMessages');
const $messageInput = $('#message-inp');
const $clientInp = $('#client-inp');
const MESSAGE_NAME_CLASS = $('.message-name');
const MESSAGE_NAME_MAIL = $('.message-mail');

const talk = new Chat({
    onMessage: addChatMessage,
});

$('#inpForm').on('submit', (event) => {
    event.preventDefault();
    sendMessage();
});

talk.initConnection();

function addChatMessage({ data }) {
    const $messageName = $(`<div>Name: ${data.username}.</div> `);
    const $messageEmail = $(`<div>New message: ${data.message}.</div> `);

    $newMessages.append($messageName);
    setTimeout(() => {
        $messageName.addClass(MESSAGE_NAME_CLASS);
    });

    $newMessages.append($messageEmail);
    setTimeout(() => {
        $messageEmail.addClass(MESSAGE_NAME_MAIL);
    });
}

function sendMessage() {
    talk.send($clientInp.val(), $messageInput.val());
    clearInpForm()
}

function clearInpForm() {
    $messageInput.val('');
    $clientInp.val('');
}