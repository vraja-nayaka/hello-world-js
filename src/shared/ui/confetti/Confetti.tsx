import confetti, { Options } from "canvas-confetti";

const confettiCanvas = document.getElementById(
  "confettiCanvas"
) as HTMLCanvasElement;

const myConfetti = confetti.create(confettiCanvas, {
  resize: true,
  useWorker: true,
});

type MyConfettiOptions = Options & {
  type?: "success" | "fail";
};

const colors = {
  default: undefined,
  success: ["#21b321", "#6bdc6b", "#26a726"],
  fail: ["#fd3211", "#ed11d1", "#df12a2"],
};

export const pushConfetti = (options?: MyConfettiOptions) => {
  const { type = "default", ...restOptions } = options || {};
  myConfetti({
    particleCount: 10,
    spread: 100,
    startVelocity: 20,
    colors: colors[type],
    // any other options from the global
    // confetti function
    ...options,
  });
};
