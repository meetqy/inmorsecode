"use client";

import {
  Card,
  CardBody,
  Button,
  Textarea,
  Divider,
  Slider,
} from "@heroui/react";
import { useState, useEffect, useRef } from "react";

import { textToMorseCode, playMorseCode } from "@/utils/morse-code";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";

export function MorseCodeTranslator() {
  const [input, setInput] = useState("in morse code");
  const [output, setOutput] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [wpm, setWpm] = useState(20);
  const [frequency, setFrequency] = useState(700);
  const [volume, setVolume] = useState(0.5);
  const [isPaused, setIsPaused] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (!input) {
      setOutput("");
      return;
    }
    const morse = textToMorseCode(input);
    setOutput(morse);
  }, [input]);

  const handlePlay = async () => {
    if (!output) return;

    if (isPaused) {
      setIsPaused(false);
      if (audioContextRef.current) {
        audioContextRef.current.resume();
      }
      return;
    }

    setIsPlaying(true);
    audioContextRef.current = new AudioContext();
    await playMorseCode(output, {
      wpm,
      frequency,
      volume,
      audioContext: audioContextRef.current,
    });
    setIsPlaying(false);
  };

  const handlePause = () => {
    setIsPaused(true);
    if (audioContextRef.current) {
      audioContextRef.current.suspend();
    }
  };

  const handleStop = () => {
    setIsPaused(false);
    setIsPlaying(false);
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
  };
  return (
    <Card className="max-w-screen-lg mx-auto">
      <CardBody className="gap-6 p-8">
        <div className="space-y-6">
          <Textarea
            placeholder="Type your text here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            minRows={4}
            size="lg"
            variant="bordered"
          />
          <Divider />

          {/* Settings Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center justify-between">
                Speed (WPM)
                <span className="text-default-400">{wpm}</span>
              </label>
              <Slider
                value={wpm}
                onChange={(v) => setWpm(v as number)}
                step={1}
                minValue={5}
                maxValue={40}
                aria-label="WPM"
                className="max-w-md"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center justify-between">
                Frequency (Hz)
                <span className="text-default-400">{frequency}</span>
              </label>
              <Slider
                value={frequency}
                onChange={(v) => setFrequency(v as number)}
                step={10}
                minValue={400}
                maxValue={1000}
                aria-label="Frequency"
                className="max-w-md"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center justify-between">
                Volume
                <span className="text-default-400">
                  {Math.round(volume * 100)}%
                </span>
              </label>
              <Slider
                value={volume}
                onChange={(v) => setVolume(v as number)}
                step={0.1}
                minValue={0}
                maxValue={1}
                aria-label="Volume"
                className="max-w-md"
              />
            </div>
          </div>

          <Divider />

          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="p-4 w-full rounded-lg border-2 border-default-200 bg-default-100 dark:bg-default-50 font-mono text-xl min-h-[120px] whitespace-pre-wrap">
              {output || "Morse code will appear here..."}
            </div>

            <div className="flex gap-4 justify-between w-full">
              <div className="flex gap-4">
                <Button
                  color="primary"
                  onPress={() => {
                    if (isPlaying) {
                      if (isPaused) {
                        handlePlay(); // Resume
                      } else {
                        handlePause(); // Pause
                      }
                    } else {
                      handlePlay(); // Start playing
                    }
                  }}
                  isDisabled={!output}
                >
                  <Icon
                    className="size-6"
                    icon={
                      isPlaying
                        ? isPaused
                          ? "solar:play-bold" // Show play icon when paused
                          : "solar:pause-bold" // Show pause icon when playing
                        : "solar:play-bold" // Show play icon when stopped
                    }
                  />
                </Button>

                <Button
                  color="danger"
                  onPress={handleStop}
                  isDisabled={!isPlaying}
                >
                  <Icon className="size-6" icon="solar:stop-bold" />
                </Button>
              </div>

              <Button
                variant="flat"
                color="secondary"
                onPress={() => {
                  navigator.clipboard.writeText(output);
                  toast.success("Copied to clipboard!");
                }}
              >
                <Icon className="size-6" icon="solar:copy-line-duotone" />
              </Button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
