export interface TripPointDto {
  id?: number;
  tripId: number;
  timestamp: Date;
  latitude: number;
  longitude: number;
  speed: number;
  odometer: number | null;
}