import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MovieVideo } from '../../models/movie';

@Component({
  selector: 'video-embed',
  templateUrl: './video-embed.component.html',
  styleUrls: ['./video-embed.component.scss']
})
export class VideoEmbedComponent implements OnInit {
  @Input() video: MovieVideo | null = null;
  constructor(private sanitizer: DomSanitizer) {}

  videoURL: SafeResourceUrl = '';
  VideoURL = {
    youtube: 'https://www.youtube.com/embed/',
    vimeo: 'https://player.vimeo.com/video/'
  };
  ngOnInit(): void {
    switch (this.video?.site) {
      case 'YouTube':
        this.getSafeVideoURL(this.VideoURL.youtube + this.video.key);
        break;
      case 'Vimeo':
        this.getSafeVideoURL(this.VideoURL.vimeo + this.video.key);
        break;
    }
  }

  getSafeVideoURL(url: string) {
    this.videoURL = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
