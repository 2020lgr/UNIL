const buttons = document.querySelector('.buttons')
    .addEventListener('click', function (event) {
        const buttonPressed = event.target.value;
        if (buttonPressed === undefined) { }
        else { selectingElements(buttonPressed) }

    });

function selectingElements(buttonPressed) {
    //document.querySelector('div#output').firstElementChild.innerText = `Pressed Button: ${buttonPressed}`;

    DrawBar(buttonPressed);
}

function DrawBar(selector, data) {
    // set the dimensions and margins of the graph
    var margin = { top: 20, right: 30, bottom: 40, left: 90 },
        width = 420 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;
    d3.select("#" + selector).selectAll("*").remove();
    // append the svg object to the body of the page
    var svg = d3.select("#" + selector)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.csv("data/" + selector + ".csv", function (data) {

        DrawCircle(selector + "_all", d3.sum(data, d => +d.Value))
        // Add X axis
        var x = d3.scaleLinear()
            .domain([0, d3.max(data, d => +d.Value)])
            .range([0, width]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");

        // Y axis
        var y = d3.scaleBand()
            .range([0, height])
            .domain(data.map(function (d) { return d.Label; }))
            .padding(.1);
        svg.append("g")
            .call(d3.axisLeft(y))

        //Bars
        svg.selectAll("myRect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", x(0))
            .attr("y", function (d) { return y(d.Label); })
            .attr("width", function (d) { return x(d.Value); })
            .attr("height", y.bandwidth())
            .attr("fill", "#ead316")

    })

}

function DrawCircle(selector, data) {
    d3.select("#" + selector).selectAll("*").remove();
    const svg = d3.select("#" + selector).append('svg');

    svg
        .append('circle')
        .attr('cx', '50%')
        .attr('cy', '50%')
        .attr('r', 20 + data / 20)
        .style('fill', '#ead316');
    svg
        .append('text')
        .attr("x", 140)
        .attr("y", 80)
        .text(data)
        .attr('color', 'white')
        .attr('font-size', 12);
}