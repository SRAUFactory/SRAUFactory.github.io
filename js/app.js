const GET_KNOWLEDGES_URL   = "data/qiita.json";
const GET_REPOSITORIES_URL = "https://api.github.com/users/SRAUFactory/repos?per_page=100";
const DATE_FORMAT = 'YYYY/MM/DD hh:mm:ss';

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
    filters: {
        formatDate: function (dateString) {
            let date = new Date(dateString);
            return DATE_FORMAT.replace(/YYYY/g, date.getFullYear())
                .replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2))
                .replace(/DD/g, ('0' + date.getDate()).slice(-2))
                .replace(/hh/g, ('0' + date.getHours()).slice(-2))
                .replace(/mm/g, ('0' + date.getMinutes()).slice(-2))
                .replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
        }
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
