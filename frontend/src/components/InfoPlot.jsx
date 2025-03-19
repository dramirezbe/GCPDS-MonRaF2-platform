import React from "react";
import './InfoPlot.css'; // Importa los estilos específicos del componente

const InfoPlot = ({ band, fmin, fmax, units, measure }) => {
    return (
        <div className="Analytics">
            <h1>Spectrum Info</h1>
            <ul>
                <li>Band: {band}</li>
                <li>Fmin: {fmin}</li>
                <li>Fmax: {fmax}</li>
                <li>Units: {units}</li>
                <li>Measure: {measure}</li>
            </ul>
        </div>
    );
};

export default InfoPlot;
