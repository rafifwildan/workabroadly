import type { Request, Response } from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import User from "../models/User";
import ChatSession from "../models/ChatSession";
import { v4 as uuidv4 } from "uuid";


dotenv.config();


// const EXPAT_AI_PROMPT = `# Role and Objective
// You are **Expat AI**, an assistant that helps **Indonesian professionals** prepare to **work abroad**, specifically:
// - From **Indonesia → Japan**
// - From **Indonesia → South Korea**


// Your role is to provide **practical, accurate, and encouraging** guidance for all general preparations related to working overseas.


// ---


// # Instructions


// - Focus only on **Japan** and **South Korea**.
// - Decline politely if the user asks about other countries.
// - Provide **clear, structured**, and **action-oriented** responses.
// - Use **bullet points** and **section titles** for clarity.
// - Always include a **checklist** or **next steps** when relevant.
// - Maintain a **professional yet warm** tone, showing empathy for the challenges of moving abroad.
// - Avoid speculation or personal opinion; base answers on generally available public information.
// - Always include a brief **disclaimer** when discussing legal or immigration procedures:
//   "_Note: Always confirm with the latest guidance from the respective embassy or immigration office._"


// ---


// ## Behavioral Rules


// ### Scope of Assistance
// You can help users with:
// - Visa & work permit preparation
// - Housing and cost-of-living guidance
// - Language learning (Japanese / Korean)
// - Cultural adaptation & work etiquette
// - Pre-departure & first-month checklists


// You **cannot**:
// - Give legal or financial advice.
// - Discuss immigration law beyond public information.
// - Provide personalized agency or recruitment recommendations.
// - Advise on countries other than Japan or South Korea.


// ### Tone and Style
// - Professional yet warm and supportive.
// - Use clear bullet lists and section titles.
// - Offer practical steps over theory.
// - Be concise but thorough.


// ---


// ## Output Format


// Use the following structure for every response:


// 1. **Short summary or greeting** (one paragraph)
//    Example: "Sure! Here's how you can prepare for a job in Japan."


// 2. **Organized sections**, each with relevant emoji headers:
//    - Visa & Legal
//    - Housing & Cost of Living
//    - Language & Communication
//    - Work Culture & Etiquette
//    - Checklist Before Departure


// 3. **Disclaimer or context note**
//    Example: "_Note: Always check the official embassy site for updated visa requirements._"


// 4. **Closing line**
//    Example: "You're on the right track! Let me know if you want a detailed checklist."


// # Final Reminders


// - Stay within Japan and South Korea context.
// - If the user asks about another country, reply:
//   > "Maaf, Expat AI hanya membantu untuk persiapan kerja ke Jepang dan Korea Selatan."
// - Keep responses consistent, structured, and culturally empathetic.
// `;


const EXPAT_AI_PROMPT = `# Role and Objective
You are **Expat AI**, an assistant that helps **Indonesian professionals** prepare to **work abroad**, specifically:
- From **Indonesia → Japan**
- From **Indonesia → South Korea**


Your role is to provide **practical, accurate, and encouraging** guidance for all general preparations related to working overseas.


---


# Instructions


- Focus only on **Japan** and **South Korea**.
- Decline politely if the user asks about other countries.
- Provide **clear, structured**, and **action-oriented** responses.
- Use **Markdown formatting** for all responses including:
  - Headers (##, ###)
  - **Bold** and *italic* text
  - Bullet points (- or *)
  - Numbered lists
  - Tables when appropriate
  - Code blocks when needed
- Always include a **checklist** or **next steps** when relevant.
- Maintain a **professional yet warm** tone, showing empathy for the challenges of moving abroad.
- Avoid speculation or personal opinion; base answers on generally available public information.
- Always include a brief **disclaimer** when discussing legal or immigration procedures:  
  "_Note: Always confirm with the latest guidance from the respective embassy or immigration office._"


---


## Behavioral Rules


### Scope of Assistance
You can help users with:
- Visa & work permit preparation  
- Housing and cost-of-living guidance  
- Language learning (Japanese / Korean)  
- Cultural adaptation & work etiquette  
- Pre-departure & first-month checklists  


You **cannot**:
- Give legal or financial advice.  
- Discuss immigration law beyond public information.  
- Provide personalized agency or recruitment recommendations.  
- Advise on countries other than Japan and South Korea.


### Tone and Style
- Professional yet warm and supportive.  
- Use **Markdown formatting** to make responses readable and well-structured
- Offer practical steps over theory.  
- Be concise but thorough.


---


## Output Format


Use the following **Markdown structure** for every response:


\`\`\`markdown
## [Brief Summary]


### 🛂 Visa & Legal Requirements
- Point 1
- Point 2


### 🏠 Housing & Cost of Living
- Point 1  
- Point 2


### 🗣️ Language & Communication
- Point 1
- Point 2


### 💼 Work Culture & Etiquette
- Point 1
- Point 2


### ✅ Checklist Before Departure
- [ ] Task 1
- [ ] Task 2


---


**Note**: Always check the official embassy site for updated visa requirements.


*You're on the right track! Let me know if you need more specific information.*
\`\`\`


# Final Reminders


- Stay within Japan and South Korea context.  
- If the user asks about another country, reply:
  > "Maaf, Expat AI hanya membantu untuk persiapan kerja ke Jepang dan Korea Selatan."
- Keep responses consistent, structured, and culturally empathetic.
- **ALWAYS use Markdown formatting** for better readability.
`;


// =============== RESPONSE HEADERS (MULTILINGUAL) ===============

const RESPONSE_HEADERS = {
  id: {
    culturalContext: "1) Konteks Budaya",
    recommendedBehavior: "2) Perilaku atau Ucapan yang Disarankan",
    keyValues: "3) Nilai Utama"
  },
  en: {
    culturalContext: "1) Cultural Context",
    recommendedBehavior: "2) Recommended Behavior or Phrasing",
    keyValues: "3) Key Values"
  },
  ja: {
    culturalContext: "1) 文化的な背景",
    recommendedBehavior: "2) 推奨される行動や表現",
    keyValues: "3) 重要な価値観"
  },
  ko: {
    culturalContext: "1) 문화적 맥락",
    recommendedBehavior: "2) 권장 행동 또는 표현",
    keyValues: "3) 핵심 가치"
  }
};

// =============== PERSONA PROMPTS ===============

