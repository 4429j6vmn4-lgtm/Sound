import { Component } from '@angular/core';
import { YoutubePlayerComponent } from '../youtube-player/youtube-player.component';
import { MixcloudPlayerComponent } from '../mixcloud-player/mixcloud-player.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [YoutubePlayerComponent, MixcloudPlayerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  readonly youtubeVideoId = '';
  readonly mixcloudUrl = 'https://www.mixcloud.com/example-user/example-mix/';
}
