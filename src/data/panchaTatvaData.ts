export type ElementSlug = 'earth' | 'water' | 'fire' | 'air' | 'space';

export interface ElementImage {
  src: string;
  alt: string;
  caption: string;
}

export interface ElementSection {
  title: string;
  body: string[];
  more?: string;
}

export interface ElementAttributes {
  tanmatra: string;
  sense: string;
  organ: string;
  action: string;
  chakra: string;
  bija: string;
  dosha: string;
  shape: string;
  quality: string;
  state: string;
}

export interface ElementData {
  slug: ElementSlug;
  english: string;
  sanskrit: string;
  devanagari: string;
  symbol: string;
  tagline: string;
  intro: string;
  fact: string;
  soundscapeDesc: string;
  frequencyHz: number;
  attributes: ElementAttributes;
  images: ElementImage[];
  sections: ElementSection[];
  references: string[];
}

export interface TopicSection {
  title: string;
  body: string;
}

export interface TopicData {
  slug: string;
  title: string;
  summary: string;
  sections: TopicSection[];
}

export const ELEMENT_STYLES: Record<
  ElementSlug,
  { text: string; bg: string; border: string; soft: string; fill: string }
> = {
  earth: {
    text: 'text-earth',
    bg: 'bg-earth',
    border: 'border-earth',
    soft: 'bg-earth/10',
    fill: 'fill-earth',
  },
  water: {
    text: 'text-water',
    bg: 'bg-water',
    border: 'border-water',
    soft: 'bg-water/10',
    fill: 'fill-water',
  },
  fire: {
    text: 'text-fire',
    bg: 'bg-fire',
    border: 'border-fire',
    soft: 'bg-fire/10',
    fill: 'fill-fire',
  },
  air: {
    text: 'text-air',
    bg: 'bg-air',
    border: 'border-air',
    soft: 'bg-air/10',
    fill: 'fill-air',
  },
  space: {
    text: 'text-space',
    bg: 'bg-space',
    border: 'border-space',
    soft: 'bg-space/10',
    fill: 'fill-space',
  },
};

export const ELEMENT_References = [
  'Taittiriya Upanishad 2.1.1 — the sequence of emanation of the five elements from Atman.',
  'Ishvarakrishna, Samkhya Karika (c. 4th century CE), verses 22–38 on tanmatras and mahabhutas.',
  'Charaka Samhita, Sharira Sthana 1 — the Panchamahabhuta basis of the body.',
  'Sushruta Samhita, Sharira Sthana 1 — elemental composition of living beings.',
  'Dasgupta, S. (1922). A History of Indian Philosophy, Vol. I. Cambridge University Press.',
  'Frawley, D. (2000). Ayurvedic Healing: A Comprehensive Guide. Lotus Press.',
];

