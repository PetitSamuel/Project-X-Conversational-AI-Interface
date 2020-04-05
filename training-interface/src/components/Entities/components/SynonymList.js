import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form'

const SynonymList = ({ idx, synonymState, handleSynonymChange }) => {
    const synonymId = `syn-${idx}`;



    return (
        <div style ={{marginLeft:"10px"}} key={`exp-${idx}`} >
            
            <Form.Control type="text" placeholder={`Synonym ${idx + 1}`}
                name={synonymId}
                data-idx={idx}
                id={synonymId}
                className="entity"
                value={synonymState[idx].synonymId}
                onChange={handleSynonymChange}
            />
        </div>
    );
};

SynonymList.propTypes = {
    idx: PropTypes.number,
    expressionState: PropTypes.array,
    handleCatChange: PropTypes.func,
};

export default SynonymList;