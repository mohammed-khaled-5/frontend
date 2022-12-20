import { Station } from "./Station.model";

export class Trip {
  id?: any;
  from_station!: Station;
  to_station!: Station;
  start_time?: Date;
  end_time?: Date;
}
