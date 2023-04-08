export interface Resource {
  address: string;
  category: string;
  latitude: number;
  longitude: number;
  org: string;
  postal: number;
}

export interface OnemapResult {
  ADDRESS: string;
  BLK_NO: string;
  BUILDING: string;
  LATITUDE: string;
  LONGITUDE: string;
  POSTAL: string;
  ROAD_NAME: string;
}