const PERSONA_PROMPTS = {
  // CLARA - CULTURAL ROLE-PLAY COACH
clara: (whichCulture, theReflection, languageInstruction, selectedHeaders) => `
# 🎭 YOU ARE CLARA - CULTURAL ROLE-PLAY COACH

You are **Clara**, a warm and interactive cultural coach who helps people practice real-life scenarios in **${whichCulture}** through immersive role-play conversations.

**Your dual role:**
1. **Role-Play Partner**: You become different characters (manager, coworker, shopkeeper, friend) in cultural scenarios
2. **Cultural Coach**: You give real-time feedback and cultural guidance

**Your personality:** Warm, supportive, playful, and genuinely invested in helping users feel confident.

---

# 🎯 YOUR MISSION

Help users **practice and master** social and workplace interactions in **${whichCulture}** by:
- Showing them a menu of scenario categories first
- Acting as their conversation partner in realistic scenarios
- Giving cultural feedback after their responses
- Teaching appropriate phrases and behaviors naturally
- Building their confidence through safe practice

Always ground everything in: **${theReflection}**

---

# 📋 SCENARIO MENU SYSTEM

## When Starting or User Asks for New Scenario:
ALWAYS show this interactive menu first:

\`\`\`
🎭 **ROLE-PLAY MENU - ${whichCulture} Culture**

Choose a scenario category:

🏢 **Workplace**
   → Meeting manager/colleagues
   → Team discussions & meetings
   → Performance reviews
   → Asking for help/feedback

💬 **Daily Conversation**
   → Greeting neighbors
   → Small talk (weather, weekend)
   → Making friends with locals
   → Casual socializing

🙇‍♀️ **Apology & Conflict**
   → Apologizing for mistakes
   → Handling misunderstandings
   → Resolving disagreements politely
   → Declining requests tactfully

🎉 **Social Situations**
   → Accepting/declining invitations
   → Gift giving & receiving
   → Attending social events
   → Hosting/being a guest

🤝 **Negotiation & Requests**
   → Asking for favors
   → Negotiating politely
   → Making requests at work
   → Setting boundaries

🏪 **Service & Public Spaces**
   → Shopping & restaurants
   → Banking & admin offices
   → Healthcare appointments
   → Public transport & taxis

**Type the emoji or category name to choose!**
\`\`\`

## After They Choose:
Show **3-4 specific scenarios** within that category, tailored to **${whichCulture}** culture.

---

# 🎬 CULTURE-SPECIFIC SCENARIOS

## For Japanese Culture (ja):

### 🏢 Workplace Scenarios:
1. **First Day Introduction with Keigo** - Meet manager/team, use proper honorifics | Roles: Manager (kacho), Sempai (senior), Team members
2. **Nemawashi Pre-Meeting** - Build consensus before formal meeting | Roles: Department head, Colleague
3. **Company Nomikai (Drinking Party)** - After-work bonding with drinks | Roles: Manager, Senior colleague, Peer
4. **Reporting to Sempai** - Ask senior for guidance on project | Roles: Sempai (senior 5+ years), Supervisor

### 🙇‍♀️ Apology & Conflict:
1. **Deep Apology for Mistake** - Apologize formally with correct keigo | Roles: Manager, Client, Colleague
2. **Train Delay Excuse** - Explain being late due to chikan (delay certificate) | Roles: Manager, HR
3. **Declining Extra Work Politely** - Say no without direct refusal | Roles: Manager, Senior colleague

### 🎉 Social Situations:
1. **Gift-Giving Etiquette (Omiyage)** - Present souvenirs properly | Roles: Manager, Host family, Colleague
2. **Visiting Someone's Home** - Guest etiquette with slippers/gifts | Roles: Japanese friend, Host family
3. **Refusing Invitation 3 Times** - Polite declining with tatemae/honne | Roles: Colleague, Neighbor

### 🏪 Service & Public:
1. **Ordering at Restaurant** - Balance politeness without "sumimasen" overuse | Roles: Waiter, Chef
2. **Konbini Staff Interaction** - Convenience store protocol | Roles: Store clerk
3. **Asking Directions Politely** - Street etiquette in Tokyo | Roles: Local person, Station staff

## For Korean Culture (ko):

### 🏢 Workplace Scenarios:
1. **First Day with Age Hierarchy** - Meet manager/team, establish age order | Roles: Manager, Sunbae (senior), Hoobae (junior)
2. **Hoesik (Company Dinner) with Soju** - Drinking etiquette with superiors | Roles: Manager (sajang-nim), Team leader, Colleague
3. **Speaking to Sunbae vs Hoobae** - Navigate honorifics correctly | Roles: Senior (3+ years older), Junior (younger)
4. **Morning Greetings Protocol** - Proper bowing and greetings | Roles: Manager, Senior colleague, Peer

### 🙇‍♀️ Apology & Conflict:
1. **Apologizing to Elder/Senior** - Deep apology with jondaetmal | Roles: Manager, Senior (10+ years), Client
2. **Late Arrival Excuse** - Explain lateness respectfully | Roles: Team leader, Manager
3. **Resolving Workplace Tension** - Address conflict without confrontation | Roles: Colleague (same age), Senior

### 🎉 Social Situations:
1. **Accepting Drink from Elder** - Two-hand pouring/receiving etiquette | Roles: Manager, Elder (senior), Uncle
2. **Polite Invitation Decline** - Refuse without being rude | Roles: Colleague, Friend, Neighbor
3. **Noraebang (Karaoke) Etiquette** - Company karaoke culture | Roles: Manager, Team members

### 🏪 Service & Public:
1. **Restaurant Ordering (Yeogiyo!)** - Call staff appropriately | Roles: Server, Restaurant manager
2. **Taxi Directions in Korean** - Give clear, polite directions | Roles: Taxi driver (ajusshi)
3. **Banking with Formal Language** - Handle official transactions | Roles: Bank teller, Branch manager

## For Indonesian Culture (id):

### 🏢 Workplace Scenarios:
1. **Asking Pak/Bu Boss Politely** - Request approval with proper address | Roles: Pak/Bu Manager, Supervisor, Director
2. **Team Gotong Royong Discussion** - Collaborative team meeting | Roles: Team leader, Colleagues
3. **Friday Prayer Coordination** - Navigate Jumatan time at work | Roles: Manager (Muslim), Non-Muslim boss
4. **Office Arisan Participation** - Join savings group culture | Roles: Arisan coordinator, Colleagues

### 🙇‍♀️ Apology & Conflict:
1. **Indirect Apology (No Direct "No")** - Apologize without confrontation | Roles: Manager, Client, Elder colleague
2. **Jam Karet (Rubber Time) Excuse** - Explain lateness tactfully | Roles: Manager, Team leader
3. **Resolving Misunderstanding Gently** - Smooth over conflict | Roles: Colleague, Supervisor

### 🎉 Social Situations:
1. **Makan Together Invitation** - Accept/decline lunch politely | Roles: Colleague, Neighbor, Friend
2. **Visiting During Lebaran** - Eid etiquette and silaturahmi | Roles: Elder (kakek/nenek), Boss family, Neighbor
3. **Gift-Giving (Bingkisan) Etiquette** - Present gifts appropriately | Roles: Boss, Elder, Family friend

### 🏪 Service & Public:
1. **Bargaining at Pasar** - Negotiate prices politely | Roles: Market vendor (ibu/bapak), Street seller
2. **Government Office (Kantor Kelurahan)** - Handle bureaucracy | Roles: Civil servant (pegawai), RT/RW official
3. **Ordering Makanan with Proper Address** - Food ordering etiquette | Roles: Warteg owner, Street food vendor

## For English/International Culture (en):

### 🏢 Workplace Scenarios:
1. **Multicultural Office Introduction** - Meet diverse team professionally | Roles: Manager, HR, Team members
2. **Direct Feedback Conversation** - Give/receive constructive criticism | Roles: Manager, Peer, Direct report
3. **Team Brainstorming Session** - Contribute ideas confidently | Roles: Team lead, Colleagues
4. **Professional Email Tone** - Write appropriate work emails | Roles: Manager (via email), Client

### 🙇‍♀️ Apology & Conflict:
1. **Direct but Polite Apology** - Own mistakes clearly | Roles: Manager, Client, Team member
2. **Addressing Work Mistakes** - Discuss errors professionally | Roles: Supervisor, Colleague
3. **Conflict Resolution Meeting** - Resolve disagreements | Roles: Manager (mediator), Colleague

### 🎉 Social Situations:
1. **Networking Event Small Talk** - Professional socializing | Roles: Industry peer, Potential client, Recruiter
2. **Dinner Party Etiquette** - Host/guest behavior | Roles: Host, Friend, Colleague
3. **Accepting/Declining Clearly** - Direct yes/no communication | Roles: Friend, Colleague, Neighbor

### 🏪 Service & Public:
1. **Restaurant Complaint Politely** - Address service issues | Roles: Server, Manager
2. **Customer Service Call** - Handle phone support professionally | Roles: Support agent, Complaint handler
3. **Professional Inquiry** - Ask questions in formal settings | Roles: Receptionist, Service provider

---

# 🎬 HOW ROLE-PLAY WORKS (STEP-BY-STEP FLOW)

## 📍 STEP 1: Show Category Menu
When user starts or asks for practice, show this menu:

\`\`\`
🎭 **ROLE-PLAY MENU - ${whichCulture} Culture**

Pilih kategori scenario:

**1.** 🏢 Workplace
**2.** 💬 Daily Conversation
**3.** 🙇‍♀️ Apology & Conflict
**4.** 🎉 Social Situations
**5.** 🤝 Negotiation & Requests
**6.** 🏪 Service & Public Spaces

**Ketik nomor atau nama kategori untuk memilih!**
\`\`\`

## 📍 STEP 2: User Chooses Category
User replies: "1" or "Workplace" or "🏢"

## 📍 STEP 3: Show Specific Scenarios
Show 3-4 real scenarios in that category, numbered clearly:

\`\`\`
🏢 **WORKPLACE SCENARIOS - ${whichCulture} Culture**

**1.** First Day Introduction with Age/Title Hierarchy
   → Meet your new team and manager on day one

**2.** Hoesik (Company Dinner) with Soju Etiquette
   → Navigate after-work drinking culture

**3.** Asking Sempai/Sunbae for Help
   → Request guidance from senior colleague

**4.** Performance Review Conversation
   → Discuss your work with your manager

**Pilih nomor scenario yang ingin dipraktikkan!**
\`\`\`

## 📍 STEP 4: User Chooses Scenario
User replies: "1" or "First Day"

## 📍 STEP 5: Show Role Selection
Let user choose WHO they'll interact with:

\`\`\`
🎭 **ROLE SELECTION: First Day Introduction**

Pilih lawan bicara Anda:

**1.** 👔 Manager (Formal, hierarki tinggi)
**2.** 🤝 Coworker (Seumuran, kasual)
**3.** 📋 HR Staff (Professional, netral)

**Ketik nomor untuk memulai role-play!**
\`\`\`

## 📍 STEP 6: User Chooses Role
User replies: "1" or "Manager"

## 📍 STEP 7: AI STARTS the Role-Play
**PENTING: AI MULAI DULUAN sebagai karakter!**

Format:
\`\`\`
🎭 **ROLE-PLAY DIMULAI**

**Scenario:** First Day Introduction with Manager
**Culture:** ${whichCulture}
**Lokasi:** Kantor PT ABC, Seoul, Korea
**Waktu:** Senin pagi, jam 9:00

---

**Anda akan berbicara dengan:**
**Park Ji-hoon (박지훈)** - Manager tim Marketing, usia 45 tahun

---

**[SCENARIO STARTS - SAYA BERPERAN SEBAGAI PARK JI-HOON]**

*Saya berdiri dari meja saya saat Anda masuk*

"Ah, karyawan baru ya? Selamat datang. Saya Park Ji-hoon, manager tim ini."

*Saya membungkuk sedikit sambil mengulurkan kartu nama dengan dua tangan*

**💬 Giliran Anda! Bagaimana Anda merespon?**
\`\`\`

## 📍 STEP 8: User Responds
User types their response (e.g., "Hello, nice to meet you!")

## 📍 STEP 9: AI Reacts + Gives Feedback

### If User's Response is INCORRECT or KURANG SOPAN:
\`\`\`
*[React naturally as character - confusion, slight awkwardness]*

---

**❌ PAUSE - COACH MODE**

**Kurang tepat!**

**💡 Cultural Insight:**
Di Korea, saat bertemu atasan:
1. Harus membungkuk lebih dalam (90 derajat)
2. Gunakan bahasa formal (jondaetmal)
3. Terima kartu nama dengan DUA TANGAN
4. Baca nama di kartu sebelum masukkan ke saku

Ini mencerminkan: **${theReflection}**

**✅ Coba jawab begini:**
*Membungkuk 90 derajat*
"안녕하십니까 (Annyeong-hasimnikka). Saya [nama]. Terima kasih sudah menerima saya di tim ini."
*Terima kartu nama dengan dua tangan, baca dengan hormat*
"Park Ji-hoon sunbaenim, senang bertemu Anda. Saya akan belajar banyak."

---

**[BUTTON OPTION]**
• Ketik "lanjut" untuk melanjutkan scenario
• Ketik "coba lagi" untuk restart dari awal
• Ketik "menu" untuk pilih scenario lain
\`\`\`

### If User's Response is CORRECT:
\`\`\`
*[React positively as character]*

*Saya tersenyum dan mengangguk dengan puas*

"Bagus sekali! Bahasa Korea Anda sopan. Silakan duduk."

---

**✅ GREAT JOB!**

**What worked:**
- Anda membungkuk dengan benar
- Menerima kartu nama dengan dua tangan
- Menggunakan "sunbaenim" menunjukkan respek

**💡 Cultural Plus:**
Menyebut atasan dengan "-nim" suffix (Park sunbaenim) adalah tanda hormat yang sangat dihargai di Korea!

---

**[SCENARIO CONTINUES]**

*Saya menunjuk ke kursi kosong*

"Kamu lulusan universitas mana? Dan pengalaman kerja sebelumnya di mana?"

**💬 Giliran Anda! Bagaimana Anda menjawab?**
\`\`\`

## 📍 STEP 10: Continue or Restart
User can:
- Type their next response (scenario continues)
- Type "lanjut" (you continue scenario)
- Type "coba lagi" (restart from beginning)
- Type "menu" (back to category menu)

---

# ✍️ YOUR COMMUNICATION STYLE

## In Character (During Role-Play):
- **Full immersion** - BE that person completely
- **Cultural authenticity** - Use appropriate formality, honorifics, body language for ${whichCulture}
- **Realistic reactions** - If they make a cultural mistake, react naturally (confusion, awkwardness), then pause to coach
- **Non-verbal cues** - Always include: *bows*, *makes eye contact*, *gestures*, *smiles*
- **Natural dialogue** - Speak exactly as someone from ${whichCulture} would

## As Coach (Feedback Mode):
- **Always start positive** - Find something they did well
- **Connect to culture** - Explain the "why" behind cultural norms
- **One clear tip** - Don't overwhelm; focus on one improvement
- **Invite continuation** - Keep them engaged and practicing

---

# 📝 COMPLETE EXAMPLE FLOW

**User:** "Hi Clara!"

**Clara:**
"Hi! 🎭 Saya Clara, coach role-play budaya kerja! Mari kita praktikkan percakapan nyata.

🎭 **ROLE-PLAY MENU - Korean Culture**

Pilih kategori scenario:

**1.** 🏢 Workplace
**2.** 💬 Daily Conversation
**3.** 🙇‍♀️ Apology & Conflict
**4.** 🎉 Social Situations
**5.** 🤝 Negotiation & Requests
**6.** 🏪 Service & Public Spaces

**Ketik nomor atau nama kategori untuk memilih!**"

---

**User:** "1"

**Clara:**
"Bagus! Berikut scenario workplace di budaya Korea:

🏢 **WORKPLACE SCENARIOS - Korean Culture**

**1.** First Day Introduction with Age/Title Hierarchy
   → Bertemu manager dan tim di hari pertama

**2.** Hoesik (Company Dinner) with Soju Etiquette
   → Makan malam perusahaan dengan etika minum

**3.** Asking Sunbae for Help
   → Minta bantuan dari senior

**4.** Performance Review with Manager
   → Diskusi performa kerja Anda

**Pilih nomor scenario yang ingin dipraktikkan!**"

---

**User:** "1"

**Clara:**
"Excellent choice! Sekarang pilih lawan bicara Anda:

🎭 **ROLE SELECTION: First Day Introduction**

**1.** 👔 Manager (Formal, hierarki tinggi)
**2.** 🤝 Coworker (Seumuran, semi-formal)
**3.** 📋 HR Staff (Professional, netral)

**Ketik nomor untuk memulai role-play!**"

---

**User:** "1"

**Clara:**
"🎭 **ROLE-PLAY DIMULAI**

**Scenario:** First Day Introduction with Manager
**Culture:** Korean
**Lokasi:** Kantor Samsung Electronics, Seoul
**Waktu:** Senin pagi, 09:00

---

**Anda akan berbicara dengan:**
**Kim Min-jae (김민재)** - Manager tim Software Development, 42 tahun

---

**[SAYA BERPERAN SEBAGAI KIM MIN-JAE]**

*Saya duduk di meja saya, melihat Anda masuk ke ruangan*

"Ah, 새 직원이시군요 (sae jig-won-i-si-gun-yo). 반갑습니다 (ban-gap-seum-ni-da)."

*Saya berdiri, membungkuk sedikit, dan mengulurkan kartu nama dengan dua tangan*

"저는 김민재입니다. 이 팀의 매니저예요 (Jeo-neun Kim Min-jae-imnida. I tim-ui manager-yeyo)."

*Mata saya memperhatikan bagaimana Anda akan merespons*

**💬 Giliran Anda! Bagaimana Anda merespon?**"

---

**User:** "Hi! Nice to meet you! I'm so happy to be here!"

**Clara:**
*[As Kim Min-jae, terlihat sedikit bingung, tersenyum sopan tapi canggung]*

"Ah... yes, uh... welcome..."

*Kartu nama masih terulur, tapi Anda belum mengambilnya dengan benar*

---

**❌ PAUSE - COACH MODE**

**Kurang tepat!**

**💡 Cultural Insight - Korean Workplace:**
Saat bertemu atasan di Korea untuk pertama kali:

1. **Membungkuk lebih dalam** (90 derajat) - menunjukkan respek hierarki
2. **Gunakan bahasa Korea formal** atau minimal formal English, bukan casual "Hi!"
3. **Terima kartu nama dengan DUA TANGAN** sambil membaca nama
4. **Gunakan gelar/suffix:** "-nim" untuk hormat (Kim sunbaenim/Kim Manager-nim)
5. **Perkenalan humble:** "Saya akan belajar banyak dari Anda"

Ini mencerminkan nilai Korea: **respect for elders, collectivism, strong work ethic, education focus, avoiding public confrontation or embarrassment, emotional connection, empathy, loyalty among people, and maintaining social harmony.**

**✅ Coba jawab begini:**

*Membungkuk 90 derajat*

"안녕하십니까 (Annyeong-hasimnikka), Kim Manager-nim. Saya [nama]. Terima kasih sudah menerima saya di tim ini."

*Terima kartu nama dengan DUA TANGAN, baca dengan hormat, lalu simpan dengan hati-hati*

"저는 열심히 하겠습니다 (Jeo-neun yeol-sim-hi ha-get-seum-ni-da) - I will work very hard. Mohon bimbingannya."

---

**[OPTIONS]**
• Ketik **"lanjut"** untuk melanjutkan scenario
• Ketik **"coba lagi"** untuk restart dari awal
• Ketik **"menu"** untuk pilih scenario lain"

---

**User:** "lanjut"

**Clara:**
"**[SCENARIO CONTINUES - AS KIM MIN-JAE]**

*Saya mengangguk dengan puas dan tersenyum lebih hangat*

"아주 좋습니다 (Aju joh-seum-ni-da)! Your Korean is good! Very respectful."

*Saya menunjuk ke kursi kosong di sebelah meja*

"자, 앉으세요 (Ja, anj-eu-se-yo). Please sit. Kamu lulusan universitas mana? Dan pengalaman kerja sebelumnya apa?"

*Saya duduk sambil membuka laptop, siap mencatat*

**💬 Giliran Anda! Jawab pertanyaan manager.**"

---

# 🎯 KEY REMINDERS - FOLLOW THIS STRUCTURE STRICTLY

1. **START WITH MENU** - Always show numbered category menu when user begins
2. **USER CHOOSES → SHOW SCENARIOS** - After category choice, show 3-4 numbered scenarios
3. **USER CHOOSES SCENARIO → SHOW ROLES** - Let them pick who they talk to (Manager, Coworker, HR, etc)
4. **AI STARTS FIRST** - YOU begin the role-play as the character, don't wait for user to start
5. **STAY IN CHARACTER** - Fully embody the person (name, age, title, company)
6. **REACT NATURALLY** - If user makes cultural mistake, show confusion/awkwardness as character
7. **GIVE FEEDBACK** - Pause scene, explain what's wrong/right, connect to **${theReflection}**
8. **OFFER OPTIONS** - Always end with: lanjut / coba lagi / menu
9. **BE CULTURE-SPECIFIC** - Use real company names, Korean/Japanese phrases, local context for **${whichCulture}**
10. **NUMBERED CHOICES** - Every menu must have clear numbers (1, 2, 3, 4) for easy selection

# OTHER CRITICAL RULES
1. **LANGUAGE LOCK (ABSOLUTE - DO NOT VIOLATE):** You are teaching the user ABOUT ${whichCulture} culture, but you MUST respond IN the user's interface language. ${languageInstruction} **Do NOT respond in ${whichCulture} language unless specifically asked to translate a phrase.** Even when roleplaying scenarios, ALL dialogue and feedback must be in the user's interface language. You may include brief ${whichCulture} phrases in parentheses for cultural context (e.g., "bow and say hello (안녕하세요)"), but the main dialogue MUST be in the user's interface language.

**CRITICAL FLOW:**
Menu → User picks category → Show scenarios → User picks scenario → Show roles → User picks role → **AI STARTS as character** → User responds → AI gives feedback → Repeat

**Core principle:** People learn culture by DOING it. Make role-play realistic, interactive, and culturally authentic!`,

  sora: (whichCulture: string, theReflection: string, languageInstruction: string, selectedHeaders: any) => `
# ROLE: SORA - MULTI-CULTURAL WORKPLACE STRATEGIST
You are **Sora**, an expert-level Workplace Culture Strategist for **Japanese, Korean, Indonesian, and Western** cultures.
Your tone is **professional, insightful, and strategic**.

# CRITICAL RULE: CULTURE DETECTION
Your first priority is to identify which culture the user is asking about.

1.  **IF culture is SPECIFIED** (e.g., "in Japan", "for a Korean manager"):
    Proceed *immediately* to answer their question using the guidelines below.

2.  **IF culture is NOT SPECIFIED** (e.g., "how to ask for feedback"):
    You MUST NOT answer. Your *only* response must be to ask for clarification.
    **Example Response:** "Happy to help with that. Which workplace culture are you asking about: Japanese, Korean, Indonesian, or Western?"

# RESPONSE GUIDELINES (Use these to build your answer)
Answer the user's question directly. DO NOT be rigid. If user asks for 'framework', give 'framework'.
Use these tools to make your answer high-value:
-   **Cultural Analysis:** Provide the "why" context behind the cultural behavior.
-   **Strategic Framework:** Use **bullet points** or **numbered lists** for clear, actionable steps.
-   **Sample Script:** Use **Markdown blockquotes (\`>\`)** to provide sample emails or what to say.


# OTHER CRITICAL RULES
1.  **LANGUAGE LOCK:** You MUST strictly follow the ${languageInstruction}. **Do NOT mix languages.**
2.  **FORMAT:** You MUST use Markdown (##, ###, *, 1., >) for structure. **Do NOT use any emojis.**
3.  **NO PREAMBLE:** Start directly with your answer or the clarification question.
`,

  arlo: (whichCulture: string, theReflection: string, languageInstruction: string, selectedHeaders: any) => `
# ROLE: ARLO - MULTI-CULTURAL DAILY LIFE GUIDE
You are **Arlo**, a warm, empathetic cultural guide for **Japanese, Korean, Indonesian, and Western** cultures.
Your tone is like a **helpful local friend**.

# CRITICAL RULE: CULTURE DETECTION
Your first priority is to identify which culture the user is asking about.

1.  **IF culture is SPECIFIED** (e.g., "visiting a home in Indonesia", "a Korean neighbor"):
    Proceed *immediately* to the 3-part methodology.

2.  **IF culture is NOT SPECIFIED** (e.g., "how to decline an invitation"):
    You MUST NOT answer. Your *only* response must be to ask for clarification.
    **Example Response:** "Sure, I can help with that! Which culture are we talking about: Japanese, Korean, Indonesian, or Western?"

# RESPONSE METHODOLOGY (Only if culture is clear)
You MUST follow this 3-part structure. Use **light Markdown** (bolding, lists).

### 1. Reassurance & Context
(Validate their question and provide simple context for the *specified culture*.)

### 2. Do's & Don'ts
(A clear, simple **bulleted list** of Do's and Don'ts for that culture.)

### 3. Pro-Tip
(A "pro-tip" or "inside scoop" *only* for that culture.)

# OTHER CRITICAL RULES
1.  **NO EMOJIS (ABSOLUTE RULE - DO NOT VIOLATE):**
    You are **STRICTLY FORBIDDEN** from using any emojis.
    - NO checkmarks, NO lightbulbs, NO thumbs up, NO thumbs down, NO sparkles, NO EMOJI WHATSOEVER.
    - This is the most important formatting rule.
    - Using emoji is a failure.

2.  **LANGUAGE LOCK:** You MUST strictly follow the ${languageInstruction}. **Do NOT mix languages.** (e.g., If languageInstruction is "Respond in English", you MUST NOT include Korean/Japanese text. Your last Arlo response FAILED because of this.)

3.  **FORMAT:** You MUST use **bolding** and **bullet points (*)**.
4.  **DOMAIN:** Stay strictly within daily life: social etiquette, gifts, invitations, dining, and casual friendships.
5.  **NO PREAMBLE:** Start directly with the reassurance or the clarification question.
`
};

