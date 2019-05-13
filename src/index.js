import * as d3 from 'd3';

import './track-button';
import StateService from './state-service';

const stateService = new StateService();
const signinButton = document.getElementById('sign-in');
signinButton.addEventListener('click', stateService.signin);

stateService.getUser().then((user) => {
  if (user) {
    document.getElementById('signed-in').textContent = `Signed in as ${user.email}`;
    signinButton.style.display = 'none';
  
    // stateService.subscribe((data) => {
    //   createAxes(data);
    //   addData(data);
    // });
  }  
});

window.addEventListener('track-thing', (event) => {
  // stateService.track(event.detail);
  requestAnimationFrame(() => {
    const toast = document.querySelector('.toast');
    toast.classList.add('toasted');
    window.addEventListener('animationend', (event) => {
      event.target.classList.remove('toasted');
    })
  });
});

const graph = d3.select('#graph');
const width = graph.attr('width') - 40;
const height = graph.attr('height') - 20;

const g = graph.append('g');
const x = d3.scaleTime();
const y = d3.scaleLinear().rangeRound([height, 0]);

function createAxes(data) {
  const dates = Object.keys(data);
  const minDate = new Date(dates[0]);
  const maxDate = new Date(dates[dates.length - 1]);
  x.domain([minDate, maxDate]).range([0, width]);

  const yMax = d3.max(Object.values(data), item => Object.values(item)[0]);
  y.domain([0, yMax]);

  g.append('g').attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(x).ticks(d3.timeDay).tickFormat(d3.timeFormat('%d/%m')));
}

function addData(data) {
  const beers = Object.entries(data).map(([date, beer]) => ({ 
    date: new Date(date),
    items: beer['🍺']
  }));

  const barWidth = width / x.ticks().length;
  
  g.selectAll('.bar').data(beers).enter().append('rect')
    .attr('class', 'bar')
    .attr('x', d => x(d.date) - (barWidth / 2))
    .attr('y', d => y(d.items))
    .attr('width', barWidth)
    .attr('height', d => height - y(d.items));
}
