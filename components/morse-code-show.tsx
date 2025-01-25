interface MorseCodeShowProps {
  morse: string;
  isActive?: boolean;
}

export function MorseCodeShow({ morse, isActive = false }: MorseCodeShowProps) {
  return (
    <div className="flex gap-1 flex-wrap">
      {morse.split("").map((symbol, symbolIndex) => (
        <span
          key={symbolIndex}
          className={`
              w-6 h-6 flex items-center justify-center rounded
              transition-colors duration-200
              ${
                symbol === "."
                  ? `bg-primary/10 text-primary ${isActive ? "bg-primary/20" : ""}`
                  : `bg-secondary/10 text-secondary ${isActive ? "bg-secondary/20" : ""}`
              }
              font-mono text-sm font-bold
            `}
        >
          {symbol}
        </span>
      ))}
    </div>
  );
}
