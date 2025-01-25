// Object mapping for Morse code to text conversion
const morseToText: Record<string, string> = {
  ".-": "A",
  "-...": "B",
  "-.-.": "C",
  "-..": "D",
  ".": "E",
  "..-.": "F",
  "--.": "G",
  "....": "H",
  "..": "I",
  ".---": "J",
  "-.-": "K",
  ".-..": "L",
  "--": "M",
  "-.": "N",
  "---": "O",
  ".--.": "P",
  "--.-": "Q",
  ".-.": "R",
  "...": "S",
  "-": "T",
  "..-": "U",
  "...-": "V",
  ".--": "W",
  "-..-": "X",
  "-.--": "Y",
  "--..": "Z",
  ".----": "1",
  "..---": "2",
  "...--": "3",
  "....-": "4",
  ".....": "5",
  "-....": "6",
  "--...": "7",
  "---..": "8",
  "----.": "9",
  "-----": "0",
  ".-.-.-": ".",
  "--..--": ",",
  "..--..": "?",
  ".----.": "'",
  "-.-.--": "!",
  "-..-.": "/",
  "-.--.": "(",
  "-.--.-": ")",
  ".-...": "&",
  "---...": ":",
  "-.-.-.": ";",
  "-...-": "=",
  ".-.-.": "+",
  "-....-": "-",
  "..--.-": "_",
  ".-..-.": '"',
  "...-..-": "$",
  ".--.-.": "@",
  "...---...": "SOS",
};

// Generate reverse mapping for text to Morse code conversion
const textToMorse: Record<string, string> = Object.entries(morseToText).reduce(
  (acc, [morse, char]) => {
    acc[char] = morse;

    return acc;
  },
  {} as Record<string, string>
);

/**
 * Converts text to Morse code
 * @param text Text to convert
 * @returns Morse code string
 */
export function textToMorseCode(text: string): string {
  if (!text) return "";

  return text
    .toUpperCase()
    .split("")
    .map((char) => {
      if (char === " ") return "/";
      return textToMorse[char] || char;
    })
    .join(" ")
    .trim();
}

/**
 * Converts Morse code to text
 * @param morseCode Morse code to convert
 * @returns Decoded text
 */
export function morseCodeToText(morseCode: string): string {
  if (!morseCode) return "";

  return morseCode
    .split("/")
    .map((word) =>
      word
        .trim()
        .split(" ")
        .map((code) => morseToText[code] || code)
        .join("")
    )
    .join(" ")
    .trim();
}

// Add pause and stop support to SpeedConfig
type SpeedConfig = {
  wpm?: number; // Words per minute (default: 20)
  frequency?: number; // Tone frequency in Hz (default: 700)
  volume?: number; // Volume from 0 to 1 (default: 0.5)
  audioContext?: AudioContext; // Audio context for controlling playback
};

export async function playMorseCode(
  morse: string,
  { wpm = 20, frequency = 700, volume = 0.5, audioContext }: SpeedConfig = {}
): Promise<void> {
  // Use provided audioContext or create new one
  const context = audioContext || new AudioContext();

  // Calculate timings based on WPM
  const unitLength = 1200 / wpm;
  const dotLength = unitLength;
  const dashLength = dotLength * 3;
  const elementGap = dotLength;
  const charGap = dotLength * 3;
  const wordGap = dotLength * 7;

  const playBeep = (duration: number) => {
    return new Promise<void>((resolve, reject) => {
      // Check if context is closed (stopped)
      if (context.state === "closed") {
        reject(new Error("Playback stopped"));
        return;
      }

      const oscillator = context.createOscillator();
      const gainNode = context.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(context.destination);

      oscillator.frequency.value = frequency;
      gainNode.gain.value = volume;

      oscillator.start();

      const timeoutId = setTimeout(() => {
        oscillator.stop();
        resolve();
      }, duration);

      // Store cleanup function in case of stop
      oscillator.onended = () => {
        clearTimeout(timeoutId);
        resolve();
      };
    });
  };

  const sleep = (ms: number) => {
    return new Promise<void>((resolve, reject) => {
      // Check if context is closed (stopped)
      if (context.state === "closed") {
        reject(new Error("Playback stopped"));
        return;
      }

      const timeoutId = setTimeout(resolve, ms);

      // Add cleanup for stop
      context.onstatechange = () => {
        if (context.state === "closed") {
          clearTimeout(timeoutId);
          reject(new Error("Playback stopped"));
        }
      };
    });
  };

  try {
    for (let i = 0; i < morse.length; i++) {
      const char = morse[i];
      const nextChar = morse[i + 1];

      if (char === ".") {
        await playBeep(dotLength);
      } else if (char === "-") {
        await playBeep(dashLength);
      } else if (char === " ") {
        await sleep(charGap);
      } else if (char === "/") {
        await sleep(wordGap);
        continue;
      }

      // Add gap between elements if not last character
      if (i < morse.length - 1 && nextChar !== " " && nextChar !== "/") {
        await sleep(elementGap);
      }
    }
  } catch (error) {
    // Handle stop gracefully
    if ((error as Error).message === "Playback stopped") {
      return;
    }
    throw error;
  }
}

// ...existing code...

// Usage example:
/*
const morse = textToMorseCode('Hello World');
console.log(morse); // .... . .-.. .-.. --- / .-- --- .-. .-.. -..

const text = morseCodeToText('.... . .-.. .-.. --- / .-- --- .-. .-.. -..');
console.log(text); // HELLO WORLD
*/
