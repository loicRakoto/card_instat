import React from 'react';
import mada from '../Image/mada.jpg';
import instat from '../Image/instat.png';


function ligneFirst() {
    return (
        <div className='row ligneFirst'>
            <div className="col-sm" style={{ textAlign: 'left' }}>
                <img className='imageTop' src={mada} alt="mada" />
            </div>
            <div className="col-sm" style={{ textAlign: 'right' }}>
                <img className='imageTop' src={instat} alt="instats" />
            </div>
        </div>
    )
}

export default ligneFirst