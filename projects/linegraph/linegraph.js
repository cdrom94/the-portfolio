const svg = d3.select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

const render = data => {
	const title = 'Yearly Immigration to the Netherlands per Birth Continent';
	const xValue = d => d['Perioden'];
	const yValue = d => d['Immigratie (aantal)'];

	const continents = {
		'Europa (inclusief Nederland)': 'Europe*',
		Azië: 'Asia',
		Amerika: 'America',
		Afrika: 'Africa',
		Oceanië: 'Oceania',
	};

	const colorValue = d => continents[d['Geboorteland']];

	const margin = { top: 60, right: 160, bottom: 88, left: 105 };
	const innerWidth = width - margin.left - margin.right;
	const innerHeight = height - margin.top - margin.bottom;

	const xScale = d3.scaleTime().domain(d3.extent(data, xValue)).range([0, innerWidth]);

	const yScale = d3.scaleLinear().domain(d3.extent(data, yValue)).range([innerHeight, 0]).nice();

	const colorScale = d3.scaleOrdinal(d3.schemeSet2);

	const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

	const xAxis = d3.axisBottom(xScale).tickSize(-innerHeight).tickPadding(15);

	const yAxis = d3.axisLeft(yScale).tickSize(-innerWidth).tickPadding(10);

	const yAxisG = g.append('g').call(yAxis);
	yAxisG.selectAll('.domain').remove();

	yAxisG
		.append('text')
		.attr('class', 'axis-label')
		.attr('y', -60)
		.attr('x', -innerHeight / 2)
		.attr('transform', `rotate(-90)`)
		.attr('text-anchor', 'middle')
		.text('Immigration Total');

	const xAxisG = g.append('g').call(xAxis).attr('transform', `translate(0,${innerHeight})`);

	xAxisG.select('.domain').remove();

	xAxisG
		.append('text')
		.attr('class', 'axis-label')
		.attr('y', 45)
		.attr('x', innerWidth / 2)
		.text('Period');

	const lineGenerator = d3
		.line()
		.x(d => xScale(xValue(d)))
		.y(d => yScale(yValue(d)))
		.curve(d3.curveBasis);

	const lastYValue = d => yValue(d.values[d.values.length - 1]);

	const nested = d3
		.nest()
		.key(colorValue)
		.entries(data)
		.sort((a, b) => d3.descending(lastYValue(a), lastYValue(b)));

	colorScale.domain(nested.map(d => d.key));

	const linePaths = g.selectAll('.line-path');
	linePaths
		.data(nested)
		.enter()
		.append('path')
		.attr('class', 'line-path')
		.attr('d', d => lineGenerator(d.values))
		.attr('stroke', d => colorScale(d.key));

	transition(d3.selectAll('.line-path'));

	function tweenDash() {
		const l = this.getTotalLength(),
			i = d3.interpolateString('0,' + l, l + ',' + l);
		return function (t) {
			return i(t);
		};
	}

	function transition(selection) {
		selection.each(function () {
			d3.select(this).transition().duration(2000).attrTween('stroke-dasharray', tweenDash);
		});
	}

	g.append('text').attr('class', 'title').attr('y', -20).text(title);

	const colorLegend = (selection, props) => {
		const { colorScale, circleRadius, spacing, textOffset } = props;

		const groups = selection.selectAll('g').data(colorScale.domain());

		const groupsEnter = groups.enter().append('g').attr('class', 'tick');
		groupsEnter.merge(groups).attr('transform', (d, i) => `translate(0, ${i * spacing})`);
		groups.exit().remove();

		groupsEnter.append('circle').merge(groups.select('circle')).attr('r', circleRadius).attr('fill', colorScale);

		groupsEnter
			.append('text')
			.merge(groups.select('text'))
			.text(d => d)
			.style('width', 20)
			.attr('dy', '0.32em')
			.attr('x', textOffset);
	};

	svg.append('g').attr('transform', `translate(550,100)`).call(colorLegend, {
		colorScale,
		circleRadius: 3,
		spacing: 16,
		textOffset: 10,
	});

	const mouseG = svg.append('g').attr('class', 'mouse-over-effects');

	mouseG.append('path').attr('class', 'mouse-line').style('stroke', 'hsl(222, 37%, 25%)').style('stroke-width', 1).style('opacity', '0');

	const lines = document.getElementsByClassName('line-path');

	// here's a g for each circle and text on the line
	const mousePerLine = mouseG.selectAll('.mouse-per-line').data(nested).enter().append('g').attr('class', 'mouse-per-line');

	// circles
	mousePerLine
		.append('circle')
		.attr('r', 2)
		.style('stroke', d => colorScale(d.key))
		.style('fill', d => colorScale(d.key))
		.style('stroke-width', 1)
		.style('opacity', '0');

	// text
	mousePerLine.append('text').style('color', 'hsl(222, 37%, 25%)').attr('transform', 'translate(10,3)');

	// rect to capture mouse movements
	mouseG
		.append('svg:rect')
		.attr('width', innerWidth)
		.attr('height', innerHeight)
		.attr('y', margin.top)
		.attr('x', margin.left)
		.attr('fill', 'none')
		.attr('pointer-events', 'all')
		.on('mouseout', function () {
			// on mouse out hide line, circles and text
			d3.select('.mouse-line').style('opacity', '0');
			d3.selectAll('.mouse-per-line circle').style('opacity', '0');
			d3.selectAll('.mouse-per-line text').style('opacity', '0');
		})
		.on('mouseover', function () {
			// on mouse in show line, circles and text
			d3.select('.mouse-line').style('opacity', '1');
			d3.selectAll('.mouse-per-line circle').style('opacity', '1');
			d3.selectAll('.mouse-per-line text').style('opacity', '1');
		})
		.on('mousemove', function () {
			// mouse moving over canvas
			const mouse = d3.mouse(this);
			// move the vertical line
			d3.select('.mouse-line').attr('d', () => {
				let d = `M${mouse[0]},${innerHeight + margin.top}`;
				d += ' ' + mouse[0] + ',' + margin.top;
				return d;
			});

			// circle and text position
			d3.selectAll('.mouse-per-line').attr('transform', function (d, i) {
				const xTotal = xScale.invert(mouse[0]),
					bisect = d3.bisector(d => d['Immigratie (aantal)']).right;
				idx = bisect(d.values, xTotal);

				let beginning = 0;
				let end = lines[i].getTotalLength();
				let target = null;

				while (true) {
					target = Math.floor((beginning + end) / 2);
					pos = lines[i].getPointAtLength(target);
					if ((target === end || target === beginning) && pos.x !== mouse[0]) {
						break;
					}
					if (pos.x > mouse[0] - margin.left) {
						end = target;
					} else if (pos.x < mouse[0] - margin.left) {
						beginning = target;
					} else break; //position found
				}

				let format = d3.format(',');
				// update the text with y value
				d3.select(this)
					.select('text')
					.text(format(Math.round(yScale.invert(pos.y))));

				// return position
				return 'translate(' + mouse[0] + ',' + (pos.y + margin.top) + ')';
			});
		});
};

const parseTime = d3.timeParse('%Y');

d3.csv('linegraph/data.csv').then(data => {
	data.forEach(d => {
		d['Perioden'] = parseTime(d['Perioden']);
		d['Immigratie (aantal)'] = +d['Immigratie (aantal)'];
	});
	render(data);
});
