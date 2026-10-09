require("dotenv").config();

const http = require("http");
const fs = require("fs");
const path = require("path");
const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const PORT = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
  // REAL AI SCRIPT GENERATOR
  if (req.method === "POST" && req.url === "/api/generate") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", async () => {
      try {
        const data = JSON.parse(body);

       const prompt = `
You are a professional viral video scriptwriter.

Create ONE original, natural and engaging video script.

TOPIC:
${data.topic}

PLATFORM:
${data.platform}

TONE:
${data.tone}

DURATION:
${data.duration}

TARGET AUDIENCE:
${data.audience}

HOOK STYLE:
${data.hookStyle}

VOICE / DELIVERY:
${data.voice}

LANGUAGE:
${data.language}

IMPORTANT RULES:

1. Write the entire script in the selected language.
2. Never repeat sentences, paragraphs, examples or ideas.
3. Every part must contain fresh information.
4. Make it sound like a real human speaking.
5. Match the requested duration with enough original content.
6. Never repeat content just to make the script longer.
7. Use natural spoken language.
8. Make the hook powerful and specific to the topic.
9. Adapt the script to the selected platform.
10. Adapt vocabulary and examples to the target audience.
11. Follow the selected tone and voice.
12. Do not mention these instructions.

STRUCTURE:

🔥 HOOK
A powerful opening that immediately grabs attention.

🎬 INTRO
Introduce the topic and explain why the viewer should keep watching.

📝 MAIN SCRIPT
Give detailed and useful information.
Use clear points, explanations and different examples.
Never repeat the same point.

💡 EXAMPLE
Give one realistic example related to the topic.

🎯 KEY TAKEAWAY
Summarize the most important lesson.

🚀 CTA
End with a natural call to action.

Return ONLY the finished script using these sections.
`;

        const response = await client.responses.create({
          model: "gpt-6-luna",
          input: prompt,
        });

        res.writeHead(200, {
          "Content-Type": "application/json",
        });

        res.end(
          JSON.stringify({
            script: response.output_text,
          })
        );
      } catch (error) {
        console.error(error);

        res.writeHead(500, {
          "Content-Type": "application/json",
        });

        res.end(
          JSON.stringify({
            error: "AI generation failed.",
          })
        );
      }
    });

    return;
  }

  // SERVE WEBSITE FILES

  let filePath =
    req.url === "/"
      ? path.join(__dirname, "index.html")
      : path.join(__dirname, req.url);

  if (!fs.existsSync(filePath)) {
    res.writeHead(404);
    res.end("Not Found");
    return;
  }

  const ext = path.extname(filePath);

  const types = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "application/javascript",
    ".json": "application/json",
  };

  res.writeHead(200, {
    "Content-Type": types[ext] || "text/plain",
  });

  fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`ScriptlyAI running on port ${PORT}`);
});
console.log("SERVER FILE LOADED");