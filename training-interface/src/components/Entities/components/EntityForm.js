import React, { useState } from 'react';
import SynonymInput from './SynonymInput.js';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

const axios = require('axios').default;

const EntityForm = () => {

    const [nameState, setNameState] = useState({
        name: '',
    });

    const handleNameChange = (e) => setNameState({
        ...nameState,
        name: e.target.value,
    });

    const blankIntent = { reference: '', synonym: [] };
    const [entityState, setexpressionState] = useState([
        { ...blankIntent },
    ]);

    const addReference = () => {
        setexpressionState([...entityState, { ...blankIntent }]);
    };

    const handleReferenceChange = (e) => {
        const updatedEntities = [...entityState];
        updatedEntities[e.target.dataset.idx]["reference"] = e.target.value;
        setexpressionState(updatedEntities);
    };


    const handleSubmit = (e) => {
      /*  e.preventDefault();
        foreach
        axios.post('http://localhost:5000/api/entities', {
            reference: nameState,
            expressions: entityState,
        })
            .then(function (response) {
                console.log(response);
                window.location.reload(true);
            })
            .catch(function (error) {
                console.log(error);
            });*/
    }

    const handleCancel = (e) => {
        e.preventDefault();
        window.location.reload(true);
    }


    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="Intent">
                <Form.Label>Entity reference</Form.Label>
                <Form.Control type="text" placeholder="Enter entity reference"
                    reference="entity"
                    onChange={handleNameChange}
                />
            </Form.Group>

            <div style={{ overflow: "auto", maxHeight: "300px", margin: "2px", padding: "5px" }}>
                {
                    entityState.map((val, idx) => (
                        <SynonymInputs
                            key={`enti-${idx}`}
                            idx={idx}
                            entityState={entityState}
                            handleReferenceChange={handleReferenceChange}
                            setexpressionState={setexpressionState}
                            entityState={entityState}
                        />
                    ))
                }
            </div>
            <Row>
                <Col><button onClick={handleSubmit} type="submit" className="btn btn-primary">Add</button></Col>
                <Col> <Button onClick={handleCancel} variant="outline-danger" style={{ float: "right", margin: "30px" }}>Cancel</Button></Col>
            </Row>
            <p>Add another reference<Button variant="secondary" size="sm" style={{ marginLeft: "5px", lineHeight: "0.9", borderRadius: "10px" }}
                onClick={addReference}>
                +
              </Button></p>
        </Form>

    );
};

export default EntityForm;