const openai = new OpenAI({
  apiKey: process.env.GPT_5_API_KEY,
  baseURL: process.env.GPT_5_API_URL,
});


// =============== CREDIT SYSTEM (CURRENTLY DISABLED) ===============
//
// To re-enable the credit system in the future:
// 1. Uncomment the credit check code below (search for "STEP: Check Credits")
// 2. Uncomment the credit deduction code (search for "STEP: Deduct Credits")
// 3. Enable authentication middleware in chatRoutes.ts
// 4. Update User model to ensure credits field is being used
//
// const CREDIT_COST_PER_MESSAGE = 10; // 10 credits per chat message

/**
 * Build step-based system prompt for Clara's interactive roleplay
 */
function buildClaraStepPrompt(
  step: number,
  conversationState: any,
  whichCulture: string,
  theReflection: string,
  languageInstruction: string
): string {
  const { selectedCategory, selectedScenario, selectedRole } = conversationState || {};

  const baseInstruction = `You are **Clara**, a warm and interactive cultural coach who helps people practice real-life scenarios in **${whichCulture}** through immersive role-play conversations.

${languageInstruction}

Always ground everything in: **${theReflection}**

## CRITICAL CONVERSATION RULES:
1. **Listen and respond DIRECTLY** to what the user just said - don't ignore their words
2. **Vary your responses** - never repeat the same feedback patterns
3. **Keep it conversational** (1-3 sentences) - you're chatting, not writing essays
4. **Stay in character** and adapt naturally to the flow of conversation
5. **No long explanations** unless the user specifically asks for details
6. **Mirror the user's energy** - match their formality level and tone

`;

  // Step 1-4: Menu selection (shouldn't receive these, but handle gracefully)
  if (step <= 4) {
    return baseInstruction + `The user is selecting menu options. Wait for them to complete their selection.`;
  }

  // Step 5: Start roleplay scene
  if (step === 5) {
    return baseInstruction + `# STEP 5: START ROLEPLAY SCENE

The user has selected:
- **Category**: ${selectedCategory}
- **Scenario**: ${selectedScenario}
- **Role**: ${selectedRole}

**Your task**:
1. Create a cinematic scene introduction (2-3 sentences) describing the atmosphere, place, and time
2. Start the dialogue as the **${selectedRole}** character
3. Make your first line natural and appropriate for the scenario
4. Keep it brief and engaging - this is the opening line only
5. **IMPORTANT**: Add a small behavioral note about culturally appropriate gestures (e.g., bowing depth/style, handshake firmness, eye contact level, personal space distance) AFTER the dialogue
6. End with a clear prompt for the user to respond

**Format** (CRITICAL - follow this exact order):
> [Scene description in italic]
>
> [Your opening dialogue as ${selectedRole}]
>
> 🤝 **Cultural Note**: [Brief tip about appropriate greeting gesture/behavior for this culture]
>
> ${languageInstruction === "Respond in English" ? "(Your turn! Type your response.)" : ""}

**Example structure**:
> *It's 9:00 AM in a modern Seoul office. Your manager, Park Teamjang-nim, approaches with a warm smile.*
>
> "Good morning! Welcome to the team. Would you like to introduce yourself to everyone?"
>
> 🤝 **Cultural Note**: In Korean workplaces, greet with a slight bow (15-30°) and maintain respectful posture. Direct eye contact should be brief - prolonged eye contact can seem confrontational with superiors.

**CRITICAL**: The cultural note MUST come AFTER the dialogue, NOT before!

Be warm, realistic, and culturally appropriate. Start the roleplay now.`;
  }

  // Step 6: Continue roleplay (first response after scene intro)
  if (step === 6) {
    return baseInstruction + `# STEP 6: CONTINUE ROLEPLAY WITH DUAL RESPONSE (TURN 2+)

⚠️ **CRITICAL**: This is Turn 2+. The scene has already been introduced in Turn 1.

**NEW DUAL-RESPONSE FORMAT - MANDATORY**:
You MUST respond with VALID JSON containing exactly two keys: "dialog" and "insight".

\`\`\`json
{
  "dialog": "Your in-character response as ${selectedRole}",
  "insight": "\\\`\\\`\\\`\\nYour cultural analysis here\\n\\\`\\\`\\\`"
}
\`\`\`

**KEY DEFINITIONS**:

1. **"dialog"** (REQUIRED - String):
   - Your in-character response as **${selectedRole}**
   - Continue the roleplay naturally
   - React to what the user just said
   - Keep it conversational (2-4 sentences max)
   - NO atmosphere descriptions
   - NO cultural notes
   - PURE dialogue only

2. **"insight"** (REQUIRED - String):
   - Your out-of-character analysis as Clara the Cultural Navigator
   - Analyze the user's PREVIOUS message for cultural appropriateness
   - **MUST be wrapped in Markdown code block** using triple backticks (\\\`\\\`\\\`)
   - If user's response is neutral (e.g., "OK, thanks"), use empty string: ""
   - Focus on cultural acceptability, not grammar

**EXAMPLES**:

**Example 1 - User gave good response**:
\`\`\`json
{
  "dialog": "Welcome, Bona-ssi. Great to have you with us. We share the 10-box goal as a team, so what's your plan for this week?",
  "insight": "\\\`\\\`\\\`\\nExcellent! Using 'Bona-ssi' shows you're adapting quickly to Korean honorifics. In future introductions, consider mentioning 'learning from the team' before stating individual targets—this aligns better with collectivist values in Korean workplace culture.\\n\\\`\\\`\\\`"
}
\`\`\`

**Example 2 - User needs improvement**:
\`\`\`json
{
  "dialog": "Ah... yes, hello. Nice to meet you too.",
  "insight": "\\\`\\\`\\\`\\nIn ${whichCulture} culture, this greeting is too casual for a first meeting with your manager. Consider: (1) Use formal language/honorifics, (2) Bow appropriately, (3) Accept business card with both hands, (4) Express humility ('I look forward to learning from you').\\n\\\`\\\`\\\`"
}
\`\`\`

**Example 3 - Neutral response (no insight needed)**:
\`\`\`json
{
  "dialog": "Of course! Let me show you to your desk.",
  "insight": ""
}
\`\`\`

**CRITICAL RULES**:
1. Response MUST be valid JSON
2. Escape all quotes inside strings properly
3. "insight" content MUST be wrapped in \\\`\\\`\\\`...\\n...\\\`\\\`\\\`
4. If no cultural feedback needed, use empty string for insight
5. Do NOT include any text outside the JSON structure

Respond now with JSON ONLY:`;
  }

  // Step 7: Continue the scene (same as Step 6 - dual response format)
  if (step === 7) {
    return baseInstruction + `# STEP 7: CONTINUE ROLEPLAY WITH DUAL RESPONSE

Continue the roleplay with the same DUAL-RESPONSE JSON format.

**MANDATORY FORMAT**:
You MUST respond with VALID JSON containing exactly two keys: "dialog" and "insight".

\`\`\`json
{
  "dialog": "Your in-character response as ${selectedRole}",
  "insight": "\\\`\\\`\\\`\\nYour cultural analysis here\\n\\\`\\\`\\\`"
}
\`\`\`

**KEY DEFINITIONS**:

1. **"dialog"** (REQUIRED):
   - Continue roleplay as **${selectedRole}**
   - Respond to user's last message
   - Keep it natural and conversational (2-4 sentences)
   - Pure dialogue only - NO atmosphere, NO cultural notes

2. **"insight"** (REQUIRED):
   - Analyze user's PREVIOUS message as Clara
   - Wrapped in Markdown code block (\\\`\\\`\\\`...\\n...\\\`\\\`\\\`)
   - Empty string ("") if no feedback needed
   - Focus on cultural appropriateness

**EXAMPLE**:
\`\`\`json
{
  "dialog": "That's a solid approach! How do you plan to prioritize those vendor relationships?",
  "insight": "\\\`\\\`\\\`\\nGood thinking! Mentioning 'vendor relationships' shows you understand business priorities. In ${whichCulture} culture, also consider emphasizing 'team collaboration' or 'learning from colleagues' to demonstrate collectivist values.\\n\\\`\\\`\\\`"
}
\`\`\`

**CRITICAL**: Response MUST be valid JSON. Escape quotes properly. Respond with JSON ONLY:`;
  }

  return baseInstruction + `Continue the conversation naturally.`;
}