export const ELEMENTS: ElementData[] = [
  {
    slug: 'earth',
    english: 'Earth',
    sanskrit: 'Prithvi',
    devanagari: 'पृथ्वी',
    symbol: '▢',
    tagline: 'The principle of stability, structure and form.',
    intro:
      'Prithvi is the densest of the five elements — the principle of solidity that gives every object its shape, weight and endurance.',
    fact: 'In Vastu Shastra, the south-west corner of a building is assigned to Earth, so heavy structures are traditionally placed there.',
    soundscapeDesc: 'Living earth nature — forest birds in the jungle ambiance & 256 Hz root resonance',
    frequencyHz: 256,
    attributes: {
      tanmatra: 'Gandha (smell)',
      sense: 'Nose (smell)',
      organ: 'Anus (excretion)',
      action: 'Elimination',
      chakra: 'Muladhara (root)',
      bija: 'LAM',
      dosha: 'Kapha (with Water)',
      shape: 'Yellow square',
      quality: 'Heavy, stable, dense, rough',
      state: 'Solid',
    },
    images: [
      {
        src: '/assets/earth-1-D0sz27tE.jpg',
        alt: 'Himalayan peaks above terraced green fields at golden hour',
        caption: 'Mountains and terraced soil — Prithvi as stability and nourishment.',
      },
      {
        src: '/assets/earth-2-CzUFAorp.jpg',
        alt: 'Carved sandstone temple courtyard with a mandala pattern on the floor',
        caption: 'Stone temple architecture — Earth as the ground of sacred form.',
      },
      {
        src: '/assets/space-2-tlIdKORL.jpg',
        alt: 'Stone instruments of Jantar Mantar under the night sky',
        caption: 'Masonry observatory — solid Earth measuring the heavens.',
      },
    ],
    sections: [
      {
        title: 'Introduction',
        body: [
          "Among the five elements of Indian thought, Prithvi (Earth) is the last to emerge and the most tangible. Where Space offers room, Air movement, Fire transformation and Water cohesion, Earth provides solidity. It is the element of the body's bones, teeth, muscles and skin, and in the outer world it is rock, soil, mountain and the planet itself.",
          'Prithvi is not simply the ground beneath our feet. In classical philosophy it names a principle — the quality of resistance and fixity that makes form possible. Anything that occupies a stable shape participates in Earth.',
        ],
      },
      {
        title: 'Meaning & Etymology',
        body: [
          "The Sanskrit word Prithvi derives from the root prath, 'to spread out' or 'to extend'. Prithvi is literally 'the broad one'. Synonyms include Bhumi (that which comes into being), Dhara (the bearer) and Vasundhara (holder of treasures). Each name stresses support: the Earth is that which holds.",
        ],
      },
      {
        title: 'Vedic and Upanishadic Traditions',
        body: [
          "The Rig Veda addresses Prithvi as a goddess paired with Dyaus, the Sky, as the cosmic parents. The Atharva Veda's Bhumi Sukta (12.1) is a long hymn of reverence: 'Mata bhumih putro aham prithivyah' — the Earth is my mother and I am her child.",
          'The Taittiriya Upanishad (2.1) describes the sequence of creation: from Atman came Space, from Space Air, from Air Fire, from Fire Water, and from Water Earth. Earth is the final and grossest manifestation, and from Earth arise plants, food and the human body.',
        ],
        more: 'This sequence is widely cited as the earliest systematic statement of the five-element cosmology. Each element is said to contain the qualities of those that precede it, so Earth is perceptible by all five senses.',
      },
      {
        title: 'Pancha Mahabhuta Philosophy',
        body: [
          'In Samkhya philosophy, each gross element (mahabhuta) arises from a subtle essence (tanmatra). Earth arises from gandha tanmatra, the subtle principle of smell. Because it accumulates qualities from the preceding elements, Earth carries sound, touch, form, taste and smell — making it the only element knowable by all five senses.',
        ],
      },
      {
        title: 'Related Natural Sciences',
        body: [
          "Modern geology describes Earth's crust, mantle and core, plate tectonics and the rock cycle. Soil science studies how weathered rock, organic matter and microorganisms create the thin fertile layer that supports land life. These are not the same as the philosophical Prithvi, but they map onto its themes: structure, weight, and nourishment.",
        ],
      },
      {
        title: 'Different Philosophical Schools',
        body: [
          'The Nyaya-Vaisheshika school treats Earth as an eternal substance in its atomic (paramanu) form and non-eternal in its compound forms. Jain philosophy recognises earth-bodied beings (prithvikaya jiva), extending ethical concern even to minerals. Buddhist Abhidharma lists pathavi-dhatu, the element of hardness, as one of four great primaries.',
        ],
      },
      {
        title: 'Prithvi in Ayurveda',
        body: [
          'Ayurveda holds that the body is made of the five elements. Earth, combined with Water, forms Kapha dosha, governing structure, stability and lubrication. Earth-dominant substances — grains, root vegetables, nuts — are described as heavy, grounding and building. An excess of Earth qualities is linked to heaviness and sluggishness; a deficiency to instability and weakness.',
        ],
      },
      {
        title: 'Tantra, Yoga & Traditional Practices',
        body: [
          'In the chakra system, Earth is associated with Muladhara, the root centre at the base of the spine, represented by a yellow square and the seed syllable LAM. Prithvi mudra — touching the tip of the ring finger to the thumb — is practised for a sense of steadiness. Standing poses such as Tadasana (mountain pose) are often described as cultivating Earth qualities.',
        ],
      },
      {
        title: 'Architecture & Culture',
        body: [
          'Bhoomi Puja, the ritual honouring the ground before construction, is still performed across India. Vastu Shastra assigns Earth to the south-west, recommending heavy walls and storage there. Rock-cut monuments at Ellora and stone temples across the subcontinent embody the permanence associated with Prithvi.',
        ],
      },
      {
        title: 'Modern Interpretations',
        body: [
          'Some writers compare the five elements to the states of matter: Earth to solids, Water to liquids, Fire to energy or plasma, Air to gases and Space to the field in which they exist. This is a helpful teaching analogy, but it is an interpretation — the classical texts describe principles of experience, not chemical substances.',
        ],
      },
      {
        title: 'Advantages, Limitations & Benefits',
        body: [
          'As a framework, Prithvi encourages ecological respect, attention to diet and posture, and an appreciation for stability in life. Its limitation is that it is not a scientific category: it cannot predict material properties or replace geology. Used as a lens rather than a law, it remains valuable for reflection, culture and wellbeing.',
        ],
      },
      {
        title: 'Conclusion',
        body: [
          'Prithvi teaches that form and stability are the foundation upon which all other experience rests. From the Bhumi Sukta to modern environmental thought, the idea of Earth as a nourishing mother continues to shape how we relate to the ground beneath us.',
        ],
      },
    ],
    references: ELEMENT_References,
  },
  {
    slug: 'water',
    english: 'Water',
    sanskrit: 'Apas / Jala',
    devanagari: 'आपः / जल',
    symbol: '◡',
    tagline: 'The principle of cohesion, flow and life.',
    intro:
      'Apas is the element of fluidity and binding. It holds particles together, carries nourishment and is inseparable from life itself.',
    fact: "The Rig Veda's Apah Sukta (10.9) praises the waters as mothers who bring healing — it is still recited in purification rites.",
    soundscapeDesc: 'Natural flowing sacred water stream ambience & 288 Hz Svadhisthana resonance',
    frequencyHz: 288,
    attributes: {
      tanmatra: 'Rasa (taste)',
      sense: 'Tongue (taste)',
      organ: 'Genitals (procreation)',
      action: 'Reproduction',
      chakra: 'Svadhisthana (sacral)',
      bija: 'VAM',
      dosha: 'Kapha & Pitta',
      shape: 'Silver crescent',
      quality: 'Cool, fluid, soft, cohesive',
      state: 'Liquid',
    },
    images: [
      {
        src: '/assets/water-1-DNeaL28Z.jpg',
        alt: 'Oil lamps floating on the Ganges at the Varanasi ghats at dawn',
        caption: 'The Ganga at Varanasi — water as purifier and sacred mother.',
      },
      {
        src: '/assets/water-2-CSI6tHG0.jpg',
        alt: 'Geometric stone steps descending to green water in an ancient stepwell',
        caption: 'Stepwell (baori) — traditional water architecture.',
      },
      {
        src: '/assets/water-3-Ent1e2-g.jpg',
        alt: 'Ocean waves under storm clouds labelled with the stages of the water cycle',
        caption: 'The water cycle — evaporation, condensation, precipitation and collection.',
      },
    ],
    sections: [
      {
        title: 'Introduction',
        body: [
          'Apas, also called Jala, is the fourth element in the order of emanation. It is the principle of fluidity and cohesion: what flows, binds and moistens. In the body it is blood, lymph, saliva and the fluid within every cell; in nature it is rain, river and ocean.',
          'Without Water, Earth would be dust. Classical thinkers saw Apas as the element that makes particles cling together and makes life possible.',
        ],
      },
      {
        title: 'Meaning & Etymology',
        body: [
          "Apas is an ancient Indo-European word for water, related to the root ap, 'to reach' or 'to pervade'. Jala comes from jal, 'to cover'. Other names include Ambu, Udaka, Toya and Nira. Many Indian river names — Ganga, Yamuna, Sarasvati — are also names of goddesses, showing how water and the sacred are intertwined.",
        ],
      },
      {
        title: 'Vedic and Upanishadic Traditions',
        body: [
          "The Rig Veda contains several hymns to the Apah, the divine waters, who are called mothers and healers. In the Nasadiya Sukta (10.129) the primordial state before creation is described as 'water without distinguishing marks'. The Taittiriya Upanishad places Water as arising from Fire and giving rise to Earth.",
        ],
        more: 'The Chandogya Upanishad (6.2) offers a variant sequence in which Being produces heat (tejas), heat produces water, and water produces food — an early example of thinkers relating rainfall to agriculture.',
      },
      {
        title: 'Pancha Mahabhuta Philosophy',
        body: [
          "In Samkhya, Water arises from rasa tanmatra, the subtle essence of taste. It carries the qualities of sound, touch, form and taste, but not smell. This is why the tongue, which requires moisture to taste, is considered Water's sense organ.",
        ],
      },
      {
        title: 'Hydrology & Related Sciences',
        body: [
          "Modern hydrology describes the water cycle: evaporation, condensation, precipitation, infiltration and runoff. Water covers about 71% of Earth's surface and makes up roughly 60% of an adult human body. Its unusual properties — high heat capacity, surface tension, and its role as a universal solvent — make it central to biology.",
        ],
      },
      {
        title: 'Different Philosophical Schools',
        body: [
          'Vaisheshika defines Water by its natural fluidity and cool touch. Jain thought recognises water-bodied beings (apkaya jiva), encouraging minimal waste. Buddhist Abhidharma lists apo-dhatu, the element of cohesion, among the four primaries.',
        ],
      },
      {
        title: 'Jala in Ayurveda',
        body: [
          'Water combines with Earth to form Kapha and supports Pitta as the medium in which digestive fire operates. Ayurvedic texts give detailed guidance on drinking water — warm water to aid digestion, river water by season — and describe sweet and salty tastes as Water-dominant.',
        ],
      },
      {
        title: 'Tantra, Yoga & Traditional Practices',
        body: [
          'Water is linked to Svadhisthana chakra, below the navel, symbolised by a silver crescent and the syllable VAM. Varuna mudra (little finger to thumb) is associated with Water. Ritual bathing (snana), achamana (sipping water for purification) and offering water to the Sun (arghya) are everyday practices.',
        ],
      },
      {
        title: 'Architecture & Culture',
        body: [
          'India developed remarkable water architecture: stepwells like Chand Baori and Rani ki Vav, temple tanks (kalyani), and the drainage systems of the Harappan cities. Vastu assigns Water to the north-east. Festivals such as Kumbh Mela and Chhath Puja centre on rivers.',
        ],
      },
      {
        title: 'Modern Interpretations',
        body: [
          'Writers often relate Apas to the liquid state of matter and to cohesive forces. Environmental movements draw on the sacredness of rivers to argue for conservation; in 2017 an Indian court briefly recognised the Ganga and Yamuna as legal persons.',
        ],
      },
      {
        title: 'Advantages, Limitations & Benefits',
        body: [
          'The Water principle promotes awareness of hydration, purity and conservation. Its limitation, as with all elements, is that it is symbolic: it does not describe hydrogen and oxygen. Respect for sacred rivers also coexists with severe pollution — reminding us that reverence must be matched by action.',
        ],
      },
      {
        title: 'Conclusion',
        body: [
          'Apas embodies flow and connection. From Vedic hymns to stepwells and the water cycle, it teaches that life depends on what binds and nourishes — a lesson of growing relevance in an age of water scarcity.',
        ],
      },
    ],
    references: ELEMENT_References,
  },
  {
    slug: 'fire',
    english: 'Fire',
    sanskrit: 'Agni / Tejas',
    devanagari: 'अग्नि / तेजस्',
    symbol: '△',
    tagline: 'The principle of transformation, light and heat.',
    intro:
      'Agni is the transformer — the power that digests food, ripens fruit, illuminates the eye and carries offerings to the gods.',
    fact: "The very first word of the Rig Veda is 'Agnim' — the opening hymn is addressed to Fire.",
    soundscapeDesc: 'Sacred campfire crackles & Vedic yajna hearth audio (320 Hz Manipura)',
    frequencyHz: 320,
    attributes: {
      tanmatra: 'Rupa (form / sight)',
      sense: 'Eyes (sight)',
      organ: 'Feet (locomotion)',
      action: 'Movement',
      chakra: 'Manipura (solar plexus)',
      bija: 'RAM',
      dosha: 'Pitta',
      shape: 'Red triangle',
      quality: 'Hot, sharp, light, penetrating',
      state: 'Energy / radiance',
    },
    images: [
      {
        src: '/assets/fire-1-B_cNRiCW.jpg',
        alt: 'Bright flames rising from a carved havan kund during a Vedic yajna',
        caption: 'Yajna — fire as messenger between humans and the divine.',
      },
      {
        src: '/assets/fire-2-DL5xCsb4.jpg',
        alt: "Close-up of the Sun's surface with solar flares",
        caption: 'The Sun — the cosmic form of Agni as Surya.',
      },
      {
        src: '/assets/water-1-DNeaL28Z.jpg',
        alt: 'Lamps glowing on the river at dawn',
        caption: 'Diyas on water — Fire and Water meeting in ritual.',
      },
    ],
    sections: [
      {
        title: 'Introduction',
        body: [
          'Agni, also called Tejas, is the third element: the principle of heat, light and transformation. It is the digestive fire in the stomach, the light in the eye, the warmth of the body, and in the cosmos the Sun, lightning and flame.',
          'Fire changes one thing into another. Food becomes tissue, raw becomes cooked, darkness becomes light. For this reason Agni is central both to ritual and to physiology.',
        ],
      },
      {
        title: 'Meaning & Etymology',
        body: [
          "Agni is cognate with the Latin ignis (fire), as in 'ignite'. Tejas comes from tij, 'to be sharp', and also means brilliance or radiance. Other names include Vahni, Anala, Pavaka (the purifier) and Hutashana (eater of offerings).",
        ],
      },
      {
        title: 'Vedic and Upanishadic Traditions',
        body: [
          'Agni is one of the most important Vedic deities; about 200 hymns of the Rig Veda are addressed to him. He is the priest (hotr) and messenger who carries offerings to the gods. The Taittiriya Upanishad places Fire as arising from Air and giving rise to Water.',
        ],
        more: "The Vedas describe three fires in the home ritual — Garhapatya, Ahavaniya and Dakshinagni — and connect them to Earth, Sky and the intermediate space. The Katha Upanishad's Nachiketa story centres on a secret fire-ritual taught by Yama.",
      },
      {
        title: 'Pancha Mahabhuta Philosophy',
        body: [
          "Fire arises from rupa tanmatra, the subtle essence of form or visibility. It carries sound, touch and form. Because light reveals shape, the eye is Fire's sense organ.",
        ],
      },
      {
        title: 'Related Natural Sciences',
        body: [
          "Physics describes heat as the kinetic energy of particles and light as electromagnetic radiation. Combustion is a rapid oxidation reaction releasing heat and light. The Sun powers nearly all life on Earth through nuclear fusion. Metabolism — the 'fire' of digestion — is a controlled release of chemical energy.",
        ],
      },
      {
        title: 'Different Philosophical Schools',
        body: [
          'Vaisheshika defines Tejas by its hot touch and luminous colour, and includes gold as a form of Fire. Jain thought recognises fire-bodied beings (teukaya jiva). In Buddhist Abhidharma, tejo-dhatu is the element of heat and maturation.',
        ],
      },
      {
        title: 'Agni in Ayurveda',
        body: [
          "Agni is one of Ayurveda's central concepts. Jatharagni, the digestive fire, is said to be the root of health, with thirteen types of agni governing digestion and metabolism. Fire forms Pitta dosha, responsible for digestion, body temperature, vision and intellect. Pungent, sour and salty tastes increase Fire.",
        ],
      },
      {
        title: 'Tantra, Yoga & Traditional Practices',
        body: [
          'Fire is associated with Manipura chakra at the navel, depicted as a red downward triangle with the syllable RAM. Practices such as Kapalabhati breathing, Surya Namaskar and Trataka (candle gazing) are linked with Fire. The homa or havan is still performed at weddings and housewarmings.',
        ],
      },
      {
        title: 'Architecture & Culture',
        body: [
          'Vastu places the kitchen in the south-east, the direction of Agni. Indian weddings are solemnised by walking around the sacred fire (saptapadi). Diwali, the festival of lights, and Lohri and Holika Dahan bonfires celebrate Fire\'s role in community life.',
        ],
      },
      {
        title: 'Modern Interpretations',
        body: [
          'Fire is commonly compared with energy, plasma and metabolism. The idea that a single principle governs both cosmic light and bodily digestion is a striking early intuition of energy conservation, though it should not be read as modern physics.',
        ],
      },
      {
        title: 'Advantages, Limitations & Benefits',
        body: [
          "The Agni concept encourages mindful eating and the balance of activity and rest. Its limitation is that 'digestive fire' is a metaphor, not a measurable quantity. Ritual fires also raise environmental concerns about smoke, which modern practitioners increasingly address.",
        ],
      },
      {
        title: 'Conclusion',
        body: [
          "Agni is the bridge between matter and energy, human and divine. Whether in the Rig Veda's first verse or the Ayurvedic emphasis on digestion, Fire remains the symbol of transformation.",
        ],
      },
    ],
    references: ELEMENT_References,
  },
  {
    slug: 'air',
    english: 'Air',
    sanskrit: 'Vayu',
    devanagari: 'वायु',
    symbol: '◯',
    tagline: 'The principle of movement, breath and change.',
    intro:
      'Vayu is the element of motion. It is the wind across the plains and the breath — prana — moving through every living body.',
    fact: 'Hanuman, one of the most beloved figures of the Ramayana, is called Pavanaputra — son of the Wind god Vayu.',
    soundscapeDesc: 'Flowing wind & atmospheric air ambience (341 Hz Anahata)',
    frequencyHz: 341.3,
    attributes: {
      tanmatra: 'Sparsha (touch)',
      sense: 'Skin (touch)',
      organ: 'Hands (grasping)',
      action: 'Holding',
      chakra: 'Anahata (heart)',
      bija: 'YAM',
      dosha: 'Vata (with Space)',
      shape: 'Blue-grey hexagram',
      quality: 'Light, dry, mobile, cool, subtle',
      state: 'Gas',
    },
    images: [
      {
        src: '/assets/air-1-BBPmHUMh.jpg',
        alt: 'Golden grass blowing in wind below a bright blue sky with wind turbines',
        caption: 'Wind energy — Vayu as the force of motion.',
      },
      {
        src: '/assets/air-2-DtTqZzYA.jpg',
        alt: 'Woman practising alternate-nostril breathing on a misty mountain at sunrise',
        caption: 'Pranayama — the yogic science of breath.',
      },
      {
        src: '/assets/water-3-Ent1e2-g.jpg',
        alt: 'Storm clouds forming over the ocean',
        caption: 'Atmospheric circulation drives clouds and rainfall.',
      },
    ],
    sections: [
      {
        title: 'Introduction',
        body: [
          'Vayu is the second element: the principle of motion. Wherever there is movement — of wind, of blood, of nerve impulses, of thought — classical texts see the action of Vayu. In the body it is breath, and breath is life.',
          'Air cannot be seen, but it can be felt. Its signature is touch and change.',
        ],
      },
      {
        title: 'Meaning & Etymology',
        body: [
          "Vayu comes from the root va, 'to blow'. Synonyms include Pavana (purifier), Marut (the storm winds), Anila and Samirana. Closely related is prana, the vital breath, from pra + an, 'to breathe forth'.",
        ],
      },
      {
        title: 'Vedic and Upanishadic Traditions',
        body: [
          'In the Rig Veda, Vayu is the swift god who drinks the first share of soma, accompanied by the Maruts. The Brihadaranyaka Upanishad tells a famous story in which the senses compete for supremacy; only when breath (prana) prepares to leave do they all weaken, proving breath is chief.',
        ],
        more: 'The Upanishads describe five pranas — prana, apana, vyana, udana and samana — each governing a different bodily movement, from inhalation to elimination to circulation.',
      },
      {
        title: 'Pancha Mahabhuta Philosophy',
        body: [
          "Air arises from sparsha tanmatra, the subtle essence of touch. It carries sound and touch. The skin, which senses pressure and temperature, is Air's sense organ.",
        ],
      },
      {
        title: 'Related Natural Sciences',
        body: [
          'The atmosphere is about 78% nitrogen and 21% oxygen, layered into troposphere, stratosphere, mesosphere and beyond. Winds arise from pressure differences caused by uneven solar heating. Respiration exchanges oxygen and carbon dioxide; the average adult takes around 20,000 breaths a day.',
        ],
      },
      {
        title: 'Different Philosophical Schools',
        body: [
          "Vaisheshika defines Air by touch that is neither hot nor cold and by its being inferred rather than seen. Jain thought recognises air-bodied beings (vayukaya jiva). Buddhism's vayo-dhatu is the element of motion and support.",
        ],
      },
      {
        title: 'Vayu in Ayurveda',
        body: [
          'Air and Space form Vata dosha, which governs all movement in the body — breathing, circulation, nerve impulses and elimination. Vata is considered the leader of the doshas because without movement the others cannot act. Excess Vata is linked with dryness, anxiety and irregularity.',
        ],
      },
      {
        title: 'Tantra, Yoga & Traditional Practices',
        body: [
          "Air is associated with Anahata, the heart chakra, symbolised by a six-pointed star and the syllable YAM. Pranayama — the regulation of breath — is the fourth limb of Patanjali's Yoga Sutras. Vayu mudra (index finger under thumb) is practised to calm restlessness.",
        ],
      },
      {
        title: 'Architecture & Culture',
        body: [
          'Vastu assigns Air to the north-west and stresses cross-ventilation. Traditional buildings used jaalis (lattice screens), courtyards and wind-catchers to cool interiors — passive design now studied for sustainable architecture. Kite festivals like Makar Sankranti celebrate the wind.',
        ],
      },
      {
        title: 'Modern Interpretations',
        body: [
          "Vayu is compared with gases, atmospheric dynamics and the nervous system's signalling. Research on slow breathing has shown measurable effects on heart-rate variability and stress, lending modern interest to ancient pranayama.",
        ],
      },
      {
        title: 'Advantages, Limitations & Benefits',
        body: [
          'The Air principle draws attention to breath, ventilation and clean air — a pressing public-health issue in many cities. Its limitation is that prana is not identical with oxygen, and claims for breathing practices should be tested carefully.',
        ],
      },
      {
        title: 'Conclusion',
        body: [
          'Vayu reminds us that life is movement. From the Upanishadic contest of the senses to modern breathwork, Air remains the invisible thread connecting body, mind and world.',
        ],
      },
    ],
    references: ELEMENT_References,
  },
  {
    slug: 'space',
    english: 'Space',
    sanskrit: 'Akasha',
    devanagari: 'आकाश',
    symbol: '✦',
    tagline: 'The principle of openness, sound and possibility.',
    intro:
      'Akasha is the first and subtlest element — the field that gives room for everything else to exist and through which sound travels.',
    fact: 'Some Hindu traditions consider the Chidambaram Nataraja temple to be the shrine of Akasha — its sanctum holds an empty space rather than an idol.',
    soundscapeDesc: 'Deep atmospheric air & cosmic space ambience (384 Hz Vishuddha)',
    frequencyHz: 384,
    attributes: {
      tanmatra: 'Shabda (sound)',
      sense: 'Ears (hearing)',
      organ: 'Mouth (speech)',
      action: 'Speaking',
      chakra: 'Vishuddha (throat)',
      bija: 'HAM',
      dosha: 'Vata (with Air)',
      shape: 'Indigo circle / dot',
      quality: 'Subtle, vast, clear, light',
      state: 'Field / vacuum',
    },
    images: [
      {
        src: '/assets/space-1-DB85Fm9N.jpg',
        alt: 'Violet nebula and spiral galaxy in deep space',
        caption: 'Deep space — Akasha as the boundless field.',
      },
      {
        src: '/assets/space-2-tlIdKORL.jpg',
        alt: 'Jantar Mantar astronomical instruments beneath the Milky Way',
        caption: 'Jantar Mantar, Jaipur — Indian astronomy measuring the sky.',
      },
      {
        src: '/assets/earth-2-CzUFAorp.jpg',
        alt: 'Temple courtyard with open sky above',
        caption: 'The open courtyard (Brahmasthana) — space at the centre of design.',
      },
    ],
    sections: [
      {
        title: 'Introduction',
        body: [
          'Akasha, often translated as Space or Ether, is the first of the five elements to emerge and the most subtle. It is not empty nothingness but the container and medium within which the other four exist. In the body it is the hollow spaces — mouth, lungs, digestive tract, the space between cells.',
          'Akasha is the element of possibility: without room, nothing could move, change or grow.',
        ],
      },
      {
        title: 'Meaning & Etymology',
        body: [
          "Akasha comes from a + kash, 'to shine' or 'to be visible', suggesting 'that which shines everywhere'. Other names are Vyoma, Kha, Ambara and Nabhas (sky). In Western writing it is often rendered as 'ether', after the Greek aither, though the concepts differ.",
        ],
      },
      {
        title: 'Vedic and Upanishadic Traditions',
        body: [
          "The Taittiriya Upanishad states: 'From the Self arose Space' — Akasha is the first emanation. The Chandogya Upanishad (1.9) declares that all beings arise from and return to Akasha, and later speaks of the 'space within the heart' (daharakasha) that contains the whole universe.",
        ],
        more: "The Chandogya teaching of daharakasha — 'as vast as this outer space is, so vast is the space within the heart' — became a key meditation in Vedanta, linking cosmic space to inner awareness.",
      },
      {
        title: 'Pancha Mahabhuta Philosophy',
        body: [
          'Space arises from shabda tanmatra, the subtle essence of sound. It carries only one quality: sound. The ear is its organ. Because sound needs a medium, Indian philosophers inferred Akasha as the substratum of sound.',
        ],
      },
      {
        title: 'Related Natural Sciences',
        body: [
          "Modern physics replaced the 19th-century 'luminiferous ether' with the theory of relativity, where space-time is a dynamic fabric. Quantum field theory describes the vacuum as full of fluctuating fields. Note that physics shows sound cannot travel through a vacuum — an important difference from the classical view of Akasha.",
        ],
      },
      {
        title: 'Different Philosophical Schools',
        body: [
          'Nyaya-Vaisheshika treats Akasha as one, eternal and all-pervading, inferred from sound. Some Buddhist schools classify space (akasha) as an unconditioned phenomenon. Jainism distinguishes lokakasha, the space of the inhabited universe, from alokakasha, empty space beyond it.',
        ],
      },
      {
        title: 'Akasha in Ayurveda',
        body: [
          'Space combines with Air to form Vata. It provides room for movement and is linked to the channels (srotas) of the body. Fasting and light food are said to increase Space qualities; Ayurvedic texts warn that excess emptiness can produce feelings of isolation or ungroundedness.',
        ],
      },
      {
        title: 'Tantra, Yoga & Traditional Practices',
        body: [
          'Akasha governs Vishuddha, the throat chakra, shown as an indigo circle with the syllable HAM. Mantra chanting, especially Om, is linked to Space through sound. Akasha mudra (middle finger to thumb) and meditation on the sky are traditional practices.',
        ],
      },
      {
        title: 'Architecture & Culture',
        body: [
          'Vastu Purusha Mandala places the Brahmasthana — an open central space — at the heart of the plan. Temple halls, courtyard houses and the empty sanctum at Chidambaram express Akasha. Indian classical music theory begins with nada, primordial sound, tied to Space.',
        ],
      },
      {
        title: 'Modern Interpretations',
        body: [
          "Akasha is sometimes compared to space-time or quantum fields, and popular writers speak of 'Akashic records'. Such comparisons are evocative but speculative; the Upanishadic Akasha is a philosophical principle, not a physical theory.",
        ],
      },
      {
        title: 'Advantages, Limitations & Benefits',
        body: [
          'The Space principle encourages openness, silence and room for reflection in a crowded world. Its limitation lies in over-stretched modern analogies. Studied carefully, it offers a rich philosophy of how emptiness makes form possible.',
        ],
      },
      {
        title: 'Conclusion',
        body: [
          'Akasha is the beginning and the end of the five elements — the space from which all arise and into which all dissolve. It invites us to see openness not as absence but as potential.',
        ],
      },
    ],
    references: ELEMENT_References,
  },
];

