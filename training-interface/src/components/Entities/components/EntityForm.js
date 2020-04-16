import React, { useState } from 'react';
import EntityInputs from './EntityInputs.js';
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

    const blankEntity = { expression: '' };
    const [expressionState, setexpressionState] = useState([
        { ...blankEntity },
    ]);

    const addEntity = () => {
        setexpressionState([...expressionState, { ...blankEntity }]);
    };

    const handleEntityChange = (e) => {
        const updatedEntities = [...expressionState];
        updatedEntities[e.target.dataset.idx] = e.target.value;
        setexpressionState(updatedEntities);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/entities', {
            name: nameState.name,
            expressions: expressionState,
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

    const handleEdit = (e) => {
        e.preventDefault();
        window.location.reload(true);
    }

    return (
        <Form onSubmit={handleSubmit}>
            {edit
                ? <h4 style={{ paddingBottom: "6px" }}>Edit Entity</h4>
                : <h4 style={{ paddingBottom: "6px" }}>Create New Entity</h4>
            }

            <Form.Group controlId="Entity">
                <Form.Label>Entity</Form.Label>
                <Form.Control type="text" placeholder="Enter an entity"
                    name="entity"
                    onChange={handleNameChange}
                />
            </Form.Group>



            <Form.Group controlId="Entity.Description">
                <Form.Label>Expressions
                <Button variant="secondary" size="sm" style={{ marginLeft: "5px", lineHeight: "1.3", borderRadius: "15px" }} value="Add another expression"
                        onClick={addEntity}>
                        +
              </Button></Form.Label>

            </Form.Group>

            {
                expressionState.map((val, idx) => (
                    <EntityInputs
                        key={`expr-${idx}`}
                        idx={idx}
                        expressionState={expressionState}
                        handleEntityChange={handleEntityChange}
                    />
                ))
            }
            <Row>
                <Col><button onClick={handleSubmit} type="submit" className="btn btn-primary">Add</button></Col>
                <Col> <Button onClick={handleCancel} variant="outline-danger" style={{ float: "right", margin: "30px" }}>Cancel</Button></Col>
            </Row>
        </Form>

    );
};

export default EntityForm;