import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Category } from '../../../types/category';
import css from './Card.module.css';

interface CardProps {
  category: Category;
}

const Card: React.FC<CardProps> = ({ category }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/category/${category.key.replaceAll('_', '/').toLowerCase()}`, {
      state: {
        categoryKey: category.key,
        categoryLabel: category.label,
        categoryId: category.id,
      },
    });
  };

  return (
    <div className={css.wrapperCard} onClick={handleClick}>
      <h3 className={css.title}>{category.label}</h3>
      <div className={css.imageWrapper}>
        <img
          className={css.image}
          src={
            'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQMXd6Q7RlBNz1yg1oy1TUQaaF2dITnemjIHsCzRYBOdomSzJulqzg49dkRfK5Wk-3Nm4wyikyA1VWDoiJHlaxGfpUUINaTMSOIpgge8Br_uxpp9vEb2KBIFfhG&usqp=CAc'
          }
          alt={category.label}
        />
      </div>
    </div>
  );
};

export default Card;