export const getElementBySlug = (slug: string): ElementData | undefined =>
  ELEMENTS.find((e) => e.slug === slug);

export const DAILY_FACTS: string[] = ELEMENTS.map(
  (e) => `${e.english} (${e.sanskrit}): ${e.fact}`
).concat([
  'The order of creation in the Taittiriya Upanishad is Space → Air → Fire → Water → Earth.',
  'Each subsequent element carries the qualities of the earlier ones: Earth can be heard, touched, seen, tasted and smelled.',
  'The three Ayurvedic doshas are made of element pairs: Vata (Space + Air), Pitta (Fire + Water), Kapha (Water + Earth).',
  'The temples of Pancha Bhuta Sthalam in South India honour each element — Kanchipuram (Earth), Thiruvanaikaval (Water), Tiruvannamalai (Fire), Srikalahasti (Air) and Chidambaram (Space).',
]);

export const TOPICS: TopicData[] = [
  {
    slug: 'introduction',
    title: 'Introduction to Pancha Tatva',
    summary: 'What the five elements are, where the idea comes from, and why it still matters.',
    sections: [
      {
        title: 'What is Pancha Tatva?',
        body: "Pancha Tatva (पञ्च तत्त्व), 'five principles', is the Indian framework holding that all physical existence is composed of five elements: Prithvi (Earth), Apas (Water), Agni (Fire), Vayu (Air) and Akasha (Space). The same idea is called Panchamahabhuta, 'five great elements', in philosophical and medical texts.",
      },
      {
        title: 'Why are they important?',
        body: 'The five elements link cosmology, the human body, the senses, health, ritual and architecture into a single map. Each element corresponds to a sense, a sense organ, an organ of action and qualities that can be observed in nature and experience.',
      },
      {
        title: 'How are they connected?',
        body: "According to the Taittiriya Upanishad, the elements emerge in sequence — Space, Air, Fire, Water, Earth — with each later element containing the qualities of the earlier ones. They also combine: Ayurveda's three doshas are pairings of elements.",
      },
      {
        title: 'How can they be studied today?',
        body: 'Scholars approach Pancha Tatva through textual study (Sanskrit sources), history of science, comparative philosophy (Greek, Chinese and Indian element theories), and as a reflective lens in health, ecology and design — while distinguishing it from modern chemistry and physics.',
      },
    ],
  },
  {
    slug: 'vedic-literature',
    title: 'Pancha Tatva in Vedic Literature',
    summary: 'Hymns to Prithvi, Apah, Agni, Vayu and the sky in the Rig and Atharva Vedas.',
    sections: [
      {
        title: 'Elements as deities',
        body: 'In the Vedic hymns (c. 1500–1000 BCE) the elements appear as living powers: Agni the priestly fire, Vayu the swift wind, the Apah as healing mother-waters, Prithvi and Dyaus as Earth and Sky.',
      },
      {
        title: 'The Bhumi Sukta',
        body: "Atharva Veda 12.1 contains 63 verses in praise of the Earth, often cited as one of the oldest environmental hymns: 'The Earth is my mother; I am her son.'",
      },
      {
        title: 'The ritual of fire',
        body: 'The yajna places Agni at the centre: offerings made into fire are believed to be carried to the gods. Water, earth (the altar), air (the rising smoke) and space (the sky) all participate in the rite.',
      },
    ],
  },
  {
    slug: 'upanishads',
    title: 'Pancha Tatva in the Upanishads',
    summary: 'The first systematic account of how the five elements emerge from the Self.',
    sections: [
      {
        title: 'Taittiriya Upanishad 2.1',
        body: "'From this Self (Atman) arose space; from space, air; from air, fire; from fire, water; from water, earth; from earth, plants; from plants, food; from food, the human being.' This is the classical order of the five elements.",
      },
      {
        title: 'Chandogya Upanishad',
        body: "Chandogya 6.2–6.4 teaches the 'tripartition' (trivritkarana) of heat, water and food — an early theory of combination. Chapter 8 speaks of the inner space of the heart that contains the whole universe.",
      },
      {
        title: 'Prana and the elements',
        body: 'The Brihadaranyaka and Prashna Upanishads describe breath (prana) as the chief vital force and connect it with Vayu, laying the foundation for later yogic physiology.',
      },
    ],
  },
  {
    slug: 'mahabhuta',
    title: 'Pancha Mahabhuta Philosophy',
    summary: "Samkhya's elegant theory of tanmatras and the gross elements.",
    sections: [
      {
        title: "Samkhya's 25 tattvas",
        body: 'Samkhya enumerates 25 principles, from Purusha (consciousness) and Prakriti (nature) through intellect, ego and mind, to five tanmatras (subtle elements) and five mahabhutas (gross elements).',
      },
      {
        title: 'Tanmatras',
        body: 'Each gross element arises from a subtle essence: sound → Space, touch → Air, form → Fire, taste → Water, smell → Earth. Sense experience and matter are thus two faces of a single process.',
      },
      {
        title: 'Vaisheshika atomism',
        body: "The Vaisheshika school argued that Earth, Water, Fire and Air exist as eternal atoms (paramanu), while Akasha is a single, all-pervading substance — one of the world's earliest atomic theories.",
      },
    ],
  },
  {
    slug: 'ayurveda',
    title: 'Pancha Tatva in Ayurveda',
    summary: 'How the five elements form the three doshas and guide diet and health.',
    sections: [
      {
        title: 'The body as five elements',
        body: 'Charaka and Sushruta state that the human body, like everything else, is made of the Panchamahabhutas. Bones are Earth, blood is Water, digestion is Fire, breath is Air, and channels are Space.',
      },
      {
        title: 'The three doshas',
        body: 'Vata = Space + Air (movement); Pitta = Fire + Water (transformation); Kapha = Water + Earth (structure). Balance among the doshas is equated with health.',
      },
      {
        title: 'Taste and the elements',
        body: 'The six tastes are elemental: sweet (Earth + Water), sour (Earth + Fire), salty (Water + Fire), pungent (Fire + Air), bitter (Air + Space), astringent (Air + Earth).',
      },
    ],
  },
  {
    slug: 'yoga-tantra',
    title: 'Pancha Tatva in Yoga and Tantra',
    summary: 'Chakras, bija mantras, mudras and the purification of the elements.',
    sections: [
      {
        title: 'The five lower chakras',
        body: 'Muladhara (Earth, LAM), Svadhisthana (Water, VAM), Manipura (Fire, RAM), Anahata (Air, YAM) and Vishuddha (Space, HAM) map the elements onto the subtle body along the spine.',
      },
      {
        title: 'Bhuta Shuddhi',
        body: "Tantric texts describe Bhuta Shuddhi, the ritual 'purification of the elements', in which the practitioner mentally dissolves each element into the next, from Earth back to Space, before worship.",
      },
      {
        title: 'Mudras',
        body: 'Hand gestures associate each finger with an element: thumb (Fire), index (Air), middle (Space), ring (Earth), little (Water). Joining them is said to balance the corresponding element.',
      },
    ],
  },
  {
    slug: 'architecture-culture',
    title: 'Pancha Tatva in Architecture and Culture',
    summary: 'Vastu Shastra, the Pancha Bhuta temples, festivals and daily rituals.',
    sections: [
      {
        title: 'Vastu Shastra',
        body: 'Vastu assigns each element a direction: Earth south-west, Water north-east, Fire south-east, Air north-west and Space the centre (Brahmasthana). Room placement follows this scheme.',
      },
      {
        title: 'Pancha Bhuta Sthalam',
        body: 'Five Shiva temples in South India each embody an element: Ekambareswarar, Kanchipuram (Earth); Jambukeswarar, Thiruvanaikaval (Water); Arunachaleswarar, Tiruvannamalai (Fire); Srikalahasti (Air); Nataraja, Chidambaram (Space).',
      },
      {
        title: 'Daily life',
        body: "A single aarti uses all five: the lamp (Fire), water (Water), flowers and ground (Earth), incense and the waving of the lamp (Air), and the bell's sound (Space).",
      },
    ],
  },
  {
    slug: 'modern-science',
    title: 'Modern Scientific Interpretations',
    summary: 'Comparisons with states of matter, energy and space-time — and their limits.',
    sections: [
      {
        title: 'States of matter',
        body: 'A common teaching analogy maps Earth → solid, Water → liquid, Fire → energy/plasma, Air → gas, Space → the field in which matter exists. It is useful pedagogically but not a literal equivalence.',
      },
      {
        title: 'Ecology',
        body: 'Soil, water, energy, atmosphere and space are the very domains studied by environmental science. The five-element lens can frame holistic thinking about pollution, climate and sustainability.',
      },
      {
        title: 'Cautions',
        body: 'The 118 chemical elements are not related to the five tattvas. Claims that ancient texts anticipated quantum physics should be treated critically. Pancha Tatva is best understood as philosophy and phenomenology of experience.',
      },
    ],
  },
  {
    slug: 'applications',
    title: 'Advantages, Limitations and Applications',
    summary: 'A balanced evaluation of the five-element framework.',
    sections: [
      {
        title: 'Advantages',
        body: 'Holistic and memorable; links body, mind and environment; encourages ecological reverence; provides a shared vocabulary for health, art and design across Indian culture.',
      },
      {
        title: 'Limitations',
        body: 'Not experimentally predictive; varied and sometimes contradictory interpretations across schools; risk of pseudoscientific claims when mixed carelessly with modern science.',
      },
      {
        title: 'Applications',
        body: 'Ayurvedic lifestyle guidance, yoga practice, Vastu-inspired sustainable architecture, environmental education, classical dance and music aesthetics, and comparative philosophy research.',
      },
    ],
  },
];

