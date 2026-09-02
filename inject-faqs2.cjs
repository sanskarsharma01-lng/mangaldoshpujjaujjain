
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "src/data/services.ts");
let content = fs.readFileSync(filePath, "utf8");

const faqsData = {
  "mangal-dosh-puja-ujjain": [
    { question: "How is Mangal Dosh Puja performed in Ujjain?", answer: "It is performed by experienced Vedic Pandits following traditional scriptural methods including Sankalp, Navgraha Pujan, Mangal Mantra Jaap, and Havan." },
    { question: "What is the duration of Mangal Dosh Puja?", answer: "The complete Mangal Dosh Puja usually takes about 2 to 3 hours depending on the specific rituals and package chosen." }
  ],
  "mangal-bhat-puja-ujjain": [
    { question: "Why is Bhat (rice) used in this puja?", answer: "According to local Ujjain tradition, offering cooked rice (Bhat) to the Shivalinga at Mangalnath Temple is considered a highly auspicious way to seek the blessings of Lord Mangal." },
    { question: "Can I do Mangal Bhat Puja online?", answer: "Yes, if you cannot visit Ujjain physically, our Pandits can perform the Mangal Bhat Puja on your behalf (Sankalp) and send you the video and Prasad." }
  ],
  "mangal-shanti-puja": [
    { question: "What is the difference between Mangal Shanti and Mangal Dosh Puja?", answer: "Mangal Shanti is a general pacification ritual for Lord Mangal, often performed for general well-being or specific transits, whereas Mangal Dosh Puja specifically addresses the Manglik dosh in a birth chart." },
    { question: "What items are required for Mangal Shanti?", answer: "All required puja samagri (red flowers, red cloth, masoor dal, etc.) are arranged by our Pandit Ji as part of the package." }
  ],
  "navgraha-shanti-puja": [
    { question: "What is Navgraha Shanti Puja?", answer: "It is a comprehensive Vedic ritual performed to seek the blessings and pacify the malefic effects of all nine planets (Navgraha) in one birth chart." },
    { question: "How long does Navgraha Shanti take?", answer: "Because it involves invoking and chanting mantras for all nine planets, it usually takes 3 to 4 hours to complete." }
  ],
  "rudrabhishek": [
    { question: "What is Rudrabhishek?", answer: "Rudrabhishek is a sacred ritual where Lord Shiva is worshipped in His Rudra form by offering a continuous stream of sacred liquids like milk, ghee, honey, and water while chanting Vedic mantras." },
    { question: "Why perform Rudrabhishek in Ujjain?", answer: "Ujjain is the city of Mahakal (Lord Shiva). Performing Rudrabhishek here is considered extraordinarily auspicious for overcoming obstacles and seeking health and prosperity." }
  ],
  "mahakaleshwar-puja-ujjain": [
    { question: "What is Mahakaleshwar Puja?", answer: "It is a special worship dedicated to Lord Mahakaleshwar, the presiding deity of Ujjain and one of the twelve Jyotirlingas, seeking His divine grace and protection." },
    { question: "Do you arrange VIP Darshan for Mahakaleshwar?", answer: "We arrange the traditional Puja rituals. Temple darshan protocols are managed by the temple committee, but we provide guidance to our yajmans on the process." }
  ],
  "mahamrityunjaya-jaap-ujjain": [
    { question: "What is the benefit of Mahamrityunjaya Jaap?", answer: "According to Vedic scriptures, chanting the Mahamrityunjaya Mantra creates a powerful protective shield that promotes physical healing, mental peace, and spiritual growth." },
    { question: "How many mantras are chanted?", answer: "The Jaap can be customized. A full anushthan involves 1.25 Lakh chants performed by a group of Pandits over several days, but smaller single-day versions are also available." }
  ],
  "baglamukhi-havan-ujjain": [
    { question: "Who is Maa Baglamukhi?", answer: "Maa Baglamukhi is one of the ten Mahavidyas in Hindu tradition, known for Her power to paralyze enemies, remove obstacles, and grant victory in legal or competitive matters." },
    { question: "What is a Baglamukhi Havan?", answer: "It is a specific fire ritual (Yagya) offering oblations while chanting Maa Baglamukhi secret mantras, traditionally performed using yellow materials like turmeric and yellow mustard." }
  ],
  "pitra-dosh-nivaran-puja": [
    { question: "What is Pitra Dosh?", answer: "Pitra Dosh is an astrological condition indicating ancestral displeasure or unfulfilled duties towards forefathers, which is traditionally believed to cause obstacles in family growth and harmony." },
    { question: "Where is Pitra Dosh Puja performed in Ujjain?", answer: "The primary locations for ancestral rituals in Ujjain are the Bherugarh area (Siddhavat) and Ramghat on the banks of the sacred Shipra river." }
  ],
  "batuk-bhairav-puja-ujjain": [
    { question: "Who is Batuk Bhairav?", answer: "Batuk Bhairav is the child form of Lord Kal Bhairav. He is worshipped as a protective deity who quickly responds to devotees prayers and removes sudden crises." },
    { question: "Why perform Batuk Bhairav Puja?", answer: "This puja is traditionally recommended for protection from hidden enemies, overcoming irrational fears, and ensuring safety during travels and new ventures." }
  ],
  "kaal-sarp-dosh-puja-ujjain": [
    { question: "What causes Kaal Sarp Dosh?", answer: "In Vedic astrology, it occurs when all seven major planets are placed between Rahu and Ketu in the birth chart. There are 12 different types of this dosh." },
    { question: "How is the Puja performed?", answer: "The ritual involves the worship of Lord Shiva, Rahu, and Ketu, followed by the symbolic offering (Daan) of silver or gold Nag-Nagin (serpents) in the river." }
  ]
};

// simpler approach: split by `slug: `
let blocks = content.split("slug: ");
for (let i = 1; i < blocks.length; i++) {
  let block = blocks[i];
  let slugMatch = block.match(/^.(.*?).,/);
  if (slugMatch) {
    let slug = slugMatch[1];
    if (faqsData[slug]) {
      // Find the end of the object before the next one or end of array
      // Because we split by slug, we just need to append to the end of this block
      // The block ends right before the next object or end of array
      // Actually `metaDescription:` is the last property.
      block = block.replace(/(metaDescription:\s*[\s\S]*?),?\s*(\},|\}\s*\])/, (match, p1, p2) => {
        const faqsStr = JSON.stringify(faqsData[slug], null, 4).replace(/\n/g, "\n    ");
        return p1 + ",\n    faqs: " + faqsStr + "\n  " + p2;
      });
      blocks[i] = block;
    }
  }
}
content = blocks.join("slug: ");

fs.writeFileSync(filePath, content, "utf8");
console.log("Injected FAQs into services.ts successfully via method 2.");
