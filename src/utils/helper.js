// Unit conversion utils
const distanceUnits = {
    m: 1,
    cm: 0.01,
    inch: 0.0254,
    ft: 0.3048,
    yd: 0.9144,
  };
  
const convertDistance = (value, from, to) => {
return (value * distanceUnits[from]) / distanceUnits[to];
};

const convertTemperature = (value, from, to) => {
if (from === to) return value;
let celsius;
if (from === 'C') celsius = value;
else if (from === 'F') celsius = (value - 32) * (5 / 9);
else if (from === 'K') celsius = value - 273.15;
else throw new Error('Unsupported temperature unit');

if (to === 'C') return celsius;
if (to === 'F') return celsius * 9 / 5 + 32;
if (to === 'K') return celsius + 273.15;

throw new Error('Unsupported target unit');
};

const convertValue = (type, value, from, to) => {
if (type === 'distance') return convertDistance(value, from, to);
if (type === 'temperature') return convertTemperature(value, from, to);
throw new Error('Unsupported metric type');
};

export { distanceUnits, convertDistance, convertTemperature, convertValue  }
  