export const getTopicBySlug = (slug: string): TopicData | undefined =>
  TOPICS.find((t) => t.slug === slug);

export const QUIZ_QUESTIONS = [
  {
    q: 'Which element is the first to emerge according to the Taittiriya Upanishad?',
    options: ['Earth', 'Fire', 'Space', 'Water'],
    answer: 2,
    explain: 'From the Self arose Space (Akasha), then Air, Fire, Water and Earth.',
  },
  {
    q: 'Which subtle essence (tanmatra) gives rise to Earth?',
    options: ['Sound', 'Smell', 'Taste', 'Touch'],
    answer: 1,
    explain: 'Earth arises from gandha tanmatra — smell.',
  },
  {
    q: 'Vata dosha is composed of which two elements?',
    options: ['Fire + Water', 'Water + Earth', 'Space + Air', 'Air + Fire'],
    answer: 2,
    explain: 'Vata = Space + Air, governing movement.',
  },
  {
    q: 'The first word of the Rig Veda refers to which element?',
    options: ['Agni', 'Vayu', 'Apas', 'Prithvi'],
    answer: 0,
    explain: "The Rig Veda opens with 'Agnim ile' — I praise Agni.",
  },
  {
    q: 'Which chakra is associated with the Air element?',
    options: ['Muladhara', 'Manipura', 'Anahata', 'Vishuddha'],
    answer: 2,
    explain: 'Anahata, the heart chakra, with bija YAM.',
  },
  {
    q: 'In Vastu Shastra, which direction belongs to Fire?',
    options: ['North-east', 'South-east', 'South-west', 'North-west'],
    answer: 1,
    explain: "The kitchen is placed in the south-east, Agni's direction.",
  },
  {
    q: 'Which sense organ corresponds to Space (Akasha)?',
    options: ['Eyes', 'Skin', 'Ears', 'Tongue'],
    answer: 2,
    explain: "Akasha's quality is sound, perceived by the ears.",
  },
  {
    q: 'Which temple is regarded as the Pancha Bhuta shrine of Space?',
    options: ['Srikalahasti', 'Chidambaram', 'Kanchipuram', 'Tiruvannamalai'],
    answer: 1,
    explain: 'The Nataraja temple at Chidambaram represents Akasha.',
  },
  {
    q: 'Pitta dosha is made of:',
    options: ['Fire + Water', 'Earth + Fire', 'Air + Space', 'Water + Earth'],
    answer: 0,
    explain: 'Pitta = Fire + Water, governing transformation.',
  },
  {
    q: 'Which philosophical school proposed eternal atoms (paramanu) of the elements?',
    options: ['Advaita', 'Vaisheshika', 'Mimamsa', 'Charvaka'],
    answer: 1,
    explain: 'Vaisheshika developed an early atomic theory.',
  },
];

