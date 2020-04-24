import { Component, Inject, OnInit } from '@angular/core';
import { bindCallback } from 'rxjs';
import { map } from 'rxjs/operators';
import { TAB_ID } from '../../../../providers/tab-id.provider';
import { ApiService } from '../../../../services/api.service';
import { Response } from '../../../../models/response';

@Component({
  selector: 'app-popup',
  templateUrl: 'popup.component.html',
  styleUrls: ['popup.component.scss'],
})
export class PopupComponent implements OnInit {
  message: string;
  stats: Response;
  currentDate = new Date();

  constructor(
    @Inject(TAB_ID) readonly tabId: number,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    // this.getStats();
  }

  async onClick(): Promise<void> {
    this.message = await bindCallback<string>(
      chrome.tabs.sendMessage.bind(this, this.tabId, 'request')
    )()
      .pipe(
        map((msg) =>
          chrome.runtime.lastError
            ? 'The current page is protected by the browser, goto: https://www.google.nl and try again.'
            : msg
        )
      )
      .toPromise();
  }

  getStats() {
    this.apiService
      .getCurrentStats()
      .subscribe((response) => (this.stats = response));
  }
}
