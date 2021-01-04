import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'youtube-channel';
  videoIds: any = [];
  videoItems: any = [];
  selectedVideo: any;
  constructor(private service: AppService) {
    this.init();
  }
  init() {
    this.service.getVideos().subscribe((res: any) => {
      console.log(res)
      res.items.forEach((video: any) => {
        let id: any = video.id.videoId
        if (this.videoIds.indexOf(id) == -1) {
          this.videoIds.push(id);
        }
      })
      if (this.videoIds.length > 0) {
        this.service.getMultiVideos(this.videoIds.join()).subscribe((vids: any) => {
          console.log(vids)
          if (vids.items) {
            this.videoItems = this.videoItems.concat(vids.items);
            this.selectedVideo = this.videoItems[0];
          }
        })
      }
    /*
      let uploadID: any = res.items && res.items[0].contentDetails.relatedPlaylists.uploads
      if (uploadID) {
        this.service.getPlayList(uploadID).subscribe((val: any)=>{
          console.log(val)
        })
      } //*/
    })
  }
}
