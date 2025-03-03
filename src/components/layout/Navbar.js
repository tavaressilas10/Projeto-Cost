import { Link } from 'react-router-dom'
import Container from './Container'
import styles from './Navbar.module.css'
import logo from '../../img/costs_logo.png'
function Navbar() {
    return (
        <nav className={styles.navbar}>
            <Container>

                <Link to="/">
                    <img src={logo} alt="Costs" /> 
                </Link>

                <ul className={styles.list}>
                    
                    <li class={styles.item}>
                        <Link to="/">Inicio</Link>
                    </li>

                    <li class={styles.item}>
                        <Link to="/projects">Projetos</Link>
                    </li>

                    <li class={styles.item}>
                        <Link to="/company">Empresa</Link>
                    </li>

                    <li class={styles.item}>
                        <Link to="/newproject">Novo Projeto</Link>
                    </li>

                </ul>
            </Container>
        </nav>
    )
}

export default Navbar