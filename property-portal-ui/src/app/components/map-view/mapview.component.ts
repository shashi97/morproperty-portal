import { Component, AfterViewInit, NgZone } from '@angular/core';
import { MapViewService } from './shared/mapview.service';
import { LocalStorageService } from '../../core/shared/services/index';
import { DataService } from '../shared/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MapViewModel, ProjectModel, PropertyModel } from './shared/mapview.model';

declare var google: any;

@Component({
    selector: 'app-mapview',
    templateUrl: './mapview.component.html',
    // styleUrls: ['./mapview.component.css']
})
export class MapViewComponent implements AfterViewInit {
    public mapViewModel: MapViewModel = new MapViewModel();
    public project: Array<ProjectModel> = [];
    public property: Array<PropertyModel> = [];
    public zone: NgZone;
    constructor(public mapViewService: MapViewService,
        public localStorageService: LocalStorageService,
        public dataService: DataService, public router: Router,
        zone: NgZone) {
        let currentUser = this.localStorageService.getCurrentUser();
        this.mapViewModel.user = currentUser.userDetails.CustomerID;
        this.zone = zone;
    }
    ngAfterViewInit() {

        this.mapViewService.getMapViewLocations(this.mapViewModel.user).then((response) => {
            console.log(response.data.project)


            this.project = response.data.project;
            this.property = response.data.property


            // this.project = response.data.project.filter(item => {
            //     if (item.Latitude && item.Longitude) {
            //         return item;
            //     }
            // })
            // this.property = response.data.property.filter(item => {
            //     if (item.Latitude && item.Longitude) {
            //         return item;
            //     }
            // })



            // if (this.project.length > 0) {
            //     this.project.map((project) => {
            //         const geocoder = new google.maps.Geocoder();
            //         geocoder.geocode({ 'address': project.Address + ', New Zealand' }, function (results, status) {
            //             console.log(google.maps.GeocoderStatus.OK)
            //             if (status == google.maps.GeocoderStatus.OK) {
            //                 project.Latitude = results[0].geometry.location.lat();
            //                 project.Longitude = results[0].geometry.location.lng();
            //             }
            //             console.log('Address -' + project.Address + '-lat -' + project.Latitude + '-lng-' + project.Longitude)

            //         });

            //     })



            // }


            var grayStyles = [
                {
                    featureType: "all",
                    stylers: [
                        { saturation: -90 },
                        { lightness: 50 }
                    ]
                },
            ];

            //this will set default location;
            if (this.project.length > 0) {
                var lat = this.project[0].Latitude;
                var long = this.project[0].Longitude;
                this.mapViewModel.imageUrl = this.project[0].thumbUrl;
                this.mapViewModel.isProject = true;
                this.mapViewModel.name = this.project[0].ProjectName;
                this.mapViewModel.projectId = this.project[0].ProjectId;

            } else if (this.property.length > 0 && this.project.length === 0) {
                lat = this.property[0].Latitude;
                long = this.property[0].Longitude;
                this.mapViewModel.imageUrl = this.property[0].thumbUrl;
                this.mapViewModel.isProject = true;
                this.mapViewModel.name = this.property[0].PropertyName;
                this.mapViewModel.projectId = this.property[0].PropertyID;
            } else {
                lat = -36.848460;
                long = 174.763332;
            }

            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 7,
                center: new google.maps.LatLng(lat, long),
                styles: grayStyles

            });
            var iconBase = './assets/images/';
            var icons = {
                property: {
                    icon: iconBase + 'marker-blue.png'
                },
                projects: {
                    icon: iconBase + 'marker-green.png'
                },
            };
            var infowindow = new google.maps.InfoWindow();
            if (this.project.length === 0 && this.property.length === 0) {
                return;
            }
            this.project.forEach((project) => {
                const geocoder = new google.maps.Geocoder();
                const address = project.Address + ',New Zealand'
                geocoder.geocode({ 'address': address }, function (results, status) {
                    console.log(google.maps.GeocoderStatus.OK)
                    if (status === google.maps.GeocoderStatus.OK) {
                        project.Latitude = results[0].geometry.location.lat();
                        project.Longitude = results[0].geometry.location.lng();
                    }
                    console.log('Address -' + project.Address + '-lat -' +
                        project.Latitude + '-lng-' + project.Longitude)

                });
            })
            var bounds = new google.maps.LatLngBounds();
            var features = []
            for (let i = 0; i < this.project.length - 1; i++) {
                const item = new google.maps.LatLng(this.project[i].Latitude, this.project[i].Longitude);

                features.push([{
                    position: new google.maps.LatLng(this.project[i].Latitude, this.project[i].Longitude),
                    type: 'projects'
                }])
                this.project[i].Latitude = features[i][0].position.lat();
                this.project[i].Longitude = features[i][0].position.lng();
                bounds.extend(item);
            }
            for (let i = 0; i < this.property.length; i++) {
                features.push([{
                    position: new google.maps.LatLng(this.property[i].Latitude, this.property[i].Longitude),
                    type: 'property'
                }])
            }
            map.fitBounds(bounds);

            features.forEach((feature) => {
                let marker = new google.maps.Marker({
                    position: feature[0].position,
                    icon: icons[feature[0].type].icon,
                    map: map
                });
                marker.addListener('click', (marker) => {
                    var location = { lat: marker.latLng.lat(), lng: marker.latLng.lng() }

                    this.zone.run(() => {
                        this.onMarkerCLick(location);
                    });

                })

            });
        })
    }


    // ngOnInit() {

    // }

    public onMarkerCLick(location) {
        let selectedProject = this.project.filter(element => {
            return element.Latitude == location.lat;
        })[0]

        let selectedProperty = this.property.filter(element => {
            return element.Latitude == location.lat;
        })[0]

        if (selectedProject) {
            this.mapViewModel.imageUrl = selectedProject.thumbUrl;
            this.mapViewModel.isProject = true;
            this.mapViewModel.name = selectedProject.ProjectName;
            this.mapViewModel.projectId = selectedProject.ProjectId;
        }

        if (selectedProperty) {
            this.mapViewModel.imageUrl = selectedProperty.thumbUrl;
            this.mapViewModel.isProject = false;
            this.mapViewModel.name = selectedProperty.PropertyName;
            this.mapViewModel.propertyId = selectedProperty.PropertyID;
        }

    }

    public onViewDetailsClick() {
        if (this.mapViewModel.isProject) {
            this.router.navigate(['/project/' + this.mapViewModel.projectId + '/safety']);
        } else {
            this.router.navigate(['/property/' + this.mapViewModel.propertyId + '/virtualtour']);
        }
    }
}
