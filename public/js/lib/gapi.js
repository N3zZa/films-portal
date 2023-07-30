function gapi() {

    this.appmode = config.app.mode;
    this.data = {}; //data PluginObject format
    //this.jdata = {}; //data json format
    this.tdata = {}; //data text format
    this.callback = "";

    this.support = 1; //1 - есть поддержка msgbus 0 - поддержка отсутствует

    try {
        this.mb_actions = new MsgBusConnection();
        this.mb_listen = new MsgBusConnection();
    } catch (e) {
        this.support = 0;
    }


    this.send = function(message, data) {
        if (this.appmode != 'webkit') return;
        this.message = message;
        this.data = data;
        this.mb_actions.send(this.createMessage());
    };

    this.store = function(message, data) {
        if (this.appmode != 'webkit') return;
        this.message = message;
        this.data = data;
        this.mb_actions.store(this.createMessage());
    };

    this.get = function(message) {
        if (this.appmode != 'webkit') return;
        data = this.mb_actions.get(message);
        if (data && data.__address__ != '__null__') {
            this.data = data;
            //this.jdata = JSON.parse(data._json);
            this.tdata = data._json;
            return data;
        } else {
            return null;
        }
    };

    this.delete = function(message) {
        if (this.appmode != 'webkit') return;
        this.mb_actions.delete(message);
    };

    this.createMessage = function() {
        mes = new MsgBusMessage(this.message);

        if (this.data) {
            for (var key in this.data) {
                mes[key] = this.data[key].toString();
            }
        }
        return mes;
    };

    this.history = [];

    this.listen = function(msbcallback, fncalback, context) {
        if (this.appmode != 'webkit') return;
        if (this.history.indexOf(msbcallback + ':' + context) == -1) {

            this.history.push(msbcallback + ':' + context);

            lastmb = this.mb_listen;

            lastmb.addListener(msbcallback, function(msg) {

                this.callback = msbcallback;
                this.data = msg;
                //this.jdata = JSON.parse(msg._json);
                this.tdata = msg._json;


                if (typeof fncalback == "function") {
                    fncalback(msg);
                }
                return true;
            });

            lastmb.startWatching();
        }
    };
}

var mb = new gapi();