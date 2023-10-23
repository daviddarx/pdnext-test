import getImageDimensions from './get-image-dimensions';

import { Event } from '@/types/Event';
import { Entry } from '@/types/Entry';
import { FormatedEvent } from '@/types/FormatedEvent';

const formatEvent = (event: Event, entries: Entry[], isONS = false): FormatedEvent => {
  const eventDate = new Date(event.eventdate);

  const eventEntries: Entry[] = event.entries
    ? event.entries.map((entryId) => {
        const entry = entries.find((entry) => entry.uuid === entryId);
        return entry as Entry;
      })
    : [];

  const eventTypes = eventEntries.reduce((current: string[], entry) => {
    if (entry && !current.includes(entry.entryType)) {
      current.push(entry.entryType);
    }
    return current;
  }, []);

  const dateReadable = eventDate.toLocaleDateString('de-DE', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const dateShort = eventDate
    .toLocaleDateString('de-DE', {
      weekday: 'short',
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
    })
    .replace('.', '');

  const dateFilter = eventDate
    .toLocaleDateString('de-DE', {
      weekday: 'short',
      day: 'numeric',
      month: 'numeric',
    })
    .replace('.,', '')
    .slice(0, -1);

  const dateHour = eventDate.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });

  console.log(`${dateFilter} ${event.title} ${dateHour}`);

  const id = `${event.title} -- ${dateFilter} -- ${dateHour}`
    .replace(/&shy;/g, '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s./]/gi, '')
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/\//g, '-')
    .replace(/\./g, '-')
    .replace(/(\d{2})(\d{2})$/, '$1-$2');

  let hideReducedPrice = isONS ? true : event.hideReducedPrice || false;

  const formatedEvent: FormatedEvent = {
    ...event,
    id: id,
    date: {
      bare: event.eventdate,
      readable: dateReadable,
      short: dateShort,
      filter: dateFilter,
      hour: dateHour,
    },
    types: eventTypes,
    entriesObjects: eventEntries.filter((entry) => !entry.deactivated),
    hideReducedPrice: hideReducedPrice,
  };

  // console.log('----------------- FETCH FORMAT EVENT', event.title);

  formatedEvent.entriesObjects.forEach((entry) => {
    if (entry.image) {
      const dimensions = getImageDimensions(`public${entry.image}`);
      entry.imageWidth = dimensions.width;
      entry.imageHeight = dimensions.height;
    }

    if (entry.additionalImages) {
      entry.additionalImages = entry.additionalImages.map((image) => {
        const dimensions = getImageDimensions(`public${image.image}`);
        return {
          image: image.image,
          imageWidth: dimensions.width,
          imageHeight: dimensions.height,
        };
      });
    }
  });

  return formatedEvent;
};

export default formatEvent;
