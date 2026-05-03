const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

console.log("Translating books into native scripts...");

const booksList = [
    // === ENGLISH ===
    ['Harry Potter', 'J.K. Rowling', 'Fantasy', 'English', 20],
    ['The Alchemist', 'Paulo Coelho', 'Fantasy', 'English', 40],
    ['Dune', 'Frank Herbert', 'Sci-Fi', 'English', 25],
    ['The Martian', 'Andy Weir', 'Sci-Fi', 'English', 30],
    ['Pride and Prejudice', 'Jane Austen', 'Romance', 'English', 30],
    ['The Notebook', 'Nicholas Sparks', 'Romance', 'English', 40],
    ['The Silent Patient', 'Alex Michaelides', 'Thriller', 'English', 28],
    ['Gone Girl', 'Gillian Flynn', 'Thriller', 'English', 24],
    ['Atomic Habits', 'James Clear', 'Self-Help', 'English', 50],
    ['Rich Dad Poor Dad', 'Robert T. Kiyosaki', 'Self-Help', 'English', 40],
    ['Clean Code', 'Robert C. Martin', 'Tech', 'English', 12],
    ['Database Systems', 'Ramez Elmasri', 'Tech', 'English', 15],
    ['A Brief History of Time', 'Stephen Hawking', 'Science', 'English', 30],
    ['Cosmos', 'Carl Sagan', 'Science', 'English', 20],
    ['Sapiens', 'Yuval Noah Harari', 'History', 'English', 45],
    ['The Diary of a Young Girl', 'Anne Frank', 'History', 'English', 24],
    ['Steve Jobs', 'Walter Isaacson', 'Biography', 'English', 35],
    ['Becoming', 'Michelle Obama', 'Biography', 'English', 40],
    ['To Kill a Mockingbird', 'Harper Lee', 'Classic', 'English', 40],
    ['Animal Farm', 'George Orwell', 'Classic', 'English', 45],

    // === TELUGU (తెలుగు) ===
    ['హ్యారీ పోటర్ (Harry Potter)', 'జె.కె. రౌలింగ్', 'Fantasy', 'Telugu', 20],
    ['ది ఆల్కెమిస్ట్ (The Alchemist)', 'పాలో కొయెల్హో', 'Fantasy', 'Telugu', 40],
    ['డ్యూన్ (Dune)', 'ఫ్రాంక్ హెర్బర్ట్', 'Sci-Fi', 'Telugu', 25],
    ['ది మార్షియన్ (The Martian)', 'ఆండీ వీర్', 'Sci-Fi', 'Telugu', 30],
    ['ప్రైడ్ అండ్ ప్రిజుడిస్ (Pride & Prejudice)', 'జేన్ ఆస్టెన్', 'Romance', 'Telugu', 30],
    ['ది నోట్‌బుక్ (The Notebook)', 'నికోలస్ స్పార్క్స్', 'Romance', 'Telugu', 40],
    ['ది సైలెంట్ పేషెంట్ (The Silent Patient)', 'అలెక్స్ మైఖేలిడ్స్', 'Thriller', 'Telugu', 28],
    ['గాన్ గర్ల్ (Gone Girl)', 'గిలియన్ ఫ్లిన్', 'Thriller', 'Telugu', 24],
    ['అటామిక్ హ్యాబిట్స్ (Atomic Habits)', 'జేమ్స్ క్లియర్', 'Self-Help', 'Telugu', 50],
    ['రిచ్ డాడ్ పూర్ డాడ్ (Rich Dad Poor Dad)', 'రాబర్ట్ కియోసాకి', 'Self-Help', 'Telugu', 40],
    ['క్లీన్ కోడ్ (Clean Code)', 'రాబర్ట్ సి మార్టిన్', 'Tech', 'Telugu', 12],
    ['డేటాబేస్ సిస్టమ్స్ (Database Systems)', 'రమేజ్ ఎల్మాస్రి', 'Tech', 'Telugu', 15],
    ['ఎ బ్రీఫ్ హిస్టరీ ఆఫ్ టైమ్ (History of Time)', 'స్టీఫెన్ హాకింగ్', 'Science', 'Telugu', 30],
    ['కాస్మోస్ (Cosmos)', 'కార్ల్ సాగన్', 'Science', 'Telugu', 20],
    ['సేపియన్స్ (Sapiens)', 'యువల్ నోవా హరారి', 'History', 'Telugu', 45],
    ['ది డైరీ ఆఫ్ ఎ యంగ్ గర్ల్ (Anne Frank)', 'అన్నే ఫ్రాంక్', 'History', 'Telugu', 24],
    ['స్టీవ్ జాబ్స్ (Steve Jobs)', 'వాల్టర్ ఐజాక్సన్', 'Biography', 'Telugu', 35],
    ['బికమింగ్ (Becoming)', 'మిచెల్ ఒబామా', 'Biography', 'Telugu', 40],
    ['టు కిల్ ఎ మాకింగ్‌బర్డ్ (Mockingbird)', 'హార్పర్ లీ', 'Classic', 'Telugu', 40],
    ['యానిమల్ ఫార్మ్ (Animal Farm)', 'జార్జ్ ఆర్వెల్', 'Classic', 'Telugu', 45],

    // === HINDI (हिंदी) ===
    ['हैरी पॉटर (Harry Potter)', 'जे.के. रोलिंग', 'Fantasy', 'Hindi', 20],
    ['द अल्केमिस्ट (The Alchemist)', 'पाउलो कोएल्हो', 'Fantasy', 'Hindi', 40],
    ['ड्यून (Dune)', 'फ्रैंक हर्बर्ट', 'Sci-Fi', 'Hindi', 25],
    ['द मार्शियन (The Martian)', 'एंडी वियर', 'Sci-Fi', 'Hindi', 30],
    ['प्राइड एंड प्रेजुडिस (Pride & Prejudice)', 'जेन ऑस्टेन', 'Romance', 'Hindi', 30],
    ['द नोटबुक (The Notebook)', 'निकोलस स्पार्क्स', 'Romance', 'Hindi', 40],
    ['द साइलेंट पेशेंट (The Silent Patient)', 'एलेक्स माइकलिड्स', 'Thriller', 'Hindi', 28],
    ['गॉन गर्ल (Gone Girl)', 'गिलियन फ्लिन', 'Thriller', 'Hindi', 24],
    ['एटॉमिक हैबिट्स (Atomic Habits)', 'जेम्स क्लियर', 'Self-Help', 'Hindi', 50],
    ['रिच डैड पुअर डैड (Rich Dad Poor Dad)', 'रॉबर्ट कियोसाकी', 'Self-Help', 'Hindi', 40],
    ['क्लीन कोड (Clean Code)', 'रॉबर्ट सी. मार्टिन', 'Tech', 'Hindi', 12],
    ['डेटाबेस सिस्टम्स (Database Systems)', 'रमीज़ एलमास्री', 'Tech', 'Hindi', 15],
    ['ए ब्रीफ हिस्ट्री ऑफ टाइम (History of Time)', 'स्टीफन हॉकिंग', 'Science', 'Hindi', 30],
    ['कॉसमॉस (Cosmos)', 'कार्ल सागन', 'Science', 'Hindi', 20],
    ['सेपियंस (Sapiens)', 'युवल नोआ हरारी', 'History', 'Hindi', 45],
    ['द डायरी ऑफ ए यंग गर्ल (Anne Frank)', 'ऐनी फ्रैंक', 'History', 'Hindi', 24],
    ['स्टीव जॉब्स (Steve Jobs)', 'वाल्टर इसाकसन', 'Biography', 'Hindi', 35],
    ['बिकमिंग (Becoming)', 'मिशेल ओबामा', 'Biography', 'Hindi', 40],
    ['टू किल ए मॉकिंगबर्ड (Mockingbird)', 'हार्पर ली', 'Classic', 'Hindi', 40],
    ['एनिमल फार्म (Animal Farm)', 'जॉर्ज ओरवेल', 'Classic', 'Hindi', 45],

    // === TAMIL (தமிழ்) ===
    ['ஹாரி பாட்டர் (Harry Potter)', 'ஜே.கே. ரௌலிங்', 'Fantasy', 'Tamil', 20],
    ['தி ஆல்கெமிஸ்ட் (The Alchemist)', 'பாலோ கோயல்ஹோ', 'Fantasy', 'Tamil', 40],
    ['டூன் (Dune)', 'பிராங்க் ஹெர்பர்ட்', 'Sci-Fi', 'Tamil', 25],
    ['தி மார்ஷியன் (The Martian)', 'ஆண்டி வீயர்', 'Sci-Fi', 'Tamil', 30],
    ['பிரைட் அண்ட் பிரிஜுடிஸ் (Pride & Prejudice)', 'ஜேன் ஆஸ்டன்', 'Romance', 'Tamil', 30],
    ['தி நோட்புக் (The Notebook)', 'நிக்கோலஸ் ஸ்பார்க்ஸ்', 'Romance', 'Tamil', 40],
    ['தி சைலண்ட் பேஷண்ட் (The Silent Patient)', 'அலெக்ஸ் மைக்கேலிட்ஸ்', 'Thriller', 'Tamil', 28],
    ['கான் கேர்ள் (Gone Girl)', 'கில்லியன் ஃபிளின்', 'Thriller', 'Tamil', 24],
    ['அட்டாமிக் ஹாபிட்ஸ் (Atomic Habits)', 'ஜேம்ஸ் கிளியர்', 'Self-Help', 'Tamil', 50],
    ['ரிச் டாட் புவர் டாட் (Rich Dad Poor Dad)', 'ராபர்ட் கியோசாகி', 'Self-Help', 'Tamil', 40],
    ['கிளீன் கோட் (Clean Code)', 'ராபர்ட் சி மார்ட்டின்', 'Tech', 'Tamil', 12],
    ['டேட்டாபேஸ் சிஸ்டம்ஸ் (Database Systems)', 'ரமேஸ் எல்மாஸ்ரி', 'Tech', 'Tamil', 15],
    ['எ ப்ரீஃப் ஹிஸ்டரி ஆஃப் டைம் (History of Time)', 'ஸ்டீபன் ஹாக்கிங்', 'Science', 'Tamil', 30],
    ['காஸ்மாஸ் (Cosmos)', 'கார்ல் சாகன்', 'Science', 'Tamil', 20],
    ['சேப்பியன்ஸ் (Sapiens)', 'யுவல் நோவா ஹராரி', 'History', 'Tamil', 45],
    ['தி டைரி ஆஃப் எ யங் கேர்ள் (Anne Frank)', 'ஆன் ஃபிராங்க்', 'History', 'Tamil', 24],
    ['ஸ்டீவ் ஜாப்ஸ் (Steve Jobs)', 'வால்டர் ஐசக்சன்', 'Biography', 'Tamil', 35],
    ['பிகமிங் (Becoming)', 'மிச்செல் ஒபாமா', 'Biography', 'Tamil', 40],
    ['டு கில் எ மாக்கிங்பேர்ட் (Mockingbird)', 'ஹார்பர் லீ', 'Classic', 'Tamil', 40],
    ['அனிமல் ஃபார்ம் (Animal Farm)', 'ஜார்ஜ் ஆர்வெல்', 'Classic', 'Tamil', 45],

    // === MALAYALAM (മലയാളം) ===
    ['ഹാരി പോട്ടർ (Harry Potter)', 'ജെ.കെ. റൗളിംഗ്', 'Fantasy', 'Malayalam', 20],
    ['ദി ആൽക്കെമിസ്റ്റ് (The Alchemist)', 'പൗലോ കൊയ്‌ലോ', 'Fantasy', 'Malayalam', 40],
    ['ഡ്യൂൺ (Dune)', 'ഫ്രാങ്ക് ഹെർബർട്ട്', 'Sci-Fi', 'Malayalam', 25],
    ['ദി മാർഷിയൻ (The Martian)', 'ആൻഡി വീർ', 'Sci-Fi', 'Malayalam', 30],
    ['പ്രൈഡ് ആൻഡ് പ്രിജുഡിസ് (Pride & Prejudice)', 'ജെയ്ൻ ഓസ്റ്റൺ', 'Romance', 'Malayalam', 30],
    ['ദി നോട്ട്ബുക്ക് (The Notebook)', 'നിക്കോളാസ് സ്പാർക്സ്', 'Romance', 'Malayalam', 40],
    ['ദി സൈലന്റ് പേഷ്യന്റ് (The Silent Patient)', 'അലക്സ് മൈക്കലിഡ്സ്', 'Thriller', 'Malayalam', 28],
    ['ഗോൺ ഗേൾ (Gone Girl)', 'ഗില്ലിയൻ ഫ്ലിൻ', 'Thriller', 'Malayalam', 24],
    ['അറ്റോമിക് ഹാബിറ്റ്സ് (Atomic Habits)', 'ജെയിംസ് ക്ലിയർ', 'Self-Help', 'Malayalam', 50],
    ['റിച്ച് ഡാഡ് പുവർ ഡാഡ് (Rich Dad Poor Dad)', 'റോബർട്ട് കിയോസാക്കി', 'Self-Help', 'Malayalam', 40],
    ['ക്ലീൻ കോഡ് (Clean Code)', 'റോബർട്ട് സി മാർട്ടിൻ', 'Tech', 'Malayalam', 12],
    ['ഡാറ്റാബേസ് സിസ്റ്റംസ് (Database Systems)', 'രമേസ് എൽമാസ്രി', 'Tech', 'Malayalam', 15],
    ['എ ബ്രീഫ് ഹിస్టറി ഓഫ് ടൈം (History of Time)', 'സ്റ്റീഫൻ ഹോക്കിംഗ്', 'Science', 'Malayalam', 30],
    ['കോസ്മോസ് (Cosmos)', 'കാൾ സാഗൻ', 'Science', 'Malayalam', 20],
    ['സാപ്പിയൻസ് (Sapiens)', 'യുവാൽ നോവാ ഹരാരി', 'History', 'Malayalam', 45],
    ['ദി ഡയറി ഓഫ് എ യംഗ് ഗേൾ (Anne Frank)', 'ആൻ ഫ്രാങ്ക്', 'History', 'Malayalam', 24],
    ['സ്റ്റീവ് ജോബ്സ് (Steve Jobs)', 'വാൾട്ടർ ഐസക്സൺ', 'Biography', 'Malayalam', 35],
    ['ബികമിംഗ് (Becoming)', 'മിഷേൽ ഒബാമ', 'Biography', 'Malayalam', 40],
    ['ടു കിൽ എ മോക്കിംഗ്ബേർഡ് (Mockingbird)', 'ഹാർപ്പർ ലീ', 'Classic', 'Malayalam', 40],
    ['അനിമൽ ഫാം (Animal Farm)', 'ജോർജ് ഓർവെൽ', 'Classic', 'Malayalam', 45],

    // === KANNADA (ಕನ್ನಡ) ===
    ['ಹ್ಯಾರಿ ಪಾಟರ್ (Harry Potter)', 'ಜೆ.ಕೆ. ರೌಲಿಂಗ್', 'Fantasy', 'Kannada', 20],
    ['ದಿ ಆಲ್ಕೆಮಿಸ್ಟ್ (The Alchemist)', 'ಪಾಲೊ ಕೊಯೆಲ್ಹೋ', 'Fantasy', 'Kannada', 40],
    ['ಡ್ಯೂನ್ (Dune)', 'ಫ್ರಾಂಕ್ ಹರ್ಬರ್ಟ್', 'Sci-Fi', 'Kannada', 25],
    ['ದಿ ಮಾರ್ಷಿಯನ್ (The Martian)', 'ಆಂಡಿ ವೀರ್', 'Sci-Fi', 'Kannada', 30],
    ['ಪ್ರೈಡ್ ಅಂಡ್ ಪ್ರಿಜುಡಿಸ್ (Pride & Prejudice)', 'ಜೇನ್ ಆಸ್ಟೆನ್', 'Romance', 'Kannada', 30],
    ['ದಿ ನೋಟ್‌ಬುಕ್ (The Notebook)', 'ನಿಕೋಲಸ್ ಸ್ಪಾರ್ಕ್ಸ್', 'Romance', 'Kannada', 40],
    ['ದಿ ಸೈಲೆಂಟ್ ಪೇಷೆಂಟ್ (The Silent Patient)', 'ಅಲೆಕ್ಸ್ ಮೈಕೆಲಿಡ್ಸ್', 'Thriller', 'Kannada', 28],
    ['ಗಾನ್ ಗರ್ಲ್ (Gone Girl)', 'ಗಿಲಿಯನ್ ಫ್ಲಿನ್', 'Thriller', 'Kannada', 24],
    ['ಅಟಾಮಿಕ್ ಹ್ಯಾಬಿಟ್ಸ್ (Atomic Habits)', 'ಜೇಮ್ಸ್ ಕ್ಲಿಯರ್', 'Self-Help', 'Kannada', 50],
    ['ರಿಚ್ ಡ್ಯಾಡ್ ಪೂರ್ ಡ್ಯಾಡ್ (Rich Dad Poor Dad)', 'ರಾಬರ್ಟ್ ಕಿಯೋಸಾಕಿ', 'Self-Help', 'Kannada', 40],
    ['ಕ್ಲೀನ್ ಕೋಡ್ (Clean Code)', 'ರಾಬರ್ಟ್ ಸಿ ಮಾರ್ಟಿನ್', 'Tech', 'Kannada', 12],
    ['ಡೇಟಾಬೇಸ್ ಸಿಸ್ಟಮ್ಸ್ (Database Systems)', 'ರಮೇಜ್ ಎಲ್ಮಾಸ್ರಿ', 'Tech', 'Kannada', 15],
    ['ಎ ಬ್ರೀಫ್ ಹಿಸ್ಟರಿ ಆಫ್ ಟೈಮ್ (History of Time)', 'ಸ್ಟೀಫನ್ ಹಾಕಿಂಗ್', 'Science', 'Kannada', 30],
    ['ಕಾಸ್ಮಾಸ್ (Cosmos)', 'ಕಾರ್ಲ್ ಸಗಾನ್', 'Science', 'Kannada', 20],
    ['ಸೇಪಿಯನ್ಸ್ (Sapiens)', 'ಯುವಾಲ್ ನೋವಾ ಹರಾರಿ', 'History', 'Kannada', 45],
    ['ದಿ ಡೈರಿ ಆಫ್ ಎ ಯಂಗ್ ಗರ್ಲ್ (Anne Frank)', 'ಅನ್ನಿ ಫ್ರಾಂಕ್', 'History', 'Kannada', 24],
    ['ಸ್ಟೀವ್ ಜಾಬ್ಸ್ (Steve Jobs)', 'ವಾಲ್ಟರ್ ಐಸಾಕ್ಸನ್', 'Biography', 'Kannada', 35],
    ['ಬಿಕಮಿಂಗ್ (Becoming)', 'ಮಿಚೆಲ್ ಒಬಾಮಾ', 'Biography', 'Kannada', 40],
    ['ಟು ಕಿಲ್ ಎ ಮಾಕಿಂಗ್‌ಬರ್ಡ್ (Mockingbird)', 'ಹಾರ್ಪರ್ ಲೀ', 'Classic', 'Kannada', 40],
    ['ಅನಿಮಲ್ ಫಾರ್ಮ್ (Animal Farm)', 'ಜಾರ್ಜ್ ಆರ್ವೆಲ್', 'Classic', 'Kannada', 45],

    // === MARATHI (मराठी) ===
    ['हॅरी पॉटर (Harry Potter)', 'जे.के. रोलिंग', 'Fantasy', 'Marathi', 20],
    ['द अल्केमिस्ट (The Alchemist)', 'पाउलो कोएल्हो', 'Fantasy', 'Marathi', 40],
    ['ड्यून (Dune)', 'फ्रँक हर्बर्ट', 'Sci-Fi', 'Marathi', 25],
    ['द मार्शियन (The Martian)', 'अँडी वियर', 'Sci-Fi', 'Marathi', 30],
    ['प्राइड अँड प्रेज्युडिस (Pride & Prejudice)', 'जेन ऑस्टेन', 'Romance', 'Marathi', 30],
    ['द नोटबुक (The Notebook)', 'निकोलस स्पार्क्स', 'Romance', 'Marathi', 40],
    ['द सायलेंट पेशंट (The Silent Patient)', 'अॅलेक्स मायकेलिड्स', 'Thriller', 'Marathi', 28],
    ['गॉन गर्ल (Gone Girl)', 'गिलियन फ्लिन', 'Thriller', 'Marathi', 24],
    ['अॅटॉमिक हॅबिट्स (Atomic Habits)', 'जेम्स क्लिअर', 'Self-Help', 'Marathi', 50],
    ['रिच डॅड पुअर डॅड (Rich Dad Poor Dad)', 'रॉबर्ट कियोसाकी', 'Self-Help', 'Marathi', 40],
    ['क्लीन कोड (Clean Code)', 'रॉबर्ट सी. मार्टिन', 'Tech', 'Marathi', 12],
    ['डेटाबेस सिस्टिम्स (Database Systems)', 'रमीझ एलमास्री', 'Tech', 'Marathi', 15],
    ['अ ब्रीफ हिस्ट्री ऑफ टाइम (History of Time)', 'स्टीफन हॉकिंग', 'Science', 'Marathi', 30],
    ['कॉसमॉस (Cosmos)', 'कार्ल सेगन', 'Science', 'Marathi', 20],
    ['सेपियन्स (Sapiens)', 'युवल नोआ हरारी', 'History', 'Marathi', 45],
    ['द डायरी ऑफ अ यंग गर्ल (Anne Frank)', 'अॅन फ्रँक', 'History', 'Marathi', 24],
    ['स्टीव्ह जॉब्स (Steve Jobs)', 'वॉल्टर आयझॅक्सन', 'Biography', 'Marathi', 35],
    ['बिकमिंग (Becoming)', 'मिशेल ओबामा', 'Biography', 'Marathi', 40],
    ['टू किल अ मॉकिंगबर्ड (Mockingbird)', 'हार्पर ली', 'Classic', 'Marathi', 40],
    ['अॅनिमल फार्म (Animal Farm)', 'जॉर्ज ओरवेल', 'Classic', 'Marathi', 45],

    // === BENGALI (বাংলা) ===
    ['হ্যারি পটার (Harry Potter)', 'জে.কে. রাউলিং', 'Fantasy', 'Bengali', 20],
    ['দ্য অ্যালকেমিস্ট (The Alchemist)', 'পাওলো কোয়েলহো', 'Fantasy', 'Bengali', 40],
    ['ডুন (Dune)', 'ফ্রাঙ্ক হার্বার্ট', 'Sci-Fi', 'Bengali', 25],
    ['দ্য মার্শিয়ান (The Martian)', 'অ্যান্ডি উইয়ার', 'Sci-Fi', 'Bengali', 30],
    ['প্রাইড অ্যান্ড প্রেজুডিস (Pride & Prejudice)', 'জেন অস্টেন', 'Romance', 'Bengali', 30],
    ['দ্য নোটবুক (The Notebook)', 'নিকোলাস স্পার্কস', 'Romance', 'Bengali', 40],
    ['দ্য সাইলেন্ট পেশেন্ট (The Silent Patient)', 'অ্যালেক্স মাইকেলিডস', 'Thriller', 'Bengali', 28],
    ['গন গার্ল (Gone Girl)', 'গিলিয়ান ফ্লিন', 'Thriller', 'Bengali', 24],
    ['অ্যাটমিক হ্যাবিটস (Atomic Habits)', 'জেমস ক্লিয়ার', 'Self-Help', 'Bengali', 50],
    ['রিচ ড্যাড পুওর ড্যাড (Rich Dad Poor Dad)', 'রবার্ট কিয়োসাকি', 'Self-Help', 'Bengali', 40],
    ['ক্লিন কোড (Clean Code)', 'রবার্ট সি মার্টিন', 'Tech', 'Bengali', 12],
    ['ডাটাবেস সিস্টেমস (Database Systems)', 'রমেজ এলমাসরি', 'Tech', 'Bengali', 15],
    ['আ ব্রিফ হিস্ট্রি অফ টাইম (History of Time)', 'স্টিফেন হকিং', 'Science', 'Bengali', 30],
    ['কসমস (Cosmos)', 'কার্ল সেগান', 'Science', 'Bengali', 20],
    ['স্যাপিয়েন্স (Sapiens)', 'ইউভাল নোয়া হারারি', 'History', 'Bengali', 45],
    ['দ্য ডায়েরি অফ আ ইয়াং গার্ল (Anne Frank)', 'অ্যানা ফ্রাঙ্ক', 'History', 'Bengali', 24],
    ['স্টিভ জবস (Steve Jobs)', 'ওয়াল্টার আইজ্যাকসন', 'Biography', 'Bengali', 35],
    ['বিকামিং (Becoming)', 'মিশেল ওবামা', 'Biography', 'Bengali', 40],
    ['টু কিল আ মকিংবার্ড (Mockingbird)', 'হার্পার লি', 'Classic', 'Bengali', 40],
    ['অ্যানিমেল ফার্ম (Animal Farm)', 'জর্জ অরওয়েল', 'Classic', 'Bengali', 45],

    // === GUJARATI (ગુજરાતી) ===
    ['હેરી પોટર (Harry Potter)', 'જે.કે. રોલિંગ', 'Fantasy', 'Gujarati', 20],
    ['ધ આલ્કેમિસ્ટ (The Alchemist)', 'પાઉલો કોએલ્હો', 'Fantasy', 'Gujarati', 40],
    ['ડ્યૂન (Dune)', 'ફ્રેન્ક હર્બર્ટ', 'Sci-Fi', 'Gujarati', 25],
    ['ધ માર્શિયન (The Martian)', 'એન્ડી વીર', 'Sci-Fi', 'Gujarati', 30],
    ['પ્રાઇડ એન્ડ પ્રેજ્યુડિસ (Pride & Prejudice)', 'જેન ઓસ્ટેન', 'Romance', 'Gujarati', 30],
    ['ધ નોટબુક (The Notebook)', 'નિકોલસ સ્પાર્ક્સ', 'Romance', 'Gujarati', 40],
    ['ધ સાયલન્ટ પેશન્ટ (The Silent Patient)', 'એલેક્સ માઇકલિડ્સ', 'Thriller', 'Gujarati', 28],
    ['ગોન ગર્લ (Gone Girl)', 'ગિલિયન ફ્લિન', 'Thriller', 'Gujarati', 24],
    ['એટોમિક હેબિટ્સ (Atomic Habits)', 'જેમ્સ ક્લિયર', 'Self-Help', 'Gujarati', 50],
    ['રિચ ડેડ પુઅર ડેડ (Rich Dad Poor Dad)', 'રોબર્ટ કિયોસાકી', 'Self-Help', 'Gujarati', 40],
    ['ક્લીન કોડ (Clean Code)', 'રોબર્ટ સી માર્ટિન', 'Tech', 'Gujarati', 12],
    ['ડેટાબેઝ સિસ્ટમ્સ (Database Systems)', 'રમેઝ એલ્માસરી', 'Tech', 'Gujarati', 15],
    ['અ બ્રીફ હિસ્ટ્રી ઓફ ટાઇમ (History of Time)', 'સ્ટીફન હોકિંગ', 'Science', 'Gujarati', 30],
    ['કોસ્મોસ (Cosmos)', 'કાર્લ સેગન', 'Science', 'Gujarati', 20],
    ['સેપિયન્સ (Sapiens)', 'યુવલ નોઆ હરારી', 'History', 'Gujarati', 45],
    ['ધ ડાયરી ઓફ અ યંગ ગર્લ (Anne Frank)', 'એની ફ્રેન્ક', 'History', 'Gujarati', 24],
    ['સ્ટીવ જોબ્સ (Steve Jobs)', 'વોલ્ટર આઇઝેક્સન', 'Biography', 'Gujarati', 35],
    ['બીકમિંગ (Becoming)', 'મિશેલ ઓબામા', 'Biography', 'Gujarati', 40],
    ['ટુ કિલ અ મોકિંગબર્ડ (Mockingbird)', 'હાર્પર લી', 'Classic', 'Gujarati', 40],
    ['એનિમલ ફાર્મ (Animal Farm)', 'જ્યોર્જ ઓરવેલ', 'Classic', 'Gujarati', 45],

    // === PUNJABI (ਪੰਜਾਬੀ) ===
    ['ਹੈਰੀ ਪੋਟਰ (Harry Potter)', 'ਜੇ.ਕੇ. ਰੋਲਿੰਗ', 'Fantasy', 'Punjabi', 20],
    ['ਦ ਅਲਕੈਮਿਸਟ (The Alchemist)', 'ਪਾਉਲੋ ਕੋਏਲਹੋ', 'Fantasy', 'Punjabi', 40],
    ['ਡਿਊਨ (Dune)', 'ਫਰੈਂਕ ਹਰਬਰਟ', 'Sci-Fi', 'Punjabi', 25],
    ['ਦ ਮਾਰਸ਼ੀਅਨ (The Martian)', 'ਐਂਡੀ ਵੀਅਰ', 'Sci-Fi', 'Punjabi', 30],
    ['ਪ੍ਰਾਈਡ ਐਂਡ ਪ੍ਰੈਜੁਡਿਸ (Pride & Prejudice)', 'ਜੇਨ ਆਸਟਨ', 'Romance', 'Punjabi', 30],
    ['ਦ ਨੋਟબੁੱਕ (The Notebook)', 'ਨਿਕੋਲਸ ਸਪਾਰਕਸ', 'Romance', 'Punjabi', 40],
    ['ਦ ਸਾਈਲੈਂਟ ਪੇਸ਼ੈਂਟ (The Silent Patient)', 'ਐਲੇਕਸ ਮਾਈਕਲੀਡਸ', 'Thriller', 'Punjabi', 28],
    ['ਗੋਨ ਗਰਲ (Gone Girl)', 'ਗਿਲੀਅਨ ਫਲਿਨ', 'Thriller', 'Punjabi', 24],
    ['ਐਟੋਮਿਕ ਹੈਬਿਟਸ (Atomic Habits)', 'ਜੇਮਸ ਕਲੀਅਰ', 'Self-Help', 'Punjabi', 50],
    ['ਰਿਚ ਡੈਡ ਪੂਅਰ ਡੈਡ (Rich Dad Poor Dad)', 'ਰਾਬਰਟ ਕਿਯੋਸਾਕੀ', 'Self-Help', 'Punjabi', 40],
    ['ਕਲੀਨ ਕੋਡ (Clean Code)', 'ਰਾਬਰਟ ਸੀ ਮਾਰਟਿਨ', 'Tech', 'Punjabi', 12],
    ['ਡਾਟਾਬੇਸ ਸਿਸਟਮਸ (Database Systems)', 'ਰਮੇਜ਼ ਐਲਮਾਸਰੀ', 'Tech', 'Punjabi', 15],
    ['ਅ ਬਰੀਫ ਹਿਸਟਰੀ ਆਫ਼ ਟਾਈਮ (History of Time)', 'ਸਟੀਫਨ ਹਾਕਿੰਗ', 'Science', 'Punjabi', 30],
    ['ਕੋਸਮੋਸ (Cosmos)', 'ਕਾਰਲ ਸੇਗਨ', 'Science', 'Punjabi', 20],
    ['ਸੇਪੀਅਨਸ (Sapiens)', 'ਯੁਵਲ ਨੋਆ ਹਰਾਰੀ', 'History', 'Punjabi', 45],
    ['ਦ ਡਾਇਰੀ ਆਫ਼ ਅ ਯੰਗ ਗਰਲ (Anne Frank)', 'ਐਨੇ ਫਰੈਂਕ', 'History', 'Punjabi', 24],
    ['ਸਟੀਵ ਜੋਬਸ (Steve Jobs)', 'ਵਾਲਟਰ ਆਈਜ਼ੈਕਸਨ', 'Biography', 'Punjabi', 35],
    ['ਬਿਕਮਿੰਗ (Becoming)', 'ਮਿਸ਼ੇਲ ਓਬਾਮਾ', 'Biography', 'Punjabi', 40],
    ['ਟੂ ਕਿਲ ਅ ਮੋਕਿੰਗਬਰਡ (Mockingbird)', 'ਹਾਰਪਰ ਲੀ', 'Classic', 'Punjabi', 40],
    ['ਐਨੀਮਲ ਫਾਰਮ (Animal Farm)', 'ਜਾਰਜ ਆਰਵੈਲ', 'Classic', 'Punjabi', 45]
];

