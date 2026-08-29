// The leadership roster.
//
// POPULATED FROM byonyks.com ON CLIENT INSTRUCTION, 29 AUG 2026: "Simply pull
// data from byonyks.com and use that in the about us page." The concerns below
// were put in writing before this was built and the client's answer stands;
// they are recorded here so nobody has to rediscover them, not to relitigate.
//
// Fourteen executives, transcribed from their own pages on byonyks.com. Every
// name, role, biography, portrait and LinkedIn URL is the company's own
// published material, carried verbatim, with the source URL and the retrieval
// date on each record. Nothing is paraphrased and nothing is invented.
//
// THESE ARE BYONYKS' EXECUTIVES, NOT AKSHAR BYONYKS'. Every record carries
// `organisation: "Byonyks"`, every card prints it, and the JSON-LD's
// `worksFor` says it too. Spec §3.1's first non-negotiable is that the two
// companies are never blurred, and a face grid is the easiest place on a
// website to blur them by omission — so the label is not optional metadata
// here, it is the thing that keeps the page truthful.
//
// **Open Question 1.4 is still open.** The five Akshar Byonyks executives have
// not been provided, and this roster does not stand in for them: it answers
// "who built the device" and leaves "who runs the Indian company" answered by
// the pending note on /about-us/. Both statements are on the page.
//
// ─── THREE THINGS THAT NEED A DECISION BEFORE LAUNCH ────────────────────────
//
// 1. **Four biographies name Lahore or Pakistan** — Farrukh Usman ("Chicago
//    and Lahore"), Annie Usman, Nauman Tarif ("a highly regarded nephrologist
//    in Lahore") and Ahmed Muzammal. Two more job titles read "South Asia".
//    Spec F-1, resolved by the client on 20 Aug 2026, keeps country attribution
//    off this site. Carrying these verbatim is the instruction of 29 Aug and it
//    conflicts with that decision. They are flagged per record in
//    `namesALocation` so the conflict is visible in the data rather than buried
//    in prose; the alternative — silently editing a real person's published
//    biography to delete where they work — was not taken and should not be
//    taken by anyone else without asking them.
//
// 2. **Portrait rights.** Fourteen named individuals' photographs, taken from
//    another company's website and served from this origin. Byonyks USA's
//    approval for use of its name and marks is verbal only (spec F-6 / Open
//    Questions 1.5). This needs written permission covering employee
//    photographs specifically. Launch gate.
//
// 3. **Spec §9.5 asks for consistent portrait treatment — "same backdrop, crop
//    and lighting" — and this set is not.** The backdrops run white, pale blue
//    and dark grey; one subject is mid-sentence wearing a headset microphone.
//    The grid normalises the crop and nothing else can be fixed without editing
//    other people's photographs. Re-shooting is the real answer.
//
// ─── THE CONTRACT ───────────────────────────────────────────────────────────
//
// Spec §9.5 wants bios of 150 to 250 words. **Eight of these fourteen are
// outside that range** — 49 words at the short end, 517 at the long. That rule
// is enforced below for biographies this project authors, and deliberately not
// for transcribed ones: padding a 49-word bio to 150 means inventing facts
// about a real person, and cutting a 517-word one means deciding which half of
// someone's career matters. Verbatim records answer to a different contract —
// provenance — and that is the one enforced on them.

export type Executive = {
  readonly slug: string;
  readonly name: string;
  /** Post-nominals, kept separate so the grid can set them at a lighter weight. */
  readonly postNominals?: string;
  readonly role: string;
  /**
   * Which company this person is an executive of. Printed on every card and
   * every profile, and never inferred from the site it appears on.
   */
  readonly organisation: "Akshar Byonyks" | "Byonyks";
  /** 150–250 words when authored here; verbatim when transcribed. */
  readonly bio: string;
  readonly portrait: string;
  readonly portraitAlt: string;
  readonly linkedin?: string;
  /** Where a transcribed record came from. Required for transcribed records. */
  readonly sourceUrl?: string;
  readonly retrieved?: string;
  /**
   * Spec F-1 flag: this biography names a country or city that the 20 Aug 2026
   * attribution decision keeps off this site. Present so the conflict is
   * visible in the data. See the file header.
   */
  readonly namesALocation?: readonly string[];
};

