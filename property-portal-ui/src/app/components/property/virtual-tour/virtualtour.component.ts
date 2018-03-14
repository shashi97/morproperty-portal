import { Component, AfterViewInit, OnInit, HostListener } from '@angular/core';
import { VirtualTourService } from '../shared/virtualTour.service';
import { LocalStorageService } from '../../../core/shared/services/index';
import { PropertyService } from '../shared/property.service';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../shared/data.service';
declare var require: any;
var Marzipano = require('../../../../assets/js/marzipano');
declare var bowser: any;
declare var screenfull: any;
declare var data: any;
declare var google: any;
declare var $: any;

@Component({
  selector: 'app-virtualtour',
  templateUrl: './virtualtour.component.html',
  // styleUrls: ['./virtualtour.component.css']
})

export class VirtualTourComponent implements AfterViewInit, OnInit {
  Marzipano = Marzipano;
  bowser = bowser;
  screenfull = screenfull;
  data = data;
  locations: Array<any> = [];
  user: any;
  propertyId: number = 0;
  isShowFullScreen: boolean = false;
  isShowPropertyClass: boolean = true;

  constructor(private virtualTourService: VirtualTourService,
    public localStorageService: LocalStorageService,
    private propertyService: PropertyService,
    private route: ActivatedRoute, private dataService: DataService) {
    let currentUser = this.localStorageService.getCurrentUser();
    this.user = currentUser.userDetails.CustomerID;

  }

  ngOnInit() {
    this.propertyId = Number(this.route.snapshot.params['propertyId']) || 0;
    this.propertyService.getLocations(this.user, this.propertyId).then(data => {
      this.locations = data.data[0]
      var marker, i;
      var sv = new google.maps.StreetViewService();
      var styledMapType = new google.maps.StyledMapType(this.dataService.getStleForVirtualMap(),
        { name: 'Styled Map' });
      if (!this.locations) {
        return;
      }
      if (this.locations.length > 0) {
        var lat = this.locations[0].Latitude;
        var long = this.locations[0].Longitude;
      } else {
        lat = -36.848460;
        long = 174.763332;
      }

      var circle = {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: '#FF0000',
        fillOpacity: .4,
        scale: 7,
        strokeColor: '#FF0000',
        strokeWeight: 1
      };

      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: new google.maps.LatLng(lat, long),
        mapTypeControlOptions: {
          mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
            'styled_map']
        },
        mapTypeId: google.maps.MapTypeId.HYBRID,

      });
      //Associate the styled map with the MapTypeId and set it to display.
      map.mapTypes.set('styled_map', styledMapType);
      map.setMapTypeId('styled_map');

      var markers = [];//some array
      var bounds = new google.maps.LatLngBounds();
      for (let i = 0; i < this.locations.length; i++) {
        const item = new google.maps.LatLng(this.locations[i].Latitude, this.locations[i].Longitude);

        bounds.extend(item);
      }

      map.fitBounds(bounds);

      var infowindow = new google.maps.InfoWindow();
      var iconBase = './assets/images/placemark_circle_highlight.png';

