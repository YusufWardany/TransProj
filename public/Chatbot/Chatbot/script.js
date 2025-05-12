const chatBody = document.querySelector(".chat-body");
const messageInput = document.querySelector(".message-input");
const sendMessageButton = document.querySelector("#send-message");
const chatbotToggler = document.querySelector("#chatbot-toggler");
const closeChatbotBtn = document.querySelector("#close-chatbot");
const startRecordingBtn = document.getElementById('start-recording');
const playResponseBtn = document.getElementById('play-response');

// API SETUP
const API_KEY = "AIzaSyA3zGWAMiGArMRYERr5cc77bQvabv2aNbI";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

const userData = {
    message: null
}

// Initialize chatbot with quick questions buttons
document.querySelectorAll('.quick-question-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const question = e.target.getAttribute('data-question');
        messageInput.value = question;
        // Auto send the question
        setTimeout(() => {
            const event = new Event('submit', { bubbles: true });
            document.querySelector('.chat-form').dispatchEvent(event);
        }, 100);
    });
});

// create message element with dynamic classes and return it
const createMessageElement = (content, ...classes) => {
    const div = document.createElement("div");
    div.classList.add("message", ...classes);
    div.innerHTML = content;
    return div;
}

// Voice Recognition
function setupVoiceRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.lang = 'ar-EG'; // Arabic (Egypt)
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        startRecordingBtn.addEventListener('click', () => {
            try {
                recognition.start();
                startRecordingBtn.classList.add('recording');
                startRecordingBtn.innerHTML = 'mic_off';
                messageInput.placeholder = "جاري الاستماع...";
            } catch (e) {
                console.error("Error starting recognition:", e);
                showError("حدث خطأ في تشغيل الميكروفون");
            }
        });

        recognition.onresult = (event) => {
            const speechText = event.results[0][0].transcript;
            messageInput.value = speechText;
            startRecordingBtn.classList.remove('recording');
            startRecordingBtn.innerHTML = 'mic';
            messageInput.placeholder = "اكتب رسالتك هنا...";
            
            // Auto-send the voice message
            if (speechText.trim().length > 0) {
                const event = new Event('submit', { bubbles: true });
                document.querySelector('.chat-form').dispatchEvent(event);
            }
        };

        recognition.onerror = (event) => {
            console.error('Recognition error:', event.error);
            startRecordingBtn.classList.remove('recording');
            startRecordingBtn.innerHTML = 'mic';
            messageInput.placeholder = "اكتب رسالتك هنا...";
            
            let errorMessage = "حدث خطأ في التعرف على الصوت";
            if (event.error === 'no-speech') {
                errorMessage = "لم يتم الكشف عن صوت";
            } else if (event.error === 'not-allowed') {
                errorMessage = "يجب السماح باستخدام الميكروفون";
            }
            
            showError(errorMessage);
        };

        recognition.onend = () => {
            if (startRecordingBtn.classList.contains('recording')) {
                startRecordingBtn.classList.remove('recording');
                startRecordingBtn.innerHTML = 'mic';
                messageInput.placeholder = "اكتب رسالتك هنا...";
            }
        };
    } else {
        startRecordingBtn.disabled = true;
        startRecordingBtn.title = "API التعرف على الصوت غير مدعوم في هذا المتصفح";
        console.warn('Speech Recognition API not supported');
    }
}

// Text-to-Speech
function speakText(text) {
    if ('speechSynthesis' in window) {
        // Stop any current speech
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ar-SA'; // Arabic (Saudi Arabia)
        utterance.rate = 0.9; // Slower speed for better clarity
        utterance.pitch = 1;
        utterance.volume = 1;
        
        // Find Arabic voice if available
        const voices = window.speechSynthesis.getVoices();
        const arabicVoice = voices.find(voice => voice.lang.includes('ar'));
        if (arabicVoice) {
            utterance.voice = arabicVoice;
        }
        
        utterance.onstart = () => {
            playResponseBtn.innerHTML = 'volume_off';
        };
        
        utterance.onend = () => {
            playResponseBtn.innerHTML = 'volume_up';
        };
        
        window.speechSynthesis.speak(utterance);
    } else {
        showError("ميزة تحويل النص إلى كلام غير مدعومة في متصفحك");
        console.warn('Speech Synthesis API not supported');
    }
}