export const ABOUT_SECTIONS: [string, string][] = [
  [
    'Research title',
    'Pancha Tatva: The Five Fundamental Elements of Existence — A Study Across Indian Philosophy, Ayurveda, Yoga, Architecture and Modern Science.',
  ],
  [
    'Objectives',
    'To document the classical concept of the five elements, trace it across textual traditions, examine its practical applications, and evaluate modern interpretations critically.',
  ],
  [
    'Methodology',
    'Qualitative textual analysis of primary Sanskrit sources in translation, review of secondary scholarship, and comparative evaluation against modern scientific understanding.',
  ],
  [
    'Scope & limitations',
    'The project is introductory and interdisciplinary. Sanskrit sources are consulted in translation, and scientific comparisons are presented as analogies rather than equivalences.',
  ],
  [
    'Conclusion',
    'Pancha Tatva offers a coherent, holistic vocabulary linking body, senses and cosmos. Its value today lies in reflection, health, culture and ecological awareness rather than in physical prediction.',
  ],
];

export const PRIMARY_SOURCES = [
  'Rig Veda — hymns 1.1 (Agni), 10.9 (Apah), 10.129 (Nasadiya Sukta).',
  'Atharva Veda 12.1 — Bhumi Sukta.',
  'Taittiriya Upanishad 2.1.1.',
  'Chandogya Upanishad 1.9, 6.2–6.4, 8.1.',
  'Brihadaranyaka Upanishad 6.1 — the contest of the vital breaths.',
  'Ishvarakrishna, Samkhya Karika.',
  'Kanada, Vaisheshika Sutra.',
  'Patanjali, Yoga Sutra 2.49–2.53 (pranayama).',
  'Charaka Samhita; Sushruta Samhita.',
  'Mayamata and Manasara (Vastu treatises).',
];

export const SECONDARY_SCHOLARSHIP = [
  'Dasgupta, S. (1922). A History of Indian Philosophy, Vol. I. Cambridge University Press.',
  'Radhakrishnan, S. (1953). The Principal Upanishads. George Allen & Unwin.',
  'Larson, G. J. (1979). Classical Samkhya. Motilal Banarsidass.',
  'Lad, V. (2002). Textbook of Ayurveda, Vol. 1. The Ayurvedic Press.',
  'Frawley, D. (2000). Ayurvedic Healing. Lotus Press.',
  'Avalon, A. (1919). The Serpent Power. Luzac & Co.',
  'Kramrisch, S. (1946). The Hindu Temple. University of Calcutta.',
  'Zarrilli, P. & others — studies on breath and bodily practice in South Asia.',
];
