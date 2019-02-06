export class LinesConstants {
  public static EndPoints = {
    lines: 'http://data.itsfactory.fi/journeys/api/1/lines',
    routes: 'http://data.itsfactory.fi/journeys/api/1/routes',
    routesByLineId: 'http://data.itsfactory.fi/journeys/api/1/routes?lineId={0}',
    journeyPattern: 'http://data.itsfactory.fi/journeys/api/1/journey-patterns',
    journeys: 'http://data.itsfactory.fi/journeys/api/1/journeys',
    stopPoints: 'http://data.itsfactory.fi/journeys/api/1/stop-points',
    stopPointsById: 'http://data.itsfactory.fi/journeys/api/1/stop-points/{0}',
    municipalities: 'http://data.itsfactory.fi/journeys/api/1/municipalities',
    vehicleActivity: 'http://data.itsfactory.fi/journeys/api/1/vehicle-activity',
    // vehicleActivity: 'http://data.itsfactory.fi/journeys/api/1/vehicle-activity?vehicleRef=TKL_103',
    vehicleActivityByLineId: 'http://data.itsfactory.fi/journeys/api/1/vehicle-activity?lineId={0}',
  };
}
