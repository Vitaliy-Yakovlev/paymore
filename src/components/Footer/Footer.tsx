import LogoFooter from '../../img/logo.svg';
import css from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={css.footer}>
      <div className={css.wrapperFooter}>
        <p className={css.footerText}>
          <svg className={css.footerLogo} width={25} height={25}>
            <use href={LogoFooter} />
          </svg>
          You can trust PayMore with your trade-in.
        </p>
        <button className={css.learnMoreButton} onClick={() => alert('Learn more clicked')}>
          Learn more
        </button>
      </div>
      <p className={css.footerCopyright}>© PayMore - 2025.</p>
    </footer>
  );
};

export default Footer;
