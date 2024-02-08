import { BsFillCalendar2CheckFill } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row, Card, ListGroup } from "react-bootstrap";

import Search from "./components/Search";
import AddAppoinment from "./components/AddAppoinment";
import AppoinmentInfo from "./components/AppoinmentInfo"
import { useCallback, useEffect, useState } from "react";

function App() {

    let [appoinmentList, setAppointmentList] = useState([]);
    let [query, setQuery] = useState("");
    let [sortBy, setSortBy] = useState("firstName");
    let [orderBy, setOrderBy] = useState("asc");

    const filteredAppointments = appoinmentList.filter(
        item => {
            return (
                item.firstName.toLowerCase().includes(query.toLocaleLowerCase()) ||
                item.lastName.toLowerCase().includes(query.toLocaleLowerCase()) ||
                item.aptNotes.toLowerCase().includes(query.toLocaleLowerCase())
            )
        }
    ).sort((a, b) => {
        let order = (orderBy === "asc") ? 1 : -1;
        return (
            a[sortBy].toLowerCase() < b[sortBy].toLowerCase() ? -1 * order : 1 * order
        )
    })

    const fetchData = useCallback(() => {
        fetch('./data.json')
            .then(response => response.json())
            .then(data => {
                setAppointmentList(data)
            })
    }, [])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return (
        <div className="App">
            <Container>
                <Row>
                    <h1 className="text-center fw-light mt-3">
                        <BsFillCalendar2CheckFill /> Appointments
                    </h1>
                </Row>
                <Row className="justify-content-center">
                    <AddAppoinment 
                        onSendAppointment={myAppontment => setAppointmentList([...appoinmentList, myAppontment])} 
                        lastId={appoinmentList.reduce((max, item) => Number(item.id) > max ? Number(item.id): max, 0)} />
                </Row>
                <Row className="justify-content-center">
                    <Col md="4">
                        <Search
                            query={query}
                            onQueryChange={myQuery => setQuery(myQuery)}
                            orderBy={orderBy}
                            onOrderByChange={mySort => setOrderBy(mySort)}
                            sortBy={sortBy}
                            onSortByChange={mySort => setSortBy(mySort)}
                        />
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md="8">
                        <Card className="mb-3">
                            <Card.Header>Appoinments</Card.Header>
                            <ListGroup variant="flush">
                                {filteredAppointments.map(appoinment => (
                                    <AppoinmentInfo key={appoinment.id} appoinment={appoinment}
                                        onDeleteAppointment={
                                            appointmentId => setAppointmentList(appoinmentList.filter(
                                                appoinment => appoinment.id !== appointmentId
                                            ))
                                        } />
                                ))}
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>

            </Container>
        </div>
    );
}

export default App;

