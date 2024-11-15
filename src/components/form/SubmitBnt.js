import styles from './SubmitBnt.module.css'

function SubmitBnt({ text }) {
    return (
        <div >
            <button className={styles.btn}>{text}</button>
        </div>
    )
}

export default SubmitBnt