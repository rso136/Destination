
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

                    $('#eventBar').append("<div class='eventBoxes col-md-4 col-xs-12'><p><b>" + eventTitle + "</b></p><a href=" + "'" + eventUrl + "'" + "><img src=" + "'" + imgSrc + "'" + " height='150' width='150'></a><p>Date: " + eventDate + "</p><p> " + eventVenue +"</p><p>" + eventAddress + "</p><a href=" + "'" + eventUrl + "'" + " target='_blank'>More Info</a></div>");
                }
            }