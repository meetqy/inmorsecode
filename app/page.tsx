import { MorseCodeTranslator } from "@/components/morse-code-translator";

export const metadata = {
  title: "Morse Code Translator",
  description: "Convert text to Morse code and listen to the rhythmic patterns",
};

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Morse Code Translator
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Convert your text into Morse code and listen to the rhythmic patterns
        </p>
      </div>

      <MorseCodeTranslator />

      <article className="prose mx-auto mt-16">
        <h2>What is Morse Code?</h2>
        <p>
          Morse code is a method of encoding text characters using sequences of
          dots and dashes, or short and long signals. Invented by Samuel Morse
          in the 1830s, it was the foundation of early electrical
          telecommunication.
        </p>

        <h3>How it Works</h3>
        <ul>
          <li>
            <strong>Dot (.)</strong> - A short beep or signal
          </li>
          <li>
            <strong>Dash (-)</strong> - A long beep or signal (3x dot length)
          </li>
          <li>
            <strong>Letter Space</strong> - Pause between letters (3x dot
            length)
          </li>
          <li>
            <strong>Word Space</strong> - Pause between words (7x dot length)
          </li>
        </ul>

        <h3>Common Patterns</h3>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Text</th>
                <th>Morse Code</th>
                <th>Usage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>SOS</td>
                <td>
                  <code>... --- ...</code>
                </td>
                <td>International distress signal</td>
              </tr>
              <tr>
                <td>OK</td>
                <td>
                  <code>--- -.-</code>
                </td>
                <td>Acknowledgment</td>
              </tr>
              <tr>
                <td>Hi</td>
                <td>
                  <code>.... ..</code>
                </td>
                <td>Greeting</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>How to Use This Translator</h3>
        <ol>
          <li>Select a phrase from the examples below or click any text</li>
          <li>See the Morse code representation instantly</li>
          <li>Click on words or letters to hear their sound</li>
          <li>Use the playback controls to hear the entire message</li>
        </ol>

        <div className="not-prose bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mt-8">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            💡 Try clicking on different words to hear how they sound in Morse
            code!
          </p>
        </div>
      </article>
    </div>
  );
}
