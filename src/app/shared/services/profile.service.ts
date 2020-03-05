import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Profile } from 'src/app/models/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getProfiles(): Observable<Profile[]> {
    return this.http.get<Profile[]>(`${environment.apiEndPoint}/results`);
  }

  searchProfiles(name: string): Observable<Profile[]> {
    return this.http.get<Profile[]>(`${environment.apiEndPoint}/results?q=${name}`);
  }
  
}
