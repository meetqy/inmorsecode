"use client";

import { Button, Card } from "@heroui/react";
import { useState } from "react";
import { textToMorseCode } from "@/utils/morse-code";
import { Icon } from "@iconify/react";
import { faker } from "@faker-js/faker";

// Constants
const DIFFICULTIES = ["easy", "medium", "hard"] as const;
const EXERCISE_COUNT = 6;
const LENGTH_BY_DIFFICULTY = {
  easy: 3,
  medium: 5,
  hard: 8,
} as const;

// Types
type Difficulty = (typeof DIFFICULTIES)[number];
type Exercise = {
  lettersToMorse: string[];
  morseToLetters: string[];
};

// Utility functions
const getRandomDifficulty = (): Difficulty => {
  return DIFFICULTIES[Math.floor(Math.random() * DIFFICULTIES.length)];
};

const generateWordsByLength = (length: number): string[] => {
  const uniqueWords = new Set<string>();

  while (uniqueWords.size < EXERCISE_COUNT * 2) {
    const word = faker.word
      .sample()
      .toUpperCase()
      .slice(0, length)
      .replace(/[^A-Z]/g, "");

    if (word.length === length) {
      uniqueWords.add(word);
    }
  }

  return Array.from(uniqueWords);
};

const generateExercises = (diff: Difficulty): Exercise => {
  const length = LENGTH_BY_DIFFICULTY[diff];
  const words = generateWordsByLength(length);
  const shuffled = [...words].sort(() => Math.random() - 0.5);

  return {
    lettersToMorse: shuffled.slice(0, EXERCISE_COUNT),
    morseToLetters: shuffled
      .slice(EXERCISE_COUNT, EXERCISE_COUNT * 2)
      .map(textToMorseCode),
  };
};

export function GeneratorWorksheet() {
  // State
  const [difficulty, setDifficulty] = useState<Difficulty>(
    getRandomDifficulty()
  );
  const [exercises, setExercises] = useState<Exercise>(() =>
    generateExercises(difficulty)
  );

  // Handlers
  const handleRegenerate = () => {
    const newDifficulty = getRandomDifficulty();
    setDifficulty(newDifficulty);
    setExercises(generateExercises(newDifficulty));
  };

  // Validation
  const isValidExercises =
    exercises.lettersToMorse.length === EXERCISE_COUNT &&
    exercises.morseToLetters.length === EXERCISE_COUNT;

  if (!isValidExercises) {
    handleRegenerate();
    return null;
  }

  return (
    <div className="container mx-auto p-4">
      <div
        id="no-print"
        className="flex flex-col gap-4 mb-8 max-w-screen-lg mx-auto"
      >
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Morse Code Practice Worksheet
          </h1>
          <div className="flex items-center gap-3">
            <Button
              color="default"
              variant="flat"
              startContent={
                <Icon
                  icon="solar:printer-minimalistic-bold"
                  className="w-4 h-4"
                />
              }
              onPress={() => window.print()}
              className="print:hidden"
            >
              Print
            </Button>
            <Button
              color="primary"
              startContent={
                <Icon icon="solar:refresh-circle-bold" className="w-4 h-4" />
              }
              onPress={handleRegenerate}
            >
              Generate New
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400 print:text-black">
          <span>
            <Icon icon="solar:calendar-bold" className="inline w-4 h-4 mr-1" />
            {new Date().toLocaleDateString()}
          </span>
          <span>•</span>
          <span>
            <Icon icon="solar:document-bold" className="inline w-4 h-4 mr-1" />
            exercises
          </span>
          <span>•</span>
          <span>
            <Icon icon="solar:chart-bold" className="inline w-4 h-4 mr-1" />
            Difficulty: {difficulty}
          </span>
        </div>
      </div>

      <div
        id="page"
        className="max-w-[21cm] mx-auto bg-white p-[1cm] min-h-[29.7cm] print:p-0 print:shadow-none shadow-lg"
      >
        {/* Header */}
        <header className="text-center mb-8 print:mb-12">
          <h1 className="text-3xl font-bold mb-4">Morse Code Worksheet</h1>
          <div className="flex justify-between text-gray-600">
            <span>Name: _________________</span>
            <span>Date: _________________</span>
          </div>
        </header>

        {/* Reference Table */}
        <Card className="mb-8 py-4" shadow="none" radius="none">
          <h2 className="text-xl font-semibold mb-4">Quick Reference</h2>
          <div className="grid grid-cols-6 gap-2 text-center text-sm">
            {Object.entries({
              A: ".-",
              B: "-...",
              C: "-.-.",
              D: "-..",
              E: ".",
              F: "..-.",
              G: "--.",
              H: "....",
              I: "..",
              J: ".---",
              K: "-.-",
              L: ".-..",
              M: "--",
              N: "-.",
              O: "---",
              P: ".--.",
              Q: "--.-",
              R: ".-.",
              S: "...",
              T: "-",
            }).map(([letter, code]) => (
              <div
                key={letter}
                className="border p-2 rounded print:border-gray-300"
              >
                <div className="font-bold">{letter}</div>
                <div className="font-mono text-gray-600">{code}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Practice Sections */}
        <div className="space-y-8 print:space-y-12">
          {/* Letters to Morse */}
          <section>
            <h3 className="text-lg font-semibold mb-4">
              1. Convert Letters to Morse Code
            </h3>
            <div className="grid grid-cols-2 gap-8">
              {exercises.lettersToMorse.map((word, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="w-24 font-mono">{word}</span>
                  <div className="flex-1 border-b-2 border-dotted h-8"></div>
                </div>
              ))}
            </div>
          </section>

          {/* Morse to Letters */}
          <section>
            <h3 className="text-lg font-semibold mb-4">
              2. Convert Morse Code to Letters
            </h3>
            <div className="grid grid-cols-2 gap-8">
              {exercises.morseToLetters.map((morse, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="w-40 font-mono text-sm">{morse}</span>
                  <div className="flex-1 border-b-2 border-dotted h-8"></div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>Practice Makes Perfect! Keep Learning Morse Code.</p>
        </footer>
      </div>
    </div>
  );
}
