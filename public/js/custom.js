jQuery(function(){


     new WOW().init();
 

	jQuery('.cookie-button').on('click',function(e){
		e.preventDefault();

		jQuery('#cookie-message').fadeOut('fast');

	});


	jQuery('.ajax-search-trigger').on('click',function(e){
		e.preventDefault();

		jQuery('#ajax-search').fadeIn('fast');

	});
	
	jQuery('.close-ajax-search ').on('click',function(e){
		e.preventDefault();

		jQuery('#ajax-search').fadeOut('fast');

	});

    jQuery('#mobile-menu').on('click',function(e){
        e.preventDefault();

        jQuery('body').toggleClass('showMobileMenu');

    });

	/**
     * Google map code here...
     *
     **/

	if(jQuery('#googlemap').length > 0 ) {

			gmapIntialize(addresses);

	}

    if(jQuery('#ex13').length > 0 ) {
    $("#ex13").slider({
    ticks: [2500, 5000, 7500, 10000, 15000],
    ticks_labels: ['€2500', '€5000', '€7500', '€10000', '€15000'],
    ticks_snap_bounds: 30
});
  }

  $('.main-carousel').flickity({
  // options
        cellAlign: 'left',
        contain: true
    });

});


 gmapIntialize = function(addresses) {

        
       

         var geocoder = [],map = [],opts=[]; 
          var bounds = new google.maps.LatLngBounds();

        jQuery('#googlemap').each(function(k){
          geocoder[k] = new google.maps.Geocoder();

          opts[k] = {  };

          if( typeof jQuery(this).data('tooltip') != "undefined"  ) opts[k].tooltip = jQuery(this).data('tooltip'); else opts[k].tooltip = '';
     
       
        var mapOptions = {

          scrollwheel:false,
          zoom: 10 ,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          mapTypeControlOptions: {

          mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.SATELLITE ]

      }


        };
       var styles = [
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": 36
            },
            {
                "color": "#40402d"
            },
            {
                "lightness": 40
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#ffffff"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 17
            },
            {
                "weight": 1.2
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#707fb7"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#707fb7"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#707fb7"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "lightness": 29
            },
            {
                "weight": 0.2
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#707fb7"
            },
            {
                "lightness": 18
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#8895c3"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#b7bfdb"
            },
            {
                "lightness": 19
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#a0aacf"
            },
            {
                "lightness": 17
            }
        ]
    }
];
       
        var styledMap = new google.maps.StyledMapType(styles,{name: "Styled Map"});

        var image = jQuery(this).data('marker');
       
        map[k] = new google.maps.Map(this,  mapOptions);
        map[k].mapTypes.set('map_style', styledMap);
        map[k].setMapTypeId('map_style');


        for(var i=0;i<addresses.length;i++)
	        geocoder[k].geocode( { 'address': addresses[i]}, function(results, status) {


        if (status == google.maps.GeocoderStatus.OK) {

          google.maps.visualRefresh = true;
          map[k].setCenter(results[0].geometry.location);
          var marker = new google.maps.Marker({

                map: map[k],

                position: results[0].geometry.location,

                icon: image,

                title : results[0].formatted_address,

                 animation: google.maps.Animation.DROP

            });
          var infowindow = new google.maps.InfoWindow({

              content: results[0].formatted_address

            });

          google.maps.event.addListener(marker, 'click', function() {
              infowindow.open(map[k],marker);

            });

          bounds.extend(marker.position);
          map[k].fitBounds(bounds);

          } 
        });



       setTimeout(function(){

        var listener = google.maps.event.addListener(map[k], "idle", function() { 
        map[k].setZoom(10); 
        google.maps.event.removeListener(listener); 
      });


       },500); 

        });
    } 