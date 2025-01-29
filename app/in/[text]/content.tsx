"use client";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  cn,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { textToMorseCode, playMorseCode } from "@/utils/morse-code";
import { useRef, useState } from "react";
import { MorseCodeShow } from "@/components/morse-code-show";
import { Icon } from "@iconify/react";

export function Content({ text }: { text: string }) {
  const morseCode = textToMorseCode(text);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [activeWordIndex, setActiveWordIndex] = useState<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const handlePlay = async (morse: string, wordIndex?: number) => {
    if (isPaused) {
      setIsPaused(false);
      audioContextRef.current?.resume();
      return;
    }

    if (isPlaying) return;

    setIsPlaying(true);
    if (typeof wordIndex === "number") {
      setActiveWordIndex(wordIndex);
    }

    audioContextRef.current = new AudioContext();

    try {
      await playMorseCode(morse, {
        wpm: 20,
        frequency: 600,
        volume: 0.1,
        audioContext: audioContextRef.current,
      });
    } finally {
      setIsPlaying(false);
      setIsPaused(false);
      setActiveWordIndex(null);
      audioContextRef.current?.close();
      audioContextRef.current = null;
    }
  };

  const handlePause = () => {
    if (!audioContextRef.current) return;
    setIsPaused(true);
    audioContextRef.current.suspend();
  };

  return (
    <>
      <Card className="max-w-screen-lg mx-auto ">
        <CardHeader>
          <div className="w-full">
            <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {text}
            </h1>
            <div className="font-mono text-lg bg-gray-50 cursor-pointer dark:bg-gray-900 p-4 rounded-lg hover:shadow-lg transition-shadow duration-200">
              <MorseCodeShow morse={morseCode} />
            </div>
            <div className="mt-4 flex flex-wrap gap-4">
              <Button
                color="primary"
                onPress={() => {
                  if (isPlaying) {
                    if (isPaused) {
                      handlePlay(morseCode);
                    } else {
                      handlePause();
                    }
                  } else {
                    handlePlay(morseCode);
                  }
                }}
              >
                <Icon
                  icon={
                    isPlaying
                      ? isPaused
                        ? "solar:play-bold"
                        : "solar:pause-bold"
                      : "solar:play-bold"
                  }
                  className="w-5 h-5"
                />
              </Button>

              <Button
                color="danger"
                onPress={() => {
                  if (audioContextRef.current) {
                    audioContextRef.current.close();
                    audioContextRef.current = null;
                    setIsPlaying(false);
                    setActiveWordIndex(null);
                  }
                }}
                isDisabled={!isPlaying}
              >
                <Icon icon="solar:stop-bold" className="w-5 h-5" />
              </Button>

              <div className="flex items-center gap-2 ml-4">
                {isPlaying && (
                  <span className="text-sm text-primary animate-pulse">
                    Playing Morse Code...
                  </span>
                )}
              </div>
            </div>
          </div>
        </CardHeader>

        <CardBody className="p-8">
          <div className="flex flex-col gap-8">
            {text.split(" ").map((word, wordIndex) => (
              <div
                key={wordIndex}
                className={cn(
                  isPlaying && activeWordIndex !== wordIndex ? "opacity-40" : ""
                )}
              >
                <div className="space-y-4 relative">
                  {/* Word Display */}
                  <div className="flex items-baseline">
                    <h3 className="text-3xl pb-4 border-b w-full font-bold bg-gradient-to-br from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                      {word}
                    </h3>

                    {/* Play indicator */}
                    <div
                      className={cn(
                        "absolute right-4 top-4",
                        isPlaying && activeWordIndex === wordIndex
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    >
                      <div className="flex items-center gap-2 text-primary">
                        <Icon icon="solar:play-bold" /> Playing...
                      </div>
                    </div>
                  </div>

                  {/* Word's Morse Code */}
                  <div
                    className="flex flex-col gap-2"
                    onClick={() =>
                      !isPlaying && handlePlay(textToMorseCode(word), wordIndex)
                    }
                  >
                    <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg hover:shadow-lg transition-shadow duration-200">
                      <MorseCodeShow
                        morse={textToMorseCode(word)}
                        isActive={isPlaying && activeWordIndex === wordIndex}
                      />
                    </div>
                  </div>
                </div>

                {/* Individual Letters */}
                <div className="flex flex-col gap-2 mt-4">
                  <Table
                    onRowAction={(key) => {
                      const char = word[key as number];
                      !isPlaying &&
                        handlePlay(textToMorseCode(char), wordIndex);
                    }}
                    isStriped
                  >
                    <TableHeader>
                      <TableColumn>Letter</TableColumn>
                      <TableColumn>Morse Code</TableColumn>
                      <TableColumn className="text-right">Play</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {word.split("").map((char, charIndex) => (
                        <TableRow
                          key={charIndex}
                          className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                        >
                          <TableCell className="font-medium">{char}</TableCell>
                          <TableCell>
                            <MorseCodeShow
                              morse={textToMorseCode(char)}
                              isActive={
                                isPlaying && activeWordIndex === wordIndex
                              }
                            />
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="light"
                              isIconOnly
                              size="sm"
                              onPress={() => {
                                !isPlaying && handlePlay(textToMorseCode(char));
                              }}
                              disabled={isPlaying}
                            >
                              <Icon
                                icon={
                                  isPlaying
                                    ? "solar:pause-bold"
                                    : "solar:play-bold"
                                }
                                className="w-4 h-4"
                              />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </>
  );
}
