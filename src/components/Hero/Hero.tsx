import css from './Hero.module.css';

const Hero = () => {
  return (
    <section className={css.hero}>
      <h1 className={css.title}>
        Get an instant quote & <span className={css.titleBold}>Get cash today</span>
      </h1>
    </section>
  );
};

export default Hero;
