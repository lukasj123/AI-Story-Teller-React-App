// A helper function that takes in a series 
// of form parameters and returns a string 
// with instructions that we can send to the
// OpenAI API

export default function generatePrompt({
    firstName, 
    occupation, 
    funFact, 
    genre, 
    famousAuthor
}) {
        const prompt = `Generate an interesting, brief (<100 words), and well written ${genre} short story about a person named ${firstName} who has the occupation ${occupation}. An interesting fact about ${firstName} is: ${funFact}.` 
        
        + 
        
        (famousAuthor.trim().length !== 0 ? ` Write the story in the style of ${famousAuthor}. If you don't know ${famousAuthor}, ignore this last instruction` : '')

        return prompt;
}