"use client"
import React from "react";
import { TypeOf, number, object, string, z } from "zod";
import { Formik, Form, Field } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";


const contactFormSchema = z.object({
  name: z.string().regex(/^[A-Za-z]+$/,"Name must contain characters only").min(3, "Must contain atleast 3 characters"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(50, "Message must be at least 50 characters").max(1000, "Message must be at most 1000 characters"),
  password: z.string().regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/,"Please Make your Password Strong"),
  age: z.number().min(18).max(80),
  dob: z.date().max(new Date(), "Date of birth cannot be in the future")
});

const Home = () => {
  return (
    <>
    <Formik
      initialValues={{
        name: "",
        email: "",
        message: "",
        password: "",
        age: "",
        dob: "",
        phone: "",
      }}
      onSubmit={(values) => {
        console.log("Form is submitted", values);
      }}
      validationSchema={toFormikValidationSchema(contactFormSchema)}
    >
      {(formik) => {
        const { errors, touched } = formik;
        return (
          <Form>
            <div>
              <h2>Contact Us</h2>
              <div>
                <div>
                  <label htmlFor="name">Your name</label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    placeholder="e.g. John Doe"
                  />
                  {!!errors.name && touched.name && (
                    <div>{errors.name}</div>
                  )}
                </div>
                <div>
                  <label htmlFor="email">Your email</label>
                  <Field
                    type="text"
                    id="email"
                    name="email"
                    placeholder="e.g. johndoe@gmail.com"
                  />
                  {!!errors.email && touched.email && (
                    <div>{errors.email}</div>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="message">Your message</label>
                <Field
                  as="textarea"
                  id="message"
                  name="message"
                  placeholder="Message"
                />
                {!!errors.message && touched.message && (
                  <div>{errors.message}</div>
                )}
              </div>

              <div>
                <label>Enter Your Password: </label>
                <Field type="text" id="password" name="password" placeholder="Enter your password"/>
                {
                  !!errors.password && touched.password && (
                    <div>{errors.password}</div>
                  )
                }
              </div>

              <div>
                <label>Enter your Age: </label>
                <Field type="number" id="age" name="age" placeholder="Enter your age"/>
                {
                  !!errors.age && touched.age && (
                    <div>{errors.age}</div>
                  )
                }
              </div>

              <div>
                <label>Enter your birth date: </label>
                <Field type="date" id = "dob" name="dob" placeholder="Enter your Birth date" />
                {
                  !!errors.dob && touched.dob &&  (
                    <div>{errors.dob}</div>
                  )
                }
              </div>
              <button type="submit">Submit</button>
            </div>
          </Form>
        );
      }}
    </Formik></>
  );
};

export default Home;
