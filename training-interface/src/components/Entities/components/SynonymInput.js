import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import SynonymList from './SynonymList.js';

const SynonymInputs = ({ idx, entityState, handleReferenceChange, setexpressionState}) => {
    const entityId = `enti-${idx}`;
    const count = idx;

    const blankSynonym = { name: '', synonym: [] };
    const [synonymState, setsynonymState] = useState([
        { ...blankSynonym },
    ]);

    const addList = () => {
        setsynonymState([...synonymState, { ...blankSynonym }]);
    };

    const handleSynonymChange = (e) => {
        const updatedEntities = [...entityState];
        //This is the location to be edited.. index in reference array -> index in synonym array inside reference obj
        updatedEntities[idx]["synonym"][e.target.dataset.idx] = e.target.value;
       setexpressionState(updatedEntities);
    };


    return (
        <div key={`enti-${idx}`} style={{ margin: "2px", borderStyle: "dashed", borderWeight: "0.1px", borderColor: "#13beb1", padding: "5px" }}>
            <Form.Label>Reference</Form.Label>
            <Form.Control type="text" placeholder={`Reference ${idx + 1}`}
                name={entityId}
                data-idx={idx}
                id={entityId}
                className="entity"
                value={entityState[idx].name}
                onChange={handleReferenceChange}
            />

            <Form.Group controlId="Synonym.Description">
                <Form.Label style={{ marginLeft: "10px", marginTop: "5px" }}>Synonyms
                <Button variant="secondary" size="sm" style={{ marginLeft: "5px", lineHeight: "0.9", borderRadius: "10px" }} value="Add another synonym"
                        onClick={addList}>
                        +
              </Button></Form.Label>
            </Form.Group>

            {
                synonymState.map((val, idx) => (
                    <SynonymList
                        key={`syn-${idx}`}
                        entityState={entityState}
                        idx={idx}
                        count={count}
                        handleSynonymChange={handleSynonymChange}
                    />
                ))
            }
        </div>
    );
};

SynonymInputs.propTypes = {
    idx: PropTypes.number,
    entityState: PropTypes.array,
    handleCatChange: PropTypes.func,
};

export default SynonymInputs;