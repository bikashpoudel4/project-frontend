import { Button, ListGroup } from "react-bootstrap";
import { RiDeleteBin6Line } from "react-icons/ri";

const AppoinmentInfo = ({appoinment, onDeleteAppointment}) => {
    return (
        <>
            <ListGroup.Item>
                <p><small>Date: {appoinment.aptDate}</small></p>
                <p><strong>First Name: </strong>{appoinment.firstName}</p>
                <p><strong>Last Name: </strong>{appoinment.lastName}</p>
                <p><strong>Notes: </strong>{appoinment.aptNotes}</p>
                <Button onClick={() => onDeleteAppointment(appoinment.id)} size="sm" variant="danger"><RiDeleteBin6Line /> Delete</Button>
            </ListGroup.Item>
        </>
    )
}

export default AppoinmentInfo;