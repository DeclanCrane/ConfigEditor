import styles from './Header.module.css';

interface Props {
    children: React.ReactNode;
}

export default function Header({ children }: Props) {
    return (
        <header className={styles.header}>
            <div className={styles.toolbar}>
            <h1>Black Ops: <span className={styles.highlight}>Config Editor</span></h1>
                <div>
                    { children }
                </div>
            </div>
        </header>
    )
}