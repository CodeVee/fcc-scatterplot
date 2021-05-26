const endpoint = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json';
const width = 800;
const height = 400;

const processData = async () => {
    const res = await fetch(endpoint);
    const data = await res.json();

}

processData();