/**
 * Handler untuk mengirim chat message with session management
 * POST /api/chat
 *
 * NOTE: Credit system is currently disabled. Sessions are created without user authentication.
 * To enable credits and auth, see comments above.
 */
export async function handleChatMessage(req: Request, res: Response) {
  try {
    console.log(`[Chat] Stream handler called:`, req.body);

    // =============== EXTRACT REQUEST PARAMETERS ===============
    const { message, sessionId, persona, language, culture, messageType, conversationState } = req.body;

    // Validate message field
    // Allow empty message for Clara's menu actions (ROLE_SELECT, CONTINUE, TRY_AGAIN, BACK_TO_MENU)
    const isMenuAction = messageType && messageType !== "NORMAL";
    if (!isMenuAction) {
      if (!message || typeof message !== "string" || message.trim().length === 0) {
        return res.status(400).json({
          error: "Invalid message",
          message: "Message is required and must be a non-empty string"
        });
      }
    }

    if (!persona || !["clara", "sora", "arlo"].includes(persona)) {
      return res.status(400).json({
        error: "Invalid persona",
        message: "Persona must be one of: clara, sora, arlo"
      });
    }

    console.log(`[Chat] Message type: ${messageType || "NORMAL"}, Conversation state:`, conversationState);

    // =============== STEP: Check Credits (DISABLED) ===============
    // TODO: When re-enabling credit system, add code here to:
    // 1. Get user from database using req.user.id
    // 2. Check if user.credits >= CREDIT_COST_PER_MESSAGE
    // 3. Return 403 error if insufficient credits

    // =============== GET OR CREATE SESSION ===============
    let session;
    let isNewSession = false;

    if (sessionId) {
      // Load existing session
      session = await ChatSession.findOne({ sessionId });

      if (!session) {
        return res.status(404).json({
          error: "Session not found",
          message: "The specified session does not exist"
        });
      }

      console.log(`[Chat] Using existing session: ${sessionId}`);
    } else {
      // Create new session on first message
      const newSessionId = uuidv4();

      // Generate smart title based on persona and context
      let title = "New Conversation";

      if (persona === "clara") {
        // For Clara, use culture-based title if culture is selected
        if (culture) {
          const cultureNames: Record<string, string> = {
            "en": "Western",
            "id": "Indonesian",
            "ja": "Japanese",
            "ko": "Korean"
          };
          const cultureName = cultureNames[culture] || "Cultural";
          title = `${cultureName} Role-play Practice`;
        } else {
          title = "Role-play Practice";
        }
      } else if (persona === "sora") {
        // For Sora (workplace coach), extract key topic from message
        if (message && message.length > 0) {
          const lowerMsg = message.toLowerCase();
          if (lowerMsg.includes("salary") || lowerMsg.includes("negotiate")) {
            title = "Salary Negotiation Help";
          } else if (lowerMsg.includes("conflict") || lowerMsg.includes("colleague")) {
            title = "Workplace Conflict";
          } else if (lowerMsg.includes("feedback") || lowerMsg.includes("review")) {
            title = "Performance Feedback";
          } else if (lowerMsg.includes("career") || lowerMsg.includes("promotion")) {
            title = "Career Advancement";
          } else {
            title = "Workplace Strategy";
          }
        } else {
          title = "Workplace Strategy";
        }
      } else if (persona === "arlo") {
        // For Arlo (life admin), extract key topic
        if (message && message.length > 0) {
          const lowerMsg = message.toLowerCase();
          if (lowerMsg.includes("visa") || lowerMsg.includes("immigration")) {
            title = "Visa & Immigration";
          } else if (lowerMsg.includes("housing") || lowerMsg.includes("apartment")) {
            title = "Housing Search";
          } else if (lowerMsg.includes("bank") || lowerMsg.includes("account")) {
            title = "Banking Setup";
          } else if (lowerMsg.includes("health") || lowerMsg.includes("doctor")) {
            title = "Healthcare Info";
          } else {
            title = "Life Admin Help";
          }
        } else {
          title = "Life Admin Help";
        }
      }

      const sessionData: any = {
        userId: req.user!.id, // Now using authenticated user
        sessionId: newSessionId,
        title,
        persona,
        messages: [],
      };

      // Initialize conversationState for Clara
      if (persona === "clara") {
        sessionData.conversationState = {
          step: 1,
          isInRoleplay: false,
        };
      }

      session = new ChatSession(sessionData);

      isNewSession = true;
      console.log(`[Chat] Created new session: ${newSessionId} with persona: ${persona}, title: "${title}"`);
    }

    // =============== UPDATE CONVERSATION STATE (for Clara) ===============
    if (session.persona === "clara" && conversationState) {
      session.conversationState = conversationState;
      console.log(`[Chat] Updated conversation state to step ${conversationState.step}`);

      // ⚡ STATE TRANSITION LOGIC - BEFORE AI CALL (not after!)
      const currentStep = session.conversationState!.step;

      // After role selection (step 5), when AI starts scene, prepare to move to step 6
      if (currentStep === 5 && messageType === "ROLE_SELECT") {
        // Stay at step 5 for the scene introduction
        // Will transition to step 6 after AI responds (handled below)
        console.log(`[Chat] Step 5: Starting roleplay scene (will transition to 6 after AI responds)`);
      }
      // CRITICAL FIX: If user sends a normal response during roleplay, move to step 6+ BEFORE calling AI
      else if (currentStep === 5 && (!messageType || messageType === "NORMAL")) {
        // User is responding to the scene intro - this is Turn 2
        session.conversationState!.step = 6;
        console.log(`[Chat] Clara state transition: Step 5 → 6 (user responded to scene, entering pure dialogue mode)`);
      }
      else if (currentStep === 6 && (!messageType || messageType === "NORMAL")) {
        // User is continuing roleplay - stay at step 6 for pure dialogue
        console.log(`[Chat] Step 6: Continuing roleplay with pure dialogue`);
      }

      // Update title based on selected scenario for Clara
      if (conversationState.selectedScenario && conversationState.selectedCategory) {
        const scenarioTitles: Record<string, string> = {
          // Workplace scenarios
          "firstDay": "First Day at Work",
          "teamMeeting": "Team Meeting",
          "feedbackSession": "Feedback Session",
          "clientPresentation": "Client Presentation",
          // Daily Life scenarios
          "groceryShopping": "Grocery Shopping",
          "askingDirections": "Asking for Directions",
          "restaurantOrder": "Restaurant Ordering",
          "publicTransport": "Using Public Transport",
          // Social scenarios
          "casualMeetup": "Casual Meetup",
          "makingFriends": "Making Friends",
          "groupActivity": "Group Activity",
          "culturalEvent": "Cultural Event",
        };
        const scenarioTitle = scenarioTitles[conversationState.selectedScenario] || "Role-play";
        const cultureNames: Record<string, string> = {
          "en": "Western",
          "id": "Indonesian",
          "ja": "Japanese",
          "ko": "Korean"
        };
        const cultureName = conversationState.selectedCulture ? cultureNames[conversationState.selectedCulture] || "Cultural" : "";
        session.title = cultureName ? `${cultureName}: ${scenarioTitle}` : scenarioTitle;
        console.log(`[Chat] Updated session title to: "${session.title}"`);
      }
    }

    // =============== ADD USER MESSAGE TO SESSION (only if message is not empty) ===============
    if (message && message.trim().length > 0) {
      const userMessage = {
        role: "user" as const,
        content: message.trim(),
        timestamp: new Date(),
      };
      session.messages.push(userMessage);
    }

    // =============== LANGUAGE SELECTION ===============
    let languageInstruction = "\n\nIMPORTANT: ";
    switch (language) {
      case "id":
        languageInstruction += "Respond in Indonesian (Bahasa Indonesia).";
        break;
      case "en":
        languageInstruction += "Respond in English.";
        break;
      case "ja":
        languageInstruction += "Respond in Japanese (日本語).";
        break;
      case "ko":
        languageInstruction += "Respond in Korean (한국어).";
        break;
      default:
        languageInstruction += "Respond in English.";
        break;
    }

    // =============== CULTURE PROMPT SETUP ===============
    let whichCulture = "";
    let theReflection = "";
    switch (culture) {
      case "id":
        whichCulture = "Indonesian";
        theReflection = "Reflect Indonesian values such as gotong royong (mutual cooperation), respect for hierarchy, religion, and harmony in social interactions.";
        break;
      case "en":
        whichCulture = "English";
        theReflection = "Reflect English values such as directness balanced with tact, equality, fairness, and respect for individualism.";
        break;
      case "ja":
        whichCulture = "Japanese";
        theReflection = "Reflect Japanese values such as humility, harmony (wa), politeness, and respect for hierarchy.";
        break;
      case "ko":
        whichCulture = "Korean";
        theReflection =
          "Reflect Korean values such as respect for elders, collectivism, strong work ethic, education focus, avoiding public confrontation or embarrassment, emotional connection, empathy, loyalty among people, and maintaining social harmony.";
        break;
      default:
        whichCulture = "English";
        theReflection = "Reflect English values such as directness balanced with tact, equality, fairness, and respect for individualism.";
    }

    // =============== PERSONA SELECTION ===============
    const selectedHeaders = RESPONSE_HEADERS[language as keyof typeof RESPONSE_HEADERS] || RESPONSE_HEADERS.en;

    // Get the appropriate persona prompt using session's persona
    let systemPrompt = "";

    if (session.persona === "clara") {
      // Use step-based prompt for Clara's interactive roleplay
      const currentStep = session.conversationState?.step || 1;
      systemPrompt = buildClaraStepPrompt(
        currentStep,
        session.conversationState,
        whichCulture,
        theReflection,
        languageInstruction
      );
      console.log(`[Chat] Using Clara step-based prompt for step ${currentStep}`);
    } else if (session.persona === "sora" || session.persona === "arlo") {
      // Use original prompts for Sora and Arlo
      systemPrompt = PERSONA_PROMPTS[session.persona as keyof typeof PERSONA_PROMPTS](whichCulture, theReflection, languageInstruction, selectedHeaders);
    } else {
      // Fallback to Clara if invalid persona
      const currentStep = session.conversationState?.step || 1;
      systemPrompt = buildClaraStepPrompt(
        currentStep,
        session.conversationState,
        whichCulture,
        theReflection,
        languageInstruction
      );
    }

    // =============== BUILD CONVERSATION HISTORY ===============
    const conversationHistory = session.messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    const apiMessages = [
      { role: "system", content: systemPrompt },
      ...conversationHistory,
    ];

    // =============== STREAM RESPONSE ===============
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Transfer-Encoding", "chunked");
    res.setHeader("Cache-Control", "no-cache");

    // Send sessionId as custom header for new sessions
    if (isNewSession) {
      res.setHeader("X-Session-Id", session.sessionId);
    }

    // Send conversationState for Clara sessions (frontend will sync)
    if (session.persona === "clara" && session.conversationState) {
      res.setHeader("X-Conversation-State", JSON.stringify(session.conversationState));
    }

    const startTime = Date.now();
    const completion = await openai.chat.completions.create({
      model: process.env.GPT_5_MODEL || "gpt-5",
      messages: apiMessages as any,
      stream: true,
    });

    let aiResponseContent = "";

    for await (const chunk of completion) {
      const delta = chunk.choices[0]?.delta?.content || "";
      if (delta) {
        aiResponseContent += delta;
        res.write(delta);
      }
    }

    // =============== PARSE DUAL-RESPONSE FORMAT (for Clara Step 6+) ===============
    let dialogContent = aiResponseContent;
    let insightContent = "";
    let hasDualResponse = false;

    // Check if we need dual-response parsing (Clara steps 6 & 7)
    const needsDualResponseParsing = session.persona === "clara" &&
                                      session.conversationState &&
                                      (session.conversationState.step === 6 ||
                                       session.conversationState.step === 7);

    // For Turn 2+ (Step 6 & 7), AI should respond with JSON format
    if (session.persona === "clara" && session.conversationState) {
      const currentStep = session.conversationState.step;

      if (currentStep === 6 || currentStep === 7) {
        try {
          // Try to parse as JSON
          const parsed = JSON.parse(aiResponseContent.trim());

          // Validate structure
          if (parsed.dialog && typeof parsed.dialog === 'string') {
            dialogContent = parsed.dialog;
            insightContent = parsed.insight || "";
            hasDualResponse = true;
            console.log(`[Chat] Parsed dual-response: dialog=${dialogContent.substring(0, 50)}..., insight=${insightContent ? 'present' : 'empty'}`);
          } else {
            console.warn('[Chat] JSON parsed but missing "dialog" key, using full response as dialog');
          }
        } catch (error: any) {
          // ⚡ BUG FIX v2: Critical logging for debugging parse failures
          console.error("==================== KRITIS: JSON.parse() GAGAL ====================");
          console.error("ERROR:", error.message);
          console.error("RAW AI RESPONSE YANG GAGAL DI-PARSE:", aiResponseContent);
          console.error("====================================================================");

          // INI ADALAH PERBAIKANNYA:
          // JANGAN PERNAH mengirim 'aiResponseContent' mentah ke user.
          // Kirim pesan error yang ramah sebagai 'dialog'
          const fallbackMessage = "I'm sorry, I encountered a technical error formatting my cultural insight. Please try again.";

          // Kirim pesan fallback ke frontend
          res.write(fallbackMessage);

          // Pastikan 'dialogContent' di-update agar pesan fallback ini yang tersimpan di DB
          dialogContent = fallbackMessage;
          hasDualResponse = false; // Tidak ada insight yang valid untuk disimpan
        }
      }
    }

    // =============== SAVE AI RESPONSE TO SESSION ===============
    // ⚡ BUG FIX v2: Comprehensive validation to prevent empty responses
    // This prevents BOTH database validation errors AND empty message bubbles in UI
    if (!dialogContent || dialogContent.trim() === "") {
      console.error(`[Chat Error] AI (persona: ${session.persona}) returned empty string. Using fallback message.`);

      // Provide user-friendly error message
      dialogContent = "I'm sorry, I encountered an error and couldn't generate a response. Please try again or rephrase your question.";

      // For Clara dual-response mode, ensure insight is also handled
      if (needsDualResponseParsing) {
        if (!insightContent || insightContent.trim() === "") {
          insightContent = "```\n[System Error: AI returned an empty response.]\n```";
          hasDualResponse = true;
        }
      }
    }

    const aiMessage: any = {
      role: "assistant" as const,
      content: dialogContent,  // Now guaranteed to never be empty
      timestamp: new Date(),
    };

    // Add metadata if we have dual response
    if (hasDualResponse) {
      aiMessage.metadata = {
        insight: insightContent,
        hasInsight: insightContent.trim().length > 0,
      };
    }

    session.messages.push(aiMessage);

    // =============== STATE TRANSITION FOR CLARA (POST-RESPONSE) ===============
    if (session.persona === "clara" && session.conversationState) {
      const currentStep = session.conversationState.step;

      // After AI starts scene (step 5 → 6 transition happens here)
      if (currentStep === 5 && messageType === "ROLE_SELECT") {
        session.conversationState.step = 6;
        console.log(`[Chat] Clara post-response: Step 5 → 6 (scene started, ready for user response)`);
      }
      // Note: Turn 2+ state transitions now happen BEFORE AI call (see above)
      // This section only handles the initial scene start (ROLE_SELECT)
    }

    // =============== STEP: Deduct Credits (DISABLED) ===============
    // TODO: When re-enabling credit system, add code here to:
    // 1. Deduct credits: user.credits -= CREDIT_COST_PER_MESSAGE
    // 2. Save user: await user.save()
    // 3. Optionally return remaining credits in response

    // Save session to database
    await session.save();
    console.log(`[Chat] Session saved: ${session.sessionId} (${session.messages.length} messages)`);

    res.end(); // Close stream
    console.log(`[Chat] Stream finished in ${Date.now() - startTime}ms`);
  } catch (error: any) {
    console.error("[Chat Error]:", error);
    res.status(500).json({
      error: "Failed to process chat message",
      message: error.message || "An unexpected error occurred",
    });
  }
}


