import styles from './Home.module.css'
import savings from '../../img/savings.svg'
import LinkBnb from '../layout/LinkBnb'
function Home() {
    return (
        <section className={styles.home_container} >
            <h1>
                Bem-vindo ao <span>Costs</span>
            </h1>
            <p>Comece a gerenciar os seus projetos agora mesmo </p>
            <LinkBnb to="/newproject" text="Criar Projetos" />
            <img src={savings} alt="Costs" />
        </section>
    )
}

export default Home