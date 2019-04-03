const GET_KNOWLEDGES_URL   = "data/qiita.json";
const GET_REPOSITORIES_URL = "https://api.github.com/users/SRAUFactory/repos?per_page=100";
const DATE_FORMAT = 'YYYY/MM/DD';
const INTERVAL_COUNT = 5000;

var app = new Vue({
    el: '#knowledgesRepositores',
    data: {
        knowledges:   [],
        repositories: [],
    },
    created: function () {
        this.getData(GET_KNOWLEDGES_URL).then(json => this.setKnowledges(json));
        this.getData(GET_REPOSITORIES_URL).then(json => this.setRepositories(json));
        setInterval(this.sortKnowledges, INTERVAL_COUNT);
        setInterval(this.sortRepositories, INTERVAL_COUNT);
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
            this.knowledges.sort(this.getSortProcess(["updated_at", "created_at", "likes_count", "comments_count"]));
        },
        setRepositories: function(json) {
            this.repositories = json;
            this.sortRepositories();
        },
        sortRepositories: function() {
            this.repositories.sort(this.getSortProcess(
                ["pushed_at", "created_at", "watchers_count", "stargazers_count", "forks_count", "open_issues_count"]
            ));
        },
        getData: (url) => {
            return fetch(url)
            .then(response => response.json());
        },
        getSortProcess: (sortKeys) => {
            let sortKey = sortKeys[Math.floor(Math.random() *  sortKeys.length)];
            return (value1, value2) => {
                return value1[sortKey] < value2[sortKey] ? 1 : -1;
            };
        }
    }
});
