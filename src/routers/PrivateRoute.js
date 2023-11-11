import { Routes, Route } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from '../context/UserContext';
import { Alert } from "react-bootstrap";

const PrivateRoute = (props) => {
    const { user } = useContext(UserContext);


    if (user && !user.auth) {
        return <>

            <Alert variant="danger" className="mt-3">
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>
                    YOU DON'T HAVE PERMISSION TO ACESS THIS ROUTE!
                </p>
            </Alert>
        </>
    }

    return (
        <>
            {props.children};
        </>
    )
}
export default PrivateRoute;