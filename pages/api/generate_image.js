import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
	apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const config = {
	api: {
		bodyParser: {
			responseLimit: false,
		},
	},
};

export default async function handler(req, res) {
	if (req.method === 'POST') {
		try {
			const prompt = req.body.prompt;
			const chat = `just create a prompt in less than 40 words for an digital illustration of a unicorn, 4k, detailed and fantasy  here is some information about the background and unicorn - "${prompt}"`;

			const gptPrompt = await openai.createChatCompletion({
				model: 'gpt-3.5-turbo',
				messages: [
					{
						role: 'user',
						content: chat,
					},
				],
			});

			const finalPrompt = gptPrompt.data.choices[0].message.content;

			const response = await openai.createImage({
				prompt: finalPrompt,
				n: 1,
				size: '1024x1024',
				response_format: 'b64_json',
			});
			const image = response.data.data[0].b64_json;
			res.status(200).json({ photo: image });
		} catch (error) {
			console.log(error);
			res.status(500).send(error?.response.data.error.message);
		}
	} else {
		res.status(200).json({ status: 'Hello' });
	}
}
