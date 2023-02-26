import "./styles.css";
import { useCallback, useEffect, useState } from "react";

export default function App() {
  return (
    <div className="App">
      <DisappearingParagraph
        text="
      Here is some text, hover over letters and they'll disappear!
      
      Voluptatum et incidunt neque. Et quaerat voluptatibus voluptatibus numquam sunt sint ad. Perferendis deserunt et voluptas velit ea. Cupiditate sunt atque odio voluptatum. In quia ut commodi dolores quia.

Et voluptatem reiciendis suscipit non culpa pariatur consequatur. Consequatur eum reiciendis consequuntur labore soluta autem. Dolore quia quisquam iusto accusantium at consequatur voluptas molestias. Soluta expedita praesentium laboriosam rem. Tempora explicabo recusandae adipisci sed.

Dolor iure et nulla ratione placeat quia facilis. Eos iusto voluptas tenetur minima dignissimos nulla. Omnis qui maiores odit similique porro.

Cupiditate debitis magnam sapiente ut. Repellendus libero possimus non sed qui non facilis. Ea atque aliquam excepturi. Sed fuga sed ex et quas officia.

Quibusdam quod et aspernatur. Voluptatum voluptatem debitis tenetur. Ullam necessitatibus ea quis eveniet voluptas aspernatur. Voluptatem vero dolorem rem voluptates. Hic cupiditate est omnis doloremque porro.
      "
      ></DisappearingParagraph>
    </div>
  );
}

function DisappearingParagraph({ text }) {
  return text.split("").map((character) => {
    return <Letter character={character}></Letter>;
  });
}

function Letter({ character }) {
  const [isHovering, setIsHovering] = useState(false);
  const opacityValue = useOpacityHighlight(isHovering);
  const opacity = opacityValue <= 0 ? 0 : opacityValue;

  const mouseHandler = useCallback(() => {
    setIsHovering(!isHovering);
  }, [isHovering]);

  const shouldNotDisplay = opacityValue <= 0;

  return (
    <span
      onMouseEnter={mouseHandler}
      style={{ opacity, display: shouldNotDisplay ? "none" : "" }}
    >
      {character}
    </span>
  );
}

function useOpacityHighlight(isHovering) {
  const [hasHighlighted, setHasHighlighted] = useState(false);
  const [opacityValue, setOpacityValue] = useState(1);

  useEffect(() => {
    if (isHovering && !hasHighlighted) {
      setHasHighlighted(true);
    }
  }, [isHovering, hasHighlighted]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (hasHighlighted && opacityValue > 0) {
        setOpacityValue(opacityValue - 0.05);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [opacityValue, hasHighlighted]);

  return opacityValue;
}
