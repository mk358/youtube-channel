import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  apiURL: string = environment.apiURL;
  youtubeKey: string = environment.youtubeKey;
  channelID: string = environment.channelID;
  constructor(private http: HttpClient) { }

  getVideos(){
// https://www.googleapis.com/youtube/v3/search?key={your_key_here}&channelId={channel_id_here}&part=snippet,contentDetails,statistics,id&order=date
    return this.http.get(`${this.apiURL}search?key=${this.youtubeKey}&channelId=${this.channelID}&order=date&maxResults=50`)
  }
  getMultiVideos(ids) {
    // https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=YxLCwfA1cLw,Qgy6LaO3SB0,7yPJXGO2Dcw&key=
    return this.http.get(`${this.apiURL}videos?key=${this.youtubeKey}&part=snippet,contentDetails,statistics&id=${ids}`)
  }
}
