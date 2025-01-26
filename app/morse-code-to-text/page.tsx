import { MorseCodeToText } from "@/components/morse-code-to-text";

export const metadata = {
  title: "Morse Code to Text",
  description: "Convert Morse code into text and listen to the dots and dashes",
};

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Morse Code to Text
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Convert Morse code into text and listen to the dots and dashes
        </p>
      </div>

      <MorseCodeToText />

      <article className="prose dark:prose-invert mx-auto mt-16">
        <h1>Decode Morse Code to Text</h1>

        <p className="lead">
          Converting Morse code back to text requires understanding the basic
          patterns of dots and dashes. Here's how to decode Morse code messages
          step by step.
        </p>

        <h2>Basic Rules for Decoding</h2>
        <ul>
          <li>Each letter is separated by a space</li>
          <li>Words are separated by forward slashes (/)</li>
          <li>
            Timing is crucial for accurate decoding:
            <ul>
              <li>Dot (.) = 1 unit</li>
              <li>Dash (-) = 3 units</li>
              <li>Space between parts of same letter = 1 unit</li>
              <li>Space between letters = 3 units</li>
              <li>Space between words = 7 units</li>
            </ul>
          </li>
        </ul>

        <h2>Common Morse Code Patterns</h2>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Morse Code</th>
                <th>Letter</th>
                <th>Memory Aid</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>.-</code>
                </td>
                <td>A</td>
                <td>"Attack" (short-long)</td>
              </tr>
              <tr>
                <td>
                  <code>-...</code>
                </td>
                <td>B</td>
                <td>"Bark" (long-short-short-short)</td>
              </tr>
              <tr>
                <td>
                  <code>...---...</code>
                </td>
                <td>SOS</td>
                <td>Universal distress signal</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Example Translations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
            <p className="font-mono text-sm">
              .... . .-.. .-.. --- / .-- --- .-. .-.. -..
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
              → HELLO WORLD
            </p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
            <p className="font-mono text-sm">... --- ...</p>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
              → SOS
            </p>
          </div>
        </div>

        <h2>Tips for Decoding</h2>
        <ol>
          <li>Start by identifying word breaks (indicated by /)</li>
          <li>Break down each word into individual letter sequences</li>
          <li>Match each sequence to the corresponding letter</li>
          <li>Write down the decoded message</li>
          <li>Practice with common words first</li>
        </ol>

        <div className="not-prose bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mt-8">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            💡 Pro Tip: Listen to the rhythm! Morse code is as much about timing
            as it is about dots and dashes.
          </p>
        </div>
      </article>
    </div>
  );
}
