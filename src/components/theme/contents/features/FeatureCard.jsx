import { Link } from 'react-scroll';
import BlackBox from '../layout/box/black-box/BlackBox';
import styles from './feature-card.module.css'

const FeatureCard = ({ icon, title, description, targetLink, delay }) => {

	return (
		<div className={styles.box}>
			<BlackBox>
				{/* <Link to={targetLink}> */}
				<div className={styles.inner}>
					<div className={styles.icon}>
						<i className={icon}></i>
					</div>
					<h3 className={styles.title}>{title}</h3>
					<div className={styles.description}>
						{description}
					</div>
					<Link className={styles.link} to={targetLink}><i className="fas fa-arrow-right"></i></Link>
				</div>
				{/* </Link> */}
			</BlackBox>
		</div>
	);
}

export default FeatureCard;