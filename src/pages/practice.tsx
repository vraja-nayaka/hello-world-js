import { useState } from "react";
import { pushConfetti } from "../shared/ui/confetti/Confetti";
import { CodeHighlighting } from "../shared/ui/editor/Editor";
import { initialValue1, initialValue2 } from "../shared/ui/editor/initialValue";

export const PracticePage = () => {
  const [page, setPage] = useState(0);

  return (
    <>
      {page === 0 && <CodeHighlighting initialValue={initialValue1} />}
      {page === 1 && <CodeHighlighting initialValue={initialValue2} />}
      Спасибо за урок, теперь можем двигаться дальше
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          onClick={() => {
            pushConfetti({
              particleCount: 250,
              startVelocity: 70,
              origin: { y: 1 },
            });
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
            setTimeout(() => setPage(1), 300);
          }}
        >
          {page === 1 ? "Дальше пока ничего нет" : "Поехали!"}
        </button>
      </div>
    </>
  );
};