      for (i = 0; i < this.locations.length; i++) {
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(this.locations[i].Latitude, this.locations[i].Longitude),
          icon: iconBase,
          map: map,
          locationName: this.locations[i].Name
        });
        google.maps.event.addListener(marker, 'click', (marker) => {
          var loc = { lat: marker.latLng.lat(), lng: marker.latLng.lng() }
          //  sv.getPanorama({ location: loc, radius: 50 }, this.processSVData);
          this.processSVData(loc, true);
        })

      }
      // Set the initial Street View camera to the center of the map
      var loc = { lat: this.locations[0].Latitude, lng: this.locations[0].Longitude };
      this.processSVData(loc, false);
    });
    // this.virtualTourService.getLocations(947, 20)
  }



  ngAfterViewInit() {

  }

  processSVData(loc, status) {
    var imageUrl: any;
    var name: string = ''
    for (var i = 0; i < this.locations.length; i++) {
      if (loc.lat == this.locations[i].Latitude || this.locations[i].Longitude == loc.lng) {
        imageUrl = this.locations[i].imageUrl;
        name = this.locations[i].Name;
      }
    }

    // imageUrl = 'http://localhost:46002/Test/Properties/vipin%20properties_20/VirtualTours/vt1/app-files/tiles/0-deepak'
    // Grab elements from DOM.
    var panoElement = document.querySelector('#pano');
    var sceneNameElement = document.querySelector('#titleBar .sceneName');
    var sceneListElement = document.querySelector('#sceneList');
    var sceneElements = document.querySelectorAll('#sceneList .scene');
    var sceneListToggleElement = document.querySelector('#sceneListToggle');
    var autorotateToggleElement = document.querySelector('#autorotateToggle');
    var fullscreenToggleElement = document.querySelector('#fullscreenToggle');


    // Use tooltip fallback mode on IE < 11.
    if (bowser.msie && parseFloat(bowser.version) < 11) {
      document.body.classList.add('tooltip-fallback');
    }

    // Viewer options.
    var viewerOpts = {
      controls: {
        mouseViewMode: "drag"
      }
    };

    // Initialize viewer.
    var viewer = new Marzipano.Viewer(panoElement, viewerOpts);

    // Create scenes.
    if (!imageUrl) {
      return;
    }
    var scenes = data.scenes.map(function (data) {
      var urlPrefix = imageUrl;
      var source = Marzipano.ImageUrlSource.fromString(
        urlPrefix + "/{z}/{f}/{y}/{x}.jpg",
        { cubeMapPreviewUrl: urlPrefix + "/preview.jpg" });
      // var geometry = new Marzipano.CubeGeometry(data.levels);
      var geometry = new Marzipano.CubeGeometry([
        { tileSize: 256, size: 256, fallbackOnly: true },
        { tileSize: 512, size: 512 },
        { tileSize: 512, size: 1024 },
        { tileSize: 512, size: 2048 },
        { tileSize: 512, size: 4096 },
        { tileSize: 512, size: 8192 },
        { tileSize: 512, size: 16384 },
        { tileSize: 512, size: 32768 },
        { tileSize: 512, size: 65536 }
      ])
      var limiter = Marzipano.RectilinearView.limit.traditional(1920, 120 * Math.PI / 180);
      var view = new Marzipano.RectilinearView(data.initialViewParameters, limiter);

      var scene = viewer.createScene({
        source: source,
        geometry: geometry,
        view: view,
        pinFirstLevel: true
      });

      // Create link hotspots.
      data.linkHotspots.forEach(function (hotspot) {
        var element = createLinkHotspotElement(hotspot);
        scene.hotspotContainer().createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
      });

      // Create info hotspots.
      data.infoHotspots.forEach(function (hotspot) {
        var element = createInfoHotspotElement(hotspot);
        scene.hotspotContainer().createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
      });

      return {
        data: data,
        scene: scene,
        view: view
      };
    });

    // Display the initial scene.
    switchScene(scenes[0]);

    // Set up autorotate, if enabled.
    var autorotate = Marzipano.autorotate({ yawSpeed: 0.1, targetPitch: 0, targetFov: Math.PI / 2 });
    if (data.settings.autorotateEnabled) {
      autorotateToggleElement.classList.add('enabled');
    }

    // Set handler for autorotate toggle.
    autorotateToggleElement.addEventListener('click', toggleAutorotate);

    // Set up fullscreen mode, if supported.
    if (screenfull.enabled && data.settings.fullscreenButton) {
      document.body.classList.add('fullscreen-enabled');

      fullscreenToggleElement.addEventListener('click', toggleFullscreen);
    } else {
      document.body.classList.add('fullscreen-disabled');
    }
    // if (document.addEventListener) {
    //   this.isShowPropertyClass = true;
    //   document.addEventListener('webkitfullscreenchange', exitHandler, false);
    //   document.addEventListener('mozfullscreenchange', exitHandler, false);
    //   document.addEventListener('fullscreenchange', exitHandler, false);
    //   document.addEventListener('MSFullscreenChange', exitHandler, false);
    // }

    // function exitHandler() {
    //   if (!document.webkitIsFullScreen) {
    //     var fullscreenToggleElement = document.querySelector('#fullscreenToggle');
    //     fullscreenToggleElement.classList.remove('enabled');
    //     document.getElementById("propertiesView").style.position = 'relative';
    //     document.getElementById("propertiesView").style.backgroundColor = '#fff';
    //     document.getElementById("propertiesView").style.padding = '10px';
    //     document.getElementById("propertiesView").style.marginTop= '15px';
    //     document.getElementById("propertiesView").style.height= '800px';

    //     document.getElementById("pano").style.position = 'inherite';
    //     document.getElementById("pano").style.left = '325px';
    //     document.getElementById("pano").style.width = '70%';
    //     document.getElementById("pano").style.height = '60%';
    //     document.getElementById("pano").style.top = null;
    //     document.getElementById("pano").style.right = null;
    //     document.getElementById("pano").style.bottom = null;
    //     document.getElementById("pano").style.left = null;

    //   }
    // }


    // DOM elements for view controls.
    var viewUpElement = document.querySelector('#viewUp');
    var viewDownElement = document.querySelector('#viewDown');
    var viewLeftElement = document.querySelector('#viewLeft');
    var viewRightElement = document.querySelector('#viewRight');
    var viewInElement = document.querySelector('#viewIn');
    var viewOutElement = document.querySelector('#viewOut');

    // Dynamic parameters for controls.
    var velocity = 0.7;
    var friction = 3;

    // Associate view controls with elements.
    var controls = viewer.controls();
    controls.registerMethod('upElement', new Marzipano.ElementPressControlMethod(viewUpElement, 'y', -velocity, friction), true);
    controls.registerMethod('downElement', new Marzipano.ElementPressControlMethod(viewDownElement, 'y', velocity, friction), true);
    controls.registerMethod('leftElement', new Marzipano.ElementPressControlMethod(viewLeftElement, 'x', -velocity, friction), true);
    controls.registerMethod('rightElement', new Marzipano.ElementPressControlMethod(viewRightElement, 'x', velocity, friction), true);
    controls.registerMethod('inElement', new Marzipano.ElementPressControlMethod(viewInElement, 'zoom', -velocity, friction), true);
    controls.registerMethod('outElement', new Marzipano.ElementPressControlMethod(viewOutElement, 'zoom', velocity, friction), true);

    function sanitize(s) {
      return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;');
    }

    function switchScene(scene) {
      stopAutorotate();
      scene.view.setParameters(scene.data.initialViewParameters);
      scene.scene.switchTo();
      startAutorotate();
      updateSceneName(scene);
      updateSceneList(scene);
    }

    function updateSceneName(scene) {
      //insert name to show in header
      sceneNameElement.innerHTML = sanitize('');
    }

    function updateSceneList(scene) {
      for (var i = 0; i < sceneElements.length; i++) {
        var el = sceneElements[i];
        if (el.getAttribute('data-id') === scene.data.id) {
          el.classList.add('current');
        } else {
          el.classList.remove('current');
        }
      }
    }


    function startAutorotate() {
      var autorotate = Marzipano.autorotate({ yawSpeed: 0.1, targetPitch: 0, targetFov: Math.PI / 2 });
      if (!autorotateToggleElement.classList.contains('enabled')) {
        return;
      }
      viewer.startMovement(autorotate);
      viewer.setIdleMovement(3000, autorotate);
    }

    function stopAutorotate() {
      viewer.stopMovement();
      viewer.setIdleMovement(Infinity);
    }

    function toggleAutorotate() {
      if (autorotateToggleElement.classList.contains('enabled')) {
        autorotateToggleElement.classList.remove('enabled');
        stopAutorotate();
      } else {
        autorotateToggleElement.classList.add('enabled');
        startAutorotate();
      }
    }

    function toggleFullscreen() {
      if (this.className === 'enabled') {
        fullscreenToggleElement.classList.remove('enabled');
        document.getElementById("pano").style.position = 'inherite';
        document.getElementById("pano").style.left = '0';
        document.getElementById("pano").style.width = '74%';
        document.getElementById("pano").style.height = '60%';
        document.getElementById("pano").style.top = null;
        document.getElementById("pano").style.right = null;
        document.getElementById("pano").style.bottom = null;
        document.getElementById("pano").style.left = null;
        document.getElementById("pano").style.marginLeft = null;
        screenfull.toggle();

      } else {
        fullscreenToggleElement.classList.add('enabled');
        document.getElementById("pano").style.position = 'absolute';
        document.getElementById("pano").style.top = '0';
        document.getElementById("pano").style.right = '0';
        document.getElementById("pano").style.bottom = '0';
        document.getElementById("pano").style.left = '0';
        document.getElementById("pano").style.height = '100%';
        document.getElementById("pano").style.width = '100%';
        document.getElementById("pano").style.overflow = 'hidden';
        document.getElementById("titleBar").style.width = '100% important';
        document.getElementById("pano").style.marginLeft = null;
        screenfull.toggle();

      }


    }

    function createLinkHotspotElement(hotspot) {
      // Create wrapper element to hold icon and tooltip.
      var wrapper = document.createElement('div');
      wrapper.classList.add('hotspot');
      wrapper.classList.add('link-hotspot');

      // Create image element.
      var icon = document.createElement('img');
      // icon.src = 'images/link.png';
      // icon.classList.add('link-hotspot-icon');

      // Set rotation transform.
      var transformProperties = ['-ms-transform', '-webkit-transform', 'transform'];
      for (var i = 0; i < transformProperties.length; i++) {
        var property = transformProperties[i];
        icon.style[property] = 'rotate(' + hotspot.rotation + 'rad)';
      }

      // Add click event handler.
      wrapper.addEventListener('click', function () {
        switchScene(findSceneById(hotspot.target));
      });

      // Prevent touch and scroll events from reaching the parent element.
      // This prevents the view control logic from interfering with the hotspot.
      stopTouchAndScrollEventPropagation(wrapper);

      // Create tooltip element.
      var tooltip = document.createElement('div');
      tooltip.classList.add('hotspot-tooltip');
      tooltip.classList.add('link-hotspot-tooltip');
      tooltip.innerHTML = findSceneDataById(hotspot.target).name;

      wrapper.appendChild(icon);
      wrapper.appendChild(tooltip);

      return wrapper;
    }

    function createInfoHotspotElement(hotspot) {

      // Create wrapper element to hold icon and tooltip.
      var wrapper = document.createElement('div');
      wrapper.classList.add('hotspot');
      wrapper.classList.add('info-hotspot');

      // Create hotspot/tooltip header.
      var header = document.createElement('div');
      // header.classList.add('info-hotspot-header');

      // Create image element.


      // Create title element.
      var titleWrapper = document.createElement('div');
      // titleWrapper.classList.add('info-hotspot-title-wrapper');
      var title = document.createElement('div');
      title.classList.add('info-hotspot-title');
      title.innerHTML = hotspot.title;
      // titleWrapper.appendChild(title);

      // Create close element.
      var closeWrapper = document.createElement('div');
      closeWrapper.classList.add('info-hotspot-close-wrapper');
      var closeIcon = document.createElement('img');
      closeIcon.src = 'img/close.png';
      closeIcon.classList.add('info-hotspot-close-icon');
      closeWrapper.appendChild(closeIcon);

      // Construct header element.
      // header.appendChild(iconWrapper);
      // header.appendChild(titleWrapper);
      header.appendChild(closeWrapper);

      // Create text element.
      var text = document.createElement('div');
      text.classList.add('info-hotspot-text');
      text.innerHTML = hotspot.text;

      // Place header and text into wrapper element.
      wrapper.appendChild(header);
      wrapper.appendChild(text);

      // Create a modal for the hotspot content to appear on mobile mode.
      var modal = document.createElement('div');
      modal.innerHTML = wrapper.innerHTML;
      modal.classList.add('info-hotspot-modal');
      document.body.appendChild(modal);

      var toggle = function () {
        wrapper.classList.toggle('visible');
        modal.classList.toggle('visible');
      };

      // Show content when hotspot is clicked.
      // wrapper.querySelector('.info-hotspot-header').addEventListener('click', toggle);

      // Hide content when close icon is clicked.
      modal.querySelector('.info-hotspot-close-wrapper').addEventListener('click', toggle);

      // Prevent touch and scroll events from reaching the parent element.
      // This prevents the view control logic from interfering with the hotspot.
      stopTouchAndScrollEventPropagation(wrapper);

      return wrapper;
    }

    // Prevent touch and scroll events from reaching the parent element.
    function stopTouchAndScrollEventPropagation(element) {
      var eventList = ['touchstart', 'touchmove', 'touchend', 'touchcancel',
        'wheel', 'mousewheel'];
      for (var i = 0; i < eventList.length; i++) {
        element.addEventListener(eventList[i], function (event) {
          event.stopPropagation();
        });
      }
    }

    function findSceneById(id) {
      for (var i = 0; i < scenes.length; i++) {
        if (scenes[i].data.id === id) {
          return scenes[i];
        }
      }
      return null;
    }

    function findSceneDataById(id) {
      for (var i = 0; i < data.scenes.length; i++) {
        if (data.scenes[i].id === id) {
          return data.scenes[i];
        }
      }
      return null;
    }

  }
}
