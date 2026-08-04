/**
 * Every passage below carries its reference. Arabic is stored fully vowelled so
 * the Amiri face renders it the way the app does: larger, centred, and always
 * shipped with a translation.
 */
export type Passage = {
  arabic: string;
  transliteration?: string;
  translation: string;
  reference: string;
};

export const loweringTheGaze: Passage = {
  arabic:
    "قُل لِّلْمُؤْمِنِينَ يَغُضُّوا۟ مِنْ أَبْصَٰرِهِمْ وَيَحْفَظُوا۟ فُرُوجَهُمْ ۚ ذَٰلِكَ أَزْكَىٰ لَهُمْ",
  translation:
    "Tell the believing men to lower their gaze and guard their chastity. That is purer for them.",
  reference: "Qur'an 24:30",
};

export const theTwoBlessings: Passage = {
  arabic: "نِعْمَتَانِ مَغْبُونٌ فِيهِمَا كَثِيرٌ مِنَ النَّاسِ: الصِّحَّةُ وَالْفَرَاغُ",
  transliteration: "Ni'matani maghbunun fihima kathirun mina-n-nas: as-sihhatu wa-l-faragh",
  translation:
    "There are two blessings which many people lose: good health, and free time.",
  reference: "Sahih al-Bukhari 6412",
};

export const theSecondGlance: Passage = {
  arabic: "لَا تُتْبِعِ النَّظْرَةَ النَّظْرَةَ، فَإِنَّ لَكَ الْأُولَىٰ وَلَيْسَتْ لَكَ الْآخِرَةُ",
  translation:
    "Do not follow one glance with another. The first is yours; the second is not.",
  reference: "Sunan Abi Dawud 2149",
};

export const heartsFindRest: Passage = {
  arabic: "أَلَا بِذِكْرِ ٱللَّهِ تَطْمَئِنُّ ٱلْقُلُوبُ",
  transliteration: "Ala bi dhikri-llahi tatma'innu-l-qulub",
  translation: "Truly, it is in the remembrance of Allah that hearts find rest.",
  reference: "Qur'an 13:28",
};

export const theTreacheryOfEyes: Passage = {
  arabic: "يَعْلَمُ خَآئِنَةَ ٱلْأَعْيُنِ وَمَا تُخْفِى ٱلصُّدُورُ",
  translation: "He knows the treachery of the eyes, and what the hearts conceal.",
  reference: "Qur'an 40:19",
};

export const theSteadyDeed: Passage = {
  arabic: "أَحَبُّ الْأَعْمَالِ إِلَى اللَّهِ أَدْوَمُهَا وَإِنْ قَلَّ",
  transliteration: "Ahabbu-l-a'mali ila-llahi adwamuha wa in qall",
  translation:
    "The deeds most beloved to Allah are the ones done consistently, even if they are few.",
  reference: "Sahih al-Bukhari 6464",
};

export const theShade: Passage = {
  arabic: "وَرَجُلٌ دَعَتْهُ امْرَأَةٌ ذَاتُ مَنْصِبٍ وَجَمَالٍ فَقَالَ إِنِّي أَخَافُ اللَّهَ",
  translation:
    "And a man who was called by a woman of beauty and standing, and said: I fear Allah.",
  reference: "Sahih al-Bukhari 660, on the seven whom Allah shades",
};
