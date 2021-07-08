const endpoint = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json';
const width = 800;
const height = 400;

const processData = async () => {
    const res = await fetch(endpoint);
    const data = await res.json();

    const minX = d3.min(data , d => d.Year - 1);
    const maxX = d3.max(data, d => d.Year + 1);

    const xScale = d3.scaleTime()
    .domain([minX, maxX])
    .range([0, width]);

    const times = data.map(d => {
        const [min, sec] = d.Time.split(':');
        const today = new Date();
        return new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, min, sec)
    });

    const yScale = d3.scaleLinear()
    .domain(d3.extent(times))
    .range([0, height]);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const div = d3
            .select('#main')
            .append('div')
            .attr('class', 'tooltip')
            .attr('id', 'tooltip')
            .style('opacity', 0);

    const svg = d3.select("#graph")
      .append("svg")
      .attr("width", width + 100)
      .attr("height", height + 50);

      svg.selectAll("circle")
       .data(data)
       .enter()
       .append("circle")
       .attr("cx", d => xScale(d.Year))
       .attr("cy", (d, i) => yScale(times[i]))
       .attr("r", 5)
       .attr("transform", "translate(60, 30)")
       .attr("class", "dot")
       .attr("data-xvalue", d => d.Year)
       .attr("data-yvalue", (d, i) => times[i])
       .style('fill', d => color(d.Doping !== ''))
      .on('mouseover', (e, d) => {
        const i = data.indexOf(d);
        div.style('opacity', 0.9);
        div.attr('data-year', d.Year);
        div
          .html(`${d.Name}: ${d.Nationality}` +
              '<br/>' +
              'Year: ' +
              d.Year +
              ', Time: ' +
              timeFormat(times[i]) +
              (d.Doping ? '<br/><br/>' + d.Doping : '')
          )
      })
      .on('mouseout', () => {
        div.style('opacity', 0);
      });

      const legendContainer = svg.append('g').attr('id', 'legend');

      const legend = legendContainer
            .selectAll('#legend')
            .data(color.domain())
            .enter()
            .append('g')
            .attr('class', 'legend-label')
            .attr('transform', (d, i) => {
            return 'translate(0,' + (height / 2 - i * 20) + ')';
            });

        legend
            .append('rect')
            .attr('x', width - 18)
            .attr('width', 18)
            .attr('height', 18)
            .style('fill', color);

        legend
            .append('text')
            .attr('x', width - 24)
            .attr('y', 9)
            .attr('dy', '.35em')
            .style('text-anchor', 'end')
            .text(d => {
            if (d) {
                return 'Riders with doping allegations';
            } else {
                return 'No doping allegations';
            }
            });

      const xAxis = d3.axisBottom(xScale).tickFormat(d3.format('d'));
      svg.append("g")
          .attr("transform", "translate(60, 430)")
          .attr("id", "x-axis")
          .call(xAxis);
    
      const timeFormat = d3.timeFormat('%M:%S');
      const yAxis = d3.axisLeft(yScale).tickFormat(timeFormat);
    
      svg.append("g")
        .attr("transform", "translate(60, 30)")
        .attr("id", "y-axis")
        .call(yAxis);
}

processData();
