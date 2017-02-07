angular.module('starter.controllers', [])

.controller('SMSController', function($scope,$state, $cordovaSms,$rootScope,$ionicHistory) {
  $rootScope.Name='Bramini';
 $rootScope.PhoneNum='897878978';
 $scope.geoLocation   =navigator.geolocation.getCurrentPosition(function (position){
         var lat= position.coords.latitude
          var long=position.coords.longitude
          console.log(lat +''+long)
          $rootScope.location='https://www.google.co.in/maps/@'+lat+','+long+'z'
        })
      
    function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}


    
/*function showPosition(position) {
    var latlon = position.coords.latitude + "," + position.coords.longitude;
  console.log(latlon)
    var img_url = "https://maps.googleapis.com/maps/api/staticmap?center="
    +latlon+"&zoom=14&size=400x300&sensor=false";
    document.getElementById("mapholder").innerHTML = "<img src='"+img_url+"'>";
}*/

 

  

  document.addEventListener("deviceready", function() {
    cordova.plugins.diagnostic.isGpsLocationAvailable(function(available){
    console.log("GPS location is " + (available ? "available" : "not available"));
}, function(error){
    console.error("The following error occurred: "+error);
});
 
  var options = {
    replaceLineBreaks: false, // true to replace \n by a new line, false by default
    android: {
      intent: '' // send SMS with the native android SMS messaging
        //intent: '' // send SMS without open any other app
        //intent: 'INTENT' // send SMS inside a default SMS app
    }
  };
 
  $scope.sendSMS = function() {
     console.log('Name: '+$rootScope.Name+' Phone Numer: '+$rootScope.PhoneNum
 +' Location: '+$rootScope.location);
  var sendSms= JSON.parse(localStorage.getItem("sendSMS1"));

 var sms='Name: '+$rootScope.Name+' Phone Numer: '+$rootScope.PhoneNum
 +' Location: '+$rootScope.location;
for(var i=0;i< sendSms.length;i++){
    $cordovaSms
      .send(sendSms[i], sms, options)
      .then(function() {
        alert('Success');
        // Success! SMS was sent
      }, function(error) {
        alert(error);
        console.log(error)
        // An error occurred
      });
  }

  }

});


})


.controller('Setting', function($scope,$state, $cordovaSms,$rootScope) {
 
 $rootScope.SendingSms=[];
  $scope.sendSms=null;
  $scope.sendPhno={};
  $scope.addMore=function(){
    console.log('Hai')
    console.log($scope.sendPhno.phNum)
    console.log($rootScope.SendingSms.length)
  if( $rootScope.SendingSms.length<10){
   var sendPhno =$scope.sendPhno.phNum.toString();
  $rootScope.SendingSms.push(sendPhno);

  console.log( $rootScope.SendingSms)
    localStorage.setItem("sendSMS1",JSON.stringify($rootScope.SendingSms))
   var sendSms= JSON.parse(localStorage.getItem("sendSMS1"));
  document.getElementById("number").value="";
  }else{
    localStorage.setItem("sendSMS1",JSON.stringif($rootScope.SendingSms))
    console.log(JSON.parse(localStorage.getItem("sendSMS1")))
    
    document.getElementById('addMor').style.background  ='red';
    console.log('Limit Exceds')
  }
}

  $scope.myGoBack = function() {
  console.log('Hai')
    window.history.back();
  };
   $scope.close=function(index){
  console.log(index)
  console.log($rootScope.SendingSms)
  $rootScope.SendingSms.splice(index,1);
  console.log($rootScope.SendingSms)
}
})