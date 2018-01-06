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
            var xhr = new XMLHttpRequest();
            var self = this;
            xhr.open("GET", GET_KNOWLEDGES_URL);
            xhr.onload = function () {
                self.knowledges = JSON.parse(xhr.responseText);
                console.log(self.knowledges);
            };
            xhr.send();
        }
    }
});
