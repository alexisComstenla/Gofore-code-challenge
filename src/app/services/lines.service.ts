import { Injectable } from '@angular/core';
import { LinesConstants } from './lines.constants';
import { HttpClient } from '@angular/common/http';
export interface HttpResponse {
  status: string;
  data: object;
  body: Array<Object>;
}
@Injectable({
  providedIn: 'root'
})
export class LinesService {
  constructor(private http: HttpClient) {}
  // Retrieve the list of lines
  public getLines() {
    return this.http.get<HttpResponse>(LinesConstants.EndPoints.lines);
  }
  // Retrieve the list of routes
  public getRoutes() {
    return this.http.get<HttpResponse>(LinesConstants.EndPoints.routes);
  }
  // Retrive the list of routes by lineId
  public getRoutesByLineId(lineId) {
    return this.http.get<HttpResponse>(LinesConstants.EndPoints.routesByLineId.replace('{0}', lineId));
  }
  // Retrieve the list of journey patterns
  public getJourneyPatterns() {
    return this.http.get<HttpResponse>(
      LinesConstants.EndPoints.journeyPattern
    );
  }
  // Retrieve the list of journeys
  public getJourneys() {
    return this.http.get<HttpResponse>(LinesConstants.EndPoints.journeys);
  }
  // Retrieve the list of stop points
  public getStopPoints() {
    return this.http.get<HttpResponse>(LinesConstants.EndPoints.stopPoints);
  }
    // Retrieve the list of stop points by Id
    public stopPointsById(stopId) {
      return this.http.get<HttpResponse>(LinesConstants.EndPoints.stopPointsById.replace('{0}', stopId));
    }
  // Retrieve the list of municipalities
  public getMunicipalities() {
    return this.http.get<HttpResponse>(LinesConstants.EndPoints.municipalities);
  }
  // Retrieve the list of vehicle activity
  public getVehicleActivity() {
    return this.http.get<HttpResponse>(
      LinesConstants.EndPoints.vehicleActivity
    );
  }
    // Retrieve the list of vehicle activity by LineId
    public getVehicleActivityByLineId(lineId) {
      return this.http.get<HttpResponse>(
        LinesConstants.EndPoints.vehicleActivityByLineId.replace('{0}', lineId)
      );
    }
}
