import React, { Component } from "react";
import * as d3 from "d3";
import "./Child1.css";

class Child1 extends Component {
  state = { 
    company: "Apple", // Default Company
    selectedMonth: 'November' //Default Month
  };





  componentDidMount() {

    var monthNames = ["January", "February", "March", "April", "May","June","July", "August", "September", "October", "November","December"];
    console.log("Component Mounted!")
    console.log(this.props.csv_data) // Use this data as default. When the user will upload data this props will provide you the updated data

    this.props.csv_data.forEach((element) => console.log(element.Date.getMonth()));
    
    
    var datas = Array();
    datas.length = 0;

    console.log("Datas is empty:")
    console.log(datas)
    
    this.renderChart();


    //for all rows with company = company AND month = month
    //add to chart array
    //then do a join


    


    

    
    
    
    //sending state

    //make axis with limits
    //make legend
    //make tooltip
    //line between each point
    //with curve


    //moving

    //using the legend

    //
    


  }

  

  componentDidUpdate() {


    console.log("Component Updated - Got New Data!")
    console.log(this.state.company)
    console.log(this.state.selectedMonth)

    
    this.renderChart();


  }

  sayHello() {
    console.log("Hello!")
  }

  

  dropSelect = (event) => {
    console.log(("Dropdown used"))
    this.setState({
      selectedMonth:  event.target.value
    });
    //console.log(event.target.value)
  }

  compSelect = (event) => {
    //console.log("compSelect() event:" + event.target.value);
    this.setState({
      company: event.target.value
    });
  }


  renderChart = () => {

    var monthNames = ["January", "February", "March", "April", "May","June","July", "August", "September", "October", "November","December"];
    
    var datas = Array();
    datas.length=0;


    console.log("Datas is empty:")
    console.log(datas)

    this.props.csv_data.forEach((element) => {
      if(element.Company === this.state.company && monthNames[element.Date.getMonth()] === this.state.selectedMonth)
        {
          console.log("Adding" + element.Company + " " + element.Date.getMonth())
          datas.push(element);
        }
      }


    );

    console.log("Datas is now: ")
    console.log(datas);

    var upper = datas[0].Open;
    var lower = datas[0].Open;

    datas.forEach((element) => {
      if(element.Open > upper)
        upper = element.Open;
      if(element.Close > upper)
        upper = element.Close;
      if(element.Open < lower)
        lower = element.Open;
      if(element.Close < lower)
        lower = element.Close;
    })


    
    console.log(lower)
    console.log(upper)






    // making graph

    // scales:


    const margin = { top: 20, right: 30, bottom: 0, left: 40 },
      width = 400,
      height = 300,
      innerWidth = 400 - margin.left - margin.right,
      innerHeight = 320 - margin.top - margin.bottom;

      

      const svg = d3.select('#mysvg').attr('width', width).attr('height', height).select('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    var xScale = d3.scaleTime().domain(d3.extent(datas, d => d.Date)).range([0, width]);
    var yScale = d3.scaleLinear().domain([lower, upper]).range([height, 0]);

    
    svg.selectAll('.x.axis').data([null]).join('g').attr('class', 'x axis').attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale)).selectAll("text")  
      .style("text-anchor", "end")
      .attr("dx", "4.2em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(65)");

    svg.selectAll('.y.axis').data([null]).join('g').attr('class', 'y axis').call(d3.axisLeft(yScale));
      

    var lineOpen = d3.line()
      .x( d => xScale(d.Date))
      .y( d => yScale(d.Open))
      .curve(d3.curveCatmullRom.alpha(0.5));

    var lineClose = d3.line()
    .x( d => xScale(d.Date))
    .y( d => yScale(d.Close))
    .curve(d3.curveCatmullRom.alpha(0.5)); 

    var selectCircle = svg.selectAll(".circle")
      .data(datas)


    svg.append("path")
      .datum(datas)
      .attr("fill", "none")
      .attr("stroke", "#b2df8a")
      .attr("stroke-width", 3)
      .attr("d", lineOpen)

    selectCircle.enter().append("circle")
      .attr("class", "circle")
      .attr("fill", "#b2df8a")
      .attr("r", 5)
      .attr("cx", function(d) {
        return xScale(d.Date)
      })
      .attr("cy", function(d) {
        return yScale(d.Open)
      })





      svg.append("path")
      .datum(datas)
      .attr("fill", "none")
      .attr("stroke", "#e41a1c")
      .attr("stroke-width", 3)
      .attr("d", lineClose)

      selectCircle.enter().append("circle")
      .attr("class", "circle")
      .attr("fill", "#e41a1c")
      .attr("r", 5)
      .attr("cx", function(d) {
        return xScale(d.Date)
      })
      .attr("cy", function(d) {
        return yScale(d.Close)
      })


      const svg2 = d3.select('legend').attr('width', 150).attr('height', 100).select('g')

      svg.append("rect").attr("height", 25).attr("width", 25).attr("x",410).attr("y",20).attr("r", 6).style("fill", "#b2df8a")
      svg.append("rect").attr("height", 25).attr("width", 25).attr("x",410).attr("y",70).attr("r", 6).style("fill", "#e41a1c")
      svg.append("text").attr("x", 440).attr("y", 35).text("Open").style("font-size", "15px").attr("alignment-baseline","right")
      svg.append("text").attr("x", 440).attr("y", 85).text("Close").style("font-size", "15px").attr("alignment-baseline","right")


      

  }

  render() {
    const options = ['Apple', 'Microsoft', 'Amazon', 'Google', 'Meta']; // Use this data to create radio button
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']; // Use this data to create dropdown

    
    var svg2 = d3.select("legend").select("g")

    svg2.append("rect").attr("x", 100).attr("y", 100).attr("width", 10).attr("height", 10)

    
    



   

    
  
    



    

    return (
      <div className="child1">




        <div className="container">
        <div className="radioTitle">Company: 

              <form>
                <div className="radioform">
                  {options.map((item) => (
                    <React.Fragment key={item} >
                      
                      <input
                        name="option"
                        
                        id={item}
                        value={item}
                        type="radio"
                        onChange={this.compSelect}
                        defaultChecked={item === "Apple"}
                      />
                      <label className="radio-inline" htmlFor={item}> {item}</label>
                    </React.Fragment>
                  ))}
                </div>
                <div></div>
              </form>
          </div>
          </div>

          <div className="container2">


          <div> Month: </div>
                  <select name="month" onChange={this.dropSelect}>
                        {months.map((item) => (
                          <option value={item} defaultChecked={item === "November"}>{item}</option>
                        ))}
                  </select>

          </div>



        <div className="container3">

                        <div> <svg id="mysvg" viewBox="0 0 500 400" width="1000" height="1000"><g></g></svg> </div>


                        <div> <svg id="legend"  viewBox="0 0 100 100" height="100" width="120"><g></g></svg></div>


        </div>


      </div>

    );
  }
}

export default Child1;
