/* eslint-disable react/prop-types */
import { useFormik } from "formik";
import moment from "moment/moment";
import { useState } from "react";
import * as Yup from 'yup';

export default function HoursForm() {
  const [employees, setEmployees] = useState(['Developer', 'Designer', 'Other']);
  const [projects, setProjects] = useState(['Developer', 'Designer', 'Other']);



  const formik = useFormik({
    initialValues: {
      startTime: "",
      endTime: '',
      employees: employees[0],
      projects: projects[0],
      workDescription: '',
    },
    onSubmit: function (values) {
      alert(`You are registered! Name: ${values.name}. Email: ${values.email}. Profession: ${values.projects}. 
        Age: ${values.age}`);
    },
    onChange: function (values) {
      console.log(values);
    },
    validationSchema: Yup.object({
      startTime: Yup.string().required("Start time cannot be empty"),
      endTime: Yup
        .string()
        .required("End time cannot be empty")
        .test("is-greater", "End time can not be earlier than start time", function (value) {
          const { startTime } = this.parent;
          return moment(value, "HH:mm").isSameOrAfter(moment(startTime, "HH:mm"));
        }),
      employees: Yup.string().oneOf(employees, 'The employee you chose does not exist'),
      projects: Yup.string().oneOf(projects, 'The project you chose does not exist'),
      workDescription: Yup.string().required("Please add work description"),
    })
  })

  return (

    <div className="min-w-screen min-h-screen overflow-x-hidden">
      <form onSubmit={formik.handleSubmit} className="max-w-lg mx-auto bg-white rounded mt-7 p-3">
        <h1 className='text-3xl mb-3 text-center'>Register</h1>

        <div className='mb-4'>
          <label htmlFor="startTime">Start Time</label>
          <input type="time" name="startTime" id="startTime"
            className={`block w-full rounded border py-1 px-2 ${formik.touched.startTime && formik.errors.startTime ? 'border-red-400' : 'border-gray-300'}`}
            onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.startTime} />
          {formik.touched.startTime && formik.errors.startTime && (
            <span className='text-red-400'>{formik.errors.startTime}</span>
          )}
        </div>

        <div className='mb-4'>
          <label htmlFor="endTime">End Time</label>
          <input type="time" name="endTime" id="endTime"
            className={`block w-full rounded border py-1 px-2 ${formik.touched.endTime && formik.errors.endTime ? 'border-red-400' : 'border-gray-300'}`}
            onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.endTime} />
          {formik.touched.endTime && formik.errors.endTime && (
            <span className='text-red-400'>{formik.errors.endTime}</span>
          )}
        </div>

        <div className='mb-4'>
          <label htmlFor="employees">Employee</label>
          <select name="employees" id="employees"
            className={`block w-full rounded border py-1 px-2 ${formik.touched.employees && formik.errors.employees ? 'border-red-400' : 'border-gray-300'}`}
            onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.employees} >
            {employees.map((employee, index) => (
              <option value={employee} key={index}>{employee}</option>
            ))}
          </select>
          {formik.touched.employees && formik.errors.employees && (
            <span className='text-red-400'>{formik.errors.employees}</span>
          )}
        </div>

        <div className='mb-4'>
          <label htmlFor="projects">Project</label>
          <select name="projects" id="projects"
            className={`block w-full rounded border py-1 px-2 ${formik.touched.projects && formik.errors.projects ? 'border-red-400' : 'border-gray-300'}`}
            onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.projects} >
            {projects.map((project, index) => (
              <option value={project} key={index}>{project}</option>
            ))}
          </select>
          {formik.touched.projects && formik.errors.projects && (
            <span className='text-red-400'>{formik.errors.projects}</span>
          )}
        </div>


        <div className='mb-4'>
          <label htmlFor="workDescription">Work Description</label>
          <input type="workDescription" name="workDescription" id="workDescription"
            className={`block w-full rounded border py-1 px-2 ${formik.touched.workDescription && formik.errors.workDescription ? 'border-red-400' : 'border-gray-300'}`}
            onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.workDescription} />
          {formik.touched.workDescription && formik.errors.workDescription && (
            <span className='text-red-400'>{formik.errors.workDescription}</span>
          )}
        </div>

        <div className='text-center flex justify-around'>
          <button className='bg-red-500 rounded p-3 text-white' type='reset'>Cancel</button>
          <button className='bg-blue-500 rounded p-3 text-white' type='submit'>Submit</button>
        </div>
      </form>
    </div>
  );
}

