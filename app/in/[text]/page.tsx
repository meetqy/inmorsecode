import Link from "next/link";
import { Content } from "./content";

type Params = Promise<{ text: string }>;

export const generateMetadata = async ({ params }: { params: Params }) => {
  let { text } = await params;
  text = decodeURIComponent(text);

  return {
    title: `${text} in Morse Code`,
    description: `Listen to the rhythmic patterns of the Morse code for ${text}`,
  };
};

export default async function MorseCodeDetail({ params }: { params: Params }) {
  let { text } = await params;
  text = decodeURIComponent(text);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          {text} in Morse Code
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Listen to the rhythmic patterns of the Morse code
        </p>
      </div>

      <Content text={text} />

      <div className="mt-12 text-center">
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Want to listen to more Morse code?
        </p>
        <Link
          href="/in"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          Go back to the list
        </Link>
      </div>
    </div>
  );
}