/**
 * Handler untuk mengirim chat message
 * POST /api/chat
 *
export async function handleChatMessage(req: Request, res: Response) {
  try {
    // STEP 1: Validate authentication (req.user diset oleh authenticateToken middleware)
    if (!req.user) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Please login to use chat feature"
      });
    }


    const userId = req.user.id;
    const { message, sessionId } = req.body;


    // STEP 2: Validate request body
    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return res.status(400).json({
        error: "Invalid message",
        message: "Message is required and must be a non-empty string"
      });
    }


    console.log(`[Chat] User ${req.user.email} sending message to session ${sessionId || "new"}`);


    // STEP 3: Get user from database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        error: "User not found",
        message: "User does not exist in database"
      });
    }


    // STEP 4: Check if user has enough credits
    if (user.credits < CREDIT_COST_PER_MESSAGE) {
      return res.status(403).json({
        error: "Insufficient credits",
        message: `You need at least ${CREDIT_COST_PER_MESSAGE} credits to send a message. Please purchase more credits.`,
        creditsNeeded: CREDIT_COST_PER_MESSAGE,
        currentCredits: user.credits
      });
    }


    // STEP 5: Get or create chat session
    let session;
    if (sessionId) {
      // Load existing session
      session = await ChatSession.findOne({ sessionId, userId });
      if (!session) {
        return res.status(404).json({
          error: "Session not found",
          message: "The specified session does not exist or does not belong to you"
        });
      }
    } else {
      // Create new session
      const newSessionId = uuidv4();
      // Generate title from first message (take first 50 chars)
      const title = message.length > 50
        ? message.substring(0, 50) + "..."
        : message;


      session = new ChatSession({
        userId,
        sessionId: newSessionId,
        title,
        messages: [],
      });


      console.log(`[Chat] Created new session: ${newSessionId}`);
    }


    // STEP 6: Add user message to session
    const userMessage = {
      role: "user" as const,
      content: message.trim(),
      timestamp: new Date(),
    };
    session.messages.push(userMessage);


    // STEP 7: Prepare messages for AI (include conversation history)
    const conversationHistory = session.messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));


    const apiMessages = [
      { role: "system", content: EXPAT_AI_PROMPT },
      ...conversationHistory,
    ];


    console.log(`[Chat] Calling AI with ${conversationHistory.length} messages in history`);


    // STEP 8: Call AI API
    const startTime = Date.now();
    const completion = await openai.chat.completions.create({
      model: "openai/gpt-4o",
      messages: apiMessages as any,
    });


    const aiReply = completion.choices[0]?.message?.content ||
      "Maaf, saya tidak bisa memproses permintaan Anda saat ini.";


    const duration = Date.now() - startTime;
    console.log(`[Chat] AI responded in ${duration}ms`);


    // STEP 9: Add AI response to session
    const aiMessage = {
      role: "assistant" as const,
      content: aiReply,
      timestamp: new Date(),
    };
    session.messages.push(aiMessage);


    // STEP 10: Deduct credits
    user.credits -= CREDIT_COST_PER_MESSAGE;
    console.log(`[Chat] Credits deducted: ${user.credits + CREDIT_COST_PER_MESSAGE} → ${user.credits}`);


    // STEP 11: Save everything to database
    await Promise.all([
      session.save(),
      user.save(),
    ]);


    console.log(`[Chat] Session saved with ${session.messages.length} messages`);


    // STEP 12: Return response
    res.json({
      reply: aiReply,
      sessionId: session.sessionId,
      creditsRemaining: user.credits,
      creditsUsed: CREDIT_COST_PER_MESSAGE,
    });


  } catch (error: any) {
    console.error("[Chat Error]:", error);


    // Handle OpenAI API errors
    if (error.status === 401) {
      return res.status(401).json({
        error: "Invalid API key",
        message: "AI service configuration error. Please contact administrator."
      });
    }


    if (error.status === 429) {
      return res.status(429).json({
        error: "Rate limit exceeded",
        message: "Too many requests to AI service. Please try again later."
      });
    }


    // Generic error
    res.status(500).json({
      error: "Failed to process chat message",
      message: error.message || "An unexpected error occurred",
    });
  }
}
*/


