import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import OpenAI from 'openai';

// Safely access environment variables
const OPENAI_API_KEY = "lolo";

const sisi = `
You are a llm developed by meta, llama3.1-8b,
you are currently running on the cerebras api, proxied by Gaurish,
your goal is to give users information about gaurish, you shall refuse to answer anything else or anything you do not know about him,
you are currently plugged into his website.
Gaurish's full name is Gaurish Mehra, He is 16 and he lives in pune, India.
He is super interested in AI and he is currently working on a project called Gaurika.
He is a student and he is currently in 12th grade.
He is not looking for a job right now.
He is a huge fan of llms.
He is a self-taught full-stack developer.
He is a JEE aspirant.
He loves to make open-source projects and contribute to them.
He loves the infinite mysteries of the universe.
He loves to learn new things.
He has an elo of 2100+ in bltiz chess, about 99.5 percentile globally in chess.com, he loves chess.
He works with many tech stacks but his most used one is "React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Python", "TensorFlow", "Transformers".
`;

const TerminalChat = () => {
  const [messages, setMessages] = useState([
    { role: 'system', content: sisi },
    { role: 'assistant', content: 'Hello! Would you like to know something about Gaurish Mehra?' },
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [streaming, setStreaming] = useState(false);

  // Initialize OpenAI client
  const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
    baseURL: "https://proxy.gaurish.xyz/api/cerebras/v1",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    setIsLoading(true);
    setStreaming(false); // Disable streaming if we're not doing it
    setError('');
    const newMessages = [...messages, { role: 'user', content: userInput }];
    setMessages(newMessages);
    setUserInput('');

    try {
      if (!OPENAI_API_KEY) {
        throw new Error('OpenAI API key is not set');
      }

      // Perform a regular non-streaming API call
      const response = await openai.chat.completions.create({
        model: 'llama3.1-8b',
        messages: newMessages.map(({ role, content }) => ({ role, content })),
        stream: false, // Ensure streaming is set to false
      });

      // Assuming response is not a stream, handle it as a normal completion
      const assistantMessage = { role: 'assistant', content: response.choices[0].message.content };
      setMessages([...newMessages, assistantMessage]);
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      setError('Oops! Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-gray-900/10 backdrop-blur-sm rounded-lg p-8 shadow-lg border border-pink-500 max-w-3xl w-full"
    >
      <div className="overflow-y-auto max-h-64 mb-4">
        {messages.map((message, index) => (
          <div key={index} className={`mb-2 ${message.role === 'user' ? 'text-right' : ''}`}>
            {message.role !== 'system' && (
              <>
                <span className={`${message.role === 'user' ? 'text-pink-400' : 'text-purple-400'}`}>
                  {message.role === 'user' ? 'You: ' : 'AI: '}
                </span>
                {message.content}
              </>
            )}
          </div>
        ))}
        {error && <div className="text-red-500 mb-2">{error}</div>}
      </div>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message here..."
          className="flex-grow px-4 py-2 bg-gray-800 rounded-l-md focus:outline-none text-gray-300"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-pink-500 hover:bg-pink-600 rounded-r-md text-white disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </motion.div>
  );
};

export default TerminalChat;
