import { useEffect, useState } from "react";

export function useTypewriter(words: string[], speed = 80, pause = 1400) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[i % words.length];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          const next = word.slice(0, text.length + 1);
          setText(next);
          if (next === word) {
            setTimeout(() => setDeleting(true), pause);
          }
        } else {
          const next = word.slice(0, text.length - 1);
          setText(next);
          if (next === "") {
            setDeleting(false);
            setI((n) => n + 1);
          }
        }
      },
      deleting ? speed / 2 : speed,
    );
    return () => clearTimeout(timeout);
  }, [text, deleting, i, words, speed, pause]);

  return text;
}
