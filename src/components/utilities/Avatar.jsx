import styles from '../../styles/Avatar.module.css';

const Avatar = (props) => {
    const { src, text, height = 45 } = props;
    return (
        <span>
            <img
                className={styles.avatar}
                src={src}
                alt="avatar"
                height={height}
                width={height}
            />
            {text}
        </span>
    );
}

export default Avatar;