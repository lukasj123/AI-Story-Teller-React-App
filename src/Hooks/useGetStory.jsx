import { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';

export default function userGetStory() {

    // Config object lets us connect with OpenAI

    const configuration = new Configuration({
        apiKey: import.meta.env.VITE_API_KEY
    })

    delete configuration.baseOptions.headers["User-Agent"]
    // Use this to bypass OpenAI strictness; it'll throw an error 
    // if we don't delete this.


    const openai = new OpenAIApi(configuration)

    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    // THIS is the callback fxn actually responsible for calling the ChatGPT API and handling
    // all the states above to reflect the current condition of the request

    const fetchStory = async (prompt) => {
        setIsLoading(true);
        try {
          const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content:
                  "You are a skilled storyteller, adept at weaving tales based on user input",
              },
              { role: "user", content: prompt },
            ],
          });
          setData(response);
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false);
        }
      };

    return { data, isLoading, error, fetchStory }

}