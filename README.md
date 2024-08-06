## 🧠 Emotion Detection and 🤖 Chatbot Integration

Site is hosted through Vercel: https://color-my-day-and-mistral-chatbot.vercel.app/

If you want to use the web app with your own Hugging Face Inference API, you can create .env.local under root directory and add the following:

```
NEXT_PUBLIC_HUGGINGFACE_TOKEN=[your token]
```

### 🧠 Emotion Detection

Type a message into the text field on the homepage to try out the emotion detection feature powered by the Hugging Face Inference API. This API uses text classification to detect various emotions based on your input.

**Note:** The first time you use the emotion detection, it might take a bit longer to process. Subsequent requests will be faster.

**How It Works:**

1. Enter your message into the text field.
2. Wait a few seconds for the emotion detection to process.
3. The detected emotions will be listed below the text field, showing the labels and their respective scores.

### 🤖 Chatbot with Mistral Model

On the chatbot page, you can interact with a text generation model provided by Hugging Face. This model, based on the Mistral architecture, generates responses to your messages.

**Features:**

1. **User Interaction**: Type your message and hit Enter or click the "Send" button to communicate with the chatbot.
2. **Thinking Indication**: While the model is generating a response, you'll see a "Model is thinking hard..." message.
3. **Response Generation**: After a short delay, the chatbot will display the generated response.

**Instructions:**

- **Chatbot Page**: Navigate to the chatbot page by clicking the "Chatbot" button.
- **Type Your Message**: Enter a message and press Enter or click "Send."
- **View Responses**: The chatbot will update with responses and show a thinking message while processing.

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
