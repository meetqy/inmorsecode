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
    </div>
  );
}
