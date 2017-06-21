import angular from 'angular';
import uiRouter from 'angular-ui-router';

import routing from './main.routes';
import _ from 'lodash';

export class MainController {
  /*@ngInject*/
  constructor($http) {
    this.$http = $http;
    this.isSeaching = false;
  }


  onSearch(searchParam) {
    let techStack = 'js';
    let fileType = 'json';

    this.publicRepos = [];
    this.resultRepos = [];

    this.isSeaching = true;

    this.$http.get('https://api.github.com/search/repositories?q=' + searchParam
      + '+language:' + techStack
      + '&sort=stars&order=desc')
      .then(response => {
        this.publicRepos = _.filter(response.data.items, i => {
          return i.watchers_count > 10;
        });
        this.resultRepos = this.publicRepos;
        // this.publicRepos.forEach(repo => {
        //   this.$http.get('https://api.github.com/search/code?q=' + searchParam + '+in:file+language:' + fileType + '+repo:' + repo.full_name)
        //     .then(response1 => {
        //       if (response1.data.total_count > 0) {
        //         this.resultRepos.push(repo);
        //       }
        //       this.isSeaching = false;
        //       console.log(this.resultRepos);
        //     });
        // }, this);
      });
  }
}

export default angular.module('testApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