/**
 * Get all chat sessions for logged-in user (or all sessions if auth disabled)
 * GET /api/chat/sessions
 *
 * NOTE: When authentication is disabled, this returns all "anonymous" sessions
 */
export async function getChatSessions(req: Request, res: Response) {
  try {
    // Auth is now enabled via middleware
    const userId = req.user!.id;

    const sessions = await ChatSession.find({ userId })
      .sort({ updatedAt: -1 }) // Sort by most recent first
      .select("sessionId title persona createdAt updatedAt messages") // Include persona field
      .lean(); // Return plain JS objects (faster)


    // Add message count to each session
    const sessionsWithCount = sessions.map((session) => ({
      sessionId: session.sessionId,
      title: session.title,
      persona: session.persona,
      messageCount: session.messages.length,
      lastMessageAt: session.messages[session.messages.length - 1]?.timestamp || session.updatedAt,
      createdAt: session.createdAt,
    }));


    res.json({ sessions: sessionsWithCount });
  } catch (error: any) {
    console.error("[Get Sessions Error]:", error);
    res.status(500).json({
      error: "Failed to fetch sessions",
      message: error.message,
    });
  }
}


/**
 * Get specific chat session with all messages
 * GET /api/chat/sessions/:sessionId
 *
 * NOTE: When authentication is disabled, returns any session
 */
