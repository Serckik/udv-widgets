import { Link } from "react-router-dom"

function NotFoundPage() {
    return (
        <>
            <h2>404 Страница не найдена</h2>
            <Link className="link-button" to="/login">На главную</Link>
        </>
    )
}

export default NotFoundPage