// Initialize speech synthesis voices
if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = () => {
        console.log("Voices loaded:", window.speechSynthesis.getVoices());
    };
    
    // Chrome needs this
    if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.addEventListener('voiceschanged', () => {
            console.log("Voices loaded after event:", window.speechSynthesis.getVoices());
        });
    }
}

// Show error message
function showError(message) {
    const errorMessage = createMessageElement(
        `<div class="message-text">${message}</div>`,
        "bot-message"
    );
    chatBody.appendChild(errorMessage);
    chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
}

const generateBotResponse = async (incomingMessageDiv) => {
    const messageElement = incomingMessageDiv.querySelector(".message-text");
    
    // الأسئلة الشائعة عن نظام حجز المواصلات NILEWAY
    const faqResponses = {
        "كيف احجز": `يمكنك الحجز في NILEWAY عبر الخطوات التالية:
        1. اختر نوع الوسيلة (أتوبيس/قطار/طيران)
        2. حدد المحطة أو المطار
        3. اختر التاريخ والوقت
        4. حدد عدد الركاب
        5. أكمل عملية الدفع
        
        يمكنك البدء من <a href="/bus-booking" style="color: #FFD700; text-decoration: underline;">صفحة الحجز</a>`,
        
        "وسائل المواصلات المتاحة": `في NILEWAY نوفر:
        - حافلات مكيفة فاخرة
        - قطارات بدرجات مختلفة (VIP/درجة أولى/درجة ثانية)
        - رحلات طيران داخلية
        
        جميع وسائلنا مزودة بأعلى معايير الراحة والأمان.`,
        
        "طرق الدفع": `طرق الدفع المتاحة:
        💳 بطاقات الائتمان والخصم (Visa/MasterCard)
        📱 المحافظ الإلكترونية (فودافون كاش/حساب فوري)
        💵 الدفع نقداً عند الصعود (للحافلات فقط)
        🏦 التحويل البنكي`,
        
        "إلغاء الحجز": `سياسة الإلغاء في NILEWAY:
        - يمكن الإلغاء قبل 24 ساعة من الرحلة بدون رسوم
        - بعد ذلك يتم خصم 20% من المبلغ
        - للإلغاء اتصل بنا على 16388 أو من خلال حسابك
        
        <a href="/contact" style="color: #FFD700; text-decoration: underline;">اتصل بنا للإلغاء الطارئ</a>`,
        
        "تتبع الحجز": `لتتبع حجزك:
        1. سجل الدخول إلى حسابك
        2. انتقل إلى قسم "حجوزاتي"
        3. اختر الحجز المطلوب
        
        أو أدخل <a href="/track-booking" style="color: #FFD700; text-decoration: underline;">رقم الحجز هنا</a>`,
        
        "عروض": `لدينا عروض خاصة حالية:
        - خصم 15% على الحجز المبكر (قبل 7 أيام)
        - خصم 20% للمجموعات (أكثر من 5 أشخاص)
        - رحلات ذهاب وعودة بخصم 25%
        
        <a href="/offers" style="color: #FFD700; text-decoration: underline;">شاهد جميع العروض</a>`,
        
        "الأسعار": `أسعارنا تبدأ من:
        - الحافلات: 50 جنيه للمقعد
        - القطارات: 75 جنيه للدرجة الثانية
        - الطيران: 500 جنيه للرحلة
        
        الأسعار تختلف حسب الموسم ووقت الحجز.`,
        
        "تسجيل دخول": `لتسجيل الدخول:
        1. اضغط على "تسجيل الدخول" في الأعلى
        2. أدخل البريد الإلكتروني وكلمة السر
        3. اضغط دخول
        
        <a href="/login" style="color: #FFD700; text-decoration: underline;">انتقل لصفحة تسجيل الدخول</a>`,
        
        "إنشاء حساب": `لإنشاء حساب جديد:
        1. اضغط على "إنشاء حساب" في الأعلى
        2. املأ البيانات المطلوبة
        3. سجل الدخول فوراً
        
        <a href="/register" style="color: #FFD700; text-decoration: underline;">سجل حسابك الآن</a>`,
        
        "خدمة العملاء": `للتواصل مع خدمة العملاء:
        📞 16388 (24/7)
        📧 support@nileway.com
        💬 <a href="/contact" style="color: #FFD700; text-decoration: underline;">نموذج التواصل</a>
        
        متاحين لمساعدتك على مدار الساعة!`,
        
        "التقييمات": `يمكنك رؤية آراء عملائنا:
        - <a href="/feedback" style="color: #FFD700; text-decoration: underline;">صفحة التقييمات</a>
        - تقييمات Google
        - صفحتنا على Facebook
        
        نحرص على رضاكم دائماً!`,
        
        "أماكن سياحية": `أشهر الأماكن التي نخدمها:
        - القاهرة (الأهرامات - المتحف المصري)
        - الإسكندرية (قلعة قايتباي - مكتبة الإسكندرية)
        - شرم الشيخ (خليج نعمة - رأس محمد)
        - الأقصر (معابد الكرنك - وادي الملوك)
        
        <a href="/tourism" style="color: #FFD700; text-decoration: underline;">اكتشف رحلاتنا السياحية</a>`,
        
        "حافلات": `حافلات NILEWAY:
        - مكيفة بالكامل
        - مقاعد واسعة ومريحة
        - خدمة الواي فاي المجانية
        - نقاط انطلاق من جميع المحافظات
        - أسعار تبدأ من 50 جنيه
        
        <a href="/bus-booking" style="color: #FFD700; text-decoration: underline;">احجز مقعدك الآن</a>`,
        
        "قطارات": `قطارات NILEWAY:
        - درجة VIP (خدمة فاخرة)
        - درجة أولى (مقاعد مريحة)
        - درجة ثانية (أسعار اقتصادية)
        - وجبات خفيفة متاحة
        - مواعيد منتظمة
        
        <a href="/train-booking" style="color: #FFD700; text-decoration: underline;">اختر رحلتك</a>`,
        
        "طيران": `رحلاتنا الجوية:
        - طيران داخلي بين جميع المطارات
        - أمتعة مجانية (حتى 20 كجم)
        - خدمة التوصيل من المطار
        - أسعار تنافسية
        
        <a href="/flight-booking" style="color: #FFD700; text-decoration: underline;">احجز تذكرتك</a>`,
        
        "default": `مرحباً بكم في NILEWAY! 🚌✈️🚆
        كيف يمكنني مساعدتك في حجز رحلتك القادمة؟
        
        يمكنك طرح أسئلة مثل:
        - كيف احجز تذكرة؟
        - ما هي وسائل المواصلات المتاحة؟
        - ما هي طرق الدفع المقبولة؟
        - كيف يمكنني إلغاء الحجز؟`
    };
    
    let apiResponseText = faqResponses.default;
    const userQuestion = userData.message.toLowerCase();
    
    // تحقق من الأسئلة الشائعة أولاً
    for (const [question, answer] of Object.entries(faqResponses)) {
        if (userQuestion.includes(question.toLowerCase())) {
            apiResponseText = answer;
            break;
        }
    }
    
    // إذا لم يكن السؤال من الأسئلة الشائعة، استخدم API
    if (apiResponseText === faqResponses.default) {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `أنت مساعد لشركة NILEWAY المتخصصة في حجز وسائل المواصلات في مصر. 
                        أجِب على سؤال العميل باختصار ووضوح فيما يخص حجز الأتوبيسات، القطارات، 
                        والطيران الداخلي. يجب أن تكون الإجابة باللغة العربية الفصحى.
                        
                        إذا كان السؤال غير متعلق بالحجز أو المواصلات، أرشد العميل لطرح سؤال متعلق بخدمات NILEWAY.
                        
                        السؤال: ${userData.message}`
                    }]
                }]
            })
        };

        try {
            const response = await fetch(API_URL, requestOptions);
            const data = await response.json();
            if (!response.ok) throw new Error(data.error.message);

            apiResponseText = data.candidates[0].content.parts[0].text
                .replace(/\*\*(.*?)\*\*/g, "$1")
                .trim();
        } catch (error) {
            console.log(error);
            apiResponseText = "عذراً، حدث خطأ في الاتصال بالخادم. يرجى المحاولة مرة أخرى أو طرح سؤال آخر متعلق بخدمات NILEWAY.";
        }
    }
    
    messageElement.innerHTML = apiResponseText;
    incomingMessageDiv.classList.remove("thinking");
    
    // Enable voice response button
    playResponseBtn.disabled = false;
    playResponseBtn.onclick = () => speakText(apiResponseText.replace(/<[^>]*>/g, ''));
    
    chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
}

