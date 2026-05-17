const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {

  res.send("Backend is running");

});

app.post("/generate", async (req, res) => {

  const prompt = req.body.prompt;

  try {

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Authorization":
            `Bearer ${process.env.OPENROUTER_API_KEY}`,

          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({

          model: "openai/gpt-4o-mini",

          messages: [

            {
              role: "system",

              content:
                "Convert AI prompts into clean structured JSON only. No markdown. No explanations."
            },

            {
              role: "user",

              content: prompt
            }

          ]
        })

      }
    );

    const data = await response.json();

    res.json(data);

  } catch(err) {

    res.status(500).json({
      error: err.message
    });

  }

});

const PORT =
  process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});