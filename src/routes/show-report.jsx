/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";



export default function ShowReport() {

  const [employees, setEmployees] = useState(['Developer', 'Designer', 'Other']);
  const [projects, setProjects] = useState(['Developer', 'Designer', 'Other']);

  const [selectedEmployee, setSelectedEmployee] = useState("")
  const [selectedProject, setSelectedProject] = useState("")
  const [selectedStartTime, setSelectedStartTime] = useState("")
  const [selectedEndTime, setSelectedEndTime] = useState("")


  const [filteredData, setFilteredData] = useState()

  useEffect(() => {
    const fetchEmployees = fetch(`http://localhost:5206/employees`)
      .then(response => response.json())
      .then(data => data);

    const fetchProjects = fetch('http://localhost:5206/projects')
      .then(response => response.json())
      .then(data => data);


    Promise.all([fetchEmployees, fetchProjects])
      .then(([employees, projects]) => {
        // Handle the employees and projects data
        console.log('Employees:', employees);
        setEmployees(employees)
        console.log('Projects:', projects);
        setProjects(projects)
      })
      .catch(error => {
        // Handle any errors
        console.error('Error:', error);
      });

  }, [])


  const fetchReport = async (startTime, endTime, employeeName, projectName) => {
    const currentDate = new Date().toISOString().split('T')[0];
    startTime = new Date(`${currentDate}T${startTime}`).toISOString()
    endTime = new Date(`${currentDate}T${endTime}`).toISOString()
    const url = `http://localhost:5206/get-report?startTime=${startTime}&endTime=${endTime}&employeeName=${employeeName}&projectName=${projectName}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Request failed');
      }
      const data = await response.json();
      // Process the returned data as needed
      console.log(data);


      setFilteredData(data)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async () => {

    const request = {
      selectedEmployee,
      selectedProject,
      selectedStartTime,
      selectedEndTime
    }

    console.log("🚀 ~ file: show-report.jsx:53 ~ handleSubmit ~ request:", request)

    await fetchReport(selectedStartTime, selectedEndTime, selectedEmployee, selectedProject)

  }

  return (
    <div id="contact" className="m-4">
      <div className="space-y-4">
        <div className="flex space-x-4">
          <div>
            <label htmlFor="employee" className="block font-medium">Employee</label>
            <select
              id="employee"
              name="employee"
              className="w-full p-2 border border-gray-300 rounded-md"
              onChange={(e) => {
                console.log(e)
                setSelectedEmployee(e.target.value)
              }}
            >
              <option value="">Select Employee</option>
              {employees.map((employee, index) => (
                <option value={employee} key={index}>{employee}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="project" className="block font-medium">Project</label>
            <select
              id="project"
              name="project"
              className="w-full p-2 border border-gray-300 rounded-md"
              onChange={(e) => {
                console.log(e)
                setSelectedProject(e.target.value)
              }}
            >
              <option value="">Select Project</option>
              {projects.map((project, index) => (
                <option value={project} key={index}>{project}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="startTime" className="block font-medium">Start Time</label>
            <input
              type="time"
              id="startTime"
              name="startTime"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Start Time"
              onChange={(e) => {
                console.log(e)
                setSelectedStartTime(e.target.value)
              }}
            />
          </div>
          <div>
            <label htmlFor="endTime" className="block font-medium">End Time</label>
            <input
              type="time"
              id="endTime"
              name="endTime"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="End Time"
              onChange={(e) => {
                console.log(e)
                setSelectedEndTime(e.target.value)
              }}
            />
          </div>
        </div>
          <button className='bg-blue-500 rounded p-3 text-white' onClick={handleSubmit}>Submit</button>


        <div className='text-center flex justify-around'>
        </div>
      </div>


      {/* Display filtered data in a table */}
      {filteredData && (
        <table className="mt-4 border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="p-2 border border-gray-300">Employee Name</th>
              <th className="p-2 border border-gray-300">Project Name</th>
              <th className="p-2 border border-gray-300">Start Time</th>
              <th className="p-2 border border-gray-300">End Time</th>
              <th className="p-2 border border-gray-300">Time</th>
              <th className="p-2 border border-gray-300">Work Description</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((data) => {
              // const startTime = moment(data.StartTime).format('HH:mm');
              // const endTime = moment(data.EndTime).format('HH:mm');
              // const duration = moment.utc(startTime).diff(endTime);
              // const time = duration.format('H[h] mm[m]');

              const startTime = new Date(data.startTime);
              const endTime = new Date(data.endTime);

              const timeDifference = endTime.getTime() - startTime.getTime();
              const timeInMinutes = timeDifference / (1000 * 60); // Convert milliseconds to minutes
              const hours = Math.floor(timeInMinutes / 60);
              const minutes = Math.floor(timeInMinutes % 60);

              return (
                <tr key={data.Id}>
                  <td className="p-2 border border-gray-300">{data.employeeName}</td>
                  <td className="p-2 border border-gray-300">{data.projectName}</td>
                  <td className="p-2 border border-gray-300">{data.startTime}</td>
                  <td className="p-2 border border-gray-300">{data.endTime}</td>
                  <td className="p-2 border border-gray-300">{hours}:{minutes}</td>
                  <td className="p-2 border border-gray-300">{data.workDescription}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="4" className="p-2 border border-gray-300 text-right">Total Time:</td>
              {Math.round(filteredData.reduce((totalTime, data) => {
                const startTime = new Date(data.startTime);
                const endTime = new Date(data.endTime);

                const timeDifference = endTime.getTime() - startTime.getTime();
                const timeInMinutes = timeDifference / (1000 * 60);
                totalTime += timeInMinutes;
                return totalTime;
              }, 0))} minutes
              <td className="p-2 border border-gray-300"></td>
            </tr>
          </tfoot>
        </table>
      )}



    </div>
  );
}