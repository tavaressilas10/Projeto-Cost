import { Link } from 'react-router-dom'
import styles from './LinkBnb.module.css'

function LinkBnb({to, text}) {
    return (
      <Link className={styles.btn} to={to}>
      {text}
      </Link>
    )
}
export default LinkBnb