import { Component, input, computed } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-mixcloud-player',
  standalone: true,
  imports: [],
  templateUrl: './mixcloud-player.component.html',
  styleUrl: './mixcloud-player.component.scss'
})
export class MixcloudPlayerComponent {
  readonly mixUrl = input<string>('');

  constructor(private readonly sanitizer: DomSanitizer) {}

  readonly embedUrl = computed<SafeResourceUrl>(() => {
    const url = this.mixUrl().trim();
    if (!url) return this.sanitizer.bypassSecurityTrustResourceUrl('about:blank');
    const feed = encodeURIComponent(url);
    const src = `https://www.mixcloud.com/widget/iframe/?feed=${feed}&hide_cover=1&hide_tracklist=1&light=1`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(src);
  });
}
