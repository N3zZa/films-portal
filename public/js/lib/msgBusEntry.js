    function MsgBusMessage(address) {
        message = {};
        message["__address__"] = address;
        return message;
    }

    function MsgBusConnection() {
        this.listeners = {};

        this.is_watching = false;

        this.get = function (address) {
            return mbus.get(address);
        };

        this.store = function (message) {
            mbus.store(message);
        };

        this.send = function (message) {
            mbus.send(message);
        };

        this.delete = function (message) {
            mbus.del(message);
        };

        this.addListener = function (address, listener) {

            if (!this.listeners[address]) {
                this.listeners[address] = new Array();
                mbus.subscribe(address);
            };

            this.listeners[address].push(listener);
        };

        this.on_message = function (message) {
            for (var i in this.listeners[message.__address__]) {
                this.listeners[message.__address__][i](message);
            }
        };

        this.startWatching = function () {
            if (this.is_watching) return;
            this.is_watching = true;
            mbus.on_message_signal.connect(this, "on_message");
        };
    };

