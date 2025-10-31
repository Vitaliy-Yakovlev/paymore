import Card from './Card';
import { useCategories } from '../../hooks/useCategories';
import css from './CategoryCard.module.css';

const CategoryCard = () => {
  const { categories } = useCategories();

  return (
    <section className={css.wrapperCategory}>
      <h2 className={css.title}>
        Choose <span className={css.titleBold}>by category</span>
      </h2>

      <ul className={css.list}>
        {categories.map(category => (
          <li className={css.item} key={category.id}>
            <Card category={category} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CategoryCard;
