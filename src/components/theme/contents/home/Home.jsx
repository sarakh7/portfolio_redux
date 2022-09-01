import { Col, Row } from "react-bootstrap";
import Social from '../layout/social/Social';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './home.module.css';

const Home = ({ socials, profileInfo }) => {

	const [banner, setBanner] = useState();
	const [animatedTitle, setAnimatedTitle] = useState('');
	const [count, setCount] = useState(0);
	const [showTitle, setShowTitle] = useState(false);

	useEffect(() => {
		setAnimatedTitle(profileInfo.jobs[count]);
		setCount(count + 1);
		setShowTitle(true);
		setBanner(profileInfo.mainBanner);
	}, []);

	useEffect(() => {
		const timer = setInterval(() => {

			if (profileInfo.jobs && count < profileInfo.jobs.length) {
				if (showTitle) {
					setShowTitle(false);

				} else {
					setShowTitle(true);
					setCount(prevIndex => prevIndex + 1);
					setAnimatedTitle(profileInfo.jobs[count]);
				}

			} else {
				setShowTitle(false);
				setCount(0);
			}
		}, 1200);

		return () => {
			clearInterval(timer);
		}
	});

	return (
		<Row className={styles.homeRow}>
			<Col lg={5} className={styles.order_2}>
				<div className={styles.imageWrapper}>
					<div className={styles.imgBack}></div>
					<img className={styles.profileImage} src={banner} alt={profileInfo.fullname} />
				</div>
			</Col>
			<Col lg={7}>
				<div className={styles.textWrapper}>
					<div className={styles.subtitle}>{profileInfo.subtitle}</div>
					<h1 className={styles.title}>Hi, I’m {" "}<span>{profileInfo.fullname}</span></h1>
					<span className={styles.seconTitlte}>
						<span>a </span>
						<span className={classNames(styles.animatedTitle, { [styles.show]: showTitle })}>
							<span>{animatedTitle}</span>
						</span>
					</span>
					<div className={styles.description}>
						{profileInfo.mainDescription}
					</div>

					<Social title="find with me" data={socials} />
				</div>
			</Col>

		</Row>

	);
}

export default Home;