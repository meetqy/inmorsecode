import { inLists } from "@/utils/in-list";
import { Item } from "./item";

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Explore Morse Code
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Click on any phrase to see and hear its Morse code pattern
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {inLists.map((item) => (
          <Item key={item} item={item} />
        ))}
      </div>
    </div>
  );
}
