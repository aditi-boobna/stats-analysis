import React from "react";
import jsondata from '../data/Wine-Data.json'; // Importing wine data from a JSON file
import './styles.css'

function meanCalc(data, val) {
    // Calculate the mean of a given attribute in the data
    const sum = data.reduce((accumulator, obj) => {
        if (obj.hasOwnProperty(val)) {
            return accumulator + Number(obj[val]);
        }
        return accumulator;
    }, 0);

    const mean = parseFloat((sum / data.length).toFixed(3)); // Calculate upto three decimal places
    return mean;
}

function medianCalc(data, val) {
    // Calculate the median of a given attribute in the data
    const sortedValues = data.map(obj => obj[val]).sort((a, b) => a - b); // Sort the attribute values in ascending order
    const middleIndex = Math.floor(sortedValues.length / 2);
    const median = sortedValues.length % 2 === 0
        ? (sortedValues[middleIndex - 1] + sortedValues[middleIndex]) / 2 // For even length data
        : sortedValues[middleIndex]; // For odd length data
    return parseFloat((median).toFixed(3)); // Calculate upto three decimal places
}

function modeCalc(data, val) {
    // Calculate the mode of a given attribute in the data
    let valueCounts = {};
    let maxCount = 0;
    let mode = [];
    for (const obj of data) {
        if (obj.hasOwnProperty(val)) {
            const value = obj[val];
            valueCounts[value] = (valueCounts[value] || 0) + 1; // Count the occurrences of each attribute

            if (valueCounts[value] > maxCount) {
                maxCount = valueCounts[value];
                mode = [value]; // Update if a higher count is found
            } else if (valueCounts[value] === maxCount) {
                mode.push(value); // if it has the same count as the current
            }
        }
    }
    return parseFloat((mode[0]).toFixed(3)); // Calculate the mode with three decimal places
}

function StatsData() {
    const classData = {};
    const classes = {};

    const data = jsondata.map(obj => {   // Insert calculated 'Gamma' value to each data object
        return { ...obj, ['Gamma']: (obj.Ash * obj.Hue) / obj.Magnesium };   // eslint-disable-line
    });



    data.forEach(({ Alcohol, ...rest }) => {
        // Group data objects based on the 'Alcohol' class
        if (!classData[Alcohol]) {
            classData[Alcohol] = [];
        }
        classData[Alcohol].push(rest);
    });

    for (const key in classData) {
        // Add 'Class' to the existing key
        if (classData.hasOwnProperty(key)) {
            const newKey = 'Class' + key;
            classes[newKey] = classData[key];
        }
    }

    const class1 = classes.Class1;
    const class2 = classes.Class2;
    const class3 = classes.Class3;

    // Calculate mean, median, and mode for 'Flavanoids' attribute in each class
    const FlavanoidMean = [meanCalc(class1, 'Flavanoids'), meanCalc(class2, 'Flavanoids'), meanCalc(class3, 'Flavanoids')];
    const FlavanoidMedian = [medianCalc(class1, 'Flavanoids'), medianCalc(class2, 'Flavanoids'), medianCalc(class3, 'Flavanoids')];
    const FlavanoidMode = [modeCalc(class1, 'Flavanoids'), modeCalc(class2, 'Flavanoids'), modeCalc(class3, 'Flavanoids')];

    // Calculate mean, median, and mode for 'Gamma' attribute in each class
    const GammaMean = [meanCalc(class1, 'Gamma'), meanCalc(class2, 'Gamma'), meanCalc(class3, 'Gamma')];
    const GammaMedian = [medianCalc(class1, 'Gamma'), medianCalc(class2, 'Gamma'), medianCalc(class3, 'Gamma')];
    const GammaMode = [modeCalc(class1, 'Gamma'), modeCalc(class2, 'Gamma'), modeCalc(class3, 'Gamma')];

    return (
        <div>
            <table className="table">
                <tbody>
                    <tr>
                        <th>Measure</th>
                        <th>Class 1</th>
                        <th>Class 2</th>
                        <th>Class 3</th>
                    </tr>
                    <tr>
                        <td>Flavanoid Mean</td>
                        <td>{FlavanoidMean[0]}</td>
                        <td>{FlavanoidMean[1]}</td>
                        <td>{FlavanoidMean[2]}</td>
                    </tr>
                    <tr>
                        <td>Flavanoid Median</td>
                        <td>{FlavanoidMedian[0]}</td>
                        <td>{FlavanoidMedian[1]}</td>
                        <td>{FlavanoidMedian[2]}</td>
                    </tr>
                    <tr>
                        <td>Flavanoid Mode</td>
                        <td>{FlavanoidMode[0]}</td>
                        <td>{FlavanoidMode[1]}</td>
                        <td>{FlavanoidMode[2]}</td>
                    </tr>
                </tbody>
            </table>

            <table className="table">
                <tbody>
                    <tr>
                        <th>Measure</th>
                        <th>Class 1</th>
                        <th>Class 2</th>
                        <th>Class 3</th>
                    </tr>
                    <tr>
                        <td>Gamma Mean</td>
                        <td>{GammaMean[0]}</td>
                        <td>{GammaMean[1]}</td>
                        <td>{GammaMean[2]}</td>
                    </tr>
                    <tr>
                        <td>Gamma Median</td>
                        <td>{GammaMedian[0]}</td>
                        <td>{GammaMedian[1]}</td>
                        <td>{GammaMedian[2]}</td>
                    </tr>
                    <tr>
                        <td>Gamma Mode</td>
                        <td>{GammaMode[0]}</td>
                        <td>{GammaMode[1]}</td>
                        <td>{GammaMode[2]}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default StatsData;