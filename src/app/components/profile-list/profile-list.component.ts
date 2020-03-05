import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { Observable } from 'rxjs';
import { Profile } from 'src/app/models/profile';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { map, filter, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss']
})
export class ProfileListComponent implements OnInit {

  profiles$: Observable<Profile[]>;

  sortingOrder: any;

  searchName: string;
  searchControl: FormControl;
  group: FormGroup;

  selected: string[];

  constructor(private profileService: ProfileService, private builder: FormBuilder) { 

        // Reactive controls 
        this.searchControl = new FormControl('Enter');

        this.group = this.builder.group({
          //html binding name : control object
          'search' : this.searchControl
        });

  }

  ngOnInit(): void {
    this.profiles$ = this.profileService.getProfiles();

    this.searchControl.valueChanges.pipe(filter( value => !!value))
    .pipe(map(value => value.trim())).pipe(debounceTime(600)).subscribe( value => {

      this.searchName = value;

      this.profiles$ = this.profileService.searchProfiles(value);
    });
  }

  // searchProfile() {

  // }

}
