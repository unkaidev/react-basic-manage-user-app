import { Alert } from "react-bootstrap";

const NotFound = () => {
    return (
        <>
            <Alert variant="danger" className="mt-3">
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>
                    404 NOT FOUND!
                </p>
            </Alert>
        </>
    )
}
export default NotFound;