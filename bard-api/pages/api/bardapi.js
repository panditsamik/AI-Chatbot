const { DiscussServiceClient } = require("@google-ai/generativelanguage");
const { GoogleAuth } = require("google-auth-library");

const MODEL_NAME = "models/chat-bison-001";
const API_KEY = "AIzaSyBooylxdXfSEN0O0AslXkaOaiFm6B50vDk";

const client = new DiscussServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY),
});

export default function handler(req, res) {
  let messages = [{ content: req.query.ques }];

  client
    .generateMessage({
      // required, which model to use to generate the result
      model: MODEL_NAME,
      // optional, 0.0 always uses the highest-probability result
      temperature: 0.25,
      // optional, how many candidate results to generate
      candidateCount: 1,
      // optional, number of most probable tokens to consider for generation
      top_k: 40,
      // optional, for nucleus sampling decoding strategy
      top_p: 0.95,
      prompt: {
        messages: messages,
      },
    })
    .then((result) => {
      console.log("First Response:", result[0].candidates[0]?.content);

      messages.push({ content: result[0].candidates[0]?.content });
      // console.log(JSON.stringify(result, null, 2));
      res.status(200).json({ resp: messages });
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).json({ error: "An error occurred" });
    });
}
