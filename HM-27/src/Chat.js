import { URL } from "./configs";

export default class Chat {
    constructor(option) {
        this.option = option;
    }

    initConnection() {
        this.socket = new WebSocket(URL);
        this.socket.onmessage = this.onSocketMessage.bind(this);
    }

    onSocketMessage(e) {
        this.option.onMessage && this.option.onMessage(JSON.parse(e.data));
    }

    send(name, message) {
        this.socket.send(
            JSON.stringify({
                type: 'message',
                data: {
                    username: name,
                    message: message,
                },
            })
        );
    }
}