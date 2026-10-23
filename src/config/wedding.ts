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
    sessionKey: 'hari-indu-3d-wedding-v1',
    ctaEn: 'Open Invitation',
    ctaTa: 'அழைப்பிதழைத் திறக்க தட்டவும்',
    revealEn: 'Wedding Invitation',
    revealTa: 'திருமண அழைப்பிதழ்',
  },

  murugan: {
    imageSrc: '',
    imageAlt: 'Lord Murugan — divine blessing',
    blessingTitleEn: 'Divine Blessings of Lord Murugan',
    blessingTitleTa: 'முருகப்பெருமான் திவ்ய அருள்',
    blessingEn:
      'May Lord Murugan bless this sacred union with wisdom, courage, prosperity, and everlasting joy.',
    blessingTa:
      'ஞானம், தைரியம், செழிப்பு, நிலையான மகிழ்ச்சி — முருகப்பெருமான் இந்த திருமணத்திற்கு அருளட்டும்.',
    closingEn: 'With gratitude for His divine grace upon our families.',
    closingTa: 'அவன் அருளுக்கு நன்றியுடன்.',
  },

  experience: {
    stageBannerSrc: '/assets/wedding-stage-banner.jpg',
    ambientPetals: true,
  },

  palace: {
    ganeshaya: '|| Sri Ganeshaya Namah ||',
    taglineEn: 'Let the celebrations begin with colours, music & endless joy!',
    closingEn: 'Join us for an evening filled with love, laughter & beautiful memories.',
    doorCtaEn: 'Open Temple Gate',
    enterCtaEn: 'Enter wedding hall',
  },

  traditional: {
    ganeshaya: '|| Sri Ganeshaya Namah ||',
    envelopeLabel: 'You are invited to the wedding of',
    openCta: 'Open Our Invitation',
    quoteEn:
      'Two hearts united, one beautiful journey begins. Wishing you a lifetime of togetherness.',
    togetherEn: 'Together with the blessings of their families',
    inviteText: 'cordially invite you to celebrate their wedding',
    storyHeading: 'Our Story',
    storyVideoId: '',
    coupleHeading: 'About the Couple',
    eventsHeading: 'Wedding Events',
    countdownHeading: 'Counting Down To',
    countdownSub: 'Our Special Day',
    galleryHeading: 'Captured Moments',
    venueHeading: 'When & Where',
    rsvpHeading: 'Will You Join Us?',
  },

  story: {
    titleEn: 'Our Story',
    subtitleEn: 'A journey written by destiny',
    paragraphsEn: [
      'With the blessings of our families and the grace of the Almighty, we are delighted to begin this sacred journey of togetherness. What started as a beautiful connection has blossomed into a bond we cherish deeply.',
      'Surrounded by love, tradition, and the warmth of our dear ones, we invite you to witness and bless us as we unite in the presence of the divine — a celebration of faith, family, and forever.',
    ],
    signatureEn: '— Hariharan & Indhumathi',
  },

  venue: {
    subtitleEn: 'Join us at our wedding venue',
    journeyTitleEn: 'Follow the path to our mandapam',
    routeEn: '[Route directions — edit in config]',
    landmarks: ['[Landmark 1]', '[Landmark 2]', '[Landmark 3]'],
    mapCaptionEn: 'Follow the golden route to our mandapam',
    mapCaptionTa: 'பாதையைப் பின்தொடர்ந்து வாருங்கள்',
  },

  hero: {
    imageSrc: '',
    imageAlt: 'South Indian wedding mandapam',
    blessingEn: 'With the Divine Blessings of Lord Murugan',
    blessingTa: 'முருகப்பெருமானின் திவ்ய அருளுடன்',
    subtitleEn: 'Together with our families, we invite you to celebrate our wedding',
    subtitleTa: 'எங்கள் குடும்பத்தினர் சார்பாக, திருமண விழாவிற்கு அழைக்கிறோம்',
    ctaEn: 'View Wedding Invitation',
  },

  invitation: {
    titleTa: 'திருமண அழைப்பிதழ்',
    titleEn: 'Wedding Invitation',
    lineEn: 'We joyfully invite you to witness and bless our sacred union',
    lineTa: 'எங்கள் புனித திருமணத்தை காணவும் ஆசிர்வதிக்கவும் அழைக்கிறோம்',
    closingEn: 'Your presence and blessings will make our celebration complete.',
    closingTa: 'உங்கள் வருகையும் ஆசியும் எங்கள் மகிழ்ச்சியை நிறைவு செய்யும்.',
  },

  traditions: {
    titleEn: 'Tamil Wedding Traditions',
    titleTa: 'தமிழ் திருமண மரபுகள்',
    introEn:
      'From the fragrance of jasmine and marigold to the rhythm of nadaswaram and thavil, our celebration honours timeless Tamil customs.',
    introTa:
      'மல்லிகை, சாமந்தி மணம், நாதஸ்வரம், தவில் ஓசை — காலம் கடந்த தமிழ் மரபுகளைக் கொண்டாடுகிறோம்.',
    items: [
      { en: 'Kanchipuram silk & traditional veshti', ta: 'காஞ்சிபுரம் பட்டு & வேஷ்டி' },
      { en: 'Mango-leaf thoranam & banana trees', ta: 'மாவிலை தோரணம் & வாழை மரம்' },
      { en: 'Kuthuvilakku brass lamps & mandapam', ta: 'குத்து விளக்கு & மணப்பந்தல்' },
      { en: 'Kolam, coconuts & auspicious fruits', ta: 'கோலம், தேங்காய் & மங்கள பழங்கள்' },
    ],
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
    thanksEn: 'Thank you for sharing in our joy with love and blessings.',
    thanksTa: 'உங்கள் அன்பும் ஆசியும் எங்களுக்கு பெரும் பொக்கிஷம்.',
  },
} as const