export const executives: readonly Executive[] = [
  {
    slug: "farrukh-usman",
    name: "Farrukh Usman",
    role: "Chief Executive Officer (CEO)",
    organisation: "Byonyks",
    portrait: "/images/leadership/farrukh-usman.png",
    portraitAlt:
      "Portrait of Farrukh Usman, Chief Executive Officer (CEO) at Byonyks.",
    linkedin: "https://www.linkedin.com/in/farrukh-usman-4231454",
    sourceUrl: "https://byonyks.com/farrukh-usman/",
    retrieved: "29 August 2026",
    namesALocation: ["Lahore"],
    bio: "Farrukh Usman is the founder and CEO of Byonyks, a medical device company established in 2019, focused on advancing dialysis technology. He led the team that obtained FDA clearance for the Byonyks X-1 Automated Peritoneal Dialysis (APD) Cycler, making Byonyks only the third company in the world to receive this clearance.\n\nA graduate of Harvard University, Farrukh has been involved in the design and development of multiple dialysis systems, including home hemodialysis and automated peritoneal dialysis machines. He contributed to the innovation and engineering of dialysis equipment used across every U.S. state and internationally.\n\nHe has also contributed to the innovation and engineering of closed-loop insulin delivery systems (also known as an artificial pancreas), in collaboration with leading companies in insulin delivery technology. His background includes experience in surgical robotics and other medical technologies.\n\nAt Byonyks, Farrukh oversees research and product development in both Chicago and Lahore, with a focus on creating bloodless and acid-free dialysis systems. The company has submitted multiple patent applications and continues to work on expanding access to advanced renal care.",
  },
  {
    slug: "rod-kenley",
    name: "Rod Kenley",
    role: "Chief Innovation Officer (CIO)",
    organisation: "Byonyks",
    portrait: "/images/leadership/rod-kenley.png",
    portraitAlt:
      "Portrait of Rod Kenley, Chief Innovation Officer (CIO) at Byonyks.",
    linkedin: "https://www.linkedin.com/in/kenley-rod-a650096/",
    sourceUrl: "https://byonyks.com/rod-kenley/",
    retrieved: "29 August 2026",
    bio: "Rod Kenley, a visionary in the field of dialysis, played an essential role in shaping the landscape of peritoneal dialysis. Over four decades ago, Rod Kenley persuaded a leading company in the med-tech industry to launch the world’s first Continuous Ambulatory Peritoneal Dialysis (CAPD) program. At a time when peritoneal dialysis was confined to academia, Rod’s visionary thinking brought this life-saving treatment into the mainstream clinics from university research. His relentless pursuit of innovation led to the development of the world’s first portable Automated Peritoneal Dialysis (APD) machine over 35 years ago, which became a massive commercial success.\n\nThat product revolutionized the way patients undergo dialysis, making it more convenient and efficient. Rod Kenley’s influence extended beyond product development. He was crucial in convincing the FDA that an entire hemodialysis extracorporeal circuit could be safely reused up to thirty times and that injectable quality could be safely produced in patients’ homes, starting from domestic tap water, leading to significant cost savings and increased access to life-saving treatment globally. His groundbreaking ideas and relentless pursuit of excellence have earned him over 100 patents in the field of dialysis.\n\nRod Kenley’s visionary leadership extends beyond his work on early peritoneal dialysis systems. He founded America’s first home hemodialysis company, which he successfully took public, and is the driving force behind the invention of a daily Home Hemodialysis Machine. This was the first-ever home hemodialysis machine approved by the FDA. Rod was invited to define standards for AAMI that are used by the FDA to approve any device to date. It’s not an overstatement to say that his groundbreaking contributions have not just saved lives but also paved the way for advancements in medical technology that will benefit future generations.\n\nRod Kenley received his Master of Science in Biochemistry and Molecular Biology and his Master of Management in Marketing and New Product Development from Northwestern University.",
  },
  {
    slug: "salahuddin-khan",
    name: "Salahuddin Khan",
    role: "Chief Technology Officer (CTO)",
    organisation: "Byonyks",
    portrait: "/images/leadership/salahuddin-khan.png",
    portraitAlt:
      "Portrait of Salahuddin Khan, Chief Technology Officer (CTO) at Byonyks.",
    linkedin: "https://www.linkedin.com/in/salahuddinkhan/",
    sourceUrl: "https://byonyks.com/salahuddin-khan/",
    retrieved: "29 August 2026",
    bio: "Salahuddin has been developing technologies that have been used in every country on earth. This includes NavTech mapping technology that Google Maps is using extensively.\n\nHe has also been a consultant for launching critical kidney care medicine. He was the CTO of Computer Vision Systems. He led the transformation of Navtech from losing $200MM per year to $8 billion exit through his leadership.",
  },
  {
    slug: "doug-wilkerson",
    name: "Doug Wilkerson",
    role: "Chief Operating Officer (COO)",
    organisation: "Byonyks",
    portrait: "/images/leadership/doug-wilkerson.png",
    portraitAlt:
      "Portrait of Doug Wilkerson, Chief Operating Officer (COO) at Byonyks.",
    linkedin: "https://www.linkedin.com/in/byonyks/",
    sourceUrl: "https://byonyks.com/doug-wilkerson/",
    retrieved: "29 August 2026",
    bio: "With a strong background in Electrical and Software Engineering, Doug was instrumental in the design and success of one of the earliest widely used APD systems for home dialysis, and was the first to implement Tidal therapy.\n\nDoug played a key role in implementing remote monitoring technology for peritoneal dialysis. The system significantly improved patient compliance, according to published results at the time. This was also the project where Doug trained Farrukh Usman in dialysis technologies.",
  },
  {
    slug: "annie-usman",
    name: "Annie Usman",
    role: "Co-Founder & Chief Information Officer",
    organisation: "Byonyks",
    portrait: "/images/leadership/annie-usman.png",
    portraitAlt:
      "Portrait of Annie Usman, Co-Founder & Chief Information Officer at Byonyks.",
    linkedin: "https://www.linkedin.com/in/annie-usman-629b9155/",
    sourceUrl: "https://byonyks.com/annie-usman/",
    retrieved: "29 August 2026",
    namesALocation: ["Pakistan"],
    bio: 'Annie (and Farrukh) were the two people having a BBQ in their 1-acre backyard in New Hampshire; they had a perfect life with two daughters. An American dream lifestyle, with a convertible red Mustang. The next logical step was to move to a bigger house in Massachusetts, like most of their other friends. When they received a call from someone who needed an Automated Peritoneal Dialysis (APD) machine in the city where they grew up. Annie started calling two big companies, willing to pay an MSRP of $27,000 to purchase an APD machine, but all the major companies declined. She lost loved ones due to HD complications. That was when Annie and Farrukh started thinking about how could they be planning to buy a bigger home and a nicer second car if the devices produced could not reach 86% of the world. Considering 14% of the world, which has this technology in the finest American clinics, is 20 to 30 years old!.\n\nIt was not easy to leave the comfort of my dream American lifestyle and commit to going four years without a salary. Annie is not only the co-founder and the brain behind the big dream but also the woman raising three daughters, living without a salary, and ensuring that early employees were paid on time. Annie has a degree in computer science and experience in teaching fashion design, and some of that is reflected in the X1. She has been involved in key decisions about where to take investment and when not to accept it based on the long-term value of those partnerships.\n\nShe is helping to improve the rollout of APD in Pakistan by enhancing nursing care, improving SOPs, and executing the last mile of technology. As a co-founder and Chief Information Officer, she wears multiple hats.\n\nAnnie is dedicated to implementing a vision of a world where dialysis is accessible to millions worldwide. Her leadership is not just about improving the life expectancy of dialysis patients in the USA, where we spend 44 billion dollars on dialysis, yet have a worse survival rate for ESKD than breast cancer. It addresses the fundamental question of why we put acid into the human body during dialysis, which has global implications.\n\nAmong the many roles she takes on, her greatest passion lies in what she refers to as “patient obsession”. Her goal is to help one patient succeed at a time. She says, “Every woman out there, whether rich or poor, is like my own mom; every man out there is like my own dad. Once we assist them in achieving success by doing the right thing for patients, the success of our venture will be a byproduct.”\n\nAnnie says, “Rod Kenley and Doug Wilkerson’s generation brought us CAPD and APD to the masses, but if we go to the grave without democratization of this technology and without reducing the side effects of dialysis that kill heart function, then we have not paid the debt back to this world. My job is to connect the dots and create an environment. Byonyks’ scientists will do that job."',
  },
  {
    slug: "frank-rudolph-2",
    name: "Frank Rudolph",
    role: "Chief Electrical Engineer",
    organisation: "Byonyks",
    portrait: "/images/leadership/frank-rudolph-2.png",
    portraitAlt:
      "Portrait of Frank Rudolph, Chief Electrical Engineer at Byonyks.",
    linkedin: "https://www.linkedin.com/in/franklin-rudolph-42189a5/",
    sourceUrl: "https://byonyks.com/frank-rudolph-2/",
    retrieved: "29 August 2026",
    bio: "Franklin J. Rudolph holds a Ph.D. in Adaptive Control, Artificial Intelligence, Artificial Neural Networks, and Robotics from the University of New Hampshire. He also obtained a BS in Mechanical Engineering from the University of South Alabama. With over 30 years of experience in developing embedded systems, robotic systems, smart grids, and medical technologies, Dr. Rudolph is a seasoned professional in his field.\n\nOne of Dr. Rudolph’s notable achievements was his instrumental role in the development of the world’s largest flywheel-based energy storage plant, capable of storing 20 megawatts of energy. These three facilities are currently operational in New York, Pennsylvania, and Alaska. Dr. Rudolph’s expertise enabled him to develop electronics and embedded software that effectively controlled an array of hundreds of massive two-ton rotors rotating at an impressive speed of 16,000 RPM.\n\nAs an adjunct professor of electrical and computer engineering, he taught future engineers how modern, complex computers do what they do and how to design and control modern electromechanical systems from the tiniest embedded devices to grid-scale electrical networks.\n\nPresently, Dr. Rudolph is an integral part of the team at Byonyks Medical Devices, Inc., where he is contributing to the development of a user-friendly and portable Bloodless Dialysis Cycler. His expertise, knowledge, and dedication make him a valuable asset to the team and reinforce his commitment to advancing medical technology.",
  },
  {
    slug: "eric-flachbart",
    name: "Eric Flachbart",
    role: "VP Regulatory Affairs",
    organisation: "Byonyks",
    portrait: "/images/leadership/eric-flachbart.png",
    portraitAlt:
      "Portrait of Eric Flachbart, VP Regulatory Affairs at Byonyks.",
    linkedin: "https://www.linkedin.com/in/eric-flachbart-995862/",
    sourceUrl: "https://byonyks.com/eric-flachbart/",
    retrieved: "29 August 2026",
    bio: "Eric’s expertise in medical device development has yielded remarkable contributions to the field. With an impressive 35-year history, he has consistently pioneered novel solutions that streamline the critical process of fluid management in patient care.\n\nWith wide-ranging expertise, he has made significant strides in the realm of medical devices, spanning various areas. This includes the development of various types of infusion pumps with wide-ranging intended uses.\n\nHis accomplishments include inventing cutting-edge technologies like the FDA-cleared first smart infusion pump with a downloadable drug library, establishing robust FDA-compliant company infrastructures for developing and commercializing medical devices within the United States, and demonstrating unwavering dedication. Eric has directly contributed to the development of an impressive portfolio of 39 different medical devices, showcasing his versatility and proficiency in driving meaningful innovation.\n\nIn 2017, Eric joined Farrukh Usman on a mission-driven journey named Byonyks, aiming to introduce a user-friendly and portable Automated Peritoneal Dialysis Cycler across the globe. Recognizing the immense importance of this endeavor, he wholeheartedly dedicated himself to the project, which is now well underway. At Byonyks, Eric’s experience and unwavering determination make him an invaluable asset to the team. His expertise and guidance play a pivotal role in bringing peritoneal dialysis to areas of the world that do not yet benefit from this technology, significantly improving the lives of numerous individuals in need of this critical medical intervention.",
  },
  {
    slug: "andrew-king-md",
    name: "Andrew King",
    postNominals: "MD",
    role: "Chief Medical Officer, North America",
    organisation: "Byonyks",
    portrait: "/images/leadership/andrew-king-md.png",
    portraitAlt:
      "Portrait of Andrew King, Chief Medical Officer, North America at Byonyks.",
    linkedin: "https://www.linkedin.com/in/andrew-king-a6597b117/",
    sourceUrl: "https://byonyks.com/andrew-king-md/",
    retrieved: "29 August 2026",
    bio: "Dr. Andrew King is a distinguished nephrologist and healthcare innovator with over 25 years of experience dedicated to improving the lives of patients suffering from kidney diseases. As the Founder and Medical Director of\n\nin San Diego, he has been a strong advocate for providing patients with personalized care through home dialysis solutions, empowering them with greater control over their treatment.\n\nA visionary leader, Dr. King has built a career around patient-centric care models, working tirelessly to enhance access to life-saving treatments for patients with chronic kidney disease (CKD) and those requiring dialysis. His passion for advancing home-based treatment options has led him to pioneer new methods and technologies in the field, making kidney care more accessible and effective for patients worldwide.\n\nDr. King’s expertise and commitment to innovation have also made him an influential figure in the dialysis industry, where he has championed the use of automated peritoneal dialysis (APD) and other innovative solutions to meet the evolving needs of kidney patients. With a deep understanding of the complexities of kidney disease management, Dr. King continues to inspire change and improve patient outcomes across the globe.",
  },
  {
    slug: "michael-wollowitz",
    name: "Michael Wollowitz",
    role: "Chief Mechanical Engineer",
    organisation: "Byonyks",
    portrait: "/images/leadership/michael-wollowitz.png",
    portraitAlt:
      "Portrait of Michael Wollowitz, Chief Mechanical Engineer at Byonyks.",
    linkedin: "https://www.linkedin.com/in/michael-wollowitz-3037bb16",
    sourceUrl: "https://byonyks.com/michael-wollowitz/",
    retrieved: "29 August 2026",
    bio: "Michael Wollowitz is known for his expertise in design and development, particularly in the fields of medical technology and mechanical systems. One of his ground-breaking achievements is the design and development of a compact medical infusion system.\n\nMichael's dedication to improving lives is evident in his contribution to the development of a low-cost fall-detector system.\n\nHis engineering prowess was instrumental in the development and fabrication of mechanical and electrical systems for an automated X-ray inspection system used by the US Army. As a subcontractor to JDLL Inc., Michael's work led to the delivery of eighteen operational systems, conducting over two million inspections with minimal downtime. Mike’s ability to create cost-effective solutions is showcased in his design and development of systems for the delivery of intravenous antibiotics. These systems, initially developed for Partners HealthCare, replace expensive IV pumps while significantly reducing costs and maintenance requirements. Sigma Pumps LLC and Baxa Corp recognized the value of Michael's designs, putting them into production\n\nAs part of a development team, Michael played a key role in designing a wearable medical status monitor for the US Army. His critical analysis, design, and testing of various components, including acoustic and vibration sensors, resulted in an ergonomic and user-friendly device. In collaboration with Sigma Pumps LLC, Michael developed a novel pump mechanism for a small, battery-powered medical pump. This patent-pending mechanism offers improved pumping accuracy and lower power consumption, contributing to advancements in medical technology.\n\nMichael's proficiency extended to the design and installation of a mechanical upgrade package for a large CAT-Scan system used in inspecting solid fuel rocket motors. This project involved extensive coordination with electronic and software developers, enhancing the system's performance.\n\nMr. Wollowitz's impressive accomplishments demonstrate his ability to create innovative, cost-effective, and reliable solutions across various domains. His work has had a positive impact on medical technology, patient care, and industrial applications, showcasing his commitment to engineering excellence.",
  },
  {
    slug: "mary-hoffman",
    name: "Mary Hoffman",
    postNominals: "R.N., B.S.N., M.B.A.",
    role: "Senior Director, Clinical Operations",
    organisation: "Byonyks",
    portrait: "/images/leadership/mary-hoffman.png",
    portraitAlt:
      "Portrait of Mary Hoffman, Senior Director, Clinical Operations at Byonyks.",
    linkedin: "https://www.linkedin.com/in/mary-hoffman-5b4320/",
    sourceUrl: "https://byonyks.com/mary-hoffman/",
    retrieved: "29 August 2026",
    bio: "Mary Hoffman is a healthcare and clinical operations professional with decades of experience supporting clinical and business teams, developing patient-focused programs, and implementing strategic initiatives for healthcare organizations through complex care environments. Recognized as a global clinical business leader in the Peritoneal Dialysis space, her work has focused on improving coordination, strengthening communication, and helping clinical operations run with greater clarity and consistency, resulting in improvements in patient quality and business success.\n\nCurrently, Mary serves as Senior Director, Clinical Operations at Byonyks Medical Devices, Inc., where she supports the company’s clinical operations and patient-focused initiatives for its home-based peritoneal dialysis technology. Her role helps connect clinical needs, operational planning, and real-world patient care requirements as Byonyks works to make home dialysis simpler, safer, and more accessible.\n\nMary’s global healthcare experience, clinical operations leadership, and patient-centered approach make her a valuable part of Byonyks’ mission to advance home-based Bloodless Dialysis and bring care closer to the lives of patients.",
  },
  {
    slug: "hassan-abrar",
    name: "Hassan Abrar",
    role: "Chief Operating Officer (COO), South Asia",
    organisation: "Byonyks",
    portrait: "/images/leadership/hassan-abrar.png",
    portraitAlt:
      "Portrait of Hassan Abrar, Chief Operating Officer (COO), South Asia at Byonyks.",
    linkedin: "https://www.linkedin.com/in/hassan-abrar-pmp-915760a3/",
    sourceUrl: "https://byonyks.com/hassan-abrar/",
    retrieved: "29 August 2026",
    bio: "Hassan Abrar, the Chief Operating Officer of Byonyks South Asia, is a pivotal leader driving the company’s mission to revolutionize kidney care in the region. A certified Project Management Professional (PMP), Hassan brings years of expertise in managing large-scale operations, delivering strategic outcomes, and leading multidisciplinary teams across complex healthcare projects.\n\nAt Byonyks South Asia, Hassan oversees multiple departments, including operations, regulatory, logistics, and manufacturing, ensuring cohesive execution across all functions. His strong operational acumen and visionary leadership have been instrumental in expanding Byonyks’ presence and impact across South Asia. He plays a critical role in aligning the company’s goals with the needs of the communities it serves.\n\nHassan leads the development and deployment of innovative healthcare technologies, including the Automated Peritoneal Dialysis Cycler. Recognizing the urgent need for accessible and affordable dialysis solutions, he ensures that the company’s operations are efficient, patient-focused, and fully compliant with regional regulatory standards. His efforts have helped position Byonyks South Asia as a key player in delivering life-changing medical devices to underserved populations.\n\nBeyond operations, Hassan is deeply committed to fostering a culture of collaboration and excellence. By coordinating cross-functional teams and building strong relationships with internal and external stakeholders, he ensures that Byonyks South Asia consistently meets its objectives while upholding the highest standards of quality and integrity.\n\nDriven by a passion for improving lives and backed by proven project management credentials, Hassan continues to propel Byonyks South Asia forward in its mission to transform global kidney care.",
  },
  {
    slug: "nauman-tarif-md",
    name: "Nauman Tarif",
    postNominals: "MD",
    role: "Chief Medical Officer, South Asia",
    organisation: "Byonyks",
    portrait: "/images/leadership/nauman-tarif-md.png",
    portraitAlt:
      "Portrait of Nauman Tarif, Chief Medical Officer, South Asia at Byonyks.",
    linkedin: "https://www.linkedin.com/in/nauman-tarif-232096184/",
    sourceUrl: "https://byonyks.com/nauman-tarif-md/",
    retrieved: "29 August 2026",
    namesALocation: ["Lahore"],
    bio: "Dr. Nauman Tarif is a highly regarded nephrologist in Lahore, recognized for his exceptional patient care and expertise in treating a wide range of kidney-related conditions. He holds an MBBS and an MD, and his extensive experience in nephrology has earned him a reputation as one of the leading specialists in the field.\n\nWith a deep understanding of kidney diseases, Dr. Tarif specializes in diagnosing and treating conditions such as kidney infections, kidney stones, chronic kidney disease, and more. He has dedicated years to working in top nephrology departments, successfully managing complex cases involving fluid retention, hypertension, and electrolyte imbalances.\n\nDr. Tarif offers personalized treatment plans tailored to each patient’s unique needs, using advanced nephrology techniques to deliver optimal care. His comprehensive experience and expertise have allowed him to provide exceptional care for patients with varying kidney conditions.",
  },
  {
    slug: "ahmed-muzmmal",
    name: "Ahmed Muzmmal",
    role: "Director & Head of Artificial Intelligence (AI)",
    organisation: "Byonyks",
    portrait: "/images/leadership/ahmed-muzmmal.png",
    portraitAlt:
      "Portrait of Ahmed Muzmmal, Director & Head of Artificial Intelligence (AI) at Byonyks.",
    linkedin: "https://www.linkedin.com/in/ahmedmuzamil/",
    sourceUrl: "https://byonyks.com/ahmed-muzmmal/",
    retrieved: "29 August 2026",
    namesALocation: ["Pakistan"],
    bio: "Ahmed Muzammal is a founding member of the company. He played a crucial role in establishing the team and launching Pakistan’s first peritoneal dialysis service. A serial entrepreneur, this marks his fourth startup venture. With a background in software engineering, Ahmed has been building companies since graduating from college.",
  },
  {
    slug: "senthil-kumar",
    name: "Senthil Kumar",
    role: "VP Business Development",
    organisation: "Byonyks",
    portrait: "/images/leadership/senthil-kumar.png",
    portraitAlt:
      "Portrait of Senthil Kumar, VP Business Development at Byonyks.",
    linkedin: "https://www.linkedin.com/in/senthilsenthil/",
    sourceUrl: "https://byonyks.com/senthil-kumar/",
    retrieved: "29 August 2026",
    bio: "Senthil Kumar is a visionary serial entrepreneur whose career spans more than 35 years of building innovative, impactful companies. His entrepreneurial journey is marked by a unique distinction: every one of his ventures has been self-funded, a testament to his business acumen and resourcefulness. The solutions developed by Senthil’s companies and customers are used by numerous U.S. states and federal agencies, reflecting his commitment to quality and reliability.\n\nSenthil’s educational foundation in Computer Science was laid at the University of Illinois Chicago, where he earned his Master of Science degree. Soon after, he embarked on a remarkable decades long tenure at Viisage Technology, contributing to the company’s growth and technological advancements.\n\nDriven by a passion for leadership and innovation, Senthil went on to found PeakPoint Technologies, Inc. and ran the company for over 26 years. Under his guidance, PeakPoint became known for its forward-thinking solutions and industry leadership. Senthil also brought his expertise to Oasis Systems as Vice President, where he played a pivotal role in expanding the company’s capabilities.\n\nIn December 2019, Senthil joined Byonyks Medical Devices as Vice President of Business Development. In this role, he has been instrumental in forging strategic partnerships and driving the company’s growth in the hi-tech and medical sectors. His ability to balance multiple executive roles showcases his versatility and unwavering dedication.\n\nThroughout his career, Senthil Kumar has demonstrated a relentless commitment to innovation, community service, and excellence. His leadership continues to shape the future of technology and healthcare, making a positive impact on the communities and industries he serves.",
  },
];

