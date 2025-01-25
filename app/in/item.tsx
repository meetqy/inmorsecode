"use client";

import { Card, CardBody, Link } from "@heroui/react";
import { textToMorseCode } from "@/utils/morse-code";
import { useRouter } from "next/navigation";

export const Item = ({ item }: { item: string }) => {
  const router = useRouter();

  return (
    <Card
      className="group hover:scale-105 transition-all duration-300"
      isPressable
      onPress={() => router.push(`/in/${item}`)}
    >
      <CardBody className="gap-4">
        <h3 className="text-xl font-semibold capitalize">
          {item} <span className="sr-only">in morse code</span>
        </h3>
        <div className="font-mono text-sm text-gray-500 dark:text-gray-400 break-all">
          {textToMorseCode(item)}
        </div>
        <Link
          href={`/in/${item}`}
          className="text-primary flex items-center justify-end gap-2 text-sm"
        >
          Learn & Listen
          <span className="text-lg">→</span>
        </Link>
      </CardBody>
    </Card>
  );
};
