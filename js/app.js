const GET_KNOWLEDGES_URL   = "data/qiita.json";
const GET_REPOSITORIES_URL = "https://api.github.com/users/SRAUFactory/repos?per_page=100";

var app = new Vue({
    el: '#knowledgesRepositores',
    data: {
        knowledges:   [],
        repositories: [],
    },
    created: function () {
        this.getKnowledges();
        this.getRepositories();
    },
    methods: {
        getKnowledges: function() {
            var self = this;
            var callback = function (json) {
                self.knowledges = json;
            };
            this.getData(GET_KNOWLEDGES_URL, callback);
        },
        getRepositories: function() {
            var self = this;
            var callback = function (json) {
                self.repositories = json;
                self.repositories.sort(function (value1, value2) {
                    return value1.pushed_at < value2.pushed_at? 1 : -1; 
                });
            };
            this.getData(GET_REPOSITORIES_URL, callback);
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
