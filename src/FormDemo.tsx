import React from 'react'
import { Card, CardContent, Typography, TextField, Button, MenuItem, CheckboxProps, Box, FormGroup, FormControlLabel, Checkbox } from "@material-ui/core"
import { Form, Formik, Field, useField, ErrorMessage } from 'formik'
import { InvestmentDetails } from './InvestmentDetails'
import { object, string, number, boolean, array } from 'yup'
import { mixed } from 'yup'


const initialValues: InvestmentDetails = {
    fullName: '',
    initialInvestment: 0,
    investmentRisk: [],
    commentAboutInvestmentRisk: '',
    dependents: -1,
    acceptedTermsAndConditions: false
}

function FormDemo() {
    return (
        <Card>
            <CardContent>
                <Typography variant='h4' >New Account</Typography>

                <Formik

                    validationSchema={
                        object({
                            fullName: string().required("Required Full name").min(2, 'more than 2'),
                            initialInvestment: number().required("Required Initial values").min(100),
                            dependents: number().required().min(0).max(5),
                            acceptedTermsAndConditions: boolean().oneOf([true]),
                            investmentRisk: array(string().oneOf(["High", "Medium", "Low"])).min(1),
                            commentAboutInvestmentRisk: mixed().required("required").when('investmentRisk', {
                                is: (investmentRisk: string[]) => investmentRisk.find(ir => ir === 'High'),
                                then: string().required("required").min(20).max(100),
                                otherwise: string().min(20).max(100)
                            })
                        })
                    }

                    initialValues={initialValues}

                    onSubmit={(values, formikHelpers) => { 
                        console.log(values)
                        console.log(formikHelpers)
                    }}
                >
                    {({ dirty,isValid }) =>  (
                       
                       <div>
                            <Form>
                            <Box marginBottom={2} >
                                <FormGroup>
                                    <Field name='fullName' as={TextField} label='Full Name' />
                                    <ErrorMessage name='fullName' />
                                </FormGroup>
                            </Box>

                            <FormGroup>
                                <Field name='initialInvestment' type='number' as={TextField} label='Initial Investment' />
                                <ErrorMessage name='initialInvestment' />

                            </FormGroup>

                            <FormGroup>
                                <MyCheckbox name='investmentRisk' value='High' label='High - Super Risky' />
                                <MyCheckbox name='investmentRisk' value='Medium' label='Medium - Risky' />
                                <MyCheckbox name='investmentRisk' value='Low' label='Low - safe' />
                                <ErrorMessage name='investmentRisk' />

                            </FormGroup>

                            <Form>
                                <Field name='commentAboutInvestmentRisk' as={TextField} multiline rows={3} rowsMax={10} variant='outlined' />
                                <ErrorMessage name='commentAboutInvestmentRisk' />
                            </Form>

                            <FormGroup>
                                <Field name='dependents' as={TextField} select label='dependents' >
                                    <MenuItem value={-1}>Select...</MenuItem>
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                    <MenuItem value={5}>5</MenuItem>
                                </Field>
                                <ErrorMessage name='dependents' />
                            </FormGroup>

                            <FormGroup>
                                <MyCheckbox name='acceptedTermsAndConditions' label='Accept terms and conditions' />
                                <ErrorMessage name='acceptedTermsAndConditions' />
                            </FormGroup>

                            <Button type='submit' disabled={!dirty || !isValid} >Submit</Button>

                            {/* <pre>{JSON.stringify(errors, null, 4)}</pre>
                            <pre>{JSON.stringify(values, null, 4)}</pre> */}
                        </Form>
                       </div>
                    )}
                </Formik>
            </CardContent>
        </Card>
    )
}

export interface MyCheckboxProps extends CheckboxProps {
    name: string;
    value?: string | number;
    label?: string
}

export function MyCheckbox(props: MyCheckboxProps) {
    const [field] = useField({
        name: props.name,
        type: 'checkbox',
        value: props.value
    })

    return <FormControlLabel control={<Checkbox {...props} {...field} />} label={props.label} />
}


export default FormDemo
