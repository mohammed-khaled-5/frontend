import { Component, OnInit } from '@angular/core';
import { Station } from 'src/app/model/Station.model';
import { StationService } from 'src/app/service/Station.service';
@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.css'],
})
export class StationsComponent implements OnInit {
  station: Station = {
    id: '',
    name: '',
  };
  editId: number | null = null;
  listOfData: Station[] = [];
  startEdit(id: number): void {
    this.editId = id;
  }
  stopEdit(id: number): void {
    this.editId = null;
    this.updateStationById(id);
    this.station.name = '';
  }

  getAllStations(): void {
    this.stationService.getAllStations().subscribe((data) => {
      this.listOfData = data;
      console.log(this.listOfData);
    });
  }
  deleteStationById(id: number): void {
    this.stationService.deleteStationById(id).subscribe(
      () => {
        this.getAllStations();
      },
      () => {
        window.alert('Station is used in a trip and can not be deleted');
      }
    );
  }
  updateStationById(id: number): void {
    this.stationService.updateStationById(id, this.station).subscribe(() => {
      this.getAllStations();
    });
  }
  constructor(private stationService: StationService) {}

  ngOnInit(): void {
    this.getAllStations();
  }
}
