import { useState } from "react";

const questions = [
  { question: "What is the capital of France?", options: ["London", "Paris", "Rome", "Berlin"], answer: "Paris" },
  { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Venus", "Jupiter"], answer: "Mars" },
  { question: "Who wrote 'Hamlet'?", options: ["Shakespeare", "Charles Dickens", "Tolstoy", "Mark Twain"], answer: "Shakespeare" },
  { question: "What is the largest ocean on Earth?", options: ["Atlantic", "Pacific", "Indian", "Arctic"], answer: "Pacific" },
  { question: "Which element has the chemical symbol O?", options: ["Gold", "Oxygen", "Osmium", "Oganesson"], answer: "Oxygen" },
  { question: "In which year did World War II end?", options: ["1945", "1939", "1918", "1960"], answer: "1945" },
  { question: "What is the square root of 64?", options: ["6", "8", "10", "12"], answer: "8" },
  { question: "Which is the fastest land animal?", options: ["Tiger", "Cheetah", "Leopard", "Horse"], answer: "Cheetah" },
  { question: "Who painted the Mona Lisa?", options: ["Leonardo da Vinci", "Picasso", "Van Gogh", "Michelangelo"], answer: "Leonardo da Vinci" },
  { question: "Which gas do plants absorb for photosynthesis?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], answer: "Carbon Dioxide" },
  { question: "Which country hosted the 2016 Summer Olympics?", options: ["China", "Brazil", "UK", "Japan"], answer: "Brazil" },
  { question: "Who is known as the Father of Computers?", options: ["Alan Turing", "Charles Babbage", "Bill Gates", "Steve Jobs"], answer: "Charles Babbage" },
  { question: "What is H2O commonly known as?", options: ["Hydrogen", "Oxygen", "Water", "Salt"], answer: "Water" },
  { question: "Which continent is the Sahara Desert in?", options: ["Asia", "Africa", "Australia", "South America"], answer: "Africa" },
  { question: "What is the national sport of Japan?", options: ["Cricket", "Sumo Wrestling", "Baseball", "Karate"], answer: "Sumo Wrestling" },
  { question: "Which is the smallest planet in our solar system?", options: ["Mercury", "Mars", "Venus", "Pluto"], answer: "Mercury" },
  { question: "Who discovered gravity?", options: ["Newton", "Einstein", "Galileo", "Tesla"], answer: "Newton" },
  { question: "Which instrument measures earthquakes?", options: ["Thermometer", "Seismograph", "Barometer", "Altimeter"], answer: "Seismograph" },
  { question: "What is the capital of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Perth"], answer: "Canberra" },
  { question: "Who developed the theory of relativity?", options: ["Newton", "Einstein", "Bohr", "Hawking"], answer: "Einstein" },
  { question: "Which is the longest river in the world?", options: ["Amazon", "Nile", "Ganga", "Yangtze"], answer: "Nile" },
  { question: "Which vitamin is produced in the skin by sunlight?", options: ["Vitamin A", "Vitamin C", "Vitamin D", "Vitamin B12"], answer: "Vitamin D" },
  { question: "What is the currency of Japan?", options: ["Won", "Yen", "Dollar", "Peso"], answer: "Yen" },
  { question: "Which country invented pizza?", options: ["France", "USA", "Italy", "Spain"], answer: "Italy" },
  { question: "How many players are in a football (soccer) team?", options: ["9", "10", "11", "12"], answer: "11" },
  { question: "What is the chemical symbol for gold?", options: ["Ag", "Au", "Gd", "Go"], answer: "Au" },
  { question: "Which organ pumps blood in the human body?", options: ["Brain", "Heart", "Lungs", "Liver"], answer: "Heart" },
  { question: "Which planet has the most moons?", options: ["Earth", "Saturn", "Jupiter", "Mars"], answer: "Saturn" },
  { question: "What is the capital of India?", options: ["Mumbai", "Delhi", "Kolkata", "Chennai"], answer: "Delhi" },
  { question: "Which is the tallest mountain in the world?", options: ["K2", "Everest", "Kangchenjunga", "Makalu"], answer: "Everest" },
  { question: "Which country gifted the Statue of Liberty to the USA?", options: ["UK", "Germany", "France", "Italy"], answer: "France" },
];

function TriviaQuiz() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswer = (option) => {
    setSelectedAnswer(option);
    if (option === questions[current].answer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (current + 1 < questions.length) {
      setCurrent((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      setFinished(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <h1 className="text-4xl font-bold mb-6">❓ Trivia Quiz</h1>
      {!finished ? (
        <div className="bg-white p-6 rounded-xl shadow-lg w-80 text-center">
          <h2 className="text-xl font-semibold mb-4">
            {questions[current].question}
          </h2>
          <div className="grid gap-3 mb-4">
            {questions[current].options.map((opt, idx) => {
              const isCorrect = opt === questions[current].answer;
              const isSelected = opt === selectedAnswer;

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(opt)}
                  disabled={selectedAnswer !== null}
                  className={`px-4 py-2 rounded-lg transition ${
                    selectedAnswer === null
                      ? "bg-purple-600 text-white hover:bg-purple-700"
                      : isCorrect
                      ? "bg-green-500 text-white"
                      : isSelected
                      ? "bg-red-500 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {selectedAnswer && (
            <button
              onClick={handleNext}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {current + 1 === questions.length ? "Finish Quiz" : "Next"}
            </button>
          )}
        </div>
      ) : (
        <div className="text-2xl font-semibold text-gray-800">
          🎉 Quiz Finished! Your score:{" "}
          <span className="text-purple-700">
            {score}/{questions.length}
          </span>
        </div>
      )}
    </div>
  );
}

export default TriviaQuiz;
