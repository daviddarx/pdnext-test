import * as events from '../_content/events/*.json';
import * as eventsONS from '../_content/events-ons/*.json';
import * as entries from '../_content/entries/*.json';
import * as entriesONS from '../_content/entries-ons/*.json';
import * as entryTypes from '../_content/entryTypes/*.json';

import * as supportUs from '../_content/supportUsSlots/*.json';
import * as partners from '../_content/partners/partners.json';
import * as partnersLogos from '../_content/partners/logos/*.js';
import * as impressions from '../_content/impressions/*.json';
import * as news from '../_content/news/*.json';
import * as festival from '../_content/contentPages/contentpage-das-festival.json';
import * as press from '../_content/contentPages/contentpage-presse.json';
import * as submissions from '../_content/contentPages/contentpage-submissions.json';
import * as impressum from '../_content/contentPages/contentpage-impressum.json';
import * as privacy from '../_content/contentPages/contentpage-datenschutz.json';
import * as cookies from '../_content/contentPages/contentpage-cookie-richtlinie.json';
import * as galleries from '../_content/galleries/galleries.json';


const contents = {
  events: events,
  eventsONS: eventsONS,
  entries: entries,
  entriesONS: entriesONS,
  entryTypes: entryTypes,
  supportUs: supportUs,
  partners: partners,
  partnersLogos: partnersLogos,
  impressions: impressions,
  news: news,
  festival: festival,
  press: press,
  submissions: submissions,
  impressum: impressum,
  privacy: privacy,
  cookies: cookies,
  galleries: galleries
}

Object.values(contents).forEach(value => {
  delete value.default; //remove default set by parcel import
});

export default {
  lists: {
    events: contents.events,
    eventsONS: contents.eventsONS,
    entries: contents.entries,
    entriesONS: contents.entriesONS,
    entryTypes: contents.entryTypes,
    supportUs: contents.supportUs,
    partners: contents.partners,
    partnersLogos: contents.partnersLogos,
    impressions: contents.impressions,
    news: contents.news,
    galleries: contents.galleries
  },
  contents: contents,
};