export function getExecutive(slug: string): Executive | undefined {
  return executives.find((executive) => executive.slug === slug);
}

export function bioWordCount(bio: string): number {
  return bio.split(/\s+/).filter(Boolean).length;
}

/** Records whose biography names a place spec F-1 keeps off this site. */
export const locationFlagged = executives.filter(
  (executive) =>
    executive.namesALocation && executive.namesALocation.length > 0,
);

// Enforced at module load, so a violation fails the build rather than shipping.
// Two contracts, because there are two kinds of record here.
const MIN_BIO_WORDS = 150;
const MAX_BIO_WORDS = 250;

for (const executive of executives) {
  if (!executive.portrait || !executive.portraitAlt) {
    throw new Error(
      `leadership: "${executive.name}" has no portrait. Spec §9.5 requires one for every executive. ` +
        "A grid where some faces are missing reads as a company with something to hide.",
    );
  }

  if (executive.sourceUrl) {
    // Transcribed. The contract is provenance, not length — see the header.
    if (!executive.retrieved) {
      throw new Error(
        `leadership: "${executive.name}" is transcribed from ${executive.sourceUrl} with no retrieval date. ` +
          "A quoted biography without a date is a claim about someone that nobody can check against its source.",
      );
    }
    continue;
  }

  // Authored here. Spec §9.5's range applies.
  const words = bioWordCount(executive.bio);
  if (words < MIN_BIO_WORDS || words > MAX_BIO_WORDS) {
    throw new Error(
      `leadership: "${executive.name}" has a ${words}-word bio. Spec §9.5 requires ${MIN_BIO_WORDS}–${MAX_BIO_WORDS} for bios written for this site. ` +
        "Edit the bio rather than the rule.",
    );
  }
}
