'use client';
import { useState, useRef, useEffect } from 'react';
import { Transition } from '@headlessui/react';

interface TextTruncateProps {
  text: string;
  maxLines: number;
}

const TextTruncate = ({ text, maxLines }: TextTruncateProps) => {
  const [showFullText, setShowFullText] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (containerRef.current && textRef.current) {
      const lineHeight = parseFloat(
        getComputedStyle(textRef.current).lineHeight
      );
      const maxHeight = lineHeight * maxLines;
      const isOverflowing = textRef.current.scrollHeight > maxHeight;
      setShowFullText(!isOverflowing);
    }
  }, [text, maxLines]);

  const toggleShowFullText = () => {
    setShowFullText(!showFullText);
  };

  return (
    <div className='relative'>
      <div
        ref={containerRef}
        className='overflow-hidden'
        style={{
          maxHeight: showFullText
            ? `${textRef.current?.scrollHeight}px`
            : `calc(1.2em * ${maxLines})`,
          transition: 'max-height 0.3s ease',
        }}
      >
        <p ref={textRef}>{text}</p>
      </div>
      {!showFullText && (
        <div className='text-light-blue-600 text-sm mt-2 underline cursor-pointer focus:outline-none'>
          <button onClick={toggleShowFullText}>Show entire text</button>
        </div>
      )}
      <Transition
        show={showFullText}
        enter='transition-opacity duration-300'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='transition-opacity duration-300'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <div className='text-light-blue-600 text-sm mt-2 underline cursor-pointer focus:outline-none'>
          <button onClick={toggleShowFullText}>Hide text</button>
        </div>
      </Transition>
    </div>
  );
};

export default TextTruncate;
