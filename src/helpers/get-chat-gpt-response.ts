
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
	apiKey: import.meta.env.PUBLIC_OPEN_AI_KEY,
});

const openai = new OpenAIApi(configuration);

export const getChatGptPokemon = async (pokemonName: string): Promise<string> => {

	try {

		delete configuration.baseOptions.headers['User-Agent'];
		const response = await openai.createCompletion({
			model: "text-davinci-003",
			prompt: `Escribe datos interesantes del pokémon ${pokemonName}`,
			temperature: 0.7,
			max_tokens: 60,
			top_p: 1,
			frequency_penalty: 0,
			presence_penalty: 0,
		});

		return response.data.choices[0].text || `No tengo nada sobre ${pokemonName}, lo siento`;

	} catch (error) {

		// console.log(error);
		return 'No tienes credito para conectarte a ChatGPT';
	}

}


