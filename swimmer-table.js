angular.module('accScoring').component('swimmerTable', {
  templateUrl: 'swimmer-table-template.html',
  controllerAs: 'swimmerCtrl',
  controller: function($http, $rootScope) {
    this.indPoints = 0;
    this.loadTable = () => {
      $http.get('2016accScoring.php/swimmers').then( (response) => {
        $rootScope.teamPoints -= this.indPoints;
        this.indPoints = 0;

        this.swimmers = response.data;

        for (s of this.swimmers) {
          this.indPoints += this.totalPoints(s.e1p,s.e2p,s.e3p);
        }
        $rootScope.teamPoints += this.indPoints;
      });
    };
    this.loadTable();

    this.update = () => {
      $http({
        method: 'POST',
        url: '2016accScoring.php/',
        data: {
          name: this.lname,
          e1: this.e1,
          e2: this.e2,
          e3: this.e3
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then( (response) => {
        this.loadTable();
      });
    };

    this.totalPoints = (e1,e2,e3) => {
      var p = {
			'1':32,'2':28,'3':27,'4':26,'5':25,'6':24,'7':23,'8':22,
			'9':20,'10':17,'11':16,'12':15,'13':14,'14':13,'15':12,'16':11,
			'17':9,'18':7,'19':6,'20':5,'21':4,'22':3,'23':2,'24':1,'25+':0
      };
      return p[e1.toString()] + p[e2.toString()] + p[e3.toString()];
    };

    this.setActive = (person) => {
      this.activePerson = person;
      this.lname = person.lname;
      this.e1 = person.e1p;
      this.e2 = person.e2p;
      this.e3 = person.e3p;
    };

    this.selectOptions = {
      '1':'1st','2':'2nd','3':'3rd','4':'4th','5':'5th','6':'6th','7':'7th',
      '8':'8th','9':'9th','10':'10th','11':'11th','12':'12th','13':'13th',
      '14':'14th','15':'15th','16':'16th','17':'17th','18':'18th','19':'19th'
      ,'20':'20th','21':'21st','22':'22nd','23':'23rd','24':'24th','25+':'25th+'
    };
  }
});
