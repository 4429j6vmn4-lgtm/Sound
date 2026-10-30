declare var YT: any;

import { Component, input, effect, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-youtube-player',
  standalone: true,
  imports: [],
  templateUrl: './youtube-player.component.html',
  styleUrl: './youtube-player.component.scss'
})
export class YoutubePlayerComponent {
  readonly videoId = input<string>('');
  readonly apiReady = signal(false);
  readonly platformId = inject(PLATFORM_ID);

  private player: any = null;
  private apiLoading = signal(false);

  constructor() {
    effect(() => {
      const id = this.videoId();
      if (isPlatformBrowser(this.platformId) && this.apiReady() && id && this.player) {
        this.player.cueVideoById({ videoId: id });
      }
    });
  }

  private loadYouTubeApi(): void {
    if (this.apiLoading() || this.apiReady()) return;
    this.apiLoading.set(true);

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    if (firstScriptTag.parentNode) {
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    (window as unknown as { onYouTubeIframeAPIReady?: () => void }).onYouTubeIframeAPIReady = () => {
      this.apiReady.set(true);
      this.apiLoading.set(false);
      const id = this.videoId();
      if (id) {
        this.createPlayer(id);
      }
    };
  }

  private createPlayer(videoId: string): void {
    this.player = new YT.Player('youtube-player', {
      height: '360',
      width: '640',
      videoId,
      playerVars: {
        autoplay: 0,
        controls: 1,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        fs: 1
      },
      events: {
        onReady: () => {
          // player ready
        },
        onStateChange: (event: any) => {
          // handle state changes if needed
        }
      }
    });
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadYouTubeApi();
    }
  }

  ngOnDestroy(): void {
    if (this.player) {
      this.player.destroy();
      this.player = null;
    }
  }
}
