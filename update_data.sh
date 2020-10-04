#!/bin/bash
git checkout master
git pull
./QiitaClientGo -t file -f data/qiita.json
git commit -a -m 'feat: qiita.jsonの更新'
git push