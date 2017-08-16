import { Component } from '@angular/core';

import { SettingsPage } from '../settings/settings';
import { ExplorePage } from '../explore/explore';
import { EventsPage } from '../events/events';
import { FriendsPage } from '../friends/friends';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ExplorePage;
  tab2Root = EventsPage;
  tab3Root = FriendsPage;
  tab4Root = SettingsPage;

  constructor() {

  }
}
