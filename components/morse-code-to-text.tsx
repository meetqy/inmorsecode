"use client";

import {
  Card,
  CardBody,
  Button,
  Textarea,
  Divider,
  Slider,
} from "@heroui/react";
import { useState, useRef, useEffect } from "react";
import { morseCodeToText, playMorseCode } from "@/utils/morse-code";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";

export function MorseCodeToText() {
  const [input, setInput] = useState(
    ".. -. / -- --- .-. ... . / -.-. --- -.. ."
  );
  const [output, setOutput] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [wpm, setWpm] = useState(20);
  const [frequency, setFrequency] = useState(700);
  const [volume, setVolume] = useState(0.5);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (!input) {
      setOutput("");
      return;
    }
    const text = morseCodeToText(input);
    setOutput(text);
  }, [input]);

  const handlePlay = async () => {
    if (!input) return;

    if (isPaused) {
      setIsPaused(false);
      if (audioContextRef.current) {
        audioContextRef.current.resume();
      }
      return;
    }

    setIsPlaying(true);
    audioContextRef.current = new AudioContext();
    await playMorseCode(input, {
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
    <Card className="mx-auto max-w-screen-lg ">
      <CardBody className="gap-6 p-8">
        <div className="space-y-6">
          <Textarea
            placeholder="Enter Morse code here... (use dots . and dashes -)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            minRows={4}
            size="lg"
            variant="bordered"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center justify-between">
                Speed (WPM)
                <span className="text-default-400">{wpm}</span>
              </label>
              <Slider
                value={wpm}
                onChange={(e) => setWpm(e as number)}
                step={1}
                minValue={5}
                maxValue={40}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center justify-between">
                Frequency (Hz)
                <span className="text-default-400">{frequency}</span>
              </label>
              <Slider
                value={frequency}
                onChange={(e) => setFrequency(e as number)}
                step={10}
                minValue={400}
                maxValue={1000}
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
                onChange={(e) => setVolume(e as number)}
                step={0.1}
                minValue={0}
                maxValue={1}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              color="primary"
              onPress={() => {
                if (isPlaying) {
                  if (isPaused) {
                    handlePlay();
                  } else {
                    handlePause();
                  }
                } else {
                  handlePlay();
                }
              }}
              isDisabled={!input}
              isLoading={isPlaying && !isPaused}
            >
              <Icon
                className="size-6"
                icon={
                  isPlaying
                    ? isPaused
                      ? "solar:play-bold"
                      : "solar:pause-bold"
                    : "solar:play-bold"
                }
              />
            </Button>

            <Button color="danger" onPress={handleStop} isDisabled={!isPlaying}>
              <Icon className="size-6" icon="solar:stop-bold" />
            </Button>
          </div>

          <Divider />

          <div className="relative">
            <div className="p-4 rounded-lg border-2 border-default-200 bg-default-100 dark:bg-default-50 font-mono text-lg min-h-[120px] whitespace-pre-wrap">
              {output || "Decoded text will appear here..."}
            </div>
            <Button
              isIconOnly
              className="absolute top-2 right-2"
              variant="light"
              color="secondary"
              onPress={() => {
                navigator.clipboard.writeText(output);
                toast.success("Copied to clipboard!");
              }}
            >
              <Icon icon="solar:copy-line-duotone" width={20} />
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
