app.controller("mainController", function($scope, $http){
	
	$scope.init = function() {		
		$scope.searchTVShow = "silicon valley";
		$scope.TVShowSearch();	
	   };
   
    $scope.FinalList= [];
    $scope.TVShowSearch = function(){
    	if ($scope.searchTVShow) {
    		
    		$http({ method:'GET',
    		    url: 'http://www.omdbapi.com/?t=' + $scope.searchTVShow + '&Season=1' + '&y=&plot=short&r=json',
    		    headers: {'Accept': 'application/json'}
    		  }).success(
    		    function (response) {
    		    if(response.Response == "True") {	
    		      var seseasonList = response;
    		      $scope.EpisodeList = seseasonList.Episodes;
                  
    		      if($scope.EpisodeList){
    		      $scope.resultshow = true;
    		        for(i = 0; i < $scope.EpisodeList.length; i++){
    		          $http({ method:'GET',url: 'http://www.omdbapi.com/?i=' + $scope.EpisodeList[i].imdbID + '&plot=short&r=json',headers: {'Accept': 'application/json'}
    		          }).
    		            success(
    		            function (data) {
    		              $scope.FinalList.push(data);
    		            }
    		          );
    		        }
    		      }
    		    }
    		    else
    		    	{
    		    	 $scope.resultshow = false;
    		    	 $scope.error = response.Error;
    		    	}
    		    }
    		  );
			  
			  
          } else {   
        	 $scope.resultshow = false;
        	 $scope.error = "Please provide me the correct TVShows";
          }   		
    		
    };
    
    $scope.getMonth = function(value)
    {
    	var month = value.slice(2,7);
    	return month;
    };
    
});

