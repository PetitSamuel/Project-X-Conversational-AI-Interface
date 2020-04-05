import React, { useState } from 'react';
import IntentInputs from './SynonymInput.js';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
const axios = require('axios').default;

const EntityForm = ({ edit, editState }) => {

    const [nameState, setNameState] = useState({
        name: '',
    });

    const handleNameChange = (e) => setNameState({
        ...nameState,
        name: e.target.value,
    });

    const blankIntent = { name: '', expression: [] };
    const [entityState, setexpressionState] = useState([
        { ...blankIntent },
    ]);

    const addEntity = () => {
        setexpressionState([...entityState, { ...blankIntent }]);
    };

    const handleEntityChange = (e) => {
        const updatedEntities = [...entityState];
        updatedEntities[e.target.dataset.idx] = e.target.value;
        setexpressionState(updatedEntities);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/intents', {
            name: nameState.name,
            expressions: entityState,
        })
            .then(function (response) {
                console.log(response);
                window.location.reload(true);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleCancel = (e) => {
        e.preventDefault();
        window.location.reload(true);
    }


    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="Intent">
                <Form.Label>Entity name</Form.Label>
                <Form.Control type="text" placeholder="Enter entity name"
                    name="entity"
                    onChange={handleNameChange}
                />
            </Form.Group>

            <div style={{overflow:"auto", maxHeight: "300px",margin:"2px", padding: "5px" }}>
            {
                entityState.map((val, idx) => (
                    <IntentInputs
                        key={`enti-${idx}`}
                        idx={idx}
                        entityState={entityState}
                        handleEntityChange={handleEntityChange}
                    />
                ))
            }
            </div>
            <Row>
                <Col><button onClick={handleSubmit} type="submit" className="btn btn-primary">Add</button></Col>
                <Col> <Button onClick={handleCancel} variant="outline-danger" style={{ float: "right", margin: "30px" }}>Cancel</Button></Col>
            </Row>
            <p>Add another reference<Button variant="secondary" size="sm" style={{ marginLeft: "5px", lineHeight: "0.9", borderRadius: "10px" }}
                        onClick={addEntity}>
                        +
              </Button></p>
        </Form>

    );
};

export default EntityForm;