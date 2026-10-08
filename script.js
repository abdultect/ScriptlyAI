const generateBtn = document.getElementById("generateBtn");

const topicInput = document.getElementById("topicInput");
const platform = document.getElementById("platform");
const tone = document.getElementById("tone");
const audience = document.getElementById("audience");
const hookStyle = document.getElementById("hookStyle");
const voiceStyle = document.getElementById("voiceStyle");
const language = document.getElementById("language");

const durationSelect = document.getElementById("duration");
const customDuration = document.getElementById("customDuration");

const resultContent = document.getElementById("resultContent");
const copyBtn = document.getElementById("copyBtn");

const downloadBtn = document.getElementById("downloadBtn");
const regenerateBtn = document.getElementById("regenerateBtn");

// ===============================
// CUSTOM DURATION
// ===============================

function updateCustomDuration() {
  customDuration.style.display =
    durationSelect.value === "custom" ? "block" : "none";
}

durationSelect.addEventListener("change", updateCustomDuration);

// ===============================
// GET DURATION
// ===============================

function getDuration() {
  if (durationSelect.value === "custom") {
    const seconds = parseInt(customDuration.value);

    if (!seconds || seconds < 5) {
      return 30;
    }

    return seconds;
  }

  return parseInt(durationSelect.value);
}

// ===============================
// FORMAT DURATION
// ===============================

function formatDuration(seconds) {
  if (seconds < 60) {
    return `${seconds} sec`;
  }

  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;

  if (remaining === 0) {
    return `${minutes} min`;
  }

  return `${minutes} min ${remaining} sec`;
}

// ===============================
// HOOK
// ===============================

function createHook(topic, style) {
  const hooks = {
    Curiosity: `What if I told you there's something about ${topic} that most people completely miss?`,

    Shocking: `Here's the shocking truth about ${topic} that nobody tells you.`,

    Question: `Have you ever wondered why ${topic} actually matters?`,

    Story: `Let me tell you a quick story about ${topic}.`,

    Educational: `Today, I'm going to explain ${topic} in the simplest way possible.`,

    "Bold Statement": `${topic} is changing the game, and most people haven't noticed yet.`,
  };

  return hooks[style] || hooks["Curiosity"];
}

// ===============================
// VOICE
// ===============================

function createVoiceIntro(voice) {
  const intros = {
    Energetic: `Alright, let's jump straight into it!`,

    Calm: `Let's take a moment and understand this step by step.`,

    Storyteller: `Picture this for a moment...`,

    Confident: `Here's exactly what you need to know.`,

    Friendly: `Alright guys, let's talk about this.`,

    Professional: `Let's break this down clearly and professionally.`,
  };

  return intros[voice] || intros["Energetic"];
}

// ===============================
// LANGUAGE
// ===============================

function getLanguageContent(lang, topic) {
  const content = {
    English: {
      intro: `Today we're going to talk about ${topic}.`,
      point1: `First, you need to understand the basic idea behind it.`,
      point2: `Second, focus on what actually works instead of blindly following trends.`,
      point3: `Third, consistency is what turns a good idea into a real result.`,
      example: `For example, imagine you're starting from zero. Instead of trying everything at once, focus on one simple strategy and improve it over time.`,
      conclusion: `The key takeaway is simple: understand the concept, take action, and keep improving.`,
      cta: `Follow for more useful content and practical tips.`,
    },

    "Roman Urdu": {
      intro: `Aaj hum ${topic} ke baare mein baat karne wale hain.`,
      point1: `Sab se pehle aapko iska basic idea samajhna zaroori hai.`,
      point2: `Doosri baat, sirf trends follow karne ke bajaye dekho ke asal mein kya kaam karta hai.`,
      point3: `Teesri baat, consistency hi ek achay idea ko real result mein convert karti hai.`,
      example: `Misal ke taur par, agar aap bilkul zero se start kar rahe ho, to sab kuch ek saath try karne ke bajaye ek simple strategy par focus karo aur dheere dheere improve karo.`,
      conclusion: `Simple si baat hai: concept ko samjho, action lo aur continuously improve karo.`,
      cta: `Aisi hi useful tips ke liye follow karna mat bhoolna.`,
    },

    Urdu: {
      intro: `آج ہم ${topic} کے بارے میں بات کرنے والے ہیں۔`,
      point1: `سب سے پہلے آپ کو اس کا بنیادی خیال سمجھنا ضروری ہے۔`,
      point2: `دوسری بات، صرف ٹرینڈز کو فالو کرنے کے بجائے دیکھیں کہ حقیقت میں کیا کام کرتا ہے۔`,
      point3: `تیسری بات، مستقل مزاجی ہی ایک اچھے آئیڈیا کو حقیقی نتیجے میں تبدیل کرتی ہے۔`,
      example: `مثال کے طور پر، اگر آپ بالکل شروع سے آغاز کر رہے ہیں تو سب کچھ ایک ساتھ کرنے کے بجائے ایک سادہ حکمت عملی پر توجہ دیں اور وقت کے ساتھ اسے بہتر بنائیں۔`,
      conclusion: `اصل بات بہت سادہ ہے: تصور کو سمجھیں، عمل کریں اور مسلسل بہتری لائیں۔`,
      cta: `ایسی ہی مفید معلومات کے لیے فالو کریں۔`,
    },

    Hindi: {
      intro: `आज हम ${topic} के बारे में बात करने वाले हैं।`,
      point1: `सबसे पहले आपको इसका बेसिक आइडिया समझना जरूरी है।`,
      point2: `दूसरी बात, सिर्फ ट्रेंड्स को फॉलो करने के बजाय देखें कि असल में क्या काम करता है।`,
      point3: `तीसरी बात, लगातार मेहनत ही एक अच्छे आइडिया को असली रिजल्ट में बदलती है।`,
      example: `उदाहरण के लिए, अगर आप बिल्कुल शुरुआत से शुरू कर रहे हैं, तो सब कुछ एक साथ करने के बजाय एक आसान रणनीति पर ध्यान दें और धीरे-धीरे उसे बेहतर बनाएं।`,
      conclusion: `सीधी सी बात है: कॉन्सेप्ट समझें, एक्शन लें और लगातार बेहतर होते रहें।`,
      cta: `ऐसी ही उपयोगी जानकारी के लिए फॉलो करें।`,
    },

    Arabic: {
      intro: `اليوم سنتحدث عن ${topic}.`,
      point1: `أولاً، من المهم أن تفهم الفكرة الأساسية وراء هذا الموضوع.`,
      point2: `ثانياً، ركز على ما ينجح فعلاً بدلاً من اتباع كل اتجاه بشكل أعمى.`,
      point3: `ثالثاً، الاستمرارية هي التي تحول الفكرة الجيدة إلى نتيجة حقيقية.`,
      example: `على سبيل المثال، إذا كنت تبدأ من الصفر، فلا تحاول القيام بكل شيء في وقت واحد. ركز على استراتيجية بسيطة وقم بتطويرها مع الوقت.`,
      conclusion: `الخلاصة بسيطة: افهم الفكرة، ابدأ بالتطبيق واستمر في التطور.`,
      cta: `تابعنا للمزيد من النصائح والمحتوى المفيد.`,
    },
  };

  return content[lang] || content["English"];
}

// ===============================
// CREATE SCRIPT
// ===============================

function createScript(
  topic,
  selectedTone,
  selectedPlatform,
  duration,
  selectedAudience,
  selectedHookStyle,
  selectedVoice,
  selectedLanguage
) {
  const lang = getLanguageContent(selectedLanguage, topic);

  const hook = createHook(topic, selectedHookStyle);

  const voiceIntro = createVoiceIntro(selectedVoice);

  const targetWords = Math.max(50, Math.round((duration / 60) * 130));

  let mainBody = "";

  const sections = [
    lang.point1,
    lang.point2,
    lang.point3,
    lang.example,
    `This is especially useful for ${selectedAudience.toLowerCase()}.`,
    `Take a moment to think about how you can apply this idea in your own situation.`,
    `The more you practice and test different approaches, the better your results can become.`,
  ];

  let index = 0;

  while (mainBody.split(/\s+/).length < targetWords) {
    mainBody += sections[index % sections.length] + "\n\n";
    index++;
  }

  return `
🔥 HOOK
━━━━━━━━━━━━━━━━━━━━

${hook}


🎬 INTRO
━━━━━━━━━━━━━━━━━━━━

${voiceIntro}

${lang.intro}


📝 MAIN SCRIPT
━━━━━━━━━━━━━━━━━━━━

${mainBody.trim()}


💡 EXAMPLE
━━━━━━━━━━━━━━━━━━━━

${lang.example}


🎯 KEY TAKEAWAY
━━━━━━━━━━━━━━━━━━━━

${lang.conclusion}


🚀 CTA
━━━━━━━━━━━━━━━━━━━━

${lang.cta}


━━━━━━━━━━━━━━━━━━━━
📌 SCRIPT DETAILS

Platform: ${selectedPlatform}
Tone: ${selectedTone}
Audience: ${selectedAudience}
Hook: ${selectedHookStyle}
Voice: ${selectedVoice}
Language: ${selectedLanguage}
Duration: ${formatDuration(duration)}
━━━━━━━━━━━━━━━━━━━━
`;
}

