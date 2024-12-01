export interface Activities {
  resource_state: number;
  athlete: Athlete;
  name: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  total_elevation_gain: number;
  type: ActivityType;
  sport_type: string;
  id: number;
  start_date: Date;
  start_date_local: Date;
  timezone: string;
  utc_offset: number;
  location_city: null;
  location_state: null;
  location_country: null;
  achievement_count: number;
  kudos_count: number;
  comment_count: number;
  athlete_count: number;
  photo_count: number;
  map: Map;
  trainer: boolean;
  commute: boolean;
  manual: boolean;
  private: boolean;
  visibility: string;
  flagged: boolean;
  gear_id: null;
  start_latlng: any[];
  end_latlng: any[];
  average_speed: number;
  max_speed: number;
  has_heartrate: boolean;
  heartrate_opt_out: boolean;
  display_hide_heartrate_option: boolean;
  upload_id: null;
  external_id: null;
  from_accepted_tag: boolean;
  pr_count: number;
  total_photo_count: number;
  has_kudoed: boolean;
  workout_type?: null;
}

export interface Athlete {
  id: number;
  resource_state: number;
}

export interface Map {
  id: string;
  summary_polyline: string;
  resource_state: number;
}

export enum ActivityType {
  Hike = "Hike",
  Run = "Run",
  Walk = "Walk",
}
