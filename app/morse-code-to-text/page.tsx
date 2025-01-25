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
    </div>
  );
}
