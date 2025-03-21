import OpenAI from "openai";


export function randomSelection(selectionChoice: "topic" | "questionLength") {
  if (selectionChoice === "topic") {
    const topicChoiceList = ["baseball player", "baseball team", "baseball historical event", "MLB", "baseball rules", "baseball pitch", "baseball stadiums"]
    const randomIndex = Math.floor(Math.random() * topicChoiceList.length);
    return topicChoiceList[randomIndex];
  } else if (selectionChoice === "questionLength") {
    const questionLengthChoiceList = ["short", "medium", "long"]
    const randomIndex = Math.floor(Math.random() * questionLengthChoiceList.length);
    return questionLengthChoiceList[randomIndex];
  }

}


export async function getTriviaQuestion(apiKey: string, language: TriviaLanguage = "english", difficulty: TriviaDifficulty = "easy"): Promise<TriviaQuestion> {
  try {
    const questionTopic = randomSelection("topic") as string;
    const questionLength = randomSelection("questionLength") as string;
    console.log("I am in getTriviaQuestion")
    console.log({
      apiKey,
      language,
      difficulty,
      questionTopic,
      questionLength
    })
    const openai = new OpenAI({
      apiKey
    });
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            `You are a trivia question generator. Provide a multiple-choice trivia question about baseball in JSON format. Ensure the format is: {question: string, options: string[], answerIndex: number, hint: string}. The answerIndex should indicate the correct answer's position in the options array. The language selected by the user is: ${language}
            Follow the below criteria for generating the question:
              1. The question should be about baseball.
              2. The question should be related to ${questionTopic} which could keep the fans engaged and entertained. 
              3. The question should be ${difficulty}.
              4. The question is to entertain the user so keep it fun and engaging. You can use emojis wherever required but do not overkill the question with emojis.
              6. Make sure that hints are not detiled that makes it obvious for the user to guess the answer. It should also be kept fun and engaging for the end user.
              7. Make sure the questions are unique and not repeated.
              8. In the final output, the response should not contain anything except the string which when parsed by the JSON parser of JS should give the object with the above keys. Any other text explaining or any other keywords added in the answer would cause the error. 
              9. Do not append the strings in the options array with any sort of serial numbers or alphabets.
              10. The type of question and MCQ answer should be of ${questionLength} type.
              11. If the language has been provided you will generate the whole output in that specific language. Make sure to keep the keys in english as that would be used to parse the output.

            While generating output, takes gaps and pauses to think and analyze the final output generated by you. 
            `,
        },
      ],
      // Sets randomized temp (0-2)
      temperature: Number((Math.random() * 2).toFixed(1)),
    });

    const content = response.choices[0]?.message?.content;

    if (!content) {
      throw new Error("No response from OpenAI API.");
    }

    const parsedData = JSON.parse(content);

    // Validate response format
    if (
      !parsedData.question ||
      !Array.isArray(parsedData.options) ||
      typeof parsedData.answerIndex !== "number" ||
      parsedData.answerIndex < 0 ||
      parsedData.answerIndex >= parsedData.options.length
    ) {
      throw new Error("Invalid response format from OpenAI.");
    }

    return {
      question: parsedData.question,
      options: parsedData.options,
      answer: parsedData.answerIndex,
      hint: parsedData.hint,
      success: true,
    };
  } catch (error) {
    console.error("Error fetching trivia question:", error);
    return {
      question: "",
      options: [],
      answer: -1,
      success: false,
      hint: "",
    };
  }
}
