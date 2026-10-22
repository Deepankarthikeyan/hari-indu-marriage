/**
 * Edit all wedding details here — the site reads only from this file.
 */

export type WeddingPerson = {
  nameEn: string
  nameTa: string
  subtitle?: string
  /** Portrait for story section */
  photoSrc?: string
  parents?: string
  /** Short personal story (editable) */
  story?: string
}

export type WeddingEvent = {
  id: string
  nameEn: string
  nameTa: string
  date: string
  timeStart: string
  timeEnd?: string
  venueName: string
  address: string
  mapsUrl: string
  imageSrc?: string
}

export const weddingConfig = {
  intro: {
    skipLabel: 'Skip',
    sessionKey: 'hari-indu-wedding-intro-seen',
    ctaEn: 'Open with Love',
    ctaTa: 'அன்புடன் திறக்கவும்',
    blessingTa: 'ஶ்ரீ கணேசாய நம:',
    revealEn: 'Two hearts, one sacred vow',
    revealTa: 'இரு இதயங்கள் · ஒரு புனித வாக்கு',
  },

  hero: {
    /** Full-bleed hero photograph — add under public/ e.g. /photos/hero.jpg */
    imageSrc: '',
    imageAlt: 'Wedding portrait',
    subtitleEn: 'Together with our families',
    subtitleTa: 'எங்கள் குடும்பத்தினர் சார்பாக',
  },

  invitation: {
    lineEn: 'We joyfully invite you to celebrate our wedding',
    lineTa: 'எங்கள் திருமண விழாவில் கலந்து கொண்டு ஆசிர்வதிக்க வேண்டுகிறோம்',
    closingEn: 'Your presence and blessings will mean the world to us.',
    closingTa: 'உங்கள் வருகையும் ஆசியும் எங்களுக்குப் பெரும் மகிழ்ச்சி.',
  },

  couple: {
    bride: {
      nameEn: 'N. Indhumathi',
      nameTa: 'ந. இந்துமதி',
      subtitle: 'D.E.C.E.,',
      photoSrc: '',
      parents: '[Bride’s parents — edit in config]',
      story:
        'Rooted in tradition and guided by grace, she brings warmth, joy, and quiet strength to every chapter of this celebration.',
    } satisfies WeddingPerson,
    groom: {
      nameEn: 'V. Hariharan',
      nameTa: 'வ. ஹரிஹரன்',
      subtitle: 'B.E., (EEE)',
      photoSrc: '',
      parents: '[Groom’s parents — edit in config]',
      story:
        'With a steady heart and a spirit of devotion, he looks forward to beginning this sacred journey surrounded by loved ones.',
    } satisfies WeddingPerson,
  },

  ceremony: {
    date: '2026-12-13',
    timeStart: '07:35',
    timeEnd: '09:00',
    timezone: 'Asia/Kolkata',
    venueName: '[Wedding venue name — edit in config]',
    address: '[Full venue address — edit in config]',
    mapsUrl: '',
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
    },
  ] satisfies WeddingEvent[],

  gallery: {
    images: [{ src: '/assets/invitation.jpg', alt: 'Wedding invitation keepsake' }],
  },

  contact: {
    whatsappNumber: '',
    whatsappMessage:
      'Vanakkam! We would like to confirm our presence at your wedding celebration.',
  },

  audio: {
    src: '',
    label: 'Music',
  },

  closing: {
    messageEn: 'With gratitude, we await your auspicious presence.',
    messageTa: 'உங்கள் ஆசிர்வாதத்திற்காக நன்றியுடன்.',
    signoffEn: 'With love, our families',
    signoffTa: 'அன்புடன், எங்கள் குடும்பத்தினர்',
  },
} as const
