import { RotatingLines } from 'react-loader-spinner';
import Card from './Card';
import { useCategories } from '../../hooks/useCategories';
import css from './CategoryCard.module.css';

const CategoryCard = () => {
  const { categories, loading } = useCategories();

  return (
    <section className={css.wrapperCategory}>
      {loading && (
        <RotatingLines
          visible={true}
          height='36'
          width='36'
          strokeColor='#45B549'
          strokeWidth='5'
          animationDuration='0.75'
          ariaLabel='rotating-lines-loading'
          wrapperClass='spinner-wrapper'
        />
      )}
      {!loading && (
        <>
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
        </>
      )}
    </section>
  );
};

export default CategoryCard;