db.serialize(() => {
    db.run("DROP TABLE IF EXISTS borrowings");
    db.run("DROP TABLE IF EXISTS members");
    db.run("DROP TABLE IF EXISTS books");

    db.run(`CREATE TABLE books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        genre TEXT NOT NULL,
        language TEXT NOT NULL,
        quantity INTEGER NOT NULL
    )`);

    db.run(`CREATE TABLE members (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        roll_number TEXT NOT NULL UNIQUE,
        join_date DATE DEFAULT (date('now'))
    )`);

    db.run(`CREATE TABLE borrowings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        book_id INTEGER,
        member_id INTEGER,
        borrow_date DATE DEFAULT (date('now')),
        return_date DATE,
        status TEXT DEFAULT 'borrowed',
        FOREIGN KEY(book_id) REFERENCES books(id),
        FOREIGN KEY(member_id) REFERENCES members(id)
    )`);

    const stmt = db.prepare("INSERT INTO books (title, author, genre, language, quantity) VALUES (?, ?, ?, ?, ?)");
    for (const book of booksList) {
        stmt.run(book);
    }
    stmt.finalize((err) => {
        if (err) console.error("Error adding translated books:", err);
        else console.log("✅ MASSIVE SUCCESS! The localized translation library has been fully built!");
    });
});

db.close();
