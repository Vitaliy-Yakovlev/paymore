import React from 'react';
import { useNavigate } from 'react-router';
import { Category } from '../../../types/category';
import css from './Card.module.css';

interface CardProps {
  category: Category;
}

const Card: React.FC<CardProps> = ({ category }) => {
  const img: { [key: string]: string } = {
    'Apple MacBooks': 'https://cdn.sellit9.com/assets/categories/apple-macbook/apple-macbook.png',
    'Apple iPhones': 'https://cdn.sellit9.com/assets/categories/apple-iphone/apple-iphone.png',
    'Android Smartphones': 'https://cdn.sellit9.com/assets/categories/samsung-smartphone/samsung-smartphone.png',
    Laptops: 'https://cdn.sellit9.com/assets/categories/microsoft-surface-laptop/microsoft-surface-laptop.png',
    'Sony Gaming Consoles': 'https://cdn.sellit9.com/assets/categories/sony-gaming-console/sony-gaming-console.png',
    Headphones: 'https://cdn.sellit9.com/assets/categories/beats-headphones/beats-headphones.png',
    'Apple Watch': 'https://cdn.sellit9.com/assets/categories/apple-apple-watch/apple-apple-watch.png',
    'Speakers & Audio': 'https://cdn.sellit9.com/assets/categories/shure-podcast-equipment/shure-podcast-equipment.png',
  };
  const navigate = useNavigate();

  const handleClick = () => {
    const parts = category.key.split('_');
    const path = parts.slice(0, 2).join('/').toLowerCase();

    navigate(`/category/${path}`, {
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
          src={img[category.label] || 'https://cdn.sellit9.com/assets/categories/apple-macbook/apple-macbook.png'}
          alt={category.label}
        />
      </div>
    </div>
  );
};

export default Card;
