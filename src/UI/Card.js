import classes from './Card.module.css'

function Card(props) {
    return <article className={classes.card}>{props.children}</article>
}

export default Card