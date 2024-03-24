import { OpenAI } from 'openai';
//import apiKey from './apikey';

const openai = new OpenAI({
  apiKey: "",
});




try {
    async function searchResult() {
    const stream = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "assistant", content: "You are a Smart Contract Auditor. You will be given a smart \
        contract. If you find a vulernability, highlight the section, and describe whats \
        wrong. Make there are spaces between each object. I know this is not an accurate \
        metric, but give a vulnerability score from 0-100 for each vulnerability you \
        highlight. Create a summary of what can potentially be optimized. Create another \
        paragraph summary for vulerabilities. Finally rewrite the smart contract with your fixes. "}],
        stream: true,
    });
    var GPTResult = "";
    for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || "";
        GPTResult += content;
    }
    return GPTResult;
    }

    var result = searchResult();
} catch (error) {
    console.error(error);
}