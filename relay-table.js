angular.module('accScoring').component('relayTable', {
  templateUrl: 'relay-table-template.html',
  controllerAs: 'relayCtrl',
  controller: function($http, $rootScope) {
    this.relayPoints = 0;

    $http.get('2016accScoring.php/relays').then( (response) => {
      $rootScope.teamPoints -= this.relayPoints;
      this.relayPoints = 0;
      
      this.relays = response.data;

      for(r of this.relays) {
        this.relayPoints += this.points(r.place);
      }
      $rootScope.teamPoints += this.relayPoints;
    });

    this.points = (place) => {
      var p = {
			'1':32,'2':28,'3':27,'4':26,'5':25,'6':24,'7':23,'8':22,
			'9':20,'10':17,'11':16,'12':15,'13':14,'14':13,'15':12,'16':11,
			'17':9,'18':7,'19':6,'20':5,'21':4,'22':3,'23':2,'24':1,'25+':0
      };
      var pp = p[place] * 2;
      return pp;
    };
  }
});
