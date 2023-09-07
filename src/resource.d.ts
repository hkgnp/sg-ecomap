export interface Resource {
  address: string;
  category: string;
  latitude: number;
  longitude: number;
  name: string;
  postalCode: string;
  email: string | null;
  contactNumber: string | null;
  website: string | null;
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
