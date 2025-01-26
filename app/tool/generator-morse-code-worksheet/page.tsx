import { GeneratorWorksheet } from "./generator";

export const metadata = {
  title: "Morse Code Practice Worksheet Generator",
  description:
    "Generate random Morse code practice worksheets for learning and improvement, Supports printing and multiple difficulty levels.",
};

export default function Page() {
  return (
    <div>
      <GeneratorWorksheet />

      <article className="prose dark:prose-invert mx-auto mt-16">
        <h2>About Morse Code Practice Worksheet Generator</h2>

        <p>
          Learning Morse code becomes easier with regular practice. Our
          worksheet generator creates random exercises to help you master this
          essential communication skill.
        </p>

        <h3>Features</h3>
        <ul>
          <li>Random word generation for fresh practice every time</li>
          <li>
            Three difficulty levels:
            <ul>
              <li>
                <strong>Easy:</strong> 3-letter words
              </li>
              <li>
                <strong>Medium:</strong> 5-letter words
              </li>
              <li>
                <strong>Hard:</strong> 8-letter words
              </li>
            </ul>
          </li>
          <li>
            Two-way practice:
            <ul>
              <li>Convert text to Morse code</li>
              <li>Decode Morse code to text</li>
            </ul>
          </li>
          <li>Print-friendly layout (A4 size)</li>
        </ul>

        <h3>How to Use</h3>
        <ol>
          <li>Click "Generate New" to create a fresh worksheet</li>
          <li>
            Each worksheet contains:
            <ul>
              <li>6 text-to-Morse exercises</li>
              <li>6 Morse-to-text exercises</li>
              <li>Practice area for additional work</li>
            </ul>
          </li>
          <li>Use the print button to get a paper copy</li>
        </ol>

        <h3>Practice Tips</h3>
        <ul>
          <li>Start with easy difficulty and progress gradually</li>
          <li>Practice writing both dots and dashes clearly</li>
          <li>Use proper spacing between letters and words</li>
          <li>Time yourself to track improvement</li>
        </ul>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mt-8 not-prose">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            💡 Pro Tip: Generate multiple worksheets at once and practice a
            little each day for better retention.
          </p>
        </div>
      </article>
    </div>
  );
}
