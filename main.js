    const domainConfig = {};
    const getoptions = {
        apikey: 'sLDfVHxehQg0HajZ_i5_mgdwkLsXvYOvEQhJzlVqT3w'
    };

    // Vectore Tile service
    domainConfig[H.service.omv.Service.CONFIG_KEY] = {
        baseUrl: new H.service.Url(
            'https', 'vector.hereapi.com', 'v2/vectortiles/core/mc', getoptions
        ),
        subdomain: 'subdomain' // optional, if subdomain is not needed null must be passed
    };


    // Initialize the platform object:
    var platform = new H.service.Platform({
        apikey: 'sLDfVHxehQg0HajZ_i5_mgdwkLsXvYOvEQhJzlVqT3w',
        servicesConfig: domainConfig
    });

    // Obtain the default map types from the platform object
    var maptypes = platform.createDefaultLayers({ lg: 'ja', lg2: 'en' , pois:'!F'});

    // Instantiate (and display) a map object:
    var map = new H.Map(
        document.getElementById('mapContainer'),
        maptypes.raster.normal.map, {
            zoom: 15,
            center: { lat: 25.033601, lng: 121.510743 }
            
        });


    // Enable the event system on the map instance:
    var mapEvents = new H.mapevents.MapEvents(map);

    // Add event listener:
    map.addEventListener('tap', function(evt) {
        // Log 'tap' and 'mouse' events:
        console.log(evt.type, evt.currentPointer.type);
    });

    // Instantiate the default behavior, providing the mapEvents object: 
    var behavior = new H.mapevents.Behavior(mapEvents);


    // Create the default UI:
    var ui = H.ui.UI.createDefault(map, maptypes, 'zh-CN');


    // // 'maptypes' variable holds the result of the H.service.Platform#createDefaultLayers call
    // var mapSettings = new H.ui.MapSettingsControl({
    //     alignment: 'top-right',
    //     baseLayers: [{
    //         label: 'Normal map',
    //         layer: maptypes.raster.normal.base
    //     }]
    // });
    // ui.addControl('mapsettings', mapSettings);



    // Provided that map and platform objects are instantiated.
    // Create a traffic service and a corresponding provider.
    var service = platform.getTrafficService()
    var provider = new H.service.traffic.flow.Provider(service)

    // Create a tile layer that can be added to the map
    var layer = new H.map.layer.TileLayer(provider);
    map.addLayer(layer);


    // //# Change map style at runtime

    // function changeFeatureStyle(map) {
    //     // get the vector provider from the base layer
    //     var provider = map.getBaseLayer().getProvider();

    //     // get the style object for the base layer
    //     var parkStyle = provider.getStyle();

    //     var changeListener = (evt) => {
    //         if (parkStyle.getState() === H.map.Style.State.READY) {
    //             parkStyle.removeEventListener('change', changeListener);

    //             // query the sub-section of the style configuration
    //             // the call removes the subsection from the original configuration
    //             var parkConfig = parkStyle.extractConfig(['landuse.park', 'landuse.builtup']);
    //             // change the color, for the description of the style section
    //             // see the Developer's guide
    //             parkConfig.layers.landuse.park.draw.polygons.color = '#FF2400'
    //             parkConfig.layers.landuse.builtup.draw.polygons.color = '#676d67'

    //             // merge the configuration back to the base layer configuration
    //             parkStyle.mergeConfig(parkConfig);
    //         }
    //     };

    //     parkStyle.addEventListener('change', changeListener);
    // }

    // changeFeatureStyle(map);