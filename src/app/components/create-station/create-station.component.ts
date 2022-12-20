import { Component, OnInit } from '@angular/core';
import { Station } from 'src/app/model/Station.model';
import { StationService } from 'src/app/service/Station.service';

@Component({
  selector: 'app-create-station',
  templateUrl: './create-station.component.html',
  styleUrls: ['./create-station.component.css'],
})
export class CreateStationComponent implements OnInit {
  station: Station = {
    id: '',
    name: '',
  };
  createStation(): void {
    if (this.station.name === '') {
      window.alert('Please fill the field');
    } else {
      this.stationService.createStation(this.station).subscribe(() => {
        window.alert('Station created successfully');
      });
    }
  }
  constructor(private stationService: StationService) {}

  ngOnInit(): void {}
}
