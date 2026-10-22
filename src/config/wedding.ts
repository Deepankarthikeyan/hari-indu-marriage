/**
 * Edit all wedding details here — the site reads only from this file.
 * Times use 24-hour format. `timezone` should be an IANA name (e.g. Asia/Kolkata).
 */

export type WeddingPerson = {
  nameEn: string
  nameTa: string
  /** Optional subtitle (degree, profession, etc.) */
  subtitle?: string
  /** Path under /public, or full URL. Leave empty for decorative placeholder. */
  photoSrc?: string
  parents?: string
}

export type WeddingEvent = {
  id: string
  nameEn: string
  nameTa: string
  /** ISO date YYYY-MM-DD */
  date: string
  /** 24h HH:mm */
  timeStart: string
  timeEnd?: string
  venueName: string
  address: string
  /** Full Google Maps URL for directions */
  mapsUrl: string
  motif: 'muhurtham' | 'reception' | 'mehendi' | 'general'
}

export const weddingConfig = {
  intro: {
    /** Shown on the temple doors before opening */
    ctaEn: 'Open Wedding Invitation',
    ctaTa: 'திருமண அழைப்பிதழைத் திறக்கவும்',
    skipLabel: 'Skip Intro',
    /** Session key — intro is not shown again in the same browser tab session */
    sessionKey: 'hari-indu-wedding-intro-seen',
  },

  invitation: {
    titleTa: 'திருமண அழைப்பிதழ்',
    blessingEn: 'With the blessings of our elders and the grace of the divine',
    blessingTa: 'மூத்தோர் ஆசியும் இறைவன் அருளும்',
    inviteEn: 'Together with our families, we joyfully invite you to celebrate the wedding of',
    inviteTa: 'எங்கள் குடும்பத்தினர் சார்பாக, திருமண விழாவிற்கு அன்புடன் அழைக்கிறோம்',
    closingEn: 'Your presence and blessings will make our special day even more meaningful.',
    closingTa: 'உங்கள் வருகையும் ஆசியும் எங்கள் மகிழ்ச்சியை பன்மடங்கு செய்யும்.',
  },

  couple: {
    bride: {
      nameEn: 'N. Indhumathi',
      nameTa: 'ந. இந்துமதி',
      subtitle: 'D.E.C.E.,',
      photoSrc: '',
      parents: '[Bride’s parents — edit in config]',
    } satisfies WeddingPerson,
    groom: {
      nameEn: 'V. Hariharan',
      nameTa: 'வ. ஹரிஹரன்',
      subtitle: 'B.E., (EEE)',
      photoSrc: '',
      parents: '[Groom’s parents — edit in config]',
    } satisfies WeddingPerson,
  },

  /** Primary muhurtham — drives countdown & “Add to Calendar” */
  ceremony: {
    date: '2026-12-13',
    timeStart: '07:35',
    timeEnd: '09:00',
    timezone: 'Asia/Kolkata',
    venueName: '[Wedding venue name — edit in config]',
    address: '[Full venue address — edit in config]',
    mapsUrl: '', // e.g. https://maps.google.com/?q=...
  },

  events: [
    {
      id: 'muhurtham',
      nameEn: 'Muhurtham — Wedding Ceremony',
      nameTa: 'முகூர்த்தம் — திருமண விழா',
      date: '2026-12-13',
      timeStart: '07:35',
      timeEnd: '09:00',
      venueName: '[Wedding venue name — edit in config]',
      address: '[Full venue address — edit in config]',
      mapsUrl: '',
      motif: 'muhurtham',
    },
    // Add more events here when details are ready:
    // { id: 'reception', nameEn: 'Reception', ... },
  ] satisfies WeddingEvent[],

  gallery: {
    /** Images under /public or absolute URLs */
    images: [
      { src: '/assets/invitation.jpg', alt: 'Printed wedding invitation card' },
    ],
  },

  contact: {
    /** E.164 without + for wa.me link, e.g. 919876543210. Leave empty to hide WhatsApp. */
    whatsappNumber: '',
    whatsappMessage:
      'Vanakkam! We would like to confirm our presence at your wedding celebration.',
  },

  audio: {
    /** Place an MP3 at public/audio/wedding-instrumental.mp3 or set a URL. Empty = control hidden. */
    src: '',
    label: 'Traditional music',
  },

  closing: {
    messageEn: 'With gratitude and folded hands, we await your auspicious presence.',
    messageTa: 'உங்கள் ஆசிர்வாதத்திற்காக நன்றியுடன் காத்திருக்கிறோம்.',
    signoffEn: '— With love, our families',
    signoffTa: '— அன்புடன், எங்கள் குடும்பத்தினர்',
  },
} as const

export type WeddingConfig = typeof weddingConfig