//handle outgoing user messages
const handleOutgoingMessage = (e) => {
    e.preventDefault();
    userData.message = messageInput.value.trim();
    if (!userData.message) return;
    
    messageInput.value = "";
    messageInput.style.height = "auto";
    
    // create and display user message
    const messageContent = `
        <div class="message-text"></div>
    `;
    const outgoingMessageDiv = createMessageElement(messageContent, "user-message");
    outgoingMessageDiv.querySelector(".message-text").textContent = userData.message;
    chatBody.appendChild(outgoingMessageDiv);
    chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });

    // Simulate bot response with thinking indicator after a delay
    setTimeout(() => {
        const messageContent = `
            <div class="message bot-message thinking">
                <svg class="bot-avatar" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                    <path d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z"></path>
                </svg>
                <div class="message-text"> 
                    <div class="thinking-indicator">
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                    </div>
                </div>
        `;
        const incomingMessageDiv = createMessageElement(messageContent, "bot-message", "thinking");
        chatBody.appendChild(incomingMessageDiv);
        chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
        generateBotResponse(incomingMessageDiv);
    }, 600);
}

// Event Listeners
document.querySelector(".chat-form").addEventListener("submit", handleOutgoingMessage);

messageInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleOutgoingMessage(e);
    }
});

