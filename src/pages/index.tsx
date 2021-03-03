import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { ChallengeBox } from '../components/ChallengeBox';
import { CountdownProvider } from '../contexts/CountdownContext';

import styles from '../styles/pages/Home.module.css';
import { ChallengesProvider } from '../contexts/ChallengesContext';

interface HomeProps {
  level: number,
  currentExperience: number,
  challengesCompleted: number,
}

export default function Home(props: HomeProps) {
	return (
		<ChallengesProvider 
			level={props.level}
			currentExperience={props.currentExperience}
			challengesCompleted={props.challengesCompleted}
		>
			<div className={styles.container}>
				<Head>
					<title>Principal | PomoTimer</title>
				</Head>
				<ExperienceBar />
				<CountdownProvider>
					<section>
						<div>
							<Profile />
							<CompletedChallenges />
							<Countdown />
						</div>
						<div>
							<ChallengeBox />
						</div>
					</section>
				</CountdownProvider>
			</div>
		</ChallengesProvider>
	);
}
/** A partir desse funcao eu consigo manipular
 * quais dados sao repassados da camada Next(node) -> o servidor q renderiza o front
 * para a camada do React(client, browser) front-end... 
 * 
 * Entao, antes de concluir a renderização da tela
 * ele vai chamar a API, vai pegar os dados
 * repassar para os componentes ja prontos
 * a partir disso meus components mostram os dados internos
 * 
 * Tudo que eu faço nessa função ele vai rodar no servidor 
 * next(node) e nao no client
 */
export const getServerSideProps: GetServerSideProps = async (ctx) => {
	// chamada API
	const { level, currentExperience, challengesCompleted } = ctx.req.cookies;

	return {
		props: { 
			level: Number(level),
			currentExperience: Number(currentExperience),
			challengesCompleted: Number(challengesCompleted),
		}
	};
};
