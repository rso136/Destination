app.controller('mainCtrl', function($scope, $http, $sce) {

    $scope.origin;
    $scope.destination;
    $scope.introduction = true;

    $('#noEventsBar').hide();

    $scope.search = function() {

        var counter = 0;

        $('#noEventsBar').hide();

        $scope.introduction = false;

        $('#eventBarA').empty();
        $('#eventBarB').empty();

        //$scope.infoDisplay = true;
        //$scope.weatherInfo = true;
        //$scope.trafficInfo = true;
        //$scope.forecastDisplay = true;
        $scope.eventDisplayA = true;
        $scope.eventDisplayB = true;
        $scope.eventful = true;
        searchTermA = $scope.origin;
        searchTermB = $scope.destination;  

        var url = 'http://dev.virtualearth.net/REST/V1/Routes/Driving?wp.0=' + searchTermA + '&wp.1=' + searchTermB + '&jsonp=JSON_CALLBACK&key=AjD4hviy0YV5U2v62sOgEaJ0saGcuJaUtqC9vn3xRKPm4wlYN7wfpykx2dMLsikj';
        
        $sce.trustAsResourceUrl(url);

        var oArgs = {
            app_key: "hJdMt5WCDKGS6xTL",
            where: searchTermB, 
            page_size: 6,
            sort_order: "popularity",
        };

        $http.get('http://api.openweathermap.org/data/2.5/weather?q=' + searchTermB + '&APPID=445ee2cab6664981c9d3ccdd572f246b').then(function(response) {

            $scope.weatherErr = false;
            $scope.infoDisplay = true;
            $scope.weatherInfo = true;
            $scope.trafficInfo = true;
            $scope.forecastDisplay = true;

            var K = response.data.main.temp;
            var F = (K - 273.15) * 1.80 + 32;
            //console.log(response);

            $scope.temp = Math.round(F);
            $scope.forecast = response.data.weather[0].description;

        }, function(response) {
            $scope.weatherErr = true;
            $scope.infoDisplay = false;
            $scope.weatherInfo = false;
            $scope.trafficInfo = false;
            $scope.forecastDisplay = false;
        });

        $http.get('http://api.openweathermap.org/data/2.5/forecast?q=' + searchTermB + '&APPID=445ee2cab6664981c9d3ccdd572f246b').then(function(response) {

            $scope.fiveForecast = [];
            $scope.fiveDates = [];
            $scope.fiveConditions = [];

            //console.log(response);

            var forecastLength = response.data.list.length;

           // console.log(forecastLength);

            for (var i = 0; i < forecastLength; i++) {

                if (response.data.list[i].dt_txt.substring(12, 13) == "2") {
                    console.log(response.data.list[i].main.temp);
                    var KAlt = response.data.list[i].main.temp;
                    var FAlt = (KAlt - 273.15) * 1.80 + 32;
                    var tempAlt = Math.round(FAlt);
                    var conditions = response.data.list[i].weather[0].description;
                    var forecastDates = response.data.list[i].dt_txt.substring(5, 10);
                    

                    $scope.fiveForecast.push(tempAlt);
                    $scope.fiveDates.push(forecastDates);
                    $scope.fiveConditions.push(conditions);
                }
            }

                //console.log($scope.fiveForecast);
                //console.log($scope.fiveDates);

        }, function(response){
            $scope.weatherErr = true;
        });

        $http.jsonp(url, {jsonpCallbackParam: 'callback'}).success(function(data){

            var time = data.resourceSets[0].resources[0].travelDuration / 60; 

            $scope.congestion = data.resourceSets[0].resources[0].trafficCongestion;
                
            $scope.driveTime = Math.round(time) + ' minutes';       
        });

        EVDB.API.call("/events/search", oArgs, function(oData) {

            console.log(oData);

            if (oData.events == null) {
                console.log('No events found');
                $('#noEventsBar').show();
            }
            
            if (oData.events != null) {
                
                var arrayLength = oData.events.event.length;
                var imgSrc;
                var eventTitle;

                $('#eventBar').append("<h2 id='eventHeading'>Upcoming events in " + searchTermB + "</h2>");

                if (oData.events.total_items == "1") {

                    var imgCheckAlt = oData.events.event.image;
                    var titleCheckAlt = oData.events.event.title;

                    if (imgCheckAlt == null) {
                        imgSrc = "assets/images/no_image.png"
                    }
                    else {
                        imgSrc = oData.events.event.image.medium.url;
                    }

                    if (titleCheckAlt == null) {
                        eventTitle = 'Unnamed Event'; 
                    }
                    else {
                        eventTitle = oData.events.event.title;  
                    }

                    var eventDateAlt = oData.events.event.start_time.substring(0, 10);
                    var eventVenueAlt = oData.events.event.venue_name;
                    var eventAddressAlt = oData.events.event.venue_address;
                    var eventUrlAlt = oData.events.event.url;
                    
                    $('#eventBar').append("<div class='eventBoxes col-md-4 col-xs-12'><p><b>" + eventTitle + "</b></p><a href=" + "'" + eventUrlAlt + "'" + "><img src=" + "'" + imgSrc + "'" + " height='150' width='150'></a><p>Date: " + eventDateAlt + "</p><p> " + eventVenueAlt +"</p><p>" + eventAddressAlt + "</p><a href=" + "'" + eventUrlAlt + "'" + " target='_blank'>More Info</a></div>");
                }

                if (oData.events.total_items != "1") {

                    for (var i = 0; i < arrayLength; i++) {

                        var imgCheck = oData.events.event[i].image;
                        var titleCheck = oData.events.event[i].title;

                        if (imgCheck == null) {
                            imgSrc = "assets/images/no_image.png"
                        }
                        else {
                            imgSrc = oData.events.event[i].image.medium.url;
                        }

                        if (titleCheck == null) {
                            eventTitle = 'Unnamed Event';
                        }
                        else {
                            eventTitle = oData.events.event[i].title;
                        }

                        var eventDate = oData.events.event[i].start_time.substring(0, 10);
                        var eventVenue = oData.events.event[i].venue_name;
                        var eventAddress = oData.events.event[i].venue_address;
                        var eventUrl = oData.events.event[i].url;
                        
                        if (counter <= 2) {

                            $('#eventBarA').append("<div class='eventBoxes col-md-4 col-xs-12'><p><b>" + eventTitle + "</b></p><a href=" + "'" + eventUrl + "'" + "><img src=" + "'" + imgSrc + "'" + " height='150' width='150'></a><p>Date: " + eventDate + "</p><p> " + eventVenue +"</p><p>" + eventAddress + "</p><a class='btn btn-custom' href=" + "'" + eventUrl + "'" + " target='_blank'>More Info</a></div>");
                            //console.log(eventTitle + ' appended to A');
                            //console.log(counter);
                            counter++;
                        }
                        else {

                            $('#eventBarB').append("<div class='eventBoxes col-md-4 col-xs-12'><p><b>" + eventTitle + "</b></p><a href=" + "'" + eventUrl + "'" + "><img src=" + "'" + imgSrc + "'" + " height='150' width='150'></a><p>Date: " + eventDate + "</p><p> " + eventVenue +"</p><p>" + eventAddress + "</p><a class='btn btn-custom' href=" + "'" + eventUrl + "'" + " target='_blank'>More Info</a></div>");
                            //console.log(eventTitle + ' appended to B');
                            //console.log(counter);
                            counter++;
                        }
                        
                    }
                }                
            }
        });
    }
});