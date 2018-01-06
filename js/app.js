const GET_KNOWLEDGES_URL = "data/qiita.json";

var app = new Vue({
    el: '#knowledgesRepositores',
    data: {
        knowledges: []
    },
    created: function () {
        this.getKnowledges();
    },
    methods: {
        getKnowledges: function() {
            var self = this;
            var callback = function (json) {
                self.knowledges = json;
            }
            this.getData(GET_KNOWLEDGES_URL, callback);
        },
        getData: function(url, callback) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url);
            xhr.onload = function () {
                callback(JSON.parse(xhr.responseText));
            };
            xhr.send();
        }
    }
});
