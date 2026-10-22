/**
 * Edit all wedding details here — the site reads only from this file.
 */

export type WeddingPerson = {
  nameEn: string
  nameTa: string
  subtitle?: string
  photoSrc?: string
  parents?: string
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
    skipLabel: 'Skip Intro',
    sessionKey: 'hari-indu-wedding-intro-seen',
    ctaEn: 'Tap to Open Invitation',
    ctaTa: 'அழைப்பிதழைத் திறக்க தட்டவும்',
    blessingTa: 'ஶ்ரீ கணேசாய நம:',
    revealEn: 'Wedding Invitation',
    revealTa: 'திருமண அழைப்பிதழ்',
  },

  hero: {
    imageSrc: '',
    imageAlt: 'Traditional wedding entrance',
    blessingEn: 'With the Blessings of Our Families',
    blessingTa: 'எங்கள் குடும்பத்தினர் ஆசியுடன்',
    subtitleEn: 'Together with our families, we invite you to celebrate our wedding',
    subtitleTa: 'எங்கள் குடும்பத்தினர் சார்பாக, திருமண விழாவிற்கு அழைக்கிறோம்',
  },

  invitation: {
    titleTa: 'திருமண அழைப்பிதழ்',
    titleEn: 'Wedding Invitation',
    lineEn: 'We joyfully invite you to witness and bless our sacred union',
    lineTa: 'எங்கள் புனித திருமணத்தை காணவும் ஆசிர்வதிக்கவும் அழைக்கிறோம்',
    closingEn: 'Your presence and blessings will make our celebration complete.',
    closingTa: 'உங்கள் வருகையும் ஆசியும் எங்கள் மகிழ்ச்சியை நிறைவு செய்யும்.',
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
    /** Optional venue photo under /public */
    imageSrc: '',
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

  blessings: {
    brideFamilyEn: '[Message from bride’s family — edit in config]',
    brideFamilyTa: '[மணமகள் குடும்ப செய்தி]',
    groomFamilyEn: '[Message from groom’s family — edit in config]',
    groomFamilyTa: '[மணமகன் குடும்ப செய்தி]',
  },

  rsvp: {
    /** Receives RSVP via mailto when set */
    email: '',
    deadlineNote: 'Kindly respond before the date mentioned by our families.',
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

  footer: {
    thanksEn: 'Thank you for being part of our journey with love and blessings.',
    thanksTa: 'உங்கள் அன்பும் ஆசியும் எங்களுக்கு பெரும் பொக்கிஷம்.',
  },
} as const