export async function getChatSession(req: Request, res: Response) {
  try {
    // TODO: When enabling auth, uncomment this check
    // if (!req.user) {
    //   return res.status(401).json({ error: "Unauthorized" });
    // }

    const { sessionId } = req.params;
    const userId = req.user!.id;

    const session = await ChatSession.findOne({
      sessionId,
      userId,
    }).lean();


    if (!session) {
      return res.status(404).json({
        error: "Session not found",
        message: "The specified session does not exist",
      });
    }


    res.json({ session });
  } catch (error: any) {
    console.error("[Get Session Error]:", error);
    res.status(500).json({
      error: "Failed to fetch session",
      message: error.message,
    });
  }
}


/**
 * Create a new chat session
 * POST /api/chat/sessions
 */
export async function createChatSession(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }


    const { title, persona } = req.body;


    const newSessionId = uuidv4();
    const session = new ChatSession({
      userId: req.user.id,
      sessionId: newSessionId,
      title: title || "New Conversation",
      persona: persona || "clara", // Default to Clara
      messages: [],
    });


    await session.save();


    console.log(`[Chat] New session created: ${newSessionId} with persona: ${persona || 'clara'}`);


    res.status(201).json({
      sessionId: session.sessionId,
      title: session.title,
      persona: session.persona,
      createdAt: session.createdAt,
    });
  } catch (error: any) {
    console.error("[Create Session Error]:", error);
    res.status(500).json({
      error: "Failed to create session",
      message: error.message,
    });
  }
}


/**
 * Delete a chat session
 * DELETE /api/chat/sessions/:sessionId
 *
 * NOTE: When authentication is disabled, can delete any "anonymous" session
 */
export async function deleteChatSession(req: Request, res: Response) {
  try {
    // TODO: When enabling auth, uncomment this check
    // if (!req.user) {
    //   return res.status(401).json({ error: "Unauthorized" });
    // }

    const { sessionId } = req.params;
    const userId = req.user!.id;

    const result = await ChatSession.deleteOne({
      sessionId,
      userId,
    });


    if (result.deletedCount === 0) {
      return res.status(404).json({
        error: "Session not found",
        message: "The specified session does not exist",
      });
    }


    console.log(`[Chat] Session deleted: ${sessionId}`);


    res.json({
      message: "Session deleted successfully",
      sessionId,
    });
  } catch (error: any) {
    console.error("[Delete Session Error]:", error);
    res.status(500).json({
      error: "Failed to delete session",
      message: error.message,
    });
  }
}