let currentUser = { name: '', rollNumber: '', language: '' };
let availableBooksForInterest = [];

// Massive dictionary to translate the "Interests" dropdown into Native Languages!
const localizedInterests = {
    'English': [
        { value: 'Fantasy', label: 'Magic & Fantasy' },
        { value: 'Sci-Fi', label: 'Science Fiction' },
        { value: 'Romance', label: 'Love & Romance' },
        { value: 'Thriller', label: 'Horror & Thriller' },
        { value: 'Self-Help', label: 'Self-Help & Success' },
        { value: 'Tech', label: 'Technology & Coding' },
        { value: 'Science', label: 'Science & Facts' },
        { value: 'History', label: 'History & Humanity' },
        { value: 'Biography', label: 'Biographies' },
        { value: 'Classic', label: 'Classic Literature' }
    ],
    'Telugu': [
        { value: 'Fantasy', label: 'ఫాంటసీ (Fantasy)' },
        { value: 'Sci-Fi', label: 'సైన్స్ ఫిక్షన్ (Sci-Fi)' },
        { value: 'Romance', label: 'శృంగారం (Romance)' },
        { value: 'Thriller', label: 'థ్రిల్లర్ (Thriller)' },
        { value: 'Self-Help', label: 'స్వయం సహాయం (Self-Help)' },
        { value: 'Tech', label: 'సాంకేతికం (Tech)' },
        { value: 'Science', label: 'విజ్ఞాన శాస్త్రం (Science)' },
        { value: 'History', label: 'చరిత్ర (History)' },
        { value: 'Biography', label: 'జీవిత చరిత్ర (Biography)' },
        { value: 'Classic', label: 'క్లాసిక్స్ (Classics)' }
    ],
    'Hindi': [
        { value: 'Fantasy', label: 'फैंटेसी (Fantasy)' },
        { value: 'Sci-Fi', label: 'विज्ञान कथा (Sci-Fi)' },
        { value: 'Romance', label: 'रोमांस (Romance)' },
        { value: 'Thriller', label: 'थ्रिलर (Thriller)' },
        { value: 'Self-Help', label: 'आत्म-सहायता (Self-Help)' },
        { value: 'Tech', label: 'प्रौद्योगिकी (Tech)' },
        { value: 'Science', label: 'विज्ञान (Science)' },
        { value: 'History', label: 'इतिहास (History)' },
        { value: 'Biography', label: 'जीवनी (Biography)' },
        { value: 'Classic', label: 'क्लासिक (Classics)' }
    ],
    'Tamil': [
        { value: 'Fantasy', label: 'கற்பனை (Fantasy)' },
        { value: 'Sci-Fi', label: 'அறிவியல் புனைவு (Sci-Fi)' },
        { value: 'Romance', label: 'காதல் (Romance)' },
        { value: 'Thriller', label: 'த்ரில்லர் (Thriller)' },
        { value: 'Self-Help', label: 'சுய உதவி (Self-Help)' },
        { value: 'Tech', label: 'தொழில்நுட்பம் (Tech)' },
        { value: 'Science', label: 'அறிவியல் (Science)' },
        { value: 'History', label: 'வரலாறு (History)' },
        { value: 'Biography', label: 'சுயசரிதை (Biography)' },
        { value: 'Classic', label: 'கிளாசிக் (Classics)' }
    ],
    'Malayalam': [
        { value: 'Fantasy', label: 'ഫാന്റസി (Fantasy)' },
        { value: 'Sci-Fi', label: 'സയൻസ് ഫിക്ഷൻ (Sci-Fi)' },
        { value: 'Romance', label: 'റൊമാൻസ് (Romance)' },
        { value: 'Thriller', label: 'ത്രില്ലർ (Thriller)' },
        { value: 'Self-Help', label: 'സ്വയം സഹായം (Self-Help)' },
        { value: 'Tech', label: 'സാങ്കേതികവിദ്യ (Tech)' },
        { value: 'Science', label: 'ശാസ്ത്രം (Science)' },
        { value: 'History', label: 'ചരിത്രം (History)' },
        { value: 'Biography', label: 'ജീവചരിത്രം (Biography)' },
        { value: 'Classic', label: 'ക്ലാസിക് (Classics)' }
    ],
    'Kannada': [
        { value: 'Fantasy', label: 'ಫ್ಯಾಂಟಸಿ (Fantasy)' },
        { value: 'Sci-Fi', label: 'ವಿಜ್ಞಾನ ಕಾದಂಬರಿ (Sci-Fi)' },
        { value: 'Romance', label: 'ರೊಮ್ಯಾನ್ಸ್ (Romance)' },
        { value: 'Thriller', label: 'ಥ್ರಿಲ್ಲರ್ (Thriller)' },
        { value: 'Self-Help', label: 'ಸ್ವ-ಸಹಾಯ (Self-Help)' },
        { value: 'Tech', label: 'ತಂತ್ರಜ್ಞಾನ (Tech)' },
        { value: 'Science', label: 'ವಿಜ್ಞಾನ (Science)' },
        { value: 'History', label: 'ಇತಿಹಾಸ (History)' },
        { value: 'Biography', label: 'ಜೀವನ ಚರಿತ್ರೆ (Biography)' },
        { value: 'Classic', label: 'ಕ್ಲಾಸಿಕ್ (Classics)' }
    ],
    'Marathi': [
        { value: 'Fantasy', label: 'फँटसी (Fantasy)' },
        { value: 'Sci-Fi', label: 'विज्ञान कथा (Sci-Fi)' },
        { value: 'Romance', label: 'रोमान्स (Romance)' },
        { value: 'Thriller', label: 'थ्रिलर (Thriller)' },
        { value: 'Self-Help', label: 'स्व-मदत (Self-Help)' },
        { value: 'Tech', label: 'तंत्रज्ञान (Tech)' },
        { value: 'Science', label: 'विज्ञान (Science)' },
        { value: 'History', label: 'इतिहास (History)' },
        { value: 'Biography', label: 'चरित्र (Biography)' },
        { value: 'Classic', label: 'क्लासिक (Classics)' }
    ],
    'Bengali': [
        { value: 'Fantasy', label: 'ফ্যান্টাসি (Fantasy)' },
        { value: 'Sci-Fi', label: 'বিজ্ঞান কল্পকাহিনী (Sci-Fi)' },
        { value: 'Romance', label: 'রোমান্স (Romance)' },
        { value: 'Thriller', label: 'থ্রিলার (Thriller)' },
        { value: 'Self-Help', label: 'স্ব-সহায়তা (Self-Help)' },
        { value: 'Tech', label: 'প্রযুক্তি (Tech)' },
        { value: 'Science', label: 'বিজ্ঞান (Science)' },
        { value: 'History', label: 'ইতিহাস (History)' },
        { value: 'Biography', label: 'জীবনী (Biography)' },
        { value: 'Classic', label: 'ক্লাসিক (Classics)' }
    ],
    'Gujarati': [
        { value: 'Fantasy', label: 'ફેન્ટસી (Fantasy)' },
        { value: 'Sci-Fi', label: 'વિજ્ઞાન કથા (Sci-Fi)' },
        { value: 'Romance', label: 'રોમાન્સ (Romance)' },
        { value: 'Thriller', label: 'થ્રિલર (Thriller)' },
        { value: 'Self-Help', label: 'સ્વ-સહાય (Self-Help)' },
        { value: 'Tech', label: 'ટેકનોલોજી (Tech)' },
        { value: 'Science', label: 'વિજ્ઞાન (Science)' },
        { value: 'History', label: 'ઇતિહાસ (History)' },
        { value: 'Biography', label: 'જીવનચરિત્ર (Biography)' },
        { value: 'Classic', label: 'ક્લાસિક (Classics)' }
    ],
    'Punjabi': [
        { value: 'Fantasy', label: 'ਫੈਂਟਸੀ (Fantasy)' },
        { value: 'Sci-Fi', label: 'ਵਿਗਿਆਨ ਗਲਪ (Sci-Fi)' },
        { value: 'Romance', label: 'ਰੋਮਾਂਸ (Romance)' },
        { value: 'Thriller', label: 'ਥ੍ਰਿਲਰ (Thriller)' },
        { value: 'Self-Help', label: 'ਸਵੈ-ਸਹਾਇਤਾ (Self-Help)' },
        { value: 'Tech', label: 'ਤਕਨਾਲੋਜੀ (Tech)' },
        { value: 'Science', label: 'ਵਿਗਿਆਨ (Science)' },
        { value: 'History', label: 'ਇਤਿਹਾਸ (History)' },
        { value: 'Biography', label: 'ਜੀਵਨੀ (Biography)' },
        { value: 'Classic', label: 'ਕਲਾਸਿਕ (Classics)' }
    ]
};

async function goToPage2(event) {
    event.preventDefault();

    // 1. Save user info from Page 1
    currentUser.name = document.getElementById('student-name').value;
    currentUser.rollNumber = document.getElementById('roll-number').value;
    currentUser.language = document.getElementById('language-select').value;

    // 2. Populate the "Interests" dropdown using their NATIVE language!
    const interestSelect = document.getElementById('interest-select');
    interestSelect.innerHTML = '<option value="" disabled selected>Select your Interest...</option>';

    const userInterests = localizedInterests[currentUser.language] || localizedInterests['English'];
    userInterests.forEach(category => {
        const option = document.createElement('option');
        option.value = category.value; // The backend still uses English strings to filter
        option.textContent = category.label; // The frontend displays the native translation
        interestSelect.appendChild(option);
    });

    // 3. Reset the Book Selection Dropdown
    document.getElementById('book-select').innerHTML = '<option value="" disabled selected>First select an interest above...</option>';

    // 4. Hide Page 1, Show Page 2 with Animations
    document.getElementById('page-1').style.display = 'none';
    const page2 = document.getElementById('page-2');
    page2.style.display = 'block';

    page2.classList.remove('fade-in');
    void page2.offsetWidth;
    page2.classList.add('fade-in');

    // 5. Update titles
    document.getElementById('page-2-title').innerText = `Books in ${currentUser.language}`;
}

function goToPage1() {
    document.getElementById('page-2').style.display = 'none';
    const page1 = document.getElementById('page-1');
    page1.style.display = 'block';

    page1.classList.remove('fade-in');
    void page1.offsetWidth;
    page1.classList.add('fade-in');
}

// Fetch books filtered by BOTH Genre and Language!
async function loadBooksForInterestAndLanguage() {
    const genre = document.getElementById('interest-select').value;
    const language = currentUser.language;

    const selectElement = document.getElementById('book-select');
    selectElement.innerHTML = '<option value="" disabled selected>Loading books...</option>';

    try {
        const response = await fetch(`/api/books?genre=${genre}&language=${language}`);
        availableBooksForInterest = await response.json();

        selectElement.innerHTML = '<option value="" disabled selected>Select a masterpiece...</option>';

        if (availableBooksForInterest.length === 0) {
            selectElement.innerHTML = '<option value="" disabled selected>No books found for this language & interest.</option>';
            return;
        }

        availableBooksForInterest.forEach(book => {
            const option = document.createElement('option');
            option.value = book.id;
            // Display the beautiful native script Title, Author, and Quantity!
            option.textContent = `${book.title} (By ${book.author}) - ${book.quantity} copies`;
            selectElement.appendChild(option);
        });
    } catch (error) {
        showToast("Error connecting to server.", true);
    }
}

async function submitBorrowRequest(event) {
    event.preventDefault();

    const bookId = document.getElementById('book-select').value;

    if (!bookId) {
        showToast("Please select a book to borrow!", true);
        return;
    }

    const selectedBook = availableBooksForInterest.find(b => b.id == bookId);

    if (selectedBook.quantity <= 0) {
        showToast(`Sorry! "${selectedBook.title}" is completely checked out.`, true);
        return;
    }

    try {
        const response = await fetch('/api/borrow', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                book_id: bookId,
                name: currentUser.name,
                roll_number: currentUser.rollNumber
            })
        });

        const result = await response.json();

        if (response.ok) {
            showToast("✨ " + result.message, false);

            setTimeout(() => {
                document.getElementById('step1-form').reset();
                document.getElementById('step2-form').reset();
                goToPage1();
            }, 2000);

        } else {
            showToast("Error: " + result.error, true);
        }
    } catch (error) {
        showToast("Error borrowing book. Please try again.", true);
    }
}

function showToast(message, isError) {
    const toast = document.getElementById('toast');
    toast.textContent = message;

    if (isError) {
        toast.classList.add('error');
    } else {
        toast.classList.remove('error');
    }

    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}
