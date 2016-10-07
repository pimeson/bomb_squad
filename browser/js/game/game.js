app.config(function ($stateProvider) {

    $stateProvider.state('game', {
        url: '/game/:gameKey',
        templateUrl: 'js/game/game.html',
        controller: 'GameCtrl',
        // resolve: {
        //   user: function(AuthService){
        //    return AuthService.getLoggedInUser();
        //   }
        // }
    });

});

app.controller('GameCtrl', function($scope, $stateParams){

  var rootRef = firebase.database().ref('/game');
  $scope.currentGame = rootRef.child($stateParams.gameKey);

  $scope.loggedInUserId = 1;

  $scope.components = [{ userAssigned: 1, type: 'battery', content: null }, { userAssigned: 2, type: 'serial number', content: '1238548'}, { userAssigned: 3, type: 'battery', content: null }];


  $scope.squadName = 'the squad';

  // console.log('plz work', $scope.error)


  $scope.currentGame.on('value', function(snapshot) {
    $scope.strikes = snapshot.val().strikes;
    console.log('this is scope.strikes', $scope.strikes);
    $scope.$digest();
  });

  $scope.gamePlaying = null;

  $scope.currentGame.child('gameStarted').on('value', function(snap){
    if(snap.val()){
      if (!$scope.gamePlaying) {
        $scope.gamePlaying = true;
        $scope.startGame();
        $scope.$digest();
      } else {
        return;
      }
    }
  });

  $scope.startGame = function() {

      if(!$scope.gamePlaying){
        $scope.gamePlaying = true;
        $scope.currentGame.update({ gameStarted: true });
        $scope.currentGame.update({ startTime: Date.now() });
      }

      $scope.timerNum = '5:00';

      $scope.currentGame.on('value', function(snapshot) {
          $scope.startTime = snapshot.val().startTime;
          $scope.timeLimit = snapshot.val().timeLimit;
      });

      setInterval(function() {
        if ($scope.timerNum === '0:00') {
            console.log('YOU EXPLODED!!!!');
            return;
        }

          var ms = $scope.timeLimit - (Date.now() - $scope.startTime);
          var seconds = function() {
              var s = (ms / 1000) % 60;
              if (s < 10) {
                  return '0' + s.toString().slice(0, 1);
              } else {
                  return s.toString().slice(0, 2);
              }

          }

          $scope.timerNum = (((ms / 1000 / 60) << 0) + ':' + seconds());
          $scope.$digest();
      }, 500);

  }


});