// Auto-resize textarea
messageInput.addEventListener("input", function() {
    this.style.height = "auto";
    this.style.height = (this.scrollHeight) + "px";
});

chatbotToggler.addEventListener("click", () => {
    document.body.classList.toggle("show-chatbot");
    // Reset chatbot position when toggling
    if (document.body.classList.contains("show-chatbot")) {
        document.querySelector(".chatbot-popup").style.bottom = "100px";
    }
});

closeChatbotBtn.addEventListener("click", () => {
    document.body.classList.remove("show-chatbot");
});

// Initialize voice recognition when the page loads
window.addEventListener('load', () => {
    setupVoiceRecognition();
    
    // Initialize speech synthesis voices
    if ('speechSynthesis' in window) {
        // Chrome needs this
        if (window.speechSynthesis.getVoices().length === 0) {
            window.speechSynthesis.addEventListener('voiceschanged', () => {
                console.log("Voices loaded after event:", window.speechSynthesis.getVoices());
            });
        }
    }
});

// Play response button
playResponseBtn.addEventListener('click', function() {
    const lastBotMessage = document.querySelector('.chat-body .bot-message:not(.thinking) .message-text');
    if (lastBotMessage) {
        speakText(lastBotMessage.textContent || lastBotMessage.innerText);
    }
});