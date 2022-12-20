import { Component, OnInit } from "@angular/core";
import { Station } from "src/app/model/Station.model";
import { Trip } from "src/app/model/Trip.model";
import { StationService } from "src/app/service/Station.service";
import { TripService } from "src/app/service/Trip.service";

@Component({
  selector: "app-create-trip",
  templateUrl: "./create-trip.component.html",
  styleUrls: ["./create-trip.component.css"],
})
export class CreateTripComponent implements OnInit {
  optionList: Station[] = [];
  trip: Trip = {
    from_station: {
      id: "",
    },
    to_station: {
      id: "",
    },
    start_time: undefined,
    end_time: undefined,
  };

  date = null;

  getAllStations(): void {
    this.stationService.getAllStations().subscribe((data) => {
      this.optionList = data;
      // console.log(this.optionList);
    });
  }
  createTrip(): void {
    if (this.trip.from_station.id === this.trip.to_station.id) {
      alert("Please choose different stations");
    } else {
      this.tripService.createTrip(this.trip).subscribe((data) => {
        console.log(data);
        alert("Trip created successfully");
      });
    }
  }
  onChange(result: Date): void {
    console.log("Selected Time: ", result);
  }

  onOk(result: Date | Date[] | null): void {
    console.log("onOk", result);
  }

  onCalendarChange(result: Array<Date | null>): void {
    console.log("onCalendarChange", result);
  }

  constructor(
    private stationService: StationService,
    private tripService: TripService
  ) {}

  ngOnInit(): void {
    this.getAllStations();
  }
}