// ===============================
// GENERATE SCRIPT
// ===============================

function generateScript() {
  const topic = topicInput.value.trim();

  if (!topic) {
    resultContent.innerText = "Please enter a topic first.";
    return;
  }

  const selectedPlatform = platform.value;
  const selectedTone = tone.value;
  const selectedAudience = audience.value;
  const selectedHookStyle = hookStyle.value;
  const selectedVoice = voiceStyle.value;
  const selectedLanguage = language.value;

  const duration = getDuration();

  generateBtn.innerText = "Generating...";
  generateBtn.disabled = true;

  resultContent.innerText = "Creating your script...";

  setTimeout(() => {
    const script = createScript(
      topic,
      selectedTone,
      selectedPlatform,
      duration,
      selectedAudience,
      selectedHookStyle,
      selectedVoice,
      selectedLanguage
    );

    resultContent.innerText = script;

    generateBtn.innerText = "Generate Script";
    generateBtn.disabled = false;
  }, 800);
}

// ===============================
// GENERATE BUTTON
// ===============================

generateBtn.addEventListener("click", generateScript);

// ===============================
// REGENERATE
// ===============================

regenerateBtn.addEventListener("click", generateScript);

// ===============================
// COPY
// ===============================

copyBtn.addEventListener("click", async () => {
  const text = resultContent.innerText;

  if (!text || text === "Creating your script...") {
    return;
  }

  try {
    await navigator.clipboard.writeText(text);

    copyBtn.innerText = "Copied!";

    setTimeout(() => {
      copyBtn.innerText = "Copy";
    }, 1500);
  } catch (error) {
    copyBtn.innerText = "Copy failed";

    setTimeout(() => {
      copyBtn.innerText = "Copy";
    }, 1500);
  }
});

// ===============================
// DOWNLOAD
// ===============================

downloadBtn.addEventListener("click", () => {
  const text = resultContent.innerText;

  if (!text || text === "Creating your script...") {
    return;
  }

  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = "scriptly-ai-script.txt";

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);
});
// LOGIN MODAL

const loginBtn = document.getElementById("loginBtn");
const authModal = document.getElementById("authModal");
const closeAuth = document.getElementById("closeAuth");

if (loginBtn && authModal) {
  loginBtn.addEventListener("click", () => {
    authModal.style.display = "flex";
  });
}

if (closeAuth && authModal) {
  closeAuth.addEventListener("click", () => {
    authModal.style.display = "none";
  });
}

if (authModal) {
  authModal.addEventListener("click", (event) => {
    if (event.target === authModal) {
      authModal.style.display = "none";
    }
  });
}

// ==============================
// TITLE & HASHTAG GENERATOR
// ==============================

const titleTopic = document.getElementById("titleTopic");
const generateTitleBtn = document.getElementById("generateTitleBtn");
const titleResult = document.getElementById("titleResult");

const hashtagTopic = document.getElementById("hashtagTopic");
const generateHashtagBtn = document.getElementById("generateHashtagBtn");
const hashtagResult = document.getElementById("hashtagResult");

// ==============================
// TITLE GENERATOR
// ==============================

if (generateTitleBtn) {
  generateTitleBtn.addEventListener("click", () => {
    const topic = titleTopic.value.trim();

    if (!topic) {
      titleResult.innerText = "Please enter a topic first.";
      return;
    }

    titleResult.innerText = `1. The Truth About ${topic} Nobody Tells You

2. Why ${topic} Is Harder Than You Think

3. 5 Things About ${topic} You Need To Know

4. I Tried ${topic} — Here's What Happened

5. The Secret Behind ${topic}

6. Stop Making This Mistake With ${topic}

7. What Nobody Tells You About ${topic}

8. How To Master ${topic} Step By Step

9. The Biggest Mistake People Make With ${topic}

10. ${topic}: Everything You Need To Know`;
  });
}

// ==============================
// HASHTAG GENERATOR
// ==============================

if (generateHashtagBtn) {
  generateHashtagBtn.addEventListener("click", () => {
    const topic = hashtagTopic.value.trim();

    if (!topic) {
      hashtagResult.innerText = "Please enter a topic first.";
      return;
    }

    const words = topic
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .trim()
      .split(/\s+/);

    const mainTag = words.join("");
    const shortTags = words
      .filter((word) => word.length > 2)
      .map((word) => "#" + word);

    hashtagResult.innerText = `${shortTags.join(" ")}

#${mainTag}
#ViralContent
#ContentCreator
#CreatorTips
#Trending
#Viral
#ForYou
#YouTube
#YouTubeShorts
#TikTok
#InstagramReels
#Reels
#Shorts
#OnlineSuccess`;
  });
}
