import { CSSProperties, ReactElement } from "react";
import './card.scss';

type CardProps = {
  title: string;
  trainLine: string;
  minute: number;
  isFront?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function Card({title, trainLine, minute, isFront, className = '', style}: CardProps): ReactElement {

  return(
    <div style={style} className={`card card__container ${className}`}>
      <div className='card__content'>
        <div className='card__wrapper'>
          <h2 className="card__train-line"><span>{trainLine}</span></h2>
          {isFront && <h1 className="card__train-name">{title}</h1>}
        </div>
        <div className="card__minute">
          <h1>{minute}</h1>
          <span>min</span>
        </div>
      </div>
      <div className='card-spacer'></div>
    </div>
  );
}
