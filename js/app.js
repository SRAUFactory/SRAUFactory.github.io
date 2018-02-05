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
        this.getData(GET_KNOWLEDGES_URL, this.setKnowledges);
        this.getData(GET_REPOSITORIES_URL, this.setRepositories);
        setInterval(this.sortKnowledges, 10000);
        setInterval(this.sortRepositories, 10000);
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
        setKnowledges: function(json) {
            this.knowledges = json;
            this.sortKnowledges();
        },
        sortKnowledges: function() {
            this.sortData(this.knowledges, ["updated_at", "created_at", "likes_count", "comments_count"]);
        },
        setRepositories: function(json) {
            this.repositories = json;
            this.sortRepositories();
        },
        sortRepositories() {
            let sortKeys = ["pushed_at", "created_at", "watchers_count", "stargazers_count", "forks_count", "open_issues_count"];
            this.repositories = this.sortData(this.repositories, sortKeys);
        },
        getData: function(url, callback) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url);
            xhr.onload = function () {
                callback(JSON.parse(xhr.responseText));
            };
            xhr.send();
        },
        sortData: function(data, sortKeys) {
            let random = Math.random();
            let sortKey = sortKeys[Math.floor(random *  sortKeys.length)];
            return data.sort(function (value1, value2) {
                return value1[sortKey] < value2[sortKey] ? 1 : -1;
            });
        }
    }
});
