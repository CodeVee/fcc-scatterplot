const endpoint = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json';
const width = 800;
const height = 400;

const processData = async () => {
    const res = await fetch(endpoint);
    const data = await res.json();

    const years = data.map(d => new Date(d.Year, 1, 1));
    const minX = d3.min(years);
    const maxX = d3.max(years);

    minX.setMonth(minX.getMonth() - 3)
    maxX.setMonth(maxX.getMonth() + 3)

    const xScale = d3.scaleTime()
    .domain([minX, maxX])
    .range([0, width]);

    const times = data.map(d => {
        const [min, sec] = d.Time.split(':');
        const today = new Date();
        return new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, min, sec)
    });
    const maxY = d3.max(times);

    const yScale = d3.scaleTime()
    .domain([0, maxY])
    .range([height, 0]);

    const svg = d3.select("#graph")
      .append("svg")
      .attr("width", width + 100)
      .attr("height", height + 50);

      const xAxis = d3.axisBottom(xScale);
      svg.append("g")
          .attr("transform", "translate(60, 430)")
          .attr("id", "x-axis")
          .call(xAxis);
    
      const yAxis = d3.axisLeft(yScale);
    
      svg.append("g")
        .attr("transform", "translate(60, 30)")
        .attr("id", "y-axis")
        .call(yAxis);
}

processData();
