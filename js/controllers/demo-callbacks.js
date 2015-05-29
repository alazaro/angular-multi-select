myApp.controller( 'demoCallbacks' , [ '$scope' , function ($scope) {               

    $scope.modernBrowsers = [
	    {
		    name: "Modern browsers",
		    sub: [
			    {
				    name: "Closed Source",
				    sub: [
					    {
						    icon: '<img  src="https://cdn1.iconfinder.com/data/icons/google_jfk_icons_by_carlosjj/32/chrome.png" />',
						    name: "Chrome"
					    },
					    {
						    icon: '<img  src="https://cdn0.iconfinder.com/data/icons/fatcow/32x32/safari_browser.png" />',
						    name: "Safari"
					    }
				    ]
			    },
			    {
				    name: "Open Source",
				    sub: [
					    {
						    icon: '<img  src="https://cdn2.iconfinder.com/data/icons/humano2/32x32/apps/firefox-icon.png" />',
						    name: "Firefox",
						    check: true
					    },
					    {
						    icon: '<img  src="https://cdn2.iconfinder.com/data/icons/new_google_product_icons_by_carlosjj-dwke/32/chromium.png" />',
						    name: "Chromium",
						    check: true
					    },
					    {
						    icon: '<img  src="https://cdn1.iconfinder.com/data/icons/logotypes/32/opera-32.png" />',
						    name: "Opera",
						    check: true
					    }
				    ]
			    }
		    ]
	    },
	    {
		    name: "Old Browsers",
		    sub: [
			    {
				    icon: '<img src="https://cdn1.iconfinder.com/data/icons/fs-icons-ubuntu-by-franksouza-/32/epiphany-icon.png" />',
				    name: "Epiphany"
			    },
			    {
				    icon: '<img  src="https://cdn1.iconfinder.com/data/icons/CrystalClear/32x32/apps/netscape.png" />',
				    name: "Netscape"
			    },
			    {
				    icon: '<img src="https://cdn1.iconfinder.com/data/icons/CrystalClear/32x32/apps/konqueror.png" />',
				    name: "Konqueror"
			    }
		    ]
	    },
	    {
		    name: "Wannabe browsers",
		    sub: [
			    {
				    icon: '<img src="https://cdn4.iconfinder.com/data/icons/iconsimple-logotypes/512/internet_explorer-32.png" />',
				    name: "Internet Explorer"
			    }
		    ]
	    }
    ];

    $scope.fOpen = function() {
        console.log( 'On-open' );
    }

    $scope.fClose = function() {
        console.log( 'On-close' );
    }    

    $scope.fClick = function( data ) {           
        console.log( 'On-item-click' );        
        console.log( 'On-item-click - data:' );        
        console.log( data );
    }    

    $scope.fSelectAll = function() {
        console.log( 'On-select-all' );
    }

    $scope.fSelectNone = function() {
        console.log( 'On-select-none' );
    }

    $scope.fReset = function() {
        console.log( 'On-reset' );
    }        

    $scope.fClear = function() {
        console.log( 'On-clear' );
    }

    $scope.fFilterChange = function( data ) {
        console.log( 'On-filter-change' );
        console.log( 'On-filter-change - keyword: ' + data.keyword );
        console.log( 'On-filter-change - result: ' );
        console.log( data.result );
    }
}]);