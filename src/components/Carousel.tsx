import React, { useRef } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step?: number;
  frameSize?: number;
  itemWidth?: number;
  animationDuration?: number;
};

const Carousel: React.FC<Props> = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
}) => {
  const listRef = useRef<HTMLUListElement | null>(null);
  const shiftRef = useRef(0);

  const move = (moveDirection: 'next' | 'prev') => {
    const delta = step * itemWidth;
    let newShift =
      shiftRef.current + (moveDirection === 'next' ? delta : -delta);

    const maxShift = 0;
    const minShift = -((images.length - frameSize) * itemWidth);

    newShift = Math.max(minShift, Math.min(maxShift, newShift));

    shiftRef.current = newShift;
    if (listRef.current) {
      listRef.current.style.transform = `translate(${shiftRef.current}px, 0)`;
    }
  };

  return (
    <div className="Carousel" style={{ width: `${frameSize * itemWidth}px` }}>
      <ul
        className="Carousel__list"
        ref={listRef}
        style={{ transition: `transform ${animationDuration}ms ease ` }}
      >
        {images.map((imageSrc, index) => (
          <li className="Carousel__listItem" key={index}>
            <img
              className="Carousel__image"
              src={imageSrc}
              alt="carousel"
              width={itemWidth}
              style={itemWidth ? { width: `${itemWidth}px` } : {}}
            />
          </li>
        ))}
      </ul>

      <button
        className="Carousel__button--previous"
        type="button"
        onClick={() => move('next')}
      >
        Prev
      </button>

      <button
        className="Carousel__button--next"
        type="button"
        onClick={() => move('prev')}
        data-cy="next"
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
