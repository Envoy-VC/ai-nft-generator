import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
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
			const response = await openai.createImage({
				prompt: prompt,
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
