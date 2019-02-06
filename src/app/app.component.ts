/// <reference types='@types/googlemaps' />;
import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';

import { LinesService } from './services/lines.service';
import { concat, Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Bus Radar';
  titleExtra = 'for City of Tampere';
  @ViewChild('gmap')
  gmapElement: any;
  map: google.maps.Map;

  lines = [];
  vehicleActivity = [];
  UpdatedVehicleActivity = [];
  buses = [];
  routes = [];

  isRefreshing = false;
  autoRefreshEnabled = false;
  executionNumer: number;
  ctx = null;

  constructor(private lineService: LinesService) {
    this.GetBusInfo();
  }
  ngOnInit() {
    this.CreateMap();
    this.ctx = this;
    setInterval(() => {
      this.AutoRefresh();
    }, 1000);
  }
  CreateMap() {
    const mapProp = {
      center: new google.maps.LatLng(61.49911, 23.78712),
      zoom: 11,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }
  GetBusInfo() {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.lineService.getLines().subscribe(linesData => {
        this.lines = linesData.body;
        this.lineService.getVehicleActivity().subscribe(vehiclesData => {
          this.vehicleActivity = vehiclesData.body;
          this.DrawAllMarks();
          this.isRefreshing = false;
        });
      });
    }
  }
  GetUpdatedInfo() {
    this.lineService.getVehicleActivity().subscribe(vehiclesData => {
      this.UpdatedVehicleActivity = vehiclesData.body;
      this.UpdateMarkerPosition();
    });
  }
  getDestinationName(stopId: string): Subject<any> {
    const nameObservable = new Subject();
    this.lineService.stopPointsById(stopId).subscribe(destinationData => {
      nameObservable.next(destinationData.body);
    });
    return nameObservable;
  }
  DrawAllMarks() {
    for (const vehicle of this.vehicleActivity) {
      let _title: string, _label: string, _destination: string;
      _title = 'Line:' + vehicle.monitoredVehicleJourney.lineRef;
      _label =
        'Speed: ' +
        vehicle.monitoredVehicleJourney.speed +
        ' Bearing: ' +
        vehicle.monitoredVehicleJourney.bearing;
      this.getDestinationName(
        vehicle.monitoredVehicleJourney.destinationShortName
      ).subscribe(body => {
        _destination = body[0].name;
        const circle = {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: 'blue',
          fillOpacity: 0.7,
          scale: 8,
          strokeColor: 'white',
          strokeWeight: 1
        };
        const bus = new google.maps.Marker({
          position: {
            lat: +vehicle.monitoredVehicleJourney.vehicleLocation.latitude,
            lng: +vehicle.monitoredVehicleJourney.vehicleLocation.longitude
          },
          map: this.map,
          title: _label,
          label: _title,
          icon: circle
          // shape: {
          //   coords: [1, 2, 50],
          //   type: 'circle'
          // }
        });
        bus.set('id', vehicle.monitoredVehicleJourney.vehicleRef);
        const infoWindow = new google.maps.InfoWindow({
          content:
            '<div class="box-information"><h6>Bus Info:</h6><hr/><p><span class="bold">Line: </span> ' +
            vehicle.monitoredVehicleJourney.lineRef +
            '</p><p><span class="bold">Destination: </span> ' +
            _destination +
            '</p><p><span class="bold">Operator: </span> ' +
            vehicle.monitoredVehicleJourney.operatorRef +
            '</p></div>'
        });
        bus.addListener('click', function () {
          infoWindow.open(this.map, bus);
        });
        this.buses.push(bus);
      });
    }
  }
  UpdateMarkerPosition() {
    for (const bus of this.buses) {
      const updatedData = this.UpdatedVehicleActivity.filter(
        x => x.monitoredVehicleJourney.vehicleRef === bus.id
      )[0];
      if (updatedData !== undefined) {
        const newPosition = new google.maps.LatLng(
          updatedData.monitoredVehicleJourney.vehicleLocation.latitude,
          updatedData.monitoredVehicleJourney.vehicleLocation.longitude
        );
        bus.setPosition(newPosition);
      }
    }
  }
  RemoveCircles() {
    for (let bus of this.buses) {
      // Hide the circle from the map
      bus.setMap(null);
      // Remove the circle from the map
      bus = null;
    }
  }
  Refresh() {
    this.GetUpdatedInfo();
  }
  AutoRefresh() {
    if (this.autoRefreshEnabled) {
      this.ctx.Refresh();
    }
    return true;
  }
  EnableAutoRefresh() {
    this.autoRefreshEnabled = !this.autoRefreshEnabled;
  }
}
