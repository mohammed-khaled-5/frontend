import { Component, OnInit } from "@angular/core";
import { Station } from "src/app/model/Station.model";
import { Trip } from "src/app/model/Trip.model";
import { StationService } from "src/app/service/Station.service";
import { TripService } from "src/app/service/Trip.service";

@Component({
  selector: "app-trips",
  templateUrl: "./trips.component.html",
  styleUrls: ["./trips.component.css"],
})
export class TripsComponent implements OnInit {
  trip: Trip = {
    id: "",
    from_station: {
      id: "",
      name: "",
    },
    to_station: {
      id: "",
      name: "",
    },
    start_time: undefined,
    end_time: undefined,
  };

  optionList: Station[] = [];
  listOfData: Trip[] = [];
  isVisible = false;
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(id: number): void {
    this.updateTripById(id);
    console.log("Button ok clicked!");
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log("Button cancel clicked!");
    this.isVisible = false;
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

  getAllStations(): void {
    this.stationService.getAllStations().subscribe((data) => {
      this.optionList = data;
      // console.log(this.optionList);
    });
  }

  getAllTrips(): void {
    this.tripService.getAllTrips().subscribe((data) => {
      this.listOfData = data;
      console.log(this.listOfData);
    });
  }
  deleteTripById(id: number): void {
    this.tripService.deleteTripById(id).subscribe(() => {
      this.getAllTrips();
    });
  }
  updateTripById(id: number): void {
    if (this.trip.from_station.id === this.trip.to_station.id) {
      alert("Please choose different stations");
    } else {
      this.tripService.updateTripById(id, this.trip).subscribe(() => {
        this.getAllTrips();
      });
    }
  }

  constructor(
    private tripService: TripService,
    private stationService: StationService
  ) {}

  ngOnInit(): void {
    this.getAllTrips();
    this.getAllStations();
  }
}
