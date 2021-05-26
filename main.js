const endpoint = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json';
const width = 800;
const height = 400;

const processData = async () => {
    const res = await fetch(endpoint);
    const data = await res.json();

    console.log(data[1]);

    const years = data.map(d => d.year);
    const minX = d3.min(years);
    const maxX = d3.max(years);

    const xScale = d3.scaleLinear()
    .domain([minX, maxX])
    .range([0, width]);

    const times = data.map(d => {
        const [min, sec] = d.Time.split(':');
        const today = new Date();
        return new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, min, sec)
    });
    console.log(times[1]);
    const maxY = d3.max(times);

    const yScale = d3.scaleTime()
    .domain([0, maxY])
    .range([height, 0]);
}

processData();
