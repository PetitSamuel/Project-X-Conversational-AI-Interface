import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form'

const EntityInputs = ({ idx, expressionState, handleEntityChange }) => {
    const entityId = `exp-${idx}`;



    return (
        <div key={`exp-${idx}`}>

            <Form.Control type="text" placeholder={`Expression ${idx + 1}`}
                name={entityId}
                data-idx={idx}
                id={entityId}
                className="entity"
                value={expressionState[idx].name}
                onChange={handleEntityChange}
            />
        </div>
    );
};

EntityInputs.propTypes = {
    idx: PropTypes.number,
    expressionState: PropTypes.array,
    handleCatChange: PropTypes.func,
};

export default EntityInputs;