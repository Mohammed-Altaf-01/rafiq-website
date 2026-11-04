/**
 * Every passage below carries its reference and names its translation, quoted
 * exactly: Qur'an text from the quran.com API, hadith from the sunnah.com corpus.
 * An ellipsis marks an excerpt. Arabic is stored fully vowelled so the Amiri face
 * renders it the way the app does: larger, centred, and always shipped with a
 * translation.
 */
export type Passage = {
  arabic: string;
  transliteration?: string;
  translation: string;
  reference: string;
  translator: string;
  grade?: string;
};

const abdelHaleem = "M.A.S. Abdel Haleem";
const sunnahCom = "sunnah.com translation";

export const loweringTheGaze: Passage = {
  arabic:
    "قُل لِّلْمُؤْمِنِينَ يَغُضُّوا۟ مِنْ أَبْصَـٰرِهِمْ وَيَحْفَظُوا۟ فُرُوجَهُمْ ۚ ذَٰلِكَ أَزْكَىٰ لَهُمْ ۗ إِنَّ ٱللَّهَ خَبِيرٌۢ بِمَا يَصْنَعُونَ",
  translation:
    "[Prophet], tell believing men to lower their glances and guard their private parts: that is purer for them. God is well aware of everything they do.",
  reference: "Qur'an 24:30",
  translator: abdelHaleem,
};

export const theTwoBlessings: Passage = {
  arabic: "نِعْمَتَانِ مَغْبُونٌ فِيهِمَا كَثِيرٌ مِنَ النَّاسِ، الصِّحَّةُ وَالْفَرَاغُ",
  transliteration: "Ni'matani maghbunun fihima kathirun mina-n-nas: as-sihhatu wa-l-faragh",
  translation: "There are two blessings that many people are deceived into losing: health and free time.",
  reference: "Sahih al-Bukhari 6412",
  translator: sunnahCom,
};

export const theSecondGlance: Passage = {
  arabic: "يَا عَلِيُّ لاَ تُتْبِعِ النَّظْرَةَ النَّظْرَةَ فَإِنَّ لَكَ الأُولَى وَلَيْسَتْ لَكَ الآخِرَةُ",
  translation:
    "Do not give a second look, Ali, (because) while you are not to blame for the first, you have no right to the second.",
  reference: "Sunan Abi Dawud 2149",
  translator: sunnahCom,
  grade: "Graded hasan by al-Albani",
};

export const heartsFindRest: Passage = {
  arabic: "أَلَا بِذِكْرِ ٱللَّهِ تَطْمَئِنُّ ٱلْقُلُوبُ",
  transliteration: "Ala bi dhikri-llahi tatma'innu-l-qulub",
  translation: "...truly it is in the remembrance of God that hearts find peace...",
  reference: "Qur'an 13:28",
  translator: abdelHaleem,
};

export const theTreacheryOfEyes: Passage = {
  arabic: "يَعْلَمُ خَآئِنَةَ ٱلْأَعْيُنِ وَمَا تُخْفِى ٱلصُّدُورُ",
  translation: "God is aware of the most furtive of glances, and of all that hearts conceal:",
  reference: "Qur'an 40:19",
  translator: abdelHaleem,
};

export const theSteadyDeed: Passage = {
  arabic: "وَأَنَّ أَحَبَّ الأَعْمَالِ أَدْوَمُهَا إِلَى اللَّهِ، وَإِنْ قَلَّ",
  transliteration: "Wa anna ahabba-l-a'mali adwamuha ila-llahi, wa in qall",
  translation: "...the most beloved deed to Allah is the most regular and constant even if it were little.",
  reference: "Sahih al-Bukhari 6464",
  translator: sunnahCom,
};

export const theShade: Passage = {
  arabic: "وَرَجُلٌ طَلَبَتْهُ امْرَأَةٌ ذَاتُ مَنْصِبٍ وَجَمَالٍ فَقَالَ إِنِّي أَخَافُ اللَّهَ",
  translation:
    "...a man who refuses the call of a charming woman of noble birth for illicit intercourse with her and says: I am afraid of Allah...",
  reference: "Sahih al-Bukhari 660, on the seven whom Allah shades",
  translator: sunnahCom,